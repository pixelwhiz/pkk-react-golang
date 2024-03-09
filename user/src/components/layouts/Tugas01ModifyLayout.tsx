import * as React from "react";
import {
    Box,
    Button, Card, CardBody, CardFooter, CardHeader,
    FormControl, FormErrorMessage,
    FormLabel, Heading,
    Input, Select,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr, useToast,
} from "@chakra-ui/react";
import { BsPencil, BsTrash } from "react-icons/all";
import axios from "axios";
import {register} from "../../serviceWorker";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {handleDeleteSiswa} from "../../middlewares/ErrorHandler";

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

    const [nisform, setNISForm] = useState<string>("");
    const [fullname, setFullName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const submitForm = async () => {
        try {
            const formData = new FormData();
            formData.append('nis', nisform);
            formData.append('name', fullname);
            formData.append('gender', gender);
            formData.append('address', address);
            formData.append('phone_number', phoneNumber);
            const response = await axios.post("http://localhost:8000/api/create", formData, {
                withCredentials: true
            });
        } catch (err) {

        }
    };

    useEffect(() => {
        getSiswaByNIS();
    });

    const getSiswaByNIS = async () => {
        try {
            const formData = new FormData();
            formData.append('nis', nis);
            const response = await axios.post("http://localhost:8000/api/get_siswa_by_id", formData, {
                withCredentials: true
            });
            if (response.status === 200) {

            }
        } catch (err) {
        }
    };

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
            <Box className={"mx-52 m-5 grid gap-5"}>
                <Card className={"p-5"} rounded={"1rem"}>
                    <CardHeader>
                        <Heading>Modify Data</Heading>
                    </CardHeader>
                    <CardBody>
                        <FormControl mb={4} isRequired>
                            <FormLabel>NIS (Nomor Induk Siswa)</FormLabel>
                            <Input onChange={(e) => setNISForm(e.target.value.replace(/\D/g, ''))} value={nisform} variant={"filled"} focusBorderColor={"black"} placeholder='Nomor Induk Siswa' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <Input onChange={(e) => setFullName(e.target.value)} value={fullname} variant={"filled"} focusBorderColor={"black"} placeholder='Nama Lengkap' />
                        </FormControl>
                        <FormControl my={4} isRequired>
                            <FormLabel>Jenis Kelamin</FormLabel>
                            <Select onChange={(e) => setGender(e.target.value.replace(/\s/g, ''))} value={gender} variant={"filled"} focusBorderColor={"black"}>
                                <option defaultChecked disabled>Select Gender</option>
                                <option>Laki - Laki</option>
                                <option>Perempuan</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Alamat</FormLabel>
                            <Input onChange={(e) => setAddress(e.target.value)} value={address} variant={"filled"} focusBorderColor={"black"} type="text" name="address" placeholder={"Jln. Semeru No 164A"} />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Nomor HP</FormLabel>
                            <Input onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} value={phoneNumber} variant={"filled"} focusBorderColor={"black"} type="text" name="phone_number" placeholder={"6289603788562"} />
                        </FormControl>
                    </CardBody>
                    <CardFooter className={"flex justify-between gap-2.5"}>
                        <Box className={"flex gap-2.5"}>
                            <Button onClick={deleteSiswa} colorScheme="red">Delete</Button>
                        </Box>
                        <Box className={"flex gap-2.5"}>
                            <Button onClick={routeToDaftarSiswa} variant={"outline"} colorScheme="teal">Back</Button>
                            <Button type="submit" colorScheme="teal">Save</Button>
                        </Box>
                    </CardFooter>
                </Card>
            </Box>
        </Box>
    );
};

export default Tugas01ModifyLayout;
