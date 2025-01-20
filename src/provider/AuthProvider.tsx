'use client'
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '@/config/Routes';
import { RootState, AppDispatch } from '@/lib/store';
import { verifyAuth } from '@/lib/features/auth.slice';
import Loading from '@/app/Loading';

const privateRoutes = [Routes.DASHBOARD, Routes.PROJECT_CREATE, Routes.PROFILE];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(verifyAuth());
    }, [dispatch]);

    useEffect(() => {
        if (isInitialized) {
            const isPrivateRoute = privateRoutes.includes(pathname);

            if (isPrivateRoute) {
                
                if (!isAuthenticated) {
                    router.push(Routes.PROJECT); 
                }
            } else {
                if (isAuthenticated) {
                    router.push(Routes.DASHBOARD);
                }
            }
        }
    }, [isAuthenticated, isInitialized, router, pathname]);

    if (!isInitialized) {
        return <Loading />;
    }

    return <>{children}</>;
}