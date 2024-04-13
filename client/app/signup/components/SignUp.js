"use client";
import { useRouter } from 'next/navigation'
import React from 'react'

const SignUp = () => {
    const router = useRouter()
    const onSignIn = () => {
        router.push('/signup/collegedetails')
    }

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <img
                            className="h-12 w-auto"
                            src="/assets/logo.png"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        {/* <p className="mt-2 text-sm text-gray-600">
                            Or{' '}
                            <a href="#" className="font-medium text-[#0054D0] hover:text-[#0054D0]">
                                start your 14-day free trial
                            </a>
                        </p> */}
                    </div>

                    <div className="mt-8">
                        <div>
                            <div>
                                <p className="text-lg font-medium text-gray-700">Sign in with</p>

                                <div className="mt-1 ">
                                    <div>
                                        <a
                                            href="#"
                                            className="w-full inline-flex justify-center py-4 px-6 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Sign in with LinkedIn</span>
                                            <img className=" h-5" src='/assets/linkedin.png' />

                                        </a>
                                    </div>


                                </div>
                            </div>

                            <div className="mt-6 relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <form action="#" method="POST" className="space-y-6">
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
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0054D0] focus:border-[#0054D0] sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0054D0] focus:border-[#0054D0] sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-[#0054D0] focus:ring-[#0054D0] border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-[#0054D0] hover:text-[#0054D0]">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0054D0] hover:bg-[#0054D0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0054D0]"
                                        onClick={onSignIn}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/assets/alumni-signup.jpg"
                    alt=""
                />
            </div>
        </div>
    )
}

export default SignUp