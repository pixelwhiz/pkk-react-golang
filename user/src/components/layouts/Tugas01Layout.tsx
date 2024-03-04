import * as React from "react";
import {
    Avatar,
    Box,
    Button, Card, Heading,
    Image,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td, Text, Tfoot,
    Th,
    Thead,
    Tr, VStack
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import {ColorModeSwitcher} from "../../ColorModeSwitcher";
import "../../style.css"
import {PencilIcon} from "@heroicons/react/24/solid";
import {BsPencil, BsTrash} from "react-icons/all";

export const Tugas01Layout = () => (
    <Box height={"100vh"} overflowY={"auto"} className={"border-s-2 border-[#ddd] ms-72 bg-[#eee]"}>
        <Box className={"m-5"}>
            <Card className={"p-5"} rounded={"1rem"}>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>NIS</Th>
                            <Th>Nama</Th>
                            <Th>Alamat</Th>
                            <Th>Nomor HP</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>233502321</Td>
                            <Td>Duta Dwi Saputra</Td>
                            <Td>Jln. Semeru 164 A</Td>
                            <Td>081808108514</Td>
                            <Td className={"flex gap-2.5"}>
                                <Button padding={"0rem"} colorScheme='blue'>
                                    <BsPencil className={"h-6 w-6"} />
                                </Button>
                                <Button padding={"0rem"} colorScheme='red'>
                                    <BsTrash className={"h-6 w-6"} />
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Card>
        </Box>
    </Box>
);
