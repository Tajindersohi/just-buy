import React, { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/index";
import RootProvider from "./rootProvider";

const App = () => {

    return (
        <Router>
            <RootProvider>
                    <AppRoutes />
            </RootProvider>
        </Router>
    );
};

export default App;
