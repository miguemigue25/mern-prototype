import {
    Alert,
    AlertIcon,
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link as ChakraLink,
    Stack,
    Button
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { Link } from "react-router-dom";
import { resetPassword } from "../lib/api";


// eslint-disable-next-line react/prop-types
const ResetPasswordForm = ({ code }) => {
    const [password, setPassword] = useState("");
    const {
        mutate: resetUserPassword,
        isPending,
        isSuccess,
        isError,
        error
    } = useMutation({
        mutationFn: resetPassword
    })

    return (
        <>
            <Heading fontSize="4xl" mb={8}>
                <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
                    {isError && (
                        <Box mb={3} color="red.400">
                            {error.message || "An error occurred"}
                        </Box>
                    )}
                    {isSuccess ? (<Box>
                        <Alert status="success" borderRadius={12} mb={3}>
                            <AlertIcon />
                            Password updated successfully!
                        </Alert>
                        <ChakraLink as={Link} to="/login" replace>
                            Sign In
                        </ChakraLink>
                    </Box>
                    ) : (
                        <Stack spacing={4}>
                            <FormControl id="password">
                                <FormLabel>New Password</FormLabel>
                                <Input
                                    autoFocus
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && resetUserPassword({ password, verificationCode: code })}
                                />
                            </FormControl>
                            <Button
                                my={2}
                                isLoading={isPending}
                                isDisabled={password.length < 6}
                                onClick={() => resetUserPassword({
                                    password,
                                    verificationCode: code
                                })
                                }
                            >
                                Reset Password
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Heading>
        </>
    )
}

export default ResetPasswordForm