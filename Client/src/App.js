import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/index";
import RootProvider from "./rootProvider";
import NotifierInitializer from "./Assets/Constants/NotifierInitializer";

const App = () => {
  return (
    <Router>
      <RootProvider>
        <NotifierInitializer /> 
        <AppRoutes />
      </RootProvider>
    </Router>
  );
};

export default App;
