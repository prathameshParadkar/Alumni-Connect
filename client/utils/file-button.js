import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
// import { HiUpload } from 'react-icons/hi';
import { useFileUpload } from 'use-file-upload';

export const FileUploadRoot = ({ children }) => {
    const { files, upload, clear } = useFileUpload();

    return (
        <Box>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { files, upload, clear })
            )}
        </Box>
    );
};

export const FileUploadTrigger = ({ asChild, ...props }) => {
    const { upload } = useFileUpload();

    return asChild ? (
        React.cloneElement(props.children, { onClick: upload })
    ) : (
        <Flex
            as="label"
            cursor="pointer"
            alignItems="center"
            gap={2}
            {...props}
            onClick={upload}
        >
            {/* <HiUpload /> */}
            <Text>Upload file</Text>
        </Flex>
    );
};

export const FileUploadList = () => {
    const { files, clear } = useFileUpload();

    return (
        <Box mt={4}>
            {files?.map((file, index) => (
                <Flex key={index} alignItems="center" justifyContent="space-between" mb={2}>
                    <Tooltip label={file.name}>
                        <Text noOfLines={1}>{file.name}</Text>
                    </Tooltip>
                    <Button variant="ghost" size="sm" onClick={() => clear(index)}>
                        Remove
                    </Button>
                </Flex>
            ))}
        </Box>
    );
};