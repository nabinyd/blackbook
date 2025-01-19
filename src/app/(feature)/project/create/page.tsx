"use client";
import { RootState } from '@/lib/store';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Routes } from '@/config/Routes';
import CreateProject from './_component/CreateProject';

export default function Page() {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();


    useEffect(() => {
        if (!isAuthenticated) {
            router.push(Routes.LOGIN);
        }
    }, [isAuthenticated, router]);

    return (
        <div>
            <h1>Welcome, {user?.username}!</h1>
            <h1>Create new Project</h1>

            <CreateProject />
        </div>
    )
}
