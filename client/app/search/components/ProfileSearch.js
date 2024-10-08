'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { CalendarIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid'
import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline'
import axios from 'axios';
import { Avatar } from '@chakra-ui/react';
import jwt from 'jsonwebtoken';


const ProfileSearch = () => {
    const url = 'http://localhost:5000';
    const [alumni, setAlumni] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getTokenFromCookie = () => {
            const cookies = document.cookie.split("; ");
            const cookie = cookies.find((c) => c.startsWith("token="));
            if (cookie) {
                const token = cookie.split("=")[1];
                return token;
            }
            return null;
        };

        const decodeToken = (token) => {
            if (token) {
                try {
                    const decoded = jwt.decode(token);
                    //console.log('Decoded token:', decoded);
                    setUser(decoded);
                } catch (error) {
                    console.error("Error decoding token:", error.message);
                }
            }
        };

        const token = getTokenFromCookie();
        decodeToken(token);
    }, []);
    console.log("From profile page", user);
    
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.userId) return; // Ensure user object and userId are defined
    
            try {
                let apiEndpoint = '';
                if (user.userType === 'alumni') {
                    apiEndpoint = 'http://localhost:5000/api/alumniDetById';
                } else if (user.userType === 'student') {
                    apiEndpoint = 'http://localhost:5000/api/studentDetById';
                }
    
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: user.userId }) // Ensure userId exists
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
    
                const userData = await response.json();
                console.log("user data", userData);
                const skillsString = userData.skills.join(', ');
                const workExpString = userData.work_experience.join(', ');
                const educationString = userData.education.join(', ');
    
                // Prepare POST request body
                const requestBody = {
                    flag: 1,
                    work_exp: workExpString,
                    education: educationString,
                    skills: skillsString
                };
    
                // Make POST request to the new API
                const postResponse = await fetch('http://localhost:3000/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
    
                if (!postResponse.ok) {
                    throw new Error('Failed to post user data');
                }
    
                const recommendation = await postResponse.json();
                console.log("Recommendation result", recommendation);
                setAlumni(recommendation);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [user]);
    


    return (
        <>
            <form className="w-full">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Software Developer" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {alumni.map((alumnus) => (
                        <li key={alumnus._id}>
                            <a href="https://www.linkedin.com/in/mursaleen-batatawala-717104259/" className="block hover:bg-gray-50">

                                <div className="px-4 py-4 sm:px-6 flex ">
                                    <div className='mr-4'>
                                        <Avatar size="md" name={alumnus.Name} src="https://bit.ly/broken-link" />
                                    </div>
                                    <div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-indigo-600 truncate">{alumnus.Name}</p>

                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    <OfficeBuildingIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    {alumnus.Education}
                                                </p>
                                                {/* <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    {position.location}
                                                </p> */}
                                                {/* <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    {alumnus.college}
                                                </p> */}
                                            </div>
                                            {/* <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <p>
                                                    Closing on <time>{position.closingDate}</time>
                                                </p>
                                            </div> */}
                                        </div>
                                    </div>

                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ProfileSearch