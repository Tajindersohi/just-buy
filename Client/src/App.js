import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/index";
import RootProvider from "./rootProvider";
import NotifierInitializer from "./Assets/Constants/NotifierInitializer";
import LoadingInitializer from "./Assets/Constants/LoadingInitializer";

const App = () => {
  
  return (
    <>
      <Router>
        <RootProvider>
          <NotifierInitializer /> 
          <LoadingInitializer/>
          <AppRoutes />
        </RootProvider>
      </Router>
    </>
  );
};

export default App;
