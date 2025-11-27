import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../utils/Request';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const renderMenu = (items) => {
    return items.map(item => (
        (item.menuType == 0) ? (
            <div key={item.menuTitle}>
                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                    <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>{item.menuTitle}</span>
                </h2>
                {renderMenu(item.children)}
            </div>
        ) : (
            <li key={item.menuTitle} className="nav-item">
                <NavLink to={`${item.menuRoute}`} className="group">
                    <div className="flex items-center">
                        {item.menuSvg && <span dangerouslySetInnerHTML={{ __html: item.menuSvg }} />}
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{item.menuTitle}</span>
                    </div>
                </NavLink>
                {item.children && item.children.length > 0 && (
                    <ul>
                        {renderMenu(item.children)}
                    </ul>
                )}
            </li>
        )
    ));
};


const ItemList: React.FC = () => {
    const navigate = useNavigate();

    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasBiometric, setHasBiometric] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem('accessToken')
                };
                
                
                // Fetch menu items
                const data = await postRequest('/v1/menu/getMenuItems', {}, {}, headers);
                if (data.message == "Unauthorized") {
                    navigate("/login");
                }
                // Ensure data is an array
                if (Array.isArray(data)) {
                    setMenuData(data);
                } else {
                    console.error('Menu data is not an array:', data);
                    setMenuData([]);
                }
                
                // Fetch biometric status
                const bioResponse = await getRequest("/v1/attendance/current-user", {}, headers);
                const bioData = await bioResponse.json();
                if (bioData.success) {
                    setHasBiometric(bioData.user.hasBiometric);
                }
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching menu:', err);
                setMenuData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter menu items based on biometric status
    const filterMenuItems = (items) => {
        return items.filter(item => {
            // Hide "Register Face" menu if user already has biometric
            if (hasBiometric && item.menuRoute === '/attendance/register-face') {
                return false;
            }
            // Recursively filter children
            if (item.children && item.children.length > 0) {
                item.children = filterMenuItems(item.children);
            }
            return true;
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading menu items</div>;
    if (!Array.isArray(menuData) || menuData.length === 0) {
        return <div className="p-4">No menu items available</div>;
    }

    const filteredMenuData = hasBiometric !== null ? filterMenuItems(menuData) : menuData;

    return (
        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
            {renderMenu(filteredMenuData)}
        </ul>
    );
};

export default ItemList;
