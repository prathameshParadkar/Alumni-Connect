'use client'
import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, Button, useDisclosure } from '@chakra-ui/react';
import ProfileSearch from './ProfileSearch';
import AiSearch from './AiSearch';

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchType, setSearchType] = useState(null); // 0 for Profile-based, 1 for AI search

    // Open the modal on page load
    useEffect(() => {
        onOpen();
    }, [onOpen]);

    const handleSearchType = (type) => {
        setSearchType(type);
        onClose(); // Close the modal after selection
    };

    return (
        <div>
            {/* Full-screen modal */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalBody className="flex items-center justify-center h-screen bg-gray-50">
                        <div className="flex flex-col md:flex-row justify-between space-x-5 w-full h-full p-4">
                            {/* Profile-based Search button */}
                            <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center space-y-4 bg-white shadow-lg rounded-lg">
                                <h2 className="text-3xl font-bold text-gray-800">Profile-based Search</h2>
                                <p className="text-gray-600 text-center">
                                    Search alumni profiles based on your skills, education, and work experience.
                                </p>
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    width="100%"
                                    onClick={() => handleSearchType(0)}
                                >
                                    Choose Profile-based Search
                                </Button>
                            </div>

                            {/* AI Search button with glow border effect */}

                            <div className="relative w-full md:w-1/2 p-4 flex flex-col items-center justify-center space-y-4  shadow-lg rounded-lg mt-4 md:mt-0">
                                <div className="animated-border-box-glow"></div>
                                <div className="animated-border-box p-4">
                                    <div className='flex-col w-full h-full items-center justify-center space-y-3'>

                                        <h2 className="text-3xl font-bold text-gray-800 z-10 text-center">AI-powered Search</h2>
                                        <p className="text-gray-600 text-center z-10">
                                            Use AI to find alumni that match your specific interests and skills by writing a prompt.
                                        </p>
                                        <Button
                                            colorScheme="blue"
                                            size="lg"
                                            width="100%"
                                            onClick={() => handleSearchType(1)}
                                            className="z-10"
                                        >
                                            Choose AI-powered Search
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Main content to show after selection */}
            {
                searchType !== null && (
                    <div className='space-y-5'>
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-2xl font-semibold text-gray-900">Search for Alumni</h1>
                        </div>
                        {
                            searchType === 0 ? <ProfileSearch /> : <AiSearch />
                        }
                    </div>
                )
            }
        </div >
    );
};

export default Search;
