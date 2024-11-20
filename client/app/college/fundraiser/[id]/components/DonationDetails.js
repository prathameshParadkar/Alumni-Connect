'use client'
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { CopyIcon, CheckIcon, WarningIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import RightDrawer from "./RightDrawer";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const status = {
    warn: {
        icon: <WarningIcon className="h-5 w-5 text-white" aria-hidden="true" />,
        iconBackground: "bg-yellow-400",
    },
    success: {
        icon: <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />,
        iconBackground: "bg-green-400",
    },
    fail: {
        icon: <CloseIcon className="h-5 w-5 text-white" aria-hidden="true" />,
        iconBackground: "bg-red-400",
    },
};
const timeline = [
    {
        status: "Applied to",
        date: "Sep 20",
        status_type: "success",
    },
    {
        status: "Advanced to phone screening by",
        date: "Sep 22",
        status_type: "warn",
    },
    {
        status: "Completed phone screening with",
        date: "Sep 28",
        status_type: "fail",
    },
    {
        status: "Advanced to interview by",
        date: "Sep 30",
        status_type: "warn",
    },
];

const DonationDetails = ({ fundraiser, alumniName, collegeName, donations }) => {
    // const [data, setData] = useState([]);
    // const [donations, setDonations] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const [alumniName, setAlumniName] = useState("");
    const { id } = useParams();
    const router = useRouter();

    // const [collegeName, setCollegeName] = useState("");
    // const { complaint_id } = useParams();
    const toast = useToast();
    const approve = () => {
        console.log("Approving", id)
        axios.put(`http://localhost:5000/api/fundraiser/${id}/approve`)
            .then((res) => {
                console.log(res.data);
                toast({
                    title: "Approved",
                    description: "Fundraiser has been approved",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
            )
            .catch((err) => {
                console.log(err);
                toast({
                    title: "Error",
                    description: "Fundraiser could not be approved",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
            )
        router.push("/college-dashboard")
    };


    // console.log("Donations", donations)
    return (
        <Box p={8}>
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <Heading mb={4}>{fundraiser?.title}</Heading>
                    {/* <Heading mb={4}>-</Heading> */}
                    {/* <p>-</p> */}
                    {/* <Heading mb={4}>{"(" + ")"}</Heading> */}
                </div>

                <Button onClick={approve} colorScheme="green">
                    Approve
                </Button>
            </div>
            <Box className="flex flex-row-reverse">
                <div className="w-[70%] h-full">
                    <div className="flow-root max-h-screen overflow-y-scroll remove-scrollbar">

                    </div>
                </div>
                <div>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className=" border-gray-200 px-4 py-5 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-md font-medium text-[#0262AF]">
                                        Created By
                                    </dt>
                                    <dd className="mt-1 text-md text-gray-900">{alumniName}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-md font-medium text-[#0262AF]">
                                        College
                                    </dt>
                                    <dd className="mt-1 text-md text-gray-900">
                                        {collegeName}
                                    </dd>
                                </div>
                                {/* <div className="sm:col-span-1">
                                    <dt className="text-md font-medium text-[#0262AF]">
                                        Authority Name
                                    </dt>
                                    <dd className="mt-1 text-md text-gray-900">
                                        margotfoster@example.com
                                    </dd>
                                </div> */}

                                <div className="sm:col-span-2">
                                    <dt className="text-md font-medium text-[#0262AF]">
                                        Funraiser Description
                                    </dt>
                                    <dd className="mt-1 text-md text-gray-900">
                                        {fundraiser?.description}
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-md font-medium text-[#0262AF]">
                                        Fundraiser Progress
                                    </dt>
                                    <dd className="mt-1 text-md text-gray-900 flex space-x-5 items-center">
                                        <span>{`${(fundraiser.currentAmount / fundraiser.targetAmount) * 100}%`}</span>
                                        <div className="flex w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(fundraiser.currentAmount / fundraiser.targetAmount) * 100}%` }}> </div>
                                        </div>
                                        {/* <ul
                                            role="list"
                                            className="border border-gray-200 rounded-md divide-y divide-gray-200"
                                        >
                                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-md">
                                                <div className="w-0 flex-1 flex items-center">
                                                    <CopyIcon
                                                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="ml-2 flex-1 w-0 truncate">
                                                        resume_back_end_developer.pdf
                                                    </span>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a
                                                        href="#"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        View
                                                    </a>
                                                </div>
                                            </li>
                                        </ul> */}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <RightDrawer isOpen={isOpen} onClose={onClose} data={timeline} />
            </Box>
        </Box>
    );
};

export default DonationDetails;
