import { appRoutes } from './app.routes';
import { authRoutes } from './auth.routes';

export const routes = [...appRoutes, ...authRoutes]