"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const SignUp = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [colleges, setColleges] = useState([]);
    const [collegeId, setCollegeId] = useState("");
    const [userType, setUserType] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    console.log(userType, collegeId);
    useEffect(() => {
        const fetchColleges = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/colleges`);
            if (response.ok) {
              const data = await response.json();
              setColleges(data);
            } else {
              console.error("Failed to fetch colleges");
            }
          } catch (error) {
            console.error("Fetch colleges error:", error.message);
          }
        };
    
        fetchColleges();
      }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const formData = {
          email: email,
          password: password
        };
      
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials: "include"
          });
      
          if (response.ok) {
            // Registration successful, handle redirection or display success message
            console.log(response);
            router.push('/dashboard');
          } else {
            alert("Registration failed");
            console.error("Registration failed");
          }
        } catch (error) {
          alert("Registration error");
          console.error("Registration error:", error.message);
        }
      };
      useEffect(() => {

      function parseUserInfoFromCookie(cookieName) {
        let cookieString = decodeURIComponent(document.cookie);
        let cookiePairs = cookieString.split('; ');
        let userInfoRaw = cookiePairs.find(row => row.startsWith(`${cookieName}=`));
        
        if (userInfoRaw) {
          let userInfo = JSON.parse(userInfoRaw.split('=')[1]);
          return userInfo;
        }
        return null;
      }

      setUserInfo(parseUserInfoFromCookie('userInfo'));
    }, []);
      //console.log(userInfo);
      const M2 = async () => {
        try{

          console.log("From useEffect", userInfo, userType, collegeId);
          const obj = {
            ...userInfo,
            userType: 'alumni',
            collegeId: '661c16cefeac1836d06b10e1'
          }
          console.log(obj, "obj here")
          const response = await fetch("http://localhost:5000/api/auth/register/linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj),
        credentials: "include"
      });

      if (response.ok) {
        // Registration successful, handle redirection or display success message
        console.log(response);
        alert("Registration successful");
        router.push('/dashboard');
      } else {
        alert("Registration failed");
        console.error("Registration failed");
      }
      } catch (error) {
        console.error("Registration error:", error.message);
      }
      }

    
      useEffect(() => {
        if (userInfo) {
            // Handle user info from LinkedIn
            // Example: registerUser(userType, userData);
             M2();
            

            
        }
        }, [userInfo]);
      async function registerUser(userType, userData) {
        const url = `http://localhost:5000/api/auth/register/${userType}`;
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log('Registration successful:', data);
            // Redirect or further action
          } else {
            console.error('Registration failed');
          }
        } catch (error) {
          console.error('Error during registration:', error.message);
        }
      }
      
      // Example usage, assuming userType is 'student' or 'alumni' based on selection
      //registerUser(userType, userData);
      
        const handleLinkedInSignIn = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/linkedin', {
                    method: 'GET'
                });
        
                if (response.ok) {
                    console.log('LinkedIn sign-in successful');
                    // Handle any further actions if needed
                } else {
                    console.error('LinkedIn sign-in failed');
                }
            } catch (error) {
                console.error('Error signing in with LinkedIn:', error.message);
            }
        };

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
                                            href='http://localhost:5000/api/auth/linkedin'
                                            //onClick={handleLinkedInSignIn}
                                            className="w-full inline-flex justify-center py-4 px-6 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Sign in with LinkedIn</span>
                                            <img className=" h-5" src='/assets/linkedin.png' />

                                        </a>
                                    </div>

                                    <div className="space-y-1">
                  {/* <label
                    htmlFor="college"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Your College
                  </label> */}
                  <div className="mt-1">
                    <select
                      id="college"
                      name="college"
                      required
                      value={collegeId}
                      onChange={(e) => setCollegeId(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    >
                      <option value="" className="px-3 py-2">
                        Select a college
                      </option>
                      {colleges.map((college) => (
                        <option key={college._id} value={college._id}>
                          {college.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                  <div className="mt-1">
                    <select
                      id="userType"
                      name="userType"
                      required
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    >
                      <option value="" className="px-3 py-2">
                        Select a user type
                      </option>
                      <option value="student" className="px-3 py-2">
                        Student
                      </option>
                      <option value="alumni" className="px-3 py-2">
                        Alumni
                      </option>
                    </select>
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                    <div className="text-sm mb-1">
                                        <a href="/collegeSignup" className="font-medium text-[#0054D0] hover:text-[#0054D0]">
                                            Sign up for College
                                        </a>
                                    </div>
                                    <div className="text-sm mb-2">
                                        <a href="/studentSignup" className="font-medium text-[#0054D0] hover:text-[#0054D0]">
                                            Sign up for Student/Alumni
                                        </a>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0054D0] hover:bg-[#0054D0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0054D0]"
                                        onClick={handleSubmit}
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