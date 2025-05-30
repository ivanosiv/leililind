import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import lightBackground from '../src/assets/wa-background-light.png';
import darkBackground from '../src/assets/wa-background-dark.jpg';
import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#2C7B3F",
					borderRadius: "8px",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#0B1F36",
					borderRadius: "8px",
                },
            },
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#0B1F36" : "#FFFFFF" },
				sair: { main: mode === "light" ? "#0B1F36" : "#2C2C2C" },
				vcard: { main: mode === "light" ? "#2C7B3F" : "#666666" },
                textPrimary: mode === "light" ? "#0B1F36" : "#FFFFFF",
                borderPrimary: mode === "light" ? "#0B1F36" : "#FFFFFF",
                dark: { main: mode === "light" ? "#2C2C2C" : "#F3F3F3" },
                light: { main: mode === "light" ? "#F3F3F3" : "#2C2C2C" },
                tabHeaderBackground: mode === "light" ? "#EEE" : "#2C7B3F",
                optionsBackground: mode === "light" ? "#fafafa" : "#0B1F36",
				options: mode === "light" ? "#fafafa" : "#2C7B3F",
				fontecor: mode === "light" ? "#2C7B3F" : "#FFFFFF",
                fancyBackground: mode === "light" ? "#fafafa" : "#2C2C2C",
				bordabox: mode === "light" ? "#EEE" : "#2C2C2C",
				newmessagebox: mode === "light" ? "#EEE" : "#2C2C2C",
				inputdigita: mode === "light" ? "#FFFFFF" : "#2C2C2C",
				contactdrawer: mode === "light" ? "#FFFFFF" : "#2C2C2C",
				announcements: mode === "light" ? "#ededed" : "#2C2C2C",
				login: mode === "light" ? "#FFFFFF" : "#1C1C1C",
				announcementspopover: mode === "light" ? "#FFFFFF" : "#2C7B3F",
				chatlist: mode === "light" ? "#EEE" : "#2C2C2C",
				boxlist: mode === "light" ? "#ededed" : "#2C2C2C",
				boxchatlist: mode === "light" ? "#ededed" : "#0B1F36",
                total: mode === "light" ? "#FFFFFF" : "#222222",
                messageIcons: mode === "light" ? "grey" : "#F3F3F3",
                inputBackground: mode === "light" ? "#FFFFFF" : "#2C2C2C",
                barraSuperior: mode === "light" ? "linear-gradient(to right, #0B1F36, #0B1F36 , #0B1F36)" : "#2C7B3F",
				boxticket: mode === "light" ? "#EEE" : "#2C2C2C",
				campaigntab: mode === "light" ? "#ededed" : "#2C7B3F",
				mediainput: mode === "light" ? "#ededed" : "#1C1C1C",
				contadordash: mode == "light" ? "#FFFFFF" : "#FFFFFF",
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                      <Routes />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
