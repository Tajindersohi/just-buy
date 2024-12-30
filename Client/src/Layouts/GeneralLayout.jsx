import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
// import Footer from "../components/Footer";
// import Sidebar from "../components/Sidebar";

const GeneralLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div style={{ display: "flex" }}>
                {/* <Sidebar /> */}
                <main style={{ flex: 1, padding: "20px" }}>{children}</main>
            </div>
            <Footer/>
        </div>
    );
};

export default GeneralLayout;
