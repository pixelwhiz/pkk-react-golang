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
                                <Heading>Modify Data</Heading>
                            </CardHeader>
                            <CardBody>
                                <Box>
                                    <FormControl mb={4}>
                                        <FormLabel>NIS (Nomor Induk Siswa)</FormLabel>
                                        <Input disabled onChange={(e) => setNISForm(e.target.value.replace(/\D/g, ''))} value={nisform} variant={"filled"} focusBorderColor={"black"} placeholder='Nomor Induk Siswa' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Nama Lengkap</FormLabel>
                                        <Input onChange={(e) => setFullName(e.target.value)} value={fullname} variant={"filled"} focusBorderColor={"black"} placeholder='Nama Lengkap' />
                                    </FormControl>
                                    <FormControl my={4}>
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <Select onChange={(e) => setGender(e.target.value.replace(/\s/g, ''))} value={gender} variant={"filled"} focusBorderColor={"black"}>
                                            <option defaultChecked disabled>Select Gender</option>
                                            <option>Laki - Laki</option>
                                            <option>Perempuan</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Alamat</FormLabel>
                                        <Input onChange={(e) => setAddress(e.target.value)} value={address} variant={"filled"} focusBorderColor={"black"} type="text" name="address" placeholder={"Jln. Semeru No 164A"} />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Nomor HP</FormLabel>
                                        <Input onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} value={phoneNumber} variant={"filled"} focusBorderColor={"black"} type="text" name="phone_number" placeholder={"6289603788562"} />
                                    </FormControl>
                                </Box>
                            </CardBody>
                            <CardFooter className={"flex justify-end gap-2.5"}>
                                <Button onClick={routeToDaftarSiswa} variant={"outline"} colorScheme="teal">Back</Button>
                                <Button className={"w-32"} onClick={submitForm} colorScheme="teal">Save</Button>
                            </CardFooter>
                        </Card>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default Tugas01ModifyLayout;
