import * as React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import "../../style.css";

export const HomeLayout = () => (
    <Box height={"100vh"} overflowY={"auto"} className={"h-full border-s-2 border-[#ddd] ms-72 bg-[#eee]"}>
        <Box className={"m-5"}>
            <Box
                padding={"1rem"}
                rounded={"1rem"}
                bgGradient="linear(to-r, teal.500, teal.600)"
                boxShadow="lg"
                p="6"
                textAlign="center"
                bgClip="padding-box"
            >
                <Heading fontSize="3xl" mb={4}>
                    Welcome to My Awesome App
                </Heading>
                <Text fontSize="xl" mb={8}>
                    Start building something amazing!
                </Text>
                <Button backgroundColor={"white"} leftIcon={<FaGithub />}>
                    GitHub
                </Button>
            </Box>
        </Box>
    </Box>
);
