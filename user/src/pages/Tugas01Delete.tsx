import React, {useEffect} from 'react';
import {Box, ChakraProvider, Grid, theme} from "@chakra-ui/react";
import {SideBar} from "../components/SideBar";
import {TopBar} from "../components/TopBar";
import axios from "axios";
import Tugas01Layout from "../components/layouts/Tugas01Layout";
import Tugas01ModifyLayout from "../components/layouts/Tugas01ModifyLayout";
import {checkUser} from "../middlewares/AuthenticationUser";
import Tugas01DeleteLayout from "../components/layouts/Tugas01DeleteLayout";

const Tugas01Delete = () => {

    const local_server = process.env.REACT_APP_LOCAL_SERVER;
    const network_server = process.env.REACT_APP_NETWORK_SERVER;

    const checkUserIsLoggedIn = async () => {
        try {
            await checkUser();
        } catch (err) {
        }
    };

    useEffect(() => {
        checkUserIsLoggedIn();
    });

    return (
        <ChakraProvider theme={theme}>
        <Box className={"flex"}>
            <Box>
                <SideBar />
            </Box>
            <Box className={"grid w-full absolute"}>
        <TopBar />
        <Tugas01DeleteLayout />
        </Box>
        </Box>
        </ChakraProvider>
);
};

export default Tugas01Delete;
