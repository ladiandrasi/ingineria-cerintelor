 import React, { Component } from 'react';
import './MainComponent.css';
import {Col, Row} from "antd";
import ProfileInformationComponent from "./profile-information/ProfileInformationComponent";
import PostsComponent from "./posts/PostsComponent";
import LatestJobsComponent from "./latest-jobs/LatestJobsComponent";

export default class MainComponent extends Component {
    render() {
        console.log('here');
        return (
            <Row style={{marginLeft: '0px', marginRight: '0px'}} className="grid-row" gutter={48}>
                <Col className="grid-col" span={5}>
                    <ProfileInformationComponent />
                </Col>
                <Col style={{paddingTop: "30px"}} className="grid-col" span={12}>
                    <PostsComponent />
                </Col>
                <Col className="grid-col" span={7}>
                    <LatestJobsComponent />
                </Col>
            </Row>
        )
    }
}
