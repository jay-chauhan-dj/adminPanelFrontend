import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { getRequest } from '../utils/Request';
import { componentMap } from './routes';
import { hasAccess } from '../utils/AccessControl';

import LoginCover from '../pages/Authentication/LoginCover';
import PrivateRoute from '../components/Layouts/PrivateRoute';
import Error404 from '../pages/Pages/Error404';
import InvoiceUpload from '../pages/invoice/InvoiceUpload';
import InvoiceExport from '../pages/invoice/InvoiceExport'; 

// 🆕 Test upload page
import InvoiceTestUpload from '../pages/InvoiceTestUpload';

// Static component map with lazy loading
const fetchRoutes = async () => {
    let response = await getRequest('/v1/routes'); // Adjust the endpoint according to your API
    return response;
};

interface RouteConfig {
    path: string;
    componentLocation: string;
    requiredAccess?: string;
    layout?: string;
}

const DynamicRoute = () => {
    const [routes, setRoutes] = useState<RouteConfig[]>([]);

    useEffect(() => {
        const fetchRoutesData = async () => {
            try {
                const fetchedRoutes = await fetchRoutes();
                setRoutes(fetchedRoutes || []);
            } catch (e) {
                console.error('Error fetching routes:', e);
                setRoutes([]); // fail-safe
            }
        };

        fetchRoutesData();
    }, []);

    // ⚠️ Pehle yahan routes.length === 0 pe return null tha,
    // isko hata diya hai taaki /invoice-test hamesha kaam kare

    const finalRoutes = routes
        .map((route: RouteConfig) => {
            let Component = componentMap[route.componentLocation as keyof typeof componentMap];

            if (!Component) {
                return null; // Handle case where component is not found in the map
            }

            // access control agar use ho raha ho
            if (route.requiredAccess && !hasAccess(route.requiredAccess)) {
                return null;
            }

            const routeElement = (
                <PrivateRoute requiredAccess={route.requiredAccess}>
                    {route.layout === 'blank' ? (
                        <BlankLayout>
                            <Component />
                        </BlankLayout>
                    ) : (
                        <DefaultLayout>
                            <Component />
                        </DefaultLayout>
                    )}
                </PrivateRoute>
            );

            return {
                path: route.path,
                element: routeElement,
            };
        })
        .filter((route) => route !== null) as { path: string; element: JSX.Element }[];

    console.log('Total routes loaded:', finalRoutes.length);

    const router = createBrowserRouter([
        {
            path: '/auth/login',
            element: <LoginCover />,
        },

 // ✅ REAL ROUTES: Invoice Upload
    {
        path: '/invoice/upload',
        element: (
            <PrivateRoute>
                <DefaultLayout>
                    <InvoiceUpload />
                </DefaultLayout>
            </PrivateRoute>
        ),
    },

    // ✅ REAL ROUTES: Invoice Export
    {
        path: '/invoice/export',
        element: (
            <PrivateRoute>
                <DefaultLayout>
                    <InvoiceExport />
                </DefaultLayout>
            </PrivateRoute>
        ),
    },


        // dynamic routes jo backend se aa rahe
        ...finalRoutes,

        {
            path: '/*',
            element: <Error404 />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default DynamicRoute;
