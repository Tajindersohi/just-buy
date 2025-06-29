import React, { useMemo, useState, useEffect, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/index";
import RootProvider from "./rootProvider";
import NotifierInitializer from "./Assets/Constants/NotifierInitializer";
import LoadingInitializer from "./Assets/Constants/LoadingInitializer";
import { CartSync } from "./Assets/CartSync";
import { getTheme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

// Create Context
export const ColorModeContext = createContext();
const App = () => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <RootProvider>
            <NotifierInitializer />
            <LoadingInitializer />
            <AppRoutes />
            <CartSync />
          </RootProvider>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
