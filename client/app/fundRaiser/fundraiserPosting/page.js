import React from 'react'
import Details from './components/Details'

const page = () => {
    return (
        <Details />
    )
}

export default page
//             title,
//             description,
//             targetAmount,
//             deadline,
//             collegeId,
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//             createdBy: req.user.id