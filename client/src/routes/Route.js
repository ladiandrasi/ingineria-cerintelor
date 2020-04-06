import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

export default function RouteWrapper({
 component: Component,
 isPrivate,
 ...rest
}) {
    /**
     * If not included on both previous cases, redirect user to the desired route.
     */
    return <Route {...rest} component={Component}/>;
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false
};
