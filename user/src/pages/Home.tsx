import React, {useEffect} from 'react';
import {Box, ChakraProvider, Grid, theme} from "@chakra-ui/react";
import {SideBar} from "../components/SideBar";
import {TopBar} from "../components/TopBar";
import {HomeLayout} from "../components/layouts/HomeLayout";
import axios from "axios";

const Home = () => {

    const local_server = process.env.REACT_APP_LOCAL_SERVER;
    const network_server = process.env.REACT_APP_NETWORK_SERVER;

    const checkUserIsLoggedIn = async () => {
        try {
            const responseLocal = await axios.get(`${local_server}/api/user`, {
                withCredentials: true
            });

        } catch (err) {
            try {
                const responseNetwork = await axios.get(`${network_server}/api/user`, {
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
                    <HomeLayout />
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default Home;
