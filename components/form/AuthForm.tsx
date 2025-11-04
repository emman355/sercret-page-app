'use client'
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
const AuthForm = () => {
    // State to manage form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State to toggle between Login and Register views
    const [isLoginView, setIsLoginView] = useState(true);

    // State for loading and error messages
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- Placeholder Logic Functions ---

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Placeholder for actual authentication logic
        try {
            if (isLoginView) {
                alert('Attempting to Log In:');
                // await supabase.auth.signInWithPassword({ email, password });
                // NOTE: Replace this console log with your Supabase signInWithPassword call

            } else {
                alert('Attempting to Register:');
                // await supabase.auth.signUp({ email, password });
                // NOTE: Replace this console log with your Supabase signUp call
            }

            // Simulate success:
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Auth successful. Redirecting...');

            // In a real app, you would redirect the user here upon success

        } catch (err) {
            setError("Authentication failed. Please check your credentials.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthLogin = (provider: 'google' | 'github') => {
        alert(`Starting OAuth login with ${provider}...`);
        // NOTE: In Next.js with Supabase, you would call:
        // supabase.auth.signInWithOAuth({ provider: provider });
    };

    // --- Icons for OAuth Buttons (Lucide Icons alternative using SVG) ---

    return (
        <div className="w-full max-w-md bg-gray-100 rounded-xl p-8 space-y-6 shadow-lg shadow-gray-950">

            {/* Header */}
            <h2 className="text-3xl font-extrabold text-center text-gray-900">
                {isLoginView ? 'Login to Secret App' : 'Create an Account'}
            </h2>

            {/* Toggle Button */}
            <p className="text-center text-sm text-gray-600">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200 focus:outline-none"
                >
                    {isLoginView ? 'Register here' : 'Sign in'}
                </button>
            </p>

            {/* OAuth Buttons */}
            <div className="flex justify-center">
                <button
                    onClick={() => handleOAuthLogin('google')}
                    className="lg:max-w-9/12 flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white"
                    disabled={isLoading}
                >
                    <FcGoogle size={14} className='mr-2' />
                    {isLoginView ? 'Sign in with Google' : 'Register with Google'}
                </button>
            </div>

            {/* Separator */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            placeholder='Please enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-gray-700 appearance-none block w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder='Please enter your password'
                            autoComplete={isLoginView ? "current-password" : "new-password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-gray-700 placeholder-gray-400 block w-full px-3 py-2 border border-gray-400  rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm shadow-gray-400 text-sm font-medium text-white bg-indigo-800"
                    >
                        {isLoading
                            ? 'Processing...'
                            : isLoginView
                                ? 'Sign In'
                                : 'Register'}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default AuthForm;
