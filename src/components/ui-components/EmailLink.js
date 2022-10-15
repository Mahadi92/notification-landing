import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box, Button, Flex, FormControl, FormErrorMessage, Input, Spacer, Switch,
  Text, Tooltip
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CHANNEL, LINK_STATUS, showToast } from "../utils/common";
import ConfirmModal from "./confirm-modal";

const emailText = {
    [LINK_STATUS.NOT_ENTERED]: { label: "Link your email", action: "Link" },
    [LINK_STATUS.UNVERIFIED]: { label: "Please verify your email address", action: "Resend" },
    [LINK_STATUS.VERIFIED]: { label: "Enable email alerts" },
};

const getChannelStatus = (channels, key) => {
    if (!channels || !channels[key] || !channels[key].status || channels[key].status == LINK_STATUS.NOT_ENTERED) {
        return LINK_STATUS.NOT_ENTERED;
    }
    return channels[key].status;
};

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isValidEmail = (email) => {
    if (!email) return true;
    else if (validateEmail(email)) return true;
    else return false;
};

function EmailLink({ sendVerification, channels, toast, removeLink, address }) {
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
        if (!isValidEmail(event.target.value)) setEmailError(true);
        else setEmailError(false);
    };
  
    const [isEmailError, setEmailError] = useState(false);
    const [email, setEmail] = useState("");
    const [notificationStatus, setNotificationStatus] = useState(channels?.email?.notificationStatus);

    const [visible, setVisible] = useState(false);
    const toggleOpenModal = React.useCallback(() => {
        setVisible((o) => !o);
    }, []);
    const handleRemoveEmail = async () => {
        setVisible(false);
        removeLink(CHANNEL.EMAIL);
    };
    useEffect(() => {
        setNotificationStatus(channels?.email?.notificationStatus);
    }, [channels]);

    const changeNotificationStatus = (event) => {
        const status = event.target.checked;
        axios.post("/link/updateNotificationStatus", {
            channel: "email",
            notificationStatus: status,
            address
        });
        setNotificationStatus(status);
    };

    const sendVerificationLink = async () => {
        showToast("Sending Email", "please wait while we send the verification email", toast, "info");
        if (email && !isEmailError) await sendVerification(email);
        else {
            showToast("Invalid Email", "Please enter a valid email address", toast, "error");
            return;
        }
        showToast("Email Sent", "Verification link has been sent , please open it", toast, "success");
    };
    useEffect(() => {
        setEmail(channels?.email?.identifier);
    }, [channels]);
    const status = getChannelStatus(channels, CHANNEL.EMAIL);

    return (
      <Flex>
        <Box p="4">
          <Text>{emailText[status].label}</Text>
        </Box>
        <Spacer />
        <Flex p="4" gap="10px">
          <FormControl isInvalid={isEmailError}>
            <Input
              key="email"
              value={email}
              onChange={handleEmailInput}
              placeholder="Enter email"
              type="email"
              disabled={status !== LINK_STATUS.NOT_ENTERED}
            />
            {isEmailError && (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
          </FormControl>
          {status !== LINK_STATUS.NOT_ENTERED && (
            <>
              <Tooltip label="Remove this email">
                <Button colorScheme="red" onClick={toggleOpenModal}>
                  <DeleteIcon />
                </Button>
              </Tooltip>
              <ConfirmModal
                title="Remove email link"
                message="Are you sure that you want to remove this email link"
                onOkText="Remove"
                onOkHandler={handleRemoveEmail}
                visible={visible}
                toggleVisible={toggleOpenModal}
              />
            </>
          )}
        </Flex>
        <Spacer />
        <Box p="4">
          {status === LINK_STATUS.VERIFIED ? (
            <Switch
              isChecked={notificationStatus}
              onChange={changeNotificationStatus}
              size="md"
              id="email-alerts"
            />
          ) : (
            <Button
              onClick={() => {
                sendVerificationLink();
              }}
            >
              {emailText[status].action}
            </Button>
          )}
        </Box>
      </Flex>
    );
}

export default EmailLink;
