'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { CalendarIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid'
import { UserIcon } from '@heroicons/react/outline';
import API, { getAllfundraisers } from '../../../api/index';
import axios from 'axios';

const url = 'http://localhost:5000';
const List = () => {
    const [fundraisers, setFundraisers] = useState([]);
    const [alumniNames, setAlumniNames] = useState([]);

    useEffect(() => {
        console.log("asd")
        fetch(`${url}/api/fundraiser`)
            .then(response => response.json())
            .then(data => {
                
                setFundraisers(data.data);
                fetchAlumniNames(data.data);
            })
            .catch(error => console.error('Error fetching fundraisers:', error));
    }, []);

    const fetchAlumniNames = async (fundraisers) => {
        try {
            const names = await Promise.all(
                fundraisers.map(fundraiser => fetchAlumniName(fundraiser.createdBy))
            );
            setAlumniNames(names);
        } catch (error) {
            console.error('Error fetching alumni names:', error);
        }
    };

    const fetchAlumniName = async (id) => {
        try {
            const response = await fetch(`${url}/api/alumniById`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            const alumniData = await response.json();
            return alumniData.name;
        } catch (error) {
            console.error(`Error fetching alumni name for ID ${id}:`, error);
            return 'Unavailable';
        }
    };
    useEffect(() => {
        if (fundraisers.length > 0 && alumniNames.length > 0) {
            const updatedFundraisers = fundraisers.map((fundraiser, index) => ({
                ...fundraiser,
                alumniName: alumniNames[index] || 'Unknown'
            }));
            setFundraisers(updatedFundraisers);
        }
    }, [alumniNames]);
    console.log(fundraisers)
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
                    {fundraisers.map((fundraiser) => {
                        // let createdBy = getCreatedBy(fundraiser.createdBy);
                        // console.log(createdBy)
                        const date = new Date(fundraiser.deadline).toLocaleDateString();
                        return (
                        <li key={fundraiser._id}>
                            <a href="#" className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-indigo-600 truncate">{fundraiser.title}</p>
                                        <div className="flex-shrink-0 flex">
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {fundraiser.type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            
                                            <p className="mt-2 flex  text-sm text-gray-500 sm:mt-0 ">
                                                <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Created By {fundraiser.alumniName}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <p>
                                                Closing on <time>{date}</time>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
 )} )}
                </ul>
            </div>
        </>
    )
}

export default List