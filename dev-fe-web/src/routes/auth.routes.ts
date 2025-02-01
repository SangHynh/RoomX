import ForgotPassword from "@/pages/Auth/ForgotPassword"
import Login from "@/pages/Auth/Login"

export const authRoutes = [
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/forgot-password',
        Component: ForgotPassword
    }
]