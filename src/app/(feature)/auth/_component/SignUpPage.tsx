'use client';
import { Routes } from "@/config/Routes";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { handleGoogleLogin } from "@/lib/features/auth.slice";

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        setLoading(true);
        // Implement sign-up functionality here, such as calling an API
        setTimeout(() => {
            setLoading(false);
            alert("Sign up successful!");
        }, 2000);
    };

    const handleGoogleSignUp = () => {
        setLoading(true);
        // Implement Google sign-up functionality here, such as calling an API
        setTimeout(() => {
            setLoading(false);
            alert("Sign up successful!");
        }, 2000);
    };

    
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = useCallback(() => {
        dispatch(handleGoogleLogin());
    }, [dispatch]);


    return (
        <div className='sm:w-9/12 mx-auto sm:flex sm:items-center sm:justify-center p-5'>
            <div className='border flex flex-col justify-center sm:items-center p-6 bg-gray-800 rounded-md border-gray-700 mt-9 shadow-lg'>
                <form onSubmit={handleSignUp} className='sm:w-80 flex flex-col justify-center'>
                    <div className='text-center mb-4'>
                        <h1 className='text-3xl font-semibold text-white'>Create an Account</h1>
                        <p className='text-center text-sm text-gray-400'>Fill in your details to create an account</p>
                    </div>
                    {/* <div className='mb-4'>
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
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-400'>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            className='w-full px-3 py-2 mt-1 text-sm focus:outline-none focus:border-gray-300 bg-dark-jet rounded-md border-[0.5px] border-gray-700'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className='flex justify-end mt-1'>
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='text-xs font-extralight text-gray-200 focus:outline-none'>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-400'>Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='confirmPassword'
                            className='w-full px-3 py-2 mt-1 text-sm focus:outline-none focus:border-gray-300 bg-dark-jet rounded-md border-[0.5px] border-gray-700'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-md px-3 py-2 focus:outline-none'
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                    <div className='mt-5 text-center'>
                        <p className='text-sm text-gray-500'>
                            Already have an account? <Link href={Routes.LOGIN} className='text-blue-300'>Log in</Link>
                        </p>
                    </div> */}
                </form>
                {/* Google Sign-Up Button */}
                <div className="mt-4">
                    <button
                        onClick={handleGoogleSignUp}
                        className='w-full bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-md px-3 py-2 focus:outline-none'
                    >
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
