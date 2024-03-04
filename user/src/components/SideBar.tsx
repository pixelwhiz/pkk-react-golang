import * as React from "react"
import {
    Avatar,
    Box,
    Button, Card,
    ChakraComponent,
    ChakraProvider,
    Code,
    Grid, Icon,
    Link,
    Text,
    theme,
    VStack
} from "@chakra-ui/react";
import {ColorModeSwitcher} from "../ColorModeSwitcher";
import {Logo} from "../Logo";
import "../style.css";
import {BiHome, GrTasks, HiMenuAlt3, MdPerson} from "react-icons/all";
import { useLocation } from "react-router-dom";
import {Bars3Icon, HomeIcon, ServerIcon} from "@heroicons/react/24/solid";

export const SideBar = () => {

    const location = useLocation();

    const routeToNone = () => {};

    const routeToHome = () => {
        window.location.href = "/home";
    };

    const routeToTugas01 = () => {
        window.location.href = "/daftarsiswa";
    };

    return (
        <Box backgroundColor={""} className={"card bg-neutral-700 rounded-none z-10 w-72 fixed h-screen"}>
            <Box className={"grid"}>
                <Button onClick={ location.pathname === "/home" ? routeToNone : routeToHome } _hover={{ backgroundColor: location.pathname === "/home" ? "teal.100":"teal.200" }} display={"flex"} backgroundColor={location.pathname === "/home" ? "teal.200" : "transparent"} justifyContent={"start"} padding={"1.5rem"} borderStart={"solid"} borderStartWidth={"0.25rem"} borderRadius={"none"} borderColor={location.pathname === "/home" ? "teal.500" : "transparent"}>
                    <Icon as={HomeIcon} color={location.pathname === "/home" ? "white" : "white"} width={5} height={5} />
                    <Text color={location.pathname === "/home" ? "white" : "white"} className={"ms-5"} fontSize={"1rem"} fontWeight={"medium"}>Home</Text>
                </Button>
                <Button onClick={ location.pathname === "/daftarsiswa" ? routeToNone : routeToTugas01 } _hover={{ borderColor: location.pathname === "/daftarsiswa" ? "teal.500" : "teal.500", backgroundColor: location.pathname === "/daftarsiswa" ? "teal.100":"teal.200" }} display={"flex"} backgroundColor={location.pathname === "/daftarsiswa" ? "teal.200" : "transparent"} justifyContent={"start"} padding={"1.5rem"} borderStart={"solid"} borderStartWidth={"0.25rem"} borderRadius={"none"} borderColor={location.pathname === "/daftarsiswa" ? "teal.500" : "transparent"}>
                    <Icon as={MdPerson} color={location.pathname === "/daftarsiswa" ? "white" : "white"} width={5} height={5} />
                    <Text color={location.pathname === "/daftarsiswa" ? "white" : "white"} className={"ms-5"} fontSize={"1rem"} fontWeight={"medium"}>Daftar Siswa</Text>
                </Button>
            </Box>
        </Box>
    );
}