'use client';
import { useCallback } from "react";
import { Routes } from "@/config/Routes";
import Link from "next/link";
import { useState } from "react";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { handleGoogleLogin } from "@/lib/features/auth.slice";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = useCallback(() => {
        dispatch(handleGoogleLogin());
    }, [dispatch]);






    return (

        <div className='sm:w-9/12 mx-auto sm:flex sm:items-center sm:justify-center p-5'>
            <div className='border flex flex-col justify-center sm:items-center p-6 bg-gray-800 rounded-md border-gray-700 mt-9 shadow-lg'>
                <form className='sm:w-80 flex flex-col justify-center'>
                    <div className='text-center mb-4'>
                        <h1 className='text-3xl font-semibold text-white'>Welcome back!</h1>
                        <p className='text-center text-sm text-gray-400'>Log in to your account</p>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-400'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className='w-full px-3 py-2 mt-1 text-sm focus:outline-none focus:border-gray-300 bg-dark-jet rounded-md border-[0.5px] border-gray-700'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-400'>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            className='w-full px-3 py-2 mt-1 text-sm focus:outline-none focus:border-gray-300 bg-dark-jet rounded-md border-[0.5px] border-gray-700'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Show/Hide Password */}
                        <div className='flex justify-end mt-1'>
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='text-xs font-extralight text-gray-200 focus:outline-none'
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-md px-3 py-2 focus:outline-none'
                    >
                        Log in
                    </button>
                    <div className='text-center'>
                        <p className='text-sm m-3'>or</p>
                        <Button
                            className='w-full bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-md px-3 py-2 focus:outline-none'
                            // onClick={() => handlegoogleLogin()}
                            onClick={() => handleLogin()}
                        >
                            Sign in with Google
                        </Button>
                    </div>
                    <div className='mt-5 text-center'>
                        <div className='text-center'>
                            <Link href={Routes.RESET_PASSWORD} className='text-sm text-blue-300'>Reset password</Link>
                        </div>
                        <p className='text-sm text-gray-500'>
                            Don&apost have an account? <Link href={Routes.SIGNUP} className='text-blue-300'>Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
