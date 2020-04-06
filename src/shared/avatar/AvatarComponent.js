import {Avatar} from "antd";
import React from "react";

export default (props) => {
    const { size, src = "user.svg" } = props;
    return (
        <Avatar size={size} src={src} />
    )
}
