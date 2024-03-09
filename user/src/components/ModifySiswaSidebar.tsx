import {
    ChakraProvider,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Card
} from "@chakra-ui/react";
import * as React from "react";

const ModifySiswaSidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Card paddingX={"1rem"} className={"w-72"}>
                <Box marginX={"1rem"} marginY={"1rem"}>
                    <Text color={"black"} opacity={"0.5"} fontSize={"0.9rem"} fontWeight={"extrabold"}>MENU</Text>
                </Box>
                <Box className={"grid gap-1"}>
                    <Button onClick={ location.pathname === "/daftarsiswa" ? routeToNone : routeToTugas01 } backgroundColor={location.pathname === "/daftarsiswa/123/modify" ? "" : "white"} display={"flex"} justifyContent={"start"}>
                        Edit Siswa
                    </Button>
                    <Button onClick={ location.pathname === "/daftarsiswa" ? routeToNone : routeToTugas01 } backgroundColor={location.pathname === "/daftarsiswa/123/modify/deleteconfirmation" ? "" : "white"} display={"flex"} justifyContent={"start"}>
                        Delete
                    </Button>
                </Box>
            </Card>
        </>
    )
};

export default ModifySiswaSidebar;
