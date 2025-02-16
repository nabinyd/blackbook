const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;
const BASE_API_URL= `${BASE_URL}/api/v1`;
const GOOGLE_LOGIN = `${BASE_URL}/auth/google`;
const GOOGLE_LOGOUT = `${BASE_URL}/auth/logout`;
const GOOGLE_CALLBACK = `${BASE_URL}/auth/google/callback`;
const VERFY_SESSION = `${BASE_URL}/auth/verify-session`;

export {BASE_URL, BASE_API_URL, GOOGLE_LOGIN, GOOGLE_LOGOUT, GOOGLE_CALLBACK , VERFY_SESSION};