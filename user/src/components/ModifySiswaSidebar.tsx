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
import {useLocation, useParams} from "react-router-dom";
const ModifySiswaSidebar = () => {
    const params = useParams<{ nis: string }>();
    const nis = params.nis ?? "";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();

    const routeToEditSiswa = () => {
        window.location.href = `/daftarsiswa/${nis}/modify`;
    };

    const routeToDelete = () => {
        window.location.href = `/daftarsiswa/${nis}/delete`;
    };

    const routeToNone = () => {};

    return (
        <>
            <Card rounded={"1rem"} paddingX={"1rem"} className={"w-72"}>
                <Box marginX={"1rem"} marginY={"1rem"}>
                    <Text color={"black"} opacity={"0.5"} fontSize={"0.9rem"} fontWeight={"extrabold"}>MENU</Text>
                </Box>
                <Box className={"grid gap-1"}>
                    <Button onClick={ location.pathname === `/daftarsiswa/${nis}/modify` ? routeToNone : routeToEditSiswa } backgroundColor={location.pathname === `/daftarsiswa/${nis}/modify` ? "" : "white"} display={"flex"} justifyContent={"start"}>
                        Edit Siswa
                    </Button>
                    <Button onClick={ location.pathname === `/daftarsiswa/${nis}/delete` ? routeToNone : routeToDelete } backgroundColor={location.pathname === `/daftarsiswa/${nis}/delete` ? "" : "white"} display={"flex"} justifyContent={"start"}>
                        Delete
                    </Button>
                </Box>
            </Card>
        </>
    )
};

export default ModifySiswaSidebar;
