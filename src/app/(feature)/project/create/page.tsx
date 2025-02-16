"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/lib/store';
import { getDatastore } from '@/lib/features/datastore.slice';
import { useToast } from '@/hooks/use-toast';
import CreateProject from './_component/CreateProject';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Routes } from '@/config/Routes';

const ProjectPage = () => {
    const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    const { loading: datastoreLoading } = useSelector((state: RootState) => state.datastoreReducer);
    const router = useRouter();
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();

    // Fetch datastore when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getDatastore());
        }
    }, [isAuthenticated, dispatch]);

    // Handle authentication check
    useEffect(() => {
        if (!isAuthenticated && !loading) {
            toast({
                title: 'Unauthorized',
                description: 'You need to login to access this page',
                variant: 'destructive',
            });
            router.push(Routes.LOGIN);
        }
    }, [isAuthenticated, loading, router, toast]);

    // Loading state
    if (loading || datastoreLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <Skeleton className="h-24 w-full mb-6" />
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        );
    }

    // Not authenticated state
    if (!isAuthenticated) {
        return null; // Router will handle redirect
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <Card className="rounded-none border-x-0">
                <CardContent className="max-w-7xl mx-auto py-8">
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Welcome back, {user?.username}!
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                            Ready to showcase your project?
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Optional Info Alert */}
                    <Alert>
                        <AlertDescription>
                            Create and showcase your projects here. Fill in the details below to get started.
                        </AlertDescription>
                    </Alert>

                    {/* Project Creation Form */}
                    <CreateProject />
                </div>
            </main>
        </div>
    );
};

export default ProjectPage;