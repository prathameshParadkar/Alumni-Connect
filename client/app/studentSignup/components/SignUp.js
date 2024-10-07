"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";

const SignUp = () => {
  const url = "http://localhost:5000";
  const router = useRouter();
  const [colleges, setColleges] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [userType, setUserType] = useState("");
  const [skill, setSkill] = useState("");
  const [interests, setInterests] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${url}/api/colleges`);
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

    if (userType === "") {
      console.error("Please select a user type");
      return;
    }

    const formData = {
      name: name,
      email: email,
      password: password,
      linkedin_url: linkedin,
      collegeName: collegeName,
    };
    let registerUrl;
    if (userType === "student") {
      registerUrl = `${url}/api/auth/register/student`;
    } else if (userType === "alumni") {
      registerUrl = `${url}/api/auth/register/alumni`;
    }

    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        // Registration successful, handle redirection or display success message
        alert("Registration successful");
        router.push("/studentSignup/collegedetails");
      } else {
        alert("Registration failed");
        console.error("Registration failed");
      }
    } catch (error) {
      alert("Registration error");
      console.error("Registration error:", error.message);
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
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign Up
            </h2>
            {/* <p className="mt-2 text-sm text-gray-600">
                            Or{' '}
                            <a href="#" className="font-medium text-[#0054D0] hover:text-[#0054D0]">
                                start your 14-day free trial
                            </a>
                        </p> */}
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0054D0] focus:border-[#0054D0] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0054D0] focus:border-[#0054D0] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div space-y-1>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0054D0] focus:border-[#0054D0] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="userType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select User Type
                    </label>
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
                
                <div>
                    <label
                      htmlFor="linkedin-url"
                      className="block text-sm font-medium text-gray-700"
                    >
                      LinkedIn Profile URL
                    </label>
                    <div className="mt-1">
                      <input
                        id="linkedin-url"
                        name="linkedin-url"
                        type="linkedin-url"
                        autoComplete="linkedin-url"
                        value={linkedin}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0054D0] focus:border-[#0054D0] sm:text-sm"
                      />
                    </div>
                  </div>
                <div className="space-y-1">
                  <label
                    htmlFor="college"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Your College
                  </label>
                  <div className="mt-1">
                    <select
                      id="college"
                      name="college"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    >
                      <option value="" className="px-3 py-2">
                        Select a college
                      </option>
                      {colleges.map((college) => (
                        <option key={college._id} value={college.name}>
                          {college.name}
                        </option>
                      ))}
                    </select>
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
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-[#0054D0] hover:text-[#0054D0]"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0054D0] hover:bg-[#0054D0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0054D0]"
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
  );
};

export default SignUp;
