// const Layout = () => import('../views/layout');

const routes = [{
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: () => import('../views/login'),
    },
    {
        path: '/error',
        component: () => import('../views/error'),
        children: [{
                path: '401',
                component: () => import('../views/error/401'),
            },
            {
                path: '404',
                component: () => import('../views/error/404'),
            },
        ],
    },
    {
        path: '/*',
        redirect: '/error/404',
    },
];

export default routes;