'use client'
import { useParams } from 'next/navigation';
// import React from 'react'
import DonationDetails from './components/DonationDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getfundraisersById } from '@/api';
// import DonationDetails from '../components/DonationDetails';


const page = () => {
    const [fundraiser, setFundraiser] = useState({});

    // get params from the url
    const { id } = useParams();
    console.log(id.toString());
    useEffect(() => {
        axios.get(`http://localhost:5000/api/fundraiser/${id}`)
            .then((res) => {
                console.log(res.data.data);
                setFundraiser(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
        , [])
    console.log(fundraiser)
    return (
        <div className=''>
            {/* <div className="max-w-7xl mx-auto ">
                <h1 className="text-2xl font-semibold text-gray-900">Donation</h1>
            </div> */}
            {/*<List />*/}
            {/* {user && user.userType === 'alumni' && ( */}
            <DonationDetails fundraiser={fundraiser} />
            {/* )} */}
        </div>
    )
}

export default page;
