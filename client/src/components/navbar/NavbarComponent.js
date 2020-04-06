import React, {Component} from 'react';
import './NavbarComponent.css';
import {Menu, Icon, Avatar, Input } from 'antd';
import LoginComponent from "./login/LoginComponent";
import RegisterComponent from "./register/RegisterComponent";
import AvatarComponent from "../../shared/avatar/AvatarComponent";
import {connect} from "react-redux";
import UserActions from "../../state/components/users/UserActions";
import { isEmpty } from 'lodash';
import ModalActions from "../../state/components/modal/ModalActions";
import { withRouter } from 'react-router-dom'
import PostActions from "../../state/components/posts/PostActions";

const {SubMenu} = Menu;
const { Search } = Input;

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginClick: false,
            registerClick: false,
        }
    }

    logoutHandler = () => {
        const { removeUser } = this.props;
        removeUser();
        this.props.history.push('/');
    };

    loginMenuItem = () => {
        const { openModal } = this.props;
        return (
            <Menu.Item onClick={() => openModal({ title: 'Login', width: '20%', childrenComponent: <LoginComponent />})} key="login" className="menu-account login">
                <Icon type="login" />
                <span >Login</span>

            </Menu.Item>
        )
    };

    registerMenuItem = () => {
        const { openModal } = this.props;
        return (
            <Menu.Item onClick={() => openModal({ title: 'Register', width: '40%', childrenComponent: <RegisterComponent />})} key="register" className="menu-account register">
                <Icon type="user-add" />
                <span>Register</span>
            </Menu.Item>
        )
    };

    handleProfileClick = () => {
        this.props.history.push({ pathname: '/profile', state: { childComponent: 'viewProfile'}});
    };

    loggedInMenuItem = () => {
        const { user: { profilePictureUrl, nickname } } = this.props;
        return (
            <SubMenu
                title={<span><AvatarComponent src={profilePictureUrl} size='medium' /> Hello, {nickname }</span>}
                className="menu-account logged-in"
            >
                <Menu.Item key="setting:1" onClick={this.handleProfileClick}>My Profile</Menu.Item>
                <Menu.Item key="setting:2" onClick={this.logoutHandler}>Logout</Menu.Item>
            </SubMenu>
        )
    };

    searchChange = async (e) => {
        const { value } = e.target;
        const { fetchPostsFiltered } = this.props;
        await fetchPostsFiltered(value);
    };

    render() {
        const fragments = [this.loginMenuItem(), this.registerMenuItem()];
        const { user } = this.props;
        return (
            <Menu className="navbar-container" mode="horizontal">
                <Menu.Item className="navbar-item" onClick={() => this.props.history.push('/')} key="home">
                    <Icon type="home" /> Home
                </Menu.Item>
                <Menu.Item className="navbar-item" onClick={() => this.props.history.push('/about')} key="about">
                    <Icon type="info-circle" /> About
                </Menu.Item>
                <Menu.Item className="navbar-item search-bar" key="search">
                    <Search
                        placeholder="Search for jobs..."
                        onChange={this.searchChange}
                        style={{ width: 400}}
                    />
                </Menu.Item>
                {isEmpty(user) ? fragments.map(fragment => fragment) : this.loggedInMenuItem()}
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user }
}

const mapDispatchToProps = dispatch => ({
    removeUser: () => dispatch(UserActions.remove()),
    openModal: (data) => dispatch(ModalActions.upsert(data)),
    closeModal: () => dispatch(ModalActions.remove()),
    fetchPostsFiltered: (filter) => dispatch(PostActions.fetchPostsFiltered(filter)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarComponent))
