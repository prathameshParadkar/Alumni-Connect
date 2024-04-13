import React from 'react'

const Tile = () => {
    return (
        <>
            {/* <!-- component --> */}
            <div className="flex flex-col w-full h-[700px] bg-white rounded shadow-lg ">
                <div className="w-full h-64 bg-top bg-cover rounded-t" style={{ backgroundImage: "url(https://media.licdn.com/dms/image/D4D22AQFBHTsHc71QlQ/feedshare-shrink_800/0/1704463090359?e=1712188800&v=beta&t=ik3dF3cynrJstzhd8AQgOdrl9zCIk_g_UeaA3gtSFhg)" }}></div>
                <div className="flex flex-col w-full md:flex-row">
                    <div className="flex flex-row justify-around p-4 font-bold leading-none text-white uppercase bg-[#685aff] rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                        <div className="md:text-3xl">Jan</div>
                        <div className="md:text-6xl">13</div>
                        <div className="md:text-xl">7 pm</div>
                    </div>
                    <div className="p-4 font-normal text-gray-800 md:w-3/4">
                        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">Internship Fair 2024</h1>
                        <p className="leading-normal">The Sardar Patel Institute of Technology - Training and Placement Cell, invites Companies and Startups for the keenly awaited Internship Fair held in collaboration with the esteemed Sardar Patel Technology Business Incubator (SPTBI) at our college Campus, Mumbai. </p>
                        <div className="flex flex-row items-center mt-4 text-gray-700">
                            <div className="w-1/2">
                                TPO SPIT
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View More</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tile