"use client";
import React, { useEffect } from "react";
import Tile from "./components/Tile";
import { useRouter } from "next/navigation";
// import {useEffect} from "react";
import List from "./components/List";
const page = () => {
  const router = useRouter();
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
    router.push("/events/eventPosting"); // Navigate to the specified page
  };
  return (
    <div className="space-y-5">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-2xl font-semibold text-gray-900">
          Events
        </h1>
      </div>

      <List />
      {/* {user && user.userType === 'alumni' && ( */}
      <button
        type="submit"
        onClick={handleAddJobClick}
        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add New Event
      </button>
      {/* )} */}
    </div>
    // <>
    //     <div className='space-y-5'>
    //         <div className="max-w-7xl mx-auto mb-4">
    //             <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
    //         </div>
    //         <form className="w-full mb-5">
    //             <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    //             <div className="relative">
    //                 <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    //                     <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    //                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
    //                     </svg>
    //                 </div>
    //                 <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Software Developer" required />
    //                 <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    //             </div>
    //         </form>
    //         <div>
    //             <div className="grid grid-cols-3 gap-4">
    //                 <Tile title="Tile 1" content="Content of Tile 1" />
    //                 <Tile title="Tile 2" content="Content of Tile 2" />
    //                 <Tile title="Tile 3" content="Content of Tile 3" />
    //                 {/* Add more Tile components as needed */}
    //             </div>
    //         </div>
    //         <div className='flex justify-end'>
    //         <button type="submit" onClick={() => {router.push('events/eventPosting')}} className="text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Add New Event</button>
    //         </div>
    //     </div>

    // </>
  );
};

export default page;
