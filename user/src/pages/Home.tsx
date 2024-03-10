import React, {useEffect} from 'react';
import {Box, ChakraProvider, Grid, theme} from "@chakra-ui/react";
import {SideBar} from "../components/SideBar";
import {TopBar} from "../components/TopBar";
import {HomeLayout} from "../components/layouts/HomeLayout";
import axios from "axios";
import {checkUser} from "../middlewares/AuthenticationUser";

const Home = () => {

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
                    <HomeLayout />
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default Home;
