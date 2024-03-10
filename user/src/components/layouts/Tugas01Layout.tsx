import * as React from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    FormControl,
    Heading,
    Input, InputGroup, InputLeftAddon,
    Kbd,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableCaption, TagLeftIcon,
    Tbody,
    Td, Text,
    Th,
    Thead,
    Tr, useDisclosure,
} from "@chakra-ui/react";
import {BsGear, BsPencil, BsPerson, BsSearch, BsTrash} from "react-icons/all";
import axios from "axios";
import {Form} from "react-router-dom";
import {ArrowDownLeftIcon, ArrowLeftIcon, ArrowUturnLeftIcon, ChevronDoubleLeftIcon} from "@heroicons/react/24/solid";
import {useEffect, useRef, useState} from "react";
import {worker} from "cluster";
import {checkUser} from "../../middlewares/AuthenticationUser";

interface Siswa {
    nis: number;
    name: string;
    gender: string;
    address: string;
    phone_number: string;
}

interface search  {
    nis: number;
    name: string;
}

const Tugas01Layout: React.FC = () => {
    const tableRef = useRef<HTMLTableElement>(null);
    const [siswaList, setSiswaList] = React.useState<Siswa[]>([]);
    const [activeSearch, setActiveSearch] = React.useState<search[]>([]);
    const [siswaSearch, setSiswaSearch] = React.useState<search[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    React.useEffect(() => {
        if (isOpen) {
            setActiveSearch([]);
        }
    }, [isOpen]);

    const searchTable = (searchText: string) => {
        setTimeout(() => {
            if (tableRef.current) {
                tableRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                onClose();
            }
        }, 500);
    };

    React.useEffect(() => {
        getAllSiswa();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        if (searchText == "") {
            setActiveSearch([]);
            return false;
        }
        setActiveSearch(siswaSearch.filter(siswa => siswa.name.toLowerCase().includes(searchText)).slice(0, 8));
    };

    const routeToCreate = () => {
        window.location.href = "/daftarsiswa/create";
    };

    const routeToModify = (id: number) => {
        window.location.href = `/daftarsiswa/${id}/modify`;
    };

    const getAllSiswa = async () => {
        try {
            const response = await axios.get<Siswa[]>("http://localhost:8000/api/get");
            setSiswaList(response.data);
            const searchList: search[] = response.data.map(siswa => ({ nis: siswa.nis, name: siswa.name }));
            setSiswaSearch(searchList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Box height={"100vh"} overflowY={"auto"} className={"border-s-2 border-[#ddd] ms-72 bg-[#eee]"}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <InputGroup>
                            <InputLeftAddon backgroundColor={"transparent"} borderColor={"transparent"}>
                                <BsSearch color={"teal"} className={"h-5 w-5"} />
                            </InputLeftAddon>
                            <Input onChange={(e) => handleSearch(e)} focusBorderColor={"transparent"} borderColor={"transparent"} _hover={{ borderColor: "transparent" }} placeholder={"Cari Siswa"} />
                        </InputGroup>
                    </ModalHeader>
                    <ModalBody className={"grid gap-5"}>
                        {activeSearch.map((s, index) => (
                            <Button paddingY={"2rem"} onClick={() => searchTable(s.name)} key={index} colorScheme={"gray"} _hover={{ backgroundColor: "teal.500", textColor: "white" }}>
                                <Box className={"flex w-full justify-between"}>
                                    <Box className={"flex gap-5"}>
                                        <BsPerson opacity={"0.5"} className={"h-5 w-5"} />
                                        <Text>{s.name}</Text>
                                    </Box>
                                    <Box>
                                        <ArrowUturnLeftIcon opacity={"0.5"} className={"h-5 w-5"} />
                                    </Box>
                                </Box>
                            </Button>
                        ))}
                    </ModalBody>

                </ModalContent>
            </Modal>
            <Box className={"m-5 grid gap-5"}>
                <Card className={"p-5"} rounded={"1rem"}>
                    <CardHeader>
                        <Box className={"flex justify-between"}>
                            <Box>
                                <Heading fontWeight={"medium"}>Daftar Siswa</Heading>
                            </Box>
                            <Box className={"flex gap-5"}>
                                <Button onClick={onOpen} backgroundColor={"white"} border={"0.05rem solid #000"} className={"flex justify-between"}>
                                    <Box className={"flex w-96 gap-2.5"}>
                                        <BsSearch height={"4"} width={"4"} />
                                        <span>Cari Siswa</span>
                                    </Box>
                                    <Box>
                                        <Kbd>CTRL</Kbd> + <Kbd>K</Kbd>
                                    </Box>
                                </Button>
                                <Button onClick={routeToCreate} colorScheme={"teal"}>Create New</Button>
                            </Box>
                        </Box>
                    </CardHeader>
                    <CardBody>
                        <Table ref={tableRef} variant='striped' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>NIS (Nomor Induk Siswa)</Th>
                                    <Th>Nama Lengkap</Th>
                                    <Th>Jenis Kelamin</Th>
                                    <Th>Alamat</Th>
                                    <Th>Nomor HP</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {siswaList.map((siswa) => (
                                    <Tr key={siswa.nis}>
                                        <Td>{siswa.nis}</Td>
                                        <Td>{siswa.name}</Td>
                                        <Td>{siswa.gender}</Td>
                                        <Td>{siswa.address}</Td>
                                        <Td>{siswa.phone_number}</Td>
                                        <Td className={"flex gap-2.5"}>
                                            <Button onClick={() => routeToModify(siswa.nis)} className={"flex gap-2.5"} paddingX={"1rem"} rounded={"full"} variant={"outline"} colorScheme={"teal"}>
                                                <BsGear className={"h-4 w-4"}/>
                                                <span className={"font-light"}>Modify</span>
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </CardBody>

                </Card>
            </Box>
        </Box>
    );
};

export default Tugas01Layout;
