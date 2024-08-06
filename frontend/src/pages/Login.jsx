import { Box, Container, Flex, FormControl, FormLabel, Heading, Stack } from "@chakra-ui/react";


const Login = () => {
    return (
        <Flex minH="100vh" align="center" justify="center">
            <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
                <Heading fontSize="4xl" mb={8}>
                    Sign into your account
                </Heading>
                <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                        </FormControl>
                    </Stack>
                </Box>
            </Container>
        </Flex>
    )
}

export default Login