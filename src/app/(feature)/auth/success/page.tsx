'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/features/auth.slice';
import { Routes } from '@/config/Routes';
import { BASE_URL } from '@/constant/constant';
import axios from 'axios';

export default function AuthSuccess() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/auth/verify`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const userData = await response.data;
                    console.log('User data:', userData);
                    dispatch(setUser(userData));
                    router.push(Routes.DASHBOARD);
                } else {
                    router.push(Routes.LOGIN);
                }
            } catch (error) {
                console.error('Auth verification failed:', error);

                router.push(Routes.LOGIN);
            }
        };

        if (router) {
            verifyAuth();
        }
    }, [dispatch, router]);


    return <div>Completing authentication...</div>;
}
