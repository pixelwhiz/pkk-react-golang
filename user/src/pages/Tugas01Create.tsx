import React, {useEffect} from 'react';
import {Box, ChakraProvider, Grid, theme} from "@chakra-ui/react";
import {SideBar} from "../components/SideBar";
import {TopBar} from "../components/TopBar";
import axios from "axios";
import Tugas01Layout from "../components/layouts/Tugas01Layout";
import Tugas01CreateLayout from "../components/layouts/Tugas01CreateLayout";

const Tugas01Create = () => {

    const local_server = process.env.REACT_APP_LOCAL_SERVER;
    const network_server = process.env.REACT_APP_NETWORK_SERVER;

    const checkUserIsLoggedIn = async () => {
        try {
            const response = await axios.get(`${local_server}/api/user`, {
                withCredentials: true
            });
        } catch (err) {
            try {
                const response = await axios.get(`${network_server}/api/user`, {
                    withCredentials: true
                });
            } catch (err) {
                window.location.href = "/login";
            }
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
                    <Tugas01CreateLayout />
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default Tugas01Create;
