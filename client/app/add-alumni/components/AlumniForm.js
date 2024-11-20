'use client';
import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Select as ChakraSelect,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
    Tooltip,
} from '@chakra-ui/react';
import Select from 'react-select';
import Papa from 'papaparse';

import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "../../../utils/file-button";
import { FolderAddIcon, FolderIcon, UploadIcon } from '@heroicons/react/outline';
import { FolderDownloadIcon } from '@heroicons/react/solid';
import { AddIcon } from '@chakra-ui/icons';

const skillsList = [
    "Python", "JavaScript", "C++", "SQL", "React", "Node.js", "HTML", "CSS", "Docker", "Kubernetes",
    "Machine Learning", "Data Analysis", "Blockchain", "Solidity", "TensorFlow", "AWS", "Azure",
    "Google Cloud", "PostgreSQL", "MongoDB", "MySQL", "Git", "Agile Methodologies", "Figma",
    "Photoshop", "Illustrator", "SEO", "Business Intelligence", "Risk Management", "Excel",
    "Power BI", "Tableau", "Salesforce", "Finance", "Accounting", "Marketing", "Content Writing",
    "Project Management", "Leadership", "Public Speaking", "Data Visualization", "Data Mining"
];

const workTitles = [
    "Web Developer", "Software Engineer", "Data Scientist", "Project Manager", "Product Manager",
    "Business Analyst", "System Administrator", "Machine Learning Engineer", "UX/UI Designer",
    "DevOps Engineer", "Full Stack Developer", "Technical Support Engineer", "Blockchain Developer",
    "Quality Assurance Engineer", "Mobile App Developer", "Network Engineer", "Database Administrator",
    "IT Consultant", "Security Analyst", "Cloud Architect", "Data Analyst", "Embedded Systems Engineer",
    "Hardware Engineer", "Game Developer", "Financial Analyst", "Marketing Manager", "Operations Manager"
];

const AlumniForm = () => {
    const [alumni, setAlumni] = useState({
        name: "",
        linkedin_url: "",
        work_titles: [],
        current_education: "",
        education: "",
        skills: [],
    });
    const [csvData, setCsvData] = useState({
        headers: [],
        rows: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAlumni({ ...alumni, [name]: value });
    };

    const handleSelectChange = (name, selectedOptions) => {
        setAlumni({ ...alumni, [name]: selectedOptions || [] });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        Papa.parse(file, {
            header: true, // Automatically use first row as headers
            complete: (results) => {
                console.log("Parsed CSV:", results);

                // Set headers and rows
                setCsvData({
                    headers: results.meta.fields,
                    rows: results.data
                });

                setIsModalOpen(true);
            },
            error: (error) => {
                console.error("CSV Parsing Error:", error);
                alert("Error parsing CSV file");
            }
        });
    };

    const confirmUpload = () => {
        console.log("CSV Data Confirmed:", csvData.rows);
        const alumniObj = csvData.rows


        // Mursaleen api here

        setIsModalOpen(false);
        alert("Data Uploaded Successfully!");
    };

    const formatArrayToString = (arr) => {
        return arr.map((item) => item.value).join(', ');
    };

    const submitForm = () => {
        const alumniObj = [{
            ...alumni,
            skills: formatArrayToString(alumni.skills),
            work_titles: formatArrayToString(alumni.work_titles)
        }];


        // Mursaleen api here

        console.log("Alumni Data:", alumniObj);
        alert("Alumni added successfully!");
    };

    return (
        <Box className="p-4 mx-auto">
            <div className='flex justify-between'>

                <h1 className="text-2xl font-bold mb-4">Add Alumni</h1>
                <Box className="">
                    <Button
                        colorScheme="teal"
                        leftIcon={<AddIcon />}
                        onClick={() => {
                            const fileInput = document.createElement('input');
                            fileInput.type = 'file';
                            fileInput.accept = '.csv';
                            fileInput.onchange = handleFileUpload;
                            fileInput.click();
                        }}
                    >
                        Bulk Add
                    </Button>
                </Box>
            </div>
            <Input
                name="name"
                placeholder="Name"
                value={alumni.name}
                onChange={handleInputChange}
                className="mb-4"
            />
            <Input
                name="linkedin_url"
                placeholder="LinkedIn URL"
                value={alumni.linkedin_url}
                onChange={handleInputChange}
                className="mb-4"
            />
            <Select
                isMulti
                options={workTitles.map((title) => ({ value: title, label: title }))}
                placeholder="Select Work Titles"
                onChange={(selectedOptions) => handleSelectChange("work_titles", selectedOptions)}
                className="mb-4"
            />
            <ChakraSelect
                name="current_education"
                placeholder="Select Current Education"
                value={alumni.current_education}
                onChange={(e) =>
                    setAlumni({ ...alumni, current_education: e.target.value })
                }
                className="mb-4"
            >
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
            </ChakraSelect>
            <Input
                name="education"
                placeholder="Education Details"
                value={alumni.education}
                onChange={handleInputChange}
                className="mb-4"
            />
            <Select
                isMulti
                options={skillsList.map((skill) => ({ value: skill, label: skill }))}
                placeholder="Select Skills"
                onChange={(selectedOptions) => handleSelectChange("skills", selectedOptions)}
                className="mb-4"
            />
            <Button colorScheme="teal" onClick={submitForm}>
                Submit
            </Button>
            {/* <Box className="mt-6">
                <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="mb-4"
                />
            </Box> */}

            <Modal
                isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Preview Uploaded Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th key="Index">Index</Th>
                                    {csvData.headers.map((header) => (
                                        <Th key={header}>{header}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {csvData.rows.map((row, index) => (
                                    <Tr key={index}>
                                        <Td key={index}>
                                            {index + 1}
                                        </Td>
                                        {csvData.headers.map((header) => (
                                            <Td>
                                                <Tooltip label={row[header]} placement="top">
                                                    {row[header]?.slice(0, 15)}
                                                </Tooltip>
                                            </Td>
                                            // <Td key={header}>{row[header]}</Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={confirmUpload}>
                            Confirm
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AlumniForm;