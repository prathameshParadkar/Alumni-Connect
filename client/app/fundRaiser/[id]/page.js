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
    const [alumniName, setAlumniName] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [donations, setDonations] = useState([]);

    // get params from the url
    const { id } = useParams();
    console.log(id.toString());
    useEffect(() => {
        axios.get(`http://localhost:5000/api/fundraiser/${id}`)
            .then((res) => {
                console.log(res.data.data);
                setFundraiser(res.data.data);
                setDonations(res.data.data.donations.sort((a, b) => new Date(b.date) - new Date(a.date)));

                axios.post(`http://localhost:5000/api/alumniById`, { id: res.data.data.createdBy })
                    .then((res) => {
                        console.log(res.data);
                        setAlumniName(res.data.name);
                    }
                    )
                    .catch((err) => {
                        console.log(err);
                    })

                axios.post('http://localhost:5000/api/collegeById', { id: res.data.data.collegeId })
                    .then((res) => {
                        console.log(res.data);
                        setCollegeName(res.data.name);
                    }
                    )
                    .catch((err) => {
                        console.log(err);
                    }
                    )
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
            <DonationDetails donations={donations} fundraiser={fundraiser} alumniName={alumniName} collegeName={collegeName} />
            {/* )} */}
        </div>
    )
}

export default page;
