import { AxiosError } from 'axios';
import { useToast } from "@chakra-ui/react";

export const handleCreateSiswa = (err: any, toast: ReturnType<typeof useToast>) => {
    if (err.response) {
        const status = err.response.status;
        if (status === 500) {
            toast({
                position: "top-left",
                title: 'Error',
                description: "NIS sudah terdaftar!",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    } else {
        const errorMessage = err.response.data.error || "Error occurred";
    }
};

export const handleDeleteSiswa = (err: any, toast: ReturnType<typeof useToast>) => {
    if (err.response) {
        const status = err.response.status;
        if (status === 500) {
            toast({
                position: "top-left",
                title: 'Error',
                description: "NIS sudah terdaftar!",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    } else {
        const errorMessage = err.response.data.error || "Error occurred";
    }
};
