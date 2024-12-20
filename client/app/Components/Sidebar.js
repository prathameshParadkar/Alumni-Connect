"use client";
import React, { useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    BellIcon,
    CalendarIcon,
    FolderIcon,
    HomeIcon,
    MenuAlt2Icon,
    UsersIcon,
    SearchIcon
} from "@heroicons/react/outline";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken"; // Use a library like jwt-decode to decode JWT tokens



const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
    const studentNavigation = [
        { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
        { name: "Jobs", href: "/jobs", icon: UsersIcon, current: false },
        { name: "Events", href: "/events", icon: CalendarIcon, current: false },
        { name: "Fund Raiser", href: "/fundRaiser", icon: FolderIcon, current: false },
        { name: "Alumni Search", href: "/search", icon: SearchIcon, current: false },
        // { name: "Documents", href: "#", icon: InboxIcon, current: false },
        // { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
    ];

    const collegeNavigation = [
        { name: "Dashboard", href: "/college-dashboard", icon: HomeIcon, current: false },
        // { name: "Jobs", href: "/jobs", icon: UsersIcon, current: false },
        // { name: "Events", href: "/events", icon: CalendarIcon, current: false },
        // { name: "Alumni Search", href: "/alumni-search", icon: FolderIcon, current: false },
    ]
    const url = "http://localhost:5000";
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [current, setCurrent] = useState(0);
    const pathname = usePathname();
    const [dataFetched, setDataFetched] = useState(false);
    const [navigation, setNavigation] = useState([]);

    React.useEffect(() => {
        console.log("user from sidebar", user)
        if (user && user.userType == "alumni" || user && user.userType == "student") {
            setNavigation(studentNavigation);
        }
        if (user && user.userType == "college") {
            setNavigation(collegeNavigation);
        }
    }, [user]);
    React.useEffect(() => {
        console.log("useEffect runed");
        if (pathname.includes("dashboard")) {
            setCurrent(0);
        } else if (pathname.includes("jobs")) {
            setCurrent(1);
        } else if (pathname.includes("events")) {
            setCurrent(2);
        } else if (pathname.includes("alumni-search")) {
            setCurrent(3);

        } else if (pathname.includes("fundRaiser")) {
            setCurrent(3);

        } else if (pathname.includes("search")) {
            setCurrent(4);
        }
    });
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
    //console.log(user);
    const fetchUserName = async () => {
        try {
            console.log("in")
            let apiEndpoint = '';
            if (user.userType === 'alumni') {
                apiEndpoint = 'http://localhost:5000/api/alumniById';
            } else if (user.userType === 'student') {
                apiEndpoint = 'http://localhost:5000/api/studentById';
            }

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: user.userId })
            });

            const userData = await response.json();
            console.log(userData)
            if (userData.name) {
                // Set the user's name in state or wherever you want to use it
                setUser({ ...user, name: userData.name });
            }
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    useEffect(() => {
        // Fetch user's name when the component mounts
        if (user && user.userId && user.userType && !dataFetched) {
            fetchUserName();
            setDataFetched(true);
        }
    }, [user, dataFetched]);
    //console.log(user)

    const handleSignOut = () => {
        // Delete the "token" cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

        // Redirect to "/signup"
        router.push('/signup');
    };

    return (
        <>

            <div >
                {/* <Transition.Root show={sidebarOpen} as={Fragment}> */}
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 md:hidden"
                    // onClose={setSidebarOpen}
                    onClose={() => console.log("close")}
                    open={false}
                >
                    {/* <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            > */}
                    <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    {/* </Transition.Child> */}
                    {/* <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            > */}
                    <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                        {/* <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    > */}
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            // onClick={() => setSidebarOpen(false)}
                            >
                                <span className="sr-only">View More</span>
                                {/* <
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            /> */}
                            </button>
                        </div>
                        {/* </Transition.Child> */}
                        <div className="flex-shrink-0 flex items-center px-4">
                            <img
                                className="h-10 w-auto"
                                src="/assets/logo-white.png"
                                alt="Workflow"
                            />
                        </div>
                        <div className="mt-5 flex-1 h-0 overflow-y-auto">
                            <nav className="px-2 space-y-1">
                                {navigation.map((item, index) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            index == current
                                                ? "bg-indigo-800 text-white"
                                                : "text-indigo-100 hover:bg-indigo-600",
                                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                        )}
                                    >
                                        <item.icon
                                            className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                    {/* </Transition.Child> */}
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
                {/* </Transition.Root> */}

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img
                                className="h-10 w-auto"
                                src="/assets/logo-white.png"
                                alt="Workflow"
                            />
                        </div>
                        <div className="mt-5 flex-1 flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                {navigation.map((item, index) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            index == current
                                                ? "bg-indigo-800 text-white"
                                                : "text-indigo-100 hover:bg-indigo-600",
                                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                        )}
                                    >
                                        <item.icon
                                            className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 px-4 flex justify-between">
                            <div className="flex-1 flex">
                                {/* <form className="w-full flex md:ml-0" action="#" method="GET">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search-field"
                                            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                            name="search"
                                        />
                                    </div>
                                </form> */}
                            </div>
                            {user && user.name && (

                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">Open user menu</span>
                                                <div class="relative flex w-10 h-10 overflow-hidden bg-gray-100 rounded-full white items-center justify-center border-2 border-gray-400">
                                                    <h3 className="text-xl text-gray-500 font-semibold">{user.name[0]}</h3>
                                                </div>
                                                {/*<img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />*/}
                                            </Menu.Button>
                                        </div>
                                        {/* <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        > */}
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            onClick={item.name === "Sign out" ? handleSignOut : null}
                                                            className={classNames(
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                        {/* </Transition> */}
                                    </Menu>
                                </div>
                            )}
                        </div>
                    </div>

                    <main className="bg-gray-100 min-h-[90vh]">
                        <div className="py-6">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
