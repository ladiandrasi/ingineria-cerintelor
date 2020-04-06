import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import AboutPage from "../pages/about/AboutPage";


export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/about" exact component={AboutPage} />
        </Switch>
    );
}
