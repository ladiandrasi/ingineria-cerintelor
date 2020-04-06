import React from "react";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import MainComponent from "../../components/main/MainComponent";
import ModalComponent from "../../shared/modal/ModalComponent";
import AboutComponent from "../../components/about/AboutComponent";

export default function AboutPage() {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <NavbarComponent/>
            <AboutComponent />
            <ModalComponent />
        </div>
    );
}
