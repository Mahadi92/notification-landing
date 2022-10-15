import React, { useEffect, useContext, useState } from "react";
import { Box, Switch, Text, Flex, Button, Spacer, Input, Tooltip, FormHelperText, FormLabel, FormControl } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import ConfirmModal from "./confirm-modal";
import { CHANNEL, LINK_STATUS, showToast } from "../utils/common";

function TelegramLink({ sendVerification, channels, toast, removeLink, address }) {
    const [telegram, setTelegram] = useState("");
    const [notificationStatus, setNotificationStatus] = useState(channels?.telegram?.notificationStatus);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let telegramChatID = urlParams.get("telegramChatID");
        setTelegram(telegramChatID);
    }, []);

    const [visible, setVisible] = useState(false);
    const toggleOpenModal = React.useCallback(() => {
        setVisible((o) => !o);
    }, []);

    const handleRemoveTelegram = async () => {
        setVisible(false);
        removeLink(CHANNEL.TELEGRAM, telegram);
    };

    useEffect(() => {
        setNotificationStatus(channels?.telegram?.notificationStatus);
    }, [channels]);

    const changeNotificationStatus = (event) => {
        const status = event.target.checked;
        axios.post("/link/updateNotificationStatus", {
            channel: "telegram",
            notificationStatus: status,
            address,
        });
        setNotificationStatus(status);
    };

    const handleTelegramInput = (event) => {
        setTelegram(event.target.value);
    };

    const sendVerificationLink = async () => {
        console.log(telegram);
        if (!telegram) return showToast("Please enter the ID", "Telegram chat ID is empty", toast, "error");
        await sendVerification(telegram);
    };

    useEffect(() => {
        if (!channels?.telegram?.identifier) {
            return;
        }
        setTelegram(channels?.telegram?.identifier);
    }, [channels]);

    if (!channels || !channels.telegram || !channels.telegram.status || channels.telegram.status == LINK_STATUS.NOT_ENTERED) {
        return (
            <Flex>
                <Box p="4">
                    <FormControl>
                        <FormLabel>Enter Telegram Chat ID</FormLabel>
                        <Input value={telegram} onChange={handleTelegramInput} placeholder="Enter telegram ID" type="phone" />
                        <FormHelperText>Speak to <a tareget="_blank" href="https://t.me/toboro_notify_bot">https://t.me/toboro_notify_bot</a> to get the chatID.</FormHelperText>
                    </FormControl>
                </Box>
                <Spacer />
                <Box p="4">
                    <Button onClick={sendVerificationLink}>Link</Button>
                </Box>
            </Flex>
        );
    } else if (channels.telegram.status == LINK_STATUS.UNVERIFIED) {
        return (
            <Flex>
                <Box p="4">
                    <Text>Please verify your telegram ID</Text>
                </Box>
                <Spacer />
                <Box p="4">
                    <Input value={telegram} onChange={handleTelegramInput} disabled placeholder="Enter telegram" type="phone" />
                </Box>
                <Spacer />
                <Box p="4">
                    <Button onClick={sendVerificationLink}>Resend</Button>
                </Box>
            </Flex>
        );
    } else if (channels.telegram.status == LINK_STATUS.VERIFIED) {
        return (
            <Flex>
                <Box p="4">
                    <Text>Enable Telegram alerts</Text>
                </Box>
                <Spacer />
                <Flex p="4" gap="10px">
                    <Input value={telegram} onChange={handleTelegramInput} disabled placeholder="Enter telegram" type="phone" />
                    <Tooltip label="Remove this telegram link">
                        <Button colorScheme="red" onClick={toggleOpenModal}>
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                    <ConfirmModal
                        title="Remove telegram link"
                        message="Are you sure that you want to remove this telegram link"
                        onOkText="Remove"
                        onOkHandler={handleRemoveTelegram}
                        visible={visible}
                        toggleVisible={toggleOpenModal}
                    />
                </Flex>
                <Spacer />
                <Box p="4">
                    <Switch isChecked={notificationStatus} onChange={changeNotificationStatus} size="md" id="telegram-alerts" />
                </Box>
            </Flex>
        );
    }
}

export default TelegramLink;
