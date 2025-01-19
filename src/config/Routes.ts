export const Routes = {
    NOT_FOUND: '/404',
    // Auth Routes
    LOGIN: '/auth/login',
    SIGNUP: '/auth/sign-up',
    LOGOUT: '/',
    DASHBOARD: '/user/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',

    // General Routes
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    RESET_PASSWORD: '/auth/reset-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_EMAIL: '/auth/verify-email',
    VERIFY_PHONE: '/auth/verify-phone',
    AUTH_SUCCESS: '/auth/success',

    // Project Routes
    PROJECT: '/project',
    PROJECT_DESCRIPTION: (id: string) => `/project/${id}`,
    PROJECT_CREATE: '/project/create',

}