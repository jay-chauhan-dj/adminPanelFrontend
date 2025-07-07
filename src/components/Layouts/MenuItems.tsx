import React, { useEffect, useState } from 'react';
import { postRequest } from '../../utils/Request';
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

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem('accessToken')
                };
                let data = await postRequest('/v1/menu/getMenuItems', {}, {}, headers);
                if (data.message == "Unauthorized") {
                    navigate("/login");
                }

                // --- Temporary local modification for Invoices link ---
                if (Array.isArray(data)) {
                    const appsCategory = data.find(item => item.menuTitle === 'Apps' || item.menuTitle === 'apps'); // Adjust based on actual title
                    if (appsCategory && appsCategory.children) {
                        const invoiceSubMenu = appsCategory.children.find(child => child.menuTitle === 'Invoice' || child.menuTitle === 'invoice');
                        if (invoiceSubMenu && invoiceSubMenu.children) {
                            // Check if it already exists to prevent duplicates during hot-reloads
                            if (!invoiceSubMenu.children.some(child => child.menuRoute === '/apps/invoice/invoices')) {
                                invoiceSubMenu.children.push({
                                    menuTitle: 'All Invoices', // Or "New Invoices", "Invoice List"
                                    menuRoute: '/apps/invoice/invoices',
                                    menuType: 1, // Assuming 1 is a direct link
                                    menuSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M2 12C2 7.28599 2 4.92898 3.46447 3.46447C4.92898 2 7.28599 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92898 22 7.28599 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28599 22 4.92898 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" fill="currentColor"></path><path d="M9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"></path><path d="M9 14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14Z" fill="currentColor"></path></svg>`, // Example SVG
                                });
                            }
                        } else if (appsCategory && !invoiceSubMenu) {
                             // If no "Invoice" submenu exists under "Apps", add it directly
                            if (!appsCategory.children.some(child => child.menuRoute === '/apps/invoice/invoices')) {
                                appsCategory.children.push({
                                    menuTitle: 'All Invoices',
                                    menuRoute: '/apps/invoice/invoices',
                                    menuType: 1,
                                    menuSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M2 12C2 7.28599 2 4.92898 3.46447 3.46447C4.92898 2 7.28599 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92898 22 7.28599 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28599 22 4.92898 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" fill="currentColor"></path><path d="M9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"></path><path d="M9 14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14Z" fill="currentColor"></path></svg>`,
                                });
                            }
                        }
                    } else {
                        // Fallback: If "Apps" category not found, or data structure is different, add to root
                        if (!data.some(item => item.menuRoute === '/apps/invoice/invoices')) {
                            data.push({
                                menuTitle: 'All Invoices',
                                menuRoute: '/apps/invoice/invoices',
                                menuType: 1,
                                menuSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M2 12C2 7.28599 2 4.92898 3.46447 3.46447C4.92898 2 7.28599 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92898 22 7.28599 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28599 22 4.92898 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" fill="currentColor"></path><path d="M9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"></path><path d="M9 14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14Z" fill="currentColor"></path></svg>`,
                                children: [] // Ensure children array exists if menu rendering expects it
                            });
                        }
                    }
                }
                // --- End temporary modification ---
                setMenuData(data);
            } catch (err: any) {
                setError(err.message);
                MySwal.fire({
                    title: 'Error fetching menu items',
                    text: err.message,
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading menu items</div>;

    return (
        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
            {renderMenu(menuData)}
        </ul>
    );
};

export default ItemList;
