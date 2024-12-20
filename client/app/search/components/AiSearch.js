'use client'
import React, { useState, useEffect } from 'react';
import { Input, Button, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { CalendarIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid'
import { OfficeBuildingIcon, UserIcon } from '@heroicons/react/outline'
import { Avatar } from '@chakra-ui/react';
import jwt from 'jsonwebtoken';
const url = 'http://localhost:3000';


const AiSearch = () => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alumni, setAlumni] = useState([]);


    const handleSearch = async () => {
        setIsLoading(true);
        console.log('clicked')
        // Simulate sending request to backend
        try {
            const response = await axios.post(`${url}/api`, {
                flag: 0,
                search_input: prompt
            });
            setAlumni(response.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching alumni', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-5">
            {/* Input Section */}
            <div className="flex space-x-4 items-center mb-5">
                <Input

                    placeholder="Enter your search prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full "
                />
                <Button colorScheme="blue" onClick={handleSearch}>
                    Search
                </Button>
            </div>

            {/* Loading Spinner */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Spinner size="xl" />
                </div>
            ) : (
                <div>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {alumni.map((alumnus) => (
                                <li>
                                    <a href={alumnus.Linkedin} target="_blank" className="block hover:bg-gray-50">

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
                </div>
            )}
        </div>
    );
};

export default AiSearch;
