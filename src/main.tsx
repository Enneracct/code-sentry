import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#121212",
    secondary: "#1e1e1e",
    accentOne: "#ff1cf6",
    bgAccent: "#343434",
    divider: "#2a2a2a",
    scrollbar: "rgb(161, 17, 203)",
  },

  fonts: {
    body: `"Roboto", sans-serif`,
    logo: `"IBM Plex Mono", monospace`,
  },

  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },

  styles: {
    global: {
      body: {
        fontFamily: "body",
        fontWeight: "regular",
        color: "white",
        backgroundColor: "#121212",
        height: "100svh",
      },

      logo: {
        fontFamily: "body",
        fontWeight: "regular",
      },

      "::-webkit-scrollbar": {
        borderRadius: "0.25rem",
        width: "10px",
        height: "10px",
      },
      "::-webkit-scrollbar-track": {
        borderRadius: "0.25rem",
        background: "#161616",
      },
      "::-webkit-scrollbar-thumb": {
        borderRadius: "0.25rem",
        background: "scrollbar",
      },
      "::-webkit-scrollbar-corner": {
        backgroundColor: "none",
      },

      ".my-scroll-box::-webkit-scrollbar": {},
      ".my-scroll-box::-webkit-scrollbar-track": {
        backgroundColor: "secondary",
      },
      ".my-scroll-box::-webkit-scrollbar-thumb": {
        backgroundColor: "scrollbar",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
