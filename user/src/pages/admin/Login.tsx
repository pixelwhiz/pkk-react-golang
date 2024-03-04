import React, {useEffect, useState} from 'react';

import {
    Box,
    Button,
    Card, CardBody, CardFooter, CardHeader,
    ChakraProvider, Checkbox,
    Grid, Heading,
    Input,
    InputGroup,
    InputLeftAddon, InputRightAddon, Link, Spinner,
    Text,
    theme, useToast
} from "@chakra-ui/react";

import {useHref} from "react-router-dom";

import {SideBar} from "../../components/SideBar";
import {TopBar} from "../../components/TopBar";
import {BiLoader, BsLock, BsPerson, FaHandPointDown, IoMdPerson, MdLock, MdPerson, MdTitle} from "react-icons/all";
import {EyeIcon, EyeSlashIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/solid";


import axios from "axios";
import {BeatsOriginal} from "devicons-react";
const Login = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [response, setResponse] = useState<string>("");
    const toast = useToast();

    const local_server = process.env.REACT_APP_LOCAL_SERVER;
    const network_server = process.env.REACT_APP_NETWORK_SERVER;

    const submitForm = async () => {
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const responseLocal = await axios.post(`${local_server}/api/login`, formData, {
                withCredentials: true
            });

            if (responseLocal.status === 200) {
                if (!redirect) {
                    toast({
                        position: "top-left",
                        title: 'Welcome',
                        description: "You are logged in successfully!",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                    setTimeout(() => {
                        window.location.href = "/home";
                    }, 2000);
                    setRedirect(true);
                }
            }
        } catch (err) {
            try {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);

                const responseNetwork = await axios.post(`${network_server}/api/login`, formData, {
                    withCredentials: true
                });

                if (responseNetwork.status === 200) {
                    if (!redirect) {
                        toast({
                            position: "top-left",
                            title: 'Welcome',
                            description: "You are logged in successfully!",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                        });
                        setTimeout(() => {
                            window.location.href = "/home";
                        }, 2000);
                        setRedirect(true);
                    }
                }
            } catch (err) {
                toast({
                    position: "top-left",
                    title: 'Something went wrong',
                    description: `Your username or password is incorrect!`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    };


    const checkUserIsLoggedIn = async () => {
        try {
            const responseLocal = await axios.get(`${local_server}/api/user`, {
                withCredentials: true
            });

            if (responseLocal.status === 200) {
                if (!loading) {
                    window.location.href = "/home";
                }
            }
        } catch (err) {
            try {
                const responseNetwork = await axios.get(`${network_server}/api/user`, {
                    withCredentials: true
                });

                if (responseNetwork.status === 200) {
                    if (!loading) {
                        window.location.href = "/home";
                    }
                }
            } catch (err) {
                // Handle error jika kedua request juga gagal
            }
        }
    };


    useEffect(() => {
        checkUserIsLoggedIn();
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box className={"fixed w-full h-full bg-[#bdc3c7]"} backgroundPosition={"center"} backgroundSize={"cover"} backgroundBlendMode={"color-burn"} backgroundImage={"url(https://c4.wallpaperflare.com/wallpaper/97/833/155/mountains-firewatch-green-forest-wallpaper-preview.jpg)"}>
            <Card borderWidth={"0rem"} borderColor={"white"} className={"mx-96 mt-20"} padding={"1rem"} variant={"filled"} backgroundColor={"rgba(44,49,60,0.8)"} align='center'>
                <CardHeader display={"flex"} justifyContent={"center"} width={"full"}>
                    <Heading fontWeight={"medium"} className={"text-4xl text-white"}>Sign In to Your Account</Heading>
                </CardHeader>
                <CardBody className={"grid gap-5"} width={"full"}>
                    <Box className={"grid gap-1"}>
                        <Text className={"text-white font-medium"}>Username</Text>
                        <InputGroup size={"lg"}>
                            <InputLeftAddon>
                                <span>
                                    <BsPerson />
                                </span>
                            </InputLeftAddon>
                            <Input value={username} onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))} className={"text-white bg-transparent border"} variant={""} placeholder={"Enter Username"}/>
                        </InputGroup>
                    </Box>
                    <Box className={"grid gap-1"}>
                        <Text className={"text-white font-medium"}>Password</Text>
                        <InputGroup size={"lg"}>
                            <InputLeftAddon>
                                <BsLock />
                            </InputLeftAddon>
                            <Input value={password} onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))} className={"text-white bg-transparent border"} type={showPassword ? "password" : "text"} backgroundColor={""} variant={""} placeholder={"Enter Password"}/>
                            <InputRightAddon padding={"0rem"}>
                                <Button onClick={togglePasswordVisibility}>
                                    {showPassword ? (<EyeSlashIcon width={"1.5rem"} height={"1.5rem"} />) : (<EyeIcon width={"1.5rem"} height={"1.5rem"} />)}
                                </Button>
                            </InputRightAddon>
                        </InputGroup>
                    </Box>
                    <Box className={"flex justify-between"}>
                        <Box className={"flex gap-2.5"}>
                            <Checkbox defaultChecked colorScheme={"teal"} className={"text-white"} value='Remember Me'>Remember Me</Checkbox>
                        </Box>
                        <Link textColor={"teal"}>Forgot your password?</Link>
                    </Box>
                </CardBody>
                <CardFooter display={"grid"} width={"full"}>
                    <Button
                        onClick={submitForm}
                        size={"lg"}
                        color={"black"}
                        backgroundColor={"teal.500"}
                        isLoading={loading}
                        loadingText="Signing In..."
                    >
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </Box>
    );
};

export default Login;
