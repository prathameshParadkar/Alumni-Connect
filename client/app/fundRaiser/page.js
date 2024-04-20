'use client';
import React from 'react'
import List from './components/List'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
    //console.log(user);
    useEffect(() => {
        const isTokenSetInCookie = () => {
            const cookies = document.cookie.split("; ");
            const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
            return tokenCookie !== undefined;
        };
        if (!isTokenSetInCookie()) {
            router.push("/signup");
        }
    }, []);
    const handleAddJobClick = () => {
        router.push('/fundRaiser/fundraiserPosting'); // Navigate to the specified page
    };
    return (
        <div className='space-y-5'>
            <div className="max-w-7xl mx-auto ">
                <h1 className="text-2xl font-semibold text-gray-900">Search for Jobs</h1>
            </div>



            <List />
            {/* {user && user.userType === 'alumni' && ( */}
              <button type="submit" onClick={handleAddJobClick} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add New Fundraiser
              </button>
            {/* )} */}
        </div>
    )
}

export default page;

//             title,
//             description,
//             targetAmount,
//             deadline,
//             collegeId,
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//             createdBy: req.user.id