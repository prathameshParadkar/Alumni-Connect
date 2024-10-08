'use client'
import React, { useState } from 'react';
import { Avatar, Button, Input, Tag, TagLabel, TagCloseButton, Box } from '@chakra-ui/react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

const skills_list = [
    "Python", "JavaScript", "C++", "SQL", "React", "Node.js", "HTML", "CSS", "Docker", "Kubernetes",
    "Machine Learning", "Data Analysis", "Blockchain", "Solidity", "TensorFlow", "AWS", "Azure",
    "Google Cloud", "PostgreSQL", "MongoDB", "MySQL", "Git", "Agile Methodologies", "Figma",
    "Photoshop", "Illustrator", "SEO", "Business Intelligence", "Risk Management", "Excel",
    "Power BI", "Tableau", "Salesforce", "Finance", "Accounting", "Marketing", "Content Writing",
    "Project Management", "Leadership", "Public Speaking", "Data Visualization", "Data Mining"
];

const work_titles = [
    "Web Developer", "Software Engineer", "Data Scientist", "Project Manager", "Product Manager",
    "Business Analyst", "System Administrator", "Machine Learning Engineer", "UX/UI Designer",
    "DevOps Engineer", "Full Stack Developer", "Technical Support Engineer", "Blockchain Developer",
    "Quality Assurance Engineer", "Mobile App Developer", "Network Engineer", "Database Administrator",
    "IT Consultant", "Security Analyst", "Cloud Architect", "Data Analyst", "Embedded Systems Engineer",
    "Hardware Engineer", "Game Developer", "Financial Analyst", "Marketing Manager", "Operations Manager"
];

const educationLevels = [
    { value: 'High School', label: 'High School' },
    { value: 'Undergraduate', label: 'Undergraduate' },
    { value: 'Postgraduate', label: 'Postgraduate' },
    { value: 'Doctorate', label: 'Doctorate' }
];

const EducationForm = ({ index, education, updateEducation, removeEducation }) => {
    const handleYearChange = (date, field) => {
        const year = date ? date.getFullYear() : ''; // Extract year from date object
        updateEducation(index, field, year);
    };
    return (
        <div className="border border-gray-300 p-4 rounded-lg mb-4">
            <Input
                placeholder="College/School Name"
                value={education.name}
                onChange={(e) => updateEducation(index, 'name', e.target.value)}
                className="mb-4"
            />
            <Select
                options={educationLevels}
                placeholder="Select Level of Education"
                value={educationLevels.find(option => option.value === education.level)}
                onChange={(selectedOption) => updateEducation(index, 'level', selectedOption.value)}
                className="mb-4"
            />
            <DatePicker
                selected={education.startYear ? new Date(education.startYear, 0) : null}
                onChange={(date) => handleYearChange(date, 'startYear')}
                showYearPicker
                dateFormat="yyyy"
                placeholderText="Year of Joining"
                className="mb-4 border border-gray-300 rounded-lg p-2 w-full"
            />
            <DatePicker
                selected={education.endYear ? new Date(education.endYear, 0) : null}
                onChange={(date) => handleYearChange(date, 'endYear')}
                showYearPicker
                dateFormat="yyyy"
                placeholderText="Year of End (Leave blank if current)"
                className="mb-4 ml-4 border border-gray-300 rounded-lg p-2 w-full"
            />
            <br />
            <Button colorScheme="red" onClick={() => removeEducation(index)}>Remove</Button>
        </div>
    );
};

const FormPage = () => {
    const [educations, setEducations] = useState([{ name: '', level: '', startYear: '', endYear: '' }]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    const addEducation = () => {
        setEducations([...educations, { name: '', level: '', startYear: '', endYear: '' }]);
    };

    const updateEducation = (index, field, value) => {
        const newEducations = [...educations];
        newEducations[index][field] = value;
        setEducations(newEducations);
    };

    const removeEducation = (index) => {
        const newEducations = [...educations];
        newEducations.splice(index, 1);
        setEducations(newEducations);
    };

    const handleSelectChange = (selectedOptions, setter) => {
        setter(selectedOptions || []);
    };

    const removeSelectedOption = (value, setter, selectedOptions) => {
        setter(selectedOptions.filter(option => option.value !== value));
    };

    console.log(educations, selectedInterests, selectedSkills)
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile Form</h1>

            {/* Education Section */}
            <h2 className="text-xl font-semibold mb-2">Education Details</h2>
            {educations.map((education, index) => (
                <EducationForm
                    key={index}
                    index={index}
                    education={education}
                    updateEducation={updateEducation}
                    removeEducation={removeEducation}
                />
            ))}
            <Button onClick={addEducation} colorScheme="teal" className="mb-4">Add Another Education</Button>

            {/* Skills Section */}
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <Select
                isMulti
                options={skills_list.map(skill => ({ value: skill, label: skill }))}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, setSelectedSkills)}
                placeholder="Search and select skills"
                className="mb-4"
            />
            {/* <Box className="mb-4">
                {selectedSkills.map(skill => (
                    <Tag key={skill.value} size="md" borderRadius="full" variant="solid" colorScheme="teal" className="m-1">
                        <TagLabel>{skill.label}</TagLabel>
                        <TagCloseButton onClick={() => removeSelectedOption(skill.value, setSelectedSkills, selectedSkills)} />
                    </Tag>
                ))}
            </Box> */}

            {/* Career Interests Section */}
            <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
            <Select
                isMulti
                options={work_titles.map(title => ({ value: title, label: title }))}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, setSelectedInterests)}
                placeholder="Search and select work experience"
                className="mb-4"
            />
            {/* <Box className="mb-4">
                {selectedInterests.map(interest => (
                    <Tag key={interest.value} size="md" borderRadius="full" variant="solid" colorScheme="purple" className="m-1">
                        <TagLabel>{interest.label}</TagLabel>
                        <TagCloseButton onClick={() => removeSelectedOption(interest.value, setSelectedInterests, selectedInterests)} />
                    </Tag>
                ))}
            </Box> */}

            <Button colorScheme="blue">Submit</Button>
        </div>
    );
};

export default FormPage;