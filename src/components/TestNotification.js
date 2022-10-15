// import { useState } from 'react';
import { Box, Grid, VStack, Text, Button, Flex, Heading, Spacer, Input, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
// import { StateMutability } from "wyvern-js/lib/types";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const showToast = (title, desc, toast, status) => {
    toast({
        title: title,
        description: desc,
        status: status,
        duration: 5000,
        isClosable: true,
      })
}

const TestNotification = () => {
    const toast = useToast()
    const [inputs, setInputs] = useState({
        address: "",
        subject: "",
        body: ""
    });

    const handleChange = (event) => {
        const value = event.target.value;
        setInputs({
            ...inputs,
            [event.target.name]: value,
        });
    };

    const triggerNotification = async () => {
        showToast('Sending notification', 'Please wait while we send the notification', toast, "info")
        await sendNotification(inputs.address, inputs.subject, inputs.body);
        showToast('Notification sent', '...', toast, "success")

    } 

    const sendNotification = async (address, subject, body) => {    
        if (!address) return {error:true, message:"Address is empty"};
        if (!subject) return {error:true, message:"Subject is empty"};
        if (!body) return {error:true, message:"Body is empty"};
        console.log('here')
        axios.post("notify/sendNotification", {
            address, body, subject
        });
    }

    return (
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <VStack spacing={8}>
                    <Input type="text" name="address" value={inputs.address} onChange={handleChange} placeholder="Enter the address"></Input>
                    <Input type="text" name="subject" value={inputs.subject} onChange={handleChange} placeholder="Enter the subject"></Input>
                    <Textarea type="text" name="body" value={inputs.body} onChange={handleChange} placeholder="Enter the body"></Textarea>
                    <Button onClick={triggerNotification} colorScheme="teal">Send Notification</Button>
                </VStack>
            </Grid>
        </Box>
    );
};

export default TestNotification;
