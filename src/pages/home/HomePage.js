import React from "react";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import MainComponent from "../../components/main/MainComponent";
import ModalComponent from "../../shared/modal/ModalComponent";

export default function HomePage() {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <NavbarComponent/>
            <MainComponent />
            <ModalComponent />
        </div>
    );
}
