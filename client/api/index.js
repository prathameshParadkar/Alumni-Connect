import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/",

    // withCredentials: true,
});

// collegeData should be an object with the following properties:
// {
//      "name":"SPIT",
//      "location":"Andheri",
//      "website":"spit.ac.in",
//      "description":"Engineering College"
// }
export const registerCollege = (collegeData) => API.post("/college/register", collegeData);

export const getAllfundraisers = () => API.get("/fundraiser");

export const getfundraisersById = () => API.get("/fundraiser/:id");

export const createfundraiser = (fundraiserData) => API.post("/fundraiser/", fundraiserData);