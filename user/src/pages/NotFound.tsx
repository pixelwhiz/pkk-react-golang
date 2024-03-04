import {ChakraProvider, Flex, Heading, Text, Image, Button} from "@chakra-ui/react";
const NotFoundImage = require("../404.png");

const NotFound = () => {
    const routeToHome = () => {
        window.location.href = "/home";
    };
    
    return (
        <ChakraProvider>
            <Flex
                minHeight="100vh"
                backgroundColor={"teal.50"}
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                textAlign="center"
            >
                <Image src={NotFoundImage} alt="404 Not Found" maxWidth="300px" mb={8} />
                <Heading as="h1" size="2xl" mb={4}>
                    404 - Not Found
                </Heading>
                <Text fontSize="xl" mb={4}>
                    Oops! Halaman yang Anda cari tidak ditemukan.
                </Text>
                <Button onClick={routeToHome}>
                    Back to Home
                </Button>
            </Flex>
        </ChakraProvider>
    );
};

export default NotFound;
