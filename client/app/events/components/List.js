"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/outline";

const List = () => {
  const url = "http://localhost:5000";
  const [events, setEvents] = useState([]);
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    fetch(`${url}/api/event-list`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        //fetchUserNames(data);
      })
      .catch((error) => console.error("Error fetching job listings:", error));
  }, []);
  console.log(events);
  const fetchUserNames = async (positions) => {
    try {
      const names = await Promise.all(
        positions.map((position) => fetchUserName(position.postedBy))
      );
      setUserNames(names);
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  };

  const fetchUserName = async (id) => {
    try {
      const response = await fetch(`${url}/api/studentById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const userData = await response.json();
      return userData.name;
    } catch (error) {
      console.error(`Error fetching user name for ID ${id}:`, error);
      return "Unavailable";
    }
  };
  // useEffect(() => {
  //     if (positions.length > 0 && userNames.length > 0) {
  //         const updatedPositions = positions.map((position, index) => ({
  //             ...position,
  //             userName: userNames[index] // Append user name to position
  //         }));
  //         setPositions(updatedPositions);
  //     }
  // }, []);

  //console.log(positions);
  {
    /*const positions = [
        {
            id: 1,
            title: 'Back End Developer',
            type: 'Full-time',
            location: 'Remote',
            department: 'Engineering',
            closeDate: '2020-01-07',
            closeDateFull: 'January 7, 2020',
        },
        {
            id: 2,
            title: 'Front End Developer',
            type: 'Full-time',
            location: 'Remote',
            department: 'Engineering',
            closeDate: '2020-01-07',
            closeDateFull: 'January 7, 2020',
        },
        {
            id: 3,
            title: 'User Interface Designer',
            type: 'Full-time',
            location: 'Remote',
            department: 'Design',
            closeDate: '2020-01-14',
            closeDateFull: 'January 14, 2020',
        },
    ]*/
  }
  return (
    <>
      <form className="w-full">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Software Developer"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {events.map((event) => (
            <li key={event.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {event.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <a href={`https://calendar.google.com/calendar/u/0/r/eventedit?text=${event.title}&details=${event.description}&dates=${event.date}&location=${event.location}&trp=false`} target="_blank" rel="noopener noreferrer" className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Add to Calendar
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      Description: {event.description}
                    </p>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {event.organize}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <LocationMarkerIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {event.location}
                      </p>
                      {/* <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                {position.userName}
                                            </p> */}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 relative">
                      <CalendarIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>
                        <time>{new Date(event.date).toLocaleDateString()}</time>
                      </p>
                  </div>
                    </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default List;
