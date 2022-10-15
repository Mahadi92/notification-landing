import {
    Flex, Box, Heading, Spacer, ButtonGroup, Button
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAnalyticsEventTracker, { TRACKING_CATEGORY,  SUBSCRIBE_ACTION} from "../../utils/ga";


//      ARB_MAINNET, ARB_RINKEBY, MATIC_MAINNET, MATIC_MUMBAI, OPT_MAINNET, OPT_KOVAN,
// ETH_MAINNET, ETH_GOERLI, ETH_ROPSTEN, ETH_RINKEBY, ETH_KOVAN

const NotificationItem = (props) => {
    const [subStatus, setSubStatus] = useState(false);
    console.log(props)
    const gaEventTracker = useAnalyticsEventTracker();

    useEffect(() => {
        for (const subIdx in props.subscriptions) {
            const sub = props.subscriptions[subIdx];
            if (props.network == sub.network) {
                setSubStatus(sub.status);
            }
        }
    }, [props.subscriptions]);

    const handleSubscribe = async () => {
        const newStatus = !subStatus;
        await axios.post("/subscribe/addressEvents", {
            network: props.network,
            isSubscribe: newStatus,
            address: props.address
        });
        gaEventTracker(TRACKING_CATEGORY.SUBSCRIBE, SUBSCRIBE_ACTION[props.network]);
        setSubStatus(newStatus);
    };

    return (
        <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box p="2" h="50px">
                <Heading size="md">{props.notificationType}</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap="2">
                {!subStatus ? (
                    <Button onClick={handleSubscribe} colorScheme="teal" disabled={props.disableNotifications}>
                        + Subscribe
                    </Button>
                ) : (
                    <Button onClick={handleSubscribe} variant="outline" colorScheme="teal" disabled={props.disableNotifications}>
                        Unsubscribe
                    </Button>
                )}
            </ButtonGroup>
        </Flex>
    );
};

export default NotificationItem;