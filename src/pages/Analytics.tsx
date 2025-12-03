import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';

const Analytics = () => {
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
    }, [dispatch]);

    return (
        <div>
            <div className="pt-5">
                {/* Dashboard content removed */}
            </div>
        </div>
    );
};
export default Analytics;
