import React from 'react'
import List from './List'

const Dashboard = () => {
    return (
        <div className='space-y-5'>
            <div className="max-w-7xl mx-auto ">
                <h1 className="text-2xl font-semibold text-gray-900">Search for Alumni</h1>
            </div>
            <List />
        </div>
    )
}

export default Dashboard