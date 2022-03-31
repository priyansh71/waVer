import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
    const bg = useColorModeValue("light", "dark");

    return (
        <Box bg={bg}>
            <Header />
            <Main />
        </Box>
    );
}

export default App;
