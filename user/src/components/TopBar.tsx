import * as React from "react";
import {Avatar, Box, Button, Card, Grid, Icon, Image, Stack, Text} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { FaGithub } from "react-icons/fa";
import {HomeIcon} from "@heroicons/react/24/outline";
import {BiMenuAltLeft, GrLogout, MdTitle} from "react-icons/all";
import {useEffect} from "react";
import axios from "axios";

export const TopBar = () => {

    const local_server = process.env.REACT_APP_LOCAL_SERVER;
    const network_server = process.env.REACT_APP_NETWORK_SERVER;

    const Logout = async () => {
        try {
            const response = await axios.post(`${local_server}/api/logout`, {}, {
                withCredentials: true
            });
            if (response.status === 200) {
                window.location.href = "/login";
            }
        } catch (err) {
            try {
                const response = await axios.post(`${network_server}/api/logout`, {}, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    window.location.href = "/login";
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <Box className={"p-5 border-s-2 h-20 border-b-2 border-[#ddd] ms-72"} backgroundColor={"#f8f9f9"} rounded={"none"}>
            <Box className={"flex justify-between"}>
                <Card rounded={"1rem"} className={"-mt-3.5 bg-white"} paddingY={"0.5rem"} paddingX={"1rem"} backgroundColor={""}>
                    <Box display={"flex"} gap={"1rem"}>
                        <Avatar name='Oshigaki Kisame' src='https://avatars.githubusercontent.com/u/111522987?v=4' />
                        <Grid className={""}>
                            <span className={"font-semibold"}>M Daffa Teuku FA</span>
                            <span className={"font-light"}>XII TKJ1 - Absen 20</span>
                        </Grid>
                    </Box>
                </Card>
                <Button onClick={Logout} gap={"1rem"} padding={"1rem"} rounded={"1rem"} _hover={{ backgroundColor: "#ddd" }} color={"black"}>
                    Logout
                    <Icon as={GrLogout} width={6} height={6} />
                </Button>
            </Box>
        </Box>
    );
};
