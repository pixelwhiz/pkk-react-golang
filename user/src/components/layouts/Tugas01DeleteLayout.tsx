import * as React from "react";
import {
    Box,
    Button, Card, CardBody, CardFooter, CardHeader, Flex,
    FormControl, FormErrorMessage,
    FormLabel, Grid, Heading,
    Input, Select,
    Table,
    TableCaption,
    Tbody,
    Td, Text,
    Th,
    Thead,
    Tr, useToast,
} from "@chakra-ui/react";
import { BsPencil, BsTrash } from "react-icons/all";
import axios from "axios";
import {register} from "../../serviceWorker";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useEffect, useLayoutEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {handleDeleteSiswa} from "../../middlewares/ErrorHandler";
import ModifySiswaSidebar from "../ModifySiswaSidebar";

interface Siswa {
    nis: number;
    name: string;
    gender: string;
    address: string;
    phone_number: string;
}

const Tugas01ModifyLayout: React.FC = () => {
    const params = useParams<{ nis: string }>();
    const nis = params.nis ?? "";

    const toast = useToast();
    const location = useLocation();

    const [nisform, setNISForm] = useState<string>("");
    const [fullname, setFullName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const submitForm = async () => {
        try {
            const formData = new FormData();
            formData.append('fullname', fullname);
            formData.append('gender', gender);
            formData.append('address', address);
            formData.append('phone_number', phoneNumber);
            const response = await axios.post(`http://localhost:8000/api/update/${nis}`, formData, {
                withCredentials: true
            });

            if (response.status === 200) {
                toast({
                    position: "top-left",
                    title: 'Success',
                    description: `Siswa dengan NIS '${nis}' berhasil di update!`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(() => {
                    window.location.href = "/daftarsiswa";
                }, 2000);
            }

        } catch (err) {

        }
    };

    const getSiswaByNIS = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/siswa/${nis}`, {
                withCredentials: true
            });
            if (response.status === 200) {
                setNISForm(response.data.nis);
                setFullName(response.data.name);
                setGender(response.data.gender);
                setAddress(response.data.address);
                setPhoneNumber(response.data.phone_number);
            }
        } catch (err) {
        }
    };

    useEffect(() => {
        getSiswaByNIS();
    }, []);


    const deleteSiswa = async () => {
        try {
            const formData = new FormData();
            formData.append('nis', nis);
            const response = await axios.delete(`http://localhost:8000/api/siswa/${nis}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                toast({
                    position: "top-left",
                    title: 'Success',
                    description: `Siswa dengan NIS '${nis}' berhasil dihapus!`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(() => {
                    window.location.href = "/daftarsiswa";
                }, 2000);
            }
        } catch (err: any) {
            handleDeleteSiswa(err, toast);
        }
    };

    const routeToDaftarSiswa = () => {
        window.location.href = "/daftarsiswa";
    };

    return (
        <Box height={"100vh"} overflowY={"auto"} className={"border-s-2 border-[#ddd] ms-72 bg-[#eee]"}>
            <Box className={"grid w-full gap-5"}>
                <Box className={"m-5"}>
                    <Flex className={"gap-5"}>
                        <ModifySiswaSidebar />
                        <Card className={"w-full px-10"} rounded={"1rem"}>
                            <CardHeader>
                                <Heading>Delete Confirmation</Heading>
                            </CardHeader>
                            <CardBody>
                                Apakah anda yakin akan menghapus siswa dengan NIS dengan ID <b>"{nis}"</b>?
                            </CardBody>
                            <CardFooter className={"flex justify-end gap-2.5"}>
                                <Button onClick={routeToDaftarSiswa} variant={"outline"} colorScheme="red">Back</Button>
                                <Button className={"w-32"} onClick={deleteSiswa} colorScheme="red">OK</Button>
                            </CardFooter>
                        </Card>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default Tugas01ModifyLayout;
