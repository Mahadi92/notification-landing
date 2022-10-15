import {
    Box, Button, Flex,
    Heading, SimpleGrid, StackDivider,
    Text, useColorModeValue, useToast, VStack
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactGA from 'react-ga4';
import { Link } from "react-router-dom";
import UserContext from "../contexts/user/UserContext";
import web3Context from "../contexts/web3/Web3Context";
import useAnalyticsEventTracker, { EMAIL_LINK_ACTION, PHONE_LINK_ACTION, TELEGRAM_LINK_ACTION, TRACKING_CATEGORY } from "../utils/ga";
import EmailLink from "./ui-components/EmailLink";
import NotificationItem from "./ui-components/Notificationitem";
import PhoneLink from "./ui-components/PhoneLink";
import TelegramLink from "./ui-components/TelegramLink";
import { NETWORK } from "./utils/common";

const SUBSCRIBE_MESSAGE= {
[NETWORK.ETH_MAINNET]: 'ETH Mainnet Alerts',
[NETWORK.ETH_RINKEBY]: 'ETH Rinkeby Alerts',
[NETWORK.MATIC_MAINNET]: 'Polygon Mainnet Alerts',
[NETWORK.MATIC_MUMBAI]: 'Polygon Mumbai alerts',
[NETWORK.ARB_MAINNET]: 'Arbitrum Mainnet alerts',
[NETWORK.ARB_RINKEBY]: 'Arbitrum Rinkeby alerts',
[NETWORK.OPT_MAINNET]: 'Optimism Mainnet alerts',
[NETWORK.OPT_KOVAN]: 'Optimism Kovan alerts',
}
const showToast = (title, desc, toast, status) => {
    toast({
        title: title,
        description: desc,
        status: status,
        duration: 5000,
        isClosable: true,
    });
};

function isEmpty(object) {
    for (const property in object) {
        return false;
    }
    return true;
}

const isChannelLinked = (channels) => {
    if (isEmpty(channels)) {
        return true;
    } else if (isEmpty(channels.telegram) && isEmpty(channels.email) && isEmpty(channels.email)) {
        return true;
    }
    return false;

};
const TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID; 

function Home(props) {
    const toast = useToast();
    const bg = useColorModeValue("#e5f4f1", "");
    const { refreshChannels, channels, subscriptions } = useContext(UserContext);
    const { address } = useContext(web3Context);
    const [disableNotifications, setDisableNotifications] = useState(true);
    const gaEventTracker = useAnalyticsEventTracker();

    useEffect(() => {
        if(address) {
            ReactGA.initialize([{
                trackingId: TRACKING_ID,
                gaOptions: {
                    userId: address.toString(),
                }
            }]);
        }
    }, [address]);

    useEffect(() => {
        setDisableNotifications(isChannelLinked(channels));
    }, [channels]);
   
    const sendTelegramVerificationLink = async (chatId) => {
        const response = await axios.post("/link/telegram/store-chatId", { chatId, address });
        if ('error' in response.data && response.data.error == true) {
            showToast("Wrong telegram chat ID", response.data.message, toast, "error");
            return;
        }
        gaEventTracker(TRACKING_CATEGORY.TELEGRAM_LINK, TELEGRAM_LINK_ACTION.ENTER);
        await refreshChannels(address);
        showToast("Account linked", "Telegram chat has been linked.", toast, "success");
    };

    const sendEmailVerificationLink = async (email) => {
        const response = await axios.post("/link/email/send-verification", { email, address });
        gaEventTracker(TRACKING_CATEGORY.EMAIL_LINK, EMAIL_LINK_ACTION.ENTER);
        await refreshChannels(address);
    };

    const sendSMSVerificationLink = async (phone) => {
        const response = await axios.post("/link/phone/send-verification", { phone, address });
        gaEventTracker(TRACKING_CATEGORY.PHONE_LINK, PHONE_LINK_ACTION.ENTER);
        await refreshChannels(address);
    };

    const removeLink = async (channel, identifier) => {
        const res = await axios.post("/link/remove-link", { channel, address, identifier });
        if (res.data.success) {
            showToast(`Success`, `You've removed the ${channel} link successfully`, toast, "success");
            refreshChannels(address);
        }
    };

    useEffect(() => {
        refreshChannels(address);
    }, []);

    return (
        <div>
            <Flex flexDirection="column" width="100wh"  bg={bg}>
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
                        <Button onClick={props.disconnect} colorScheme="teal" variant="ghost">
                            Log out
                        </Button>
                    </Flex>
                </Flex>
                <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />} paddingBottom="30px">
                    <SimpleGrid spacing="10px">
                        <Text fontSize="xl" fontWeight="bold">
                            Channels
                        </Text>
                        <Box border="1px" bg="white" borderRadius="md" displat="flex" alignItems="center">
                            <EmailLink
                                sendVerification={sendEmailVerificationLink}
                                channels={channels}
                                toast={toast}
                                removeLink={removeLink}
                                address={address}
                            />
                            <PhoneLink
                                sendVerification={sendSMSVerificationLink}
                                channels={channels}
                                toast={toast}
                                removeLink={removeLink}
                                address={address}
                            />
                            <TelegramLink
                                sendVerification={sendTelegramVerificationLink}
                                channels={channels}
                                toast={toast}
                                removeLink={removeLink}
                                address={address}
                            />
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid spacing="10px" >
                        <Text fontSize="xl" fontWeight="bold">
                            Notifications
                        </Text>
                        <Box
                            bg="white"
                            spacing="10px"
                            padding="10px"
                            border="1px"
                            borderRadius="md"                            
                        >
                            {disableNotifications && <Heading>Please link one of the channels to start</Heading>}
                            {
                                Object.values(NETWORK).map(key => (
                                    <NotificationItem
                                    disableNotifications={disableNotifications}
                                    notificationType={SUBSCRIBE_MESSAGE[key]}
                                    network={key}
                                    subscriptions={subscriptions}
                                    address={address}
                                />
                                ))
                            }
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Flex>
        </div>
    );
}

// ARB_MAINNET, ARB_RINKEBY, MATIC_MAINNET, MATIC_MUMBAI, OPT_MAINNET, OPT_KOVAN,
// ETH_MAINNET, ETH_GOERLI, ETH_ROPSTEN, ETH_RINKEBY, ETH_KOVAN

export default Home;
