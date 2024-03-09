import * as React from "react";
import { Box, Button, Card, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import "../../style.css";
import {
    BsApp,
    BsArrowRight,
    BsArrowRightShort,
    BsArrowUp,
    BsAward,
    BsBoxArrowRight,
    BsLink,
    BsPerson,
    GrTasks
} from "react-icons/all";

const routeToDaftarSiswa = () => {
    window.location.href = "/daftarsiswa";
};

export const HomeLayout = () => (
    <Box
        height={"100vh"}
        overflowY={"auto"}
        className={"h-full border-s-2 border-[#ddd] ms-72"}
        bg={useColorModeValue("gray.100", "gray.800")}
    >
        <Box className={"m-5"}>
            <Card
                height={"75vh"}
                rounded={"1rem"}
                className={"flex items-center justify-center rounded-lg shadow-lg"}
                bg={useColorModeValue("white", "gray.700")}
                backgroundImage="url('https://c4.wallpaperflare.com/wallpaper/97/833/155/mountains-firewatch-green-forest-wallpaper-preview.jpg')"
                backgroundSize="cover"
                mixBlendMode="hard-light"
            >
                <Box textAlign="center">
                    <Heading as="h1" size="xl" mb={6} className={"font-semibold"} color={"teal.900"}>
                        Welcome to Our Platform
                    </Heading>
                    <Text fontSize="lg" mb={8} className={"font-medium"} color={"black"}>
                        We're excited to have you here! Get started now and explore our amazing features.
                    </Text>
                    <Button onClick={routeToDaftarSiswa} leftIcon={<BsBoxArrowRight />} backgroundColor={"teal.600"} colorScheme='teal' variant='solid'>
                        Get Started
                    </Button>
                </Box>
            </Card>
        </Box>
    </Box>
);