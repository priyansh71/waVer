import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
    light: "#F7FAFC",
    dark: "#1A202C",
};

const styles = {
    global: (props) => ({
        body: {
            bg: mode("#F7FAFC", "#1A202C")(props),
        },
    }),
};

const breakpoints = {
    sm: "15em",
    md: "60em",
    lg: "90em",
};

const fonts = {
    nunito: "Nunito",
    body: "Quicksand",
};

const components = {
    Button: { baseStyle: { _focus: { boxShadow: "none" } } },
};
// 3. extend the theme
const theme = extendTheme({
    styles,
    colors,
    breakpoints,
    fonts,
    components,
});

export default theme;
