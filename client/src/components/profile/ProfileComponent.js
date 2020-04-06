import { Menu, Icon } from 'antd';
import React from "react";
import './ProfileComponent.css';
import GeneralInformationComponent from "./general/GeneralInformationComponent";
import JobsAppliedComponent from "./jobs-applied/JobsAppliedComponent";
import ViewProfileComponent from "./view-profile/ViewProfileComponent";
import { withRouter } from 'react-router-dom'
import ChangePasswordComponent from "./change-password/ChangePasswordComponent";
import {connect} from "react-redux";
import UserSelectors from "../../state/components/users/UserSelectors";
import FirmApplications from "./student-applications/FirmApplications";


const { SubMenu } = Menu;

class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childComponent: this.getComponent(),
        }
    }

    getComponent = () => {
        const { user } = this.props;
        if(!this.props.location.state || !this.props.location.state.childComponent) {
            return null
        }
        const componentName = this.props.location.state && this.props.location.state.childComponent;

        if(componentName === 'generalInformation') {
            return <GeneralInformationComponent />
        }

        if(componentName === 'jobsApplied') {
            return this.getJobApplicationsComponent();
        }

        return <ViewProfileComponent user={user} />

    };

    getJobApplicationsComponent = () => {
        const { isFirmUser } = this.props;
        return isFirmUser
            ? <FirmApplications />
            : <JobsAppliedComponent />
    };

    render() {
        const { childComponent } = this.state;
        const { user, isFirmUser } = this.props;
        return (
            <div className="profile-container">
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub2']}
                    mode="inline"
                    className="profile-menu"
                >

                    <Menu.Item onClick={ () => this.setState({ childComponent: <ViewProfileComponent user={user}/>})} key="1">Profile</Menu.Item>
                    <Menu.Item onClick={ () => this.setState({ childComponent: <GeneralInformationComponent />})} key="2">General</Menu.Item>
                    <Menu.Item onClick={ () => this.setState({ childComponent: <ChangePasswordComponent />})} key="3">Change Password</Menu.Item>
                    <Menu.Item onClick={ () => this.setState({ childComponent: this.getJobApplicationsComponent()})} key="4">Job Applications</Menu.Item>
                </Menu>
                <div className="profile-content-container">
                    {childComponent}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user, isFirmUser: UserSelectors.isFirmUser(state) }
}

const mapDispatchToProps = dispatch => ({
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileComponent));

