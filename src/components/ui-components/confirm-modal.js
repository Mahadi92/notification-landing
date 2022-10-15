import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
export default function ConfirmModal({ title, message, onOkText, onOkHandler, visible, toggleVisible }) {
    const handleOK = () => {
        onOkHandler();
    };

    return (
        <Modal isOpen={visible} onClose={toggleVisible}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title || "Confirm"} </ModalHeader>
                <ModalCloseButton />
                <ModalBody>{message}</ModalBody>

                <ModalFooter>
                    <Button colorScheme="gray" mr={3} onClick={toggleVisible}>
                        Close
                    </Button>
                    <Button colorScheme="red" onClick={handleOK}>
                        {onOkText || "OK"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
