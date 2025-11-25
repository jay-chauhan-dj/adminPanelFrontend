import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { getRequest } from '../utils/Request';
import { componentMap } from './routes';
import { hasAccess } from '../utils/AccessControl';

// Static imports for authentication components
import LoginCover from '../pages/Authentication/LoginCover';
import PrivateRoute from '../components/Layouts/PrivateRoute';
import Error404 from '../pages/Pages/Error404';

// Static component map with lazy loading
const fetchRoutes = async () => {
    let response = await getRequest('/v1/routes'); // Adjust the endpoint according to your API
    return response;
};

const DynamicRoute = () => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutesData = async () => {
            const fetchedRoutes = await fetchRoutes();
            setRoutes(fetchedRoutes);
        };

        fetchRoutesData();
    }, []);

    if (routes.length === 0) {
        return null; // or a loading indicator
    }

    const finalRoutes = routes.map((route) => {
            let Component = componentMap[route.componentLocation];

            if (!Component) {
                return null; // Handle case where component is not found in the map
            }

            const routeElement = (
                <PrivateRoute requiredAccess={route.requiredAccess}>
                    {route.layout === 'blank' ?
                        <BlankLayout><Component /></BlankLayout> :
                        <DefaultLayout><Component /></DefaultLayout>
                    }
                </PrivateRoute>
            );

            return {
                path: route.path,
                element: routeElement
            };
        }).filter(route => route !== null);

    console.log('Total routes loaded:', finalRoutes.length);

    const router = createBrowserRouter([
        {
            path: '/auth/login',
            element: <LoginCover />
        },
        ...finalRoutes,
        {
            path: '/*',
            element: <Error404 />
        }
    ]);

    return <RouterProvider router={router} />;
};

export default DynamicRoute;
