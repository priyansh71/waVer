import { Center, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const Greeting = () => {
    return (
        <>
            <Heading
                textAlign="center"
                size="3xl"
                fontFamily="Quicksand"
                my="4"
            >
                Hola, Amigos!
            </Heading>
            <Center flexDir="column">
                <Text
                    color={useColorModeValue("red.900", "teal.200")}
                    my="4"
                    fontSize="1.5em"
                >
                    I am Priyansh.
                    <br />I like working with the Web.
                </Text>
            </Center>
        </>
    );
};
