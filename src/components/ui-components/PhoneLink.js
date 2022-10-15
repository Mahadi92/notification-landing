import React, { useEffect, useContext, useState } from "react";
import {
    Box,
    Switch,
    Text,
    Flex,
    Button,
    Spacer,
    Input,
    Tooltip,
    FormLabel
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import ConfirmModal from "./confirm-modal";
import { CHANNEL, LINK_STATUS, showToast} from "../utils/common";



function PhoneLink({ sendVerification, channels, toast, removeLink, address }) {
    const [phone, setPhone] = useState("");
    const [notificationStatus, setNotificationStatus] = useState(channels?.phone?.notificationStatus);

    const [visible, setVisible] = useState(false);
    const toggleOpenModal = React.useCallback(() => {
        setVisible((o) => !o);
    }, []);
    const handleRemovePhone = async () => {
        setVisible(false);
        removeLink(CHANNEL.PHONE);
    };
    useEffect(() => {
        setNotificationStatus(channels?.phone?.notificationStatus);
    }, [channels]);

    const changeNotificationStatus = (event) => {
        const status = event.target.checked;
        axios.post("/link/updateNotificationStatus", {
            channel: "phone",
            notificationStatus: status,
            address
        });
        setNotificationStatus(status);
    };

    const handlePhoneInput = (event) => {
        console.log("t");
        setPhone(event.target.value);
    };
    const sendVerificationLink = async () => {
        showToast("Sending SMS", "please wait while we send the verification SMS", toast, "info");
        if (phone) await sendVerification(phone);
        else {
            showToast("Invalid Phone", "Please enter a valid phone number", toast, "error");
            return;
        }
        showToast("SMS Sent", "Verification link has been sent , please open it", toast, "success");
    };

    useEffect(() => {
        setPhone(channels?.phone?.identifier);
    }, [channels]);

    if (!channels || !channels.phone || !channels.phone.status || channels.phone.status == LINK_STATUS.NOT_ENTERED) {
        return (
            <Flex>
                <Box p="4">
                    <FormLabel>Link your phone</FormLabel>
                    <Input value={phone} onChange={handlePhoneInput} placeholder="Enter phone ( Coming Soon )" type="phone" disable="true"/>
                </Box>
                <Spacer />
                <Box p="4">
                    <Button onClick={sendVerificationLink}>Link</Button>
                </Box>
            </Flex>
        );
    } else if (channels.phone.status == LINK_STATUS.UNVERIFIED) {
        return (
            <Flex>
                <Box p="4">
                    <Text>Please verify your phone number</Text>
                </Box>
                <Spacer />
                <Box p="4">
                    <Input value={phone} onChange={handlePhoneInput} disabled placeholder="Enter phone ( Coming Soon )" type="phone" />
                </Box>
                <Spacer />
                <Box p="4">
                    <Button onClick={sendVerificationLink}>Resend</Button>
                </Box>
            </Flex>
        );
    } else if (channels.phone.status == LINK_STATUS.VERIFIED) {
        return (
            <Flex>
                <Flex gap="10px" p="4">
                    <Input value={phone} onChange={handlePhoneInput} disabled placeholder="Enter phone" type="phone" />
                    <Tooltip label="Remove this phone number">
                        <Button colorScheme="red" onClick={toggleOpenModal}>
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                    <ConfirmModal
                        title="Remove phone link"
                        message="Are you sure that you want to remove this phone link"
                        onOkText="Remove"
                        onOkHandler={handleRemovePhone}
                        visible={visible}
                        toggleVisible={toggleOpenModal}
                    />
                </Flex>
                <Spacer />
                <Box p="4">
                    <Switch isChecked={notificationStatus} onChange={changeNotificationStatus} size="md" id="sms-alerts" />
                </Box>
            </Flex>
        );
    }
}

export default PhoneLink;