import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
    Box,
    Grid,
    VStack,
    Switch,
    StackDivider,
    Text,
    Flex,
    Heading,
    ButtonGroup,
    HStack,
    Button,
    Spacer,
    AspectRatio,
    Input,
    Center,
    useColorModeValue,
    Tooltip,
    SimpleGrid,
    useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import userContext from "../contexts/user/UserContext";
import web3Context from "../contexts/web3/Web3Context";

function User(props) {
    const bg = useColorModeValue("#e5f4f1", "");
    const { userInfo, refreshChannels } = useContext(userContext);
    const { address } = useContext(web3Context);
    const [referredByCode, setReferredByCode] = useState("");

    const handleReferalCodeInput = (e) => {
        setReferredByCode(e.target.value);
    }

    useEffect(() => {
        if (userInfo) setReferredByCode(userInfo.referredByCode);
    },[userInfo])

    useEffect(() => {
        refreshChannels(address);
        console.log("address", address);
    }, [address]);

    const applyReferralCode = async () => {
        await axios.post("/referrals/applyReferralCode", 
        {
            address, referralCode: referredByCode
        });
        await refreshChannels(address);
    }

    console.log("userInfo", userInfo);
    return (
        <div>
            <Flex flexDirection="column" width="100wh" height="100vh" bg={bg}>
                <Flex bg="white" justifyContent="space-between" p="15px">
                    <Flex>
                        <Button colorScheme="teal" variant="ghost">
                            <Link to="/">Dashboard</Link>
                        </Button>
                        <Button colorScheme="teal" variant="ghost">
                            <Link to="/">Notification</Link>
                        </Button>
                    </Flex>
                    <Flex gap="10px">
                        <Button colorScheme="teal" variant="ghost">
                            Log out
                        </Button>
                    </Flex>
                </Flex>
                <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
                    <SimpleGrid spacing="10px">
                        <Text fontSize="xl" fontWeight="bold">
                            Referrals
                        </Text>
                        <Box border="1px" bg="white" borderRadius="md" displat="flex" alignItems="center" w="800px">
                            {userInfo && !userInfo.referredByCode ? (
                                <Flex>
                                    <Box p="4">
                                        <Text>Use a referral code</Text>
                                    </Box>
                                    <Spacer />
                                    <Box p="4">
                                        <Input placeholder="Enter code" type="code" value={referredByCode} onChange={handleReferalCodeInput}/>
                                    </Box>
                                    <Spacer />
                                    <Box p="4">
                                        <Button onClick={applyReferralCode}>Apply</Button>
                                    </Box>
                                </Flex>
                            ) : (
                                <Flex>
                                    <Box p="4">
                                        <Text>Referral code used</Text>
                                    </Box>
                                    <Spacer />
                                    <Box p="4">
                                        <Input placeholder="Enter phone" type="phone" value={(userInfo ? userInfo.referredByCode : "")} disabled/>
                                    </Box>
                                    <Spacer />
                                </Flex>
                            )}

                            <Flex>
                                <Box p="6">Your Referal Code:</Box>
                                <Spacer />
                                <Box p="6">{userInfo != null && userInfo.referralCode}</Box>
                            </Flex>
                            <Flex>
                                <Box p="6">Your Referral Power:</Box>
                                <Spacer />
                                <Box p="6">{userInfo != null && userInfo.referralCount}</Box>
                            </Flex>
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Flex>
        </div>
    );
}

export default User;
