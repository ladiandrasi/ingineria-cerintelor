import React from "react";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import ModalComponent from "../../shared/modal/ModalComponent";
import ProfileComponent from "../../components/profile/ProfileComponent";

export default function ProfilePage() {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <NavbarComponent/>
            <ProfileComponent />
            <ModalComponent />
        </div>
    );
}
