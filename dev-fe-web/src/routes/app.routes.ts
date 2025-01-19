import Dashboard from '@/pages/Dashboard/Dashboard';
import NotFound from '@/pages/Error/Notfound';

export const appRoutes = [
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '*',
    Component: NotFound,
  },
];
