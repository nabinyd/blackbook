'use client';
import { Routes } from "@/config/Routes";
import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Implement password reset functionality here, such as calling an API
        setTimeout(() => {
            setLoading(false);
            alert("Password reset link has been sent to your email.");
        }, 2000);
    };

    return (
        <div className='sm:w-9/12 mx-auto sm:flex sm:items-center sm:justify-center p-5'>
            <div className='border flex flex-col justify-center sm:items-center p-6 bg-gray-800 rounded-md border-gray-700 mt-9 shadow-lg'>
                <form onSubmit={handleResetPassword} className='sm:w-80 flex flex-col justify-center'>
                    <div className='text-center mb-4'>
                        <h1 className='text-3xl font-semibold text-white'>Reset Password</h1>
                        <p className='text-center text-sm text-gray-400'>Enter your email address to receive a reset link</p>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-400'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className='w-full px-3 py-2 mt-1 text-sm focus:outline-none focus:border-gray-300 bg-dark-jet rounded-md border-[0.5px] border-gray-700'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-md px-3 py-2 focus:outline-none'
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                    <div className='mt-5 text-center'>
                        <p className='text-sm text-gray-500'>
                            Remember your password? <Link href={Routes.LOGIN} className='text-blue-300'>Log in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
