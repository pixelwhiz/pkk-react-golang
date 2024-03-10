import React, {useEffect} from 'react';
import {Box, ChakraProvider, Grid, theme} from "@chakra-ui/react";
import {SideBar} from "../components/SideBar";
import {TopBar} from "../components/TopBar";
import axios from "axios";
import Tugas01Layout from "../components/layouts/Tugas01Layout";
import {checkUser} from "../middlewares/AuthenticationUser";

const Tugas01 = () => {

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
                    <Tugas01Layout />
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default Tugas01;
