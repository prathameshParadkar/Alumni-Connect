"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import jwt from "jsonwebtoken"; // Use a library like jwt-decode to decode JWT tokens

const Details = () => {
  const url = "http://localhost:5000";
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [colleges, setColleges] = useState([]);
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
  console.log(user)
  const [fundDetails, setFundDetails] = useState({
    title: "",
    description: "",
    targetAmount: "",
    deadline: "",
    collegeId: "",
  });

  // Update job details state on input change
  const handleChange = (e) => {
    setFundDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const createId = user.userId;
    
    const fundData = {
      ...fundDetails,
      createdBy: createId
    };

    try {
      const response = await fetch(`${url}/api/fundraiser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fundData),
      });

      if (!response.ok) {
        alert("Failed to submit fundraiser");
      } else {
        alert("Fundraiser submitted successfully");
        // Navigate back to the home page or confirmation page after successful post
        router.push("/fundRaiser");
      }
    } catch (error) {
      console.error("Failed to submit fundraiser:", error);
    }
  };
  return (
    <div className="px-28 py-8">
      <div className="px-4 sm:px-0 mb-4">
        <h3 className="text-3xl font-bold leading-6 text-[#0054D0]">
          Fundraising Details
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          This information will be required to post a new job.
        </p>
      </div>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/*<div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Your details in college</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                    </div>*/}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          onChange={handleChange}
                          value={fundDetails.title}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-2 py-2 rounded-md sm:text-sm border-gray-300"
                          placeholder="For Scholarship"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="desc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <textarea
                          type="text"
                          name="description"
                          id="desc"
                          onChange={handleChange}
                          value={fundDetails.description}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-2 py-2 rounded-md sm:text-sm border-gray-300"
                          placeholder="Description for your fund raising"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="target-amount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Target Amount
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          name="targetAmount"
                          id="target-amount"
                          onChange={handleChange}
                          value={fundDetails.targetAmount}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-2 py-2 rounded-md sm:text-sm border-gray-300"
                          placeholder="000000"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="deadline"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Deadline
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="date"
                          name="deadline"
                          id="deadline"
                          onChange={handleChange}
                          value={fundDetails.deadline}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-2 py-2 rounded-md sm:text-sm border-gray-300"
                          placeholder="Full/Time"
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
                          name="collegeId"
                          required
                          value={fundDetails.collegeId}
                          onChange={handleChange}
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
                  {/*<div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Select your college
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option>Sardar Patel Institute of Technology</option>
                                            <option>DJ Sanghvi</option>
                                            <option>IIT Bombay</option>
                                        </select>
                </div>*/}

                  {/*<div>
                                        <label className="block text-sm font-medium text-gray-700">College ID</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>

                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>Upload a College ID</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                                            </div>
                                        </div>
                </div>*/}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
                  <button
                    // type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0054D0] hover:bg-[#0054D0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
//             title,
//             description,
//             targetAmount,
//             deadline,
//             collegeId,
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//             createdBy: req.user.id
