import React, {Component} from "react";
import { Editor } from '@tinymce/tinymce-react';
import './EditorComponent.css';
import {connect} from "react-redux";
import {Button, Card, Form, Icon, Input, message} from "antd";
import PostActions from "../../../state/components/posts/PostActions";
import AvatarComponent from "../../avatar/AvatarComponent";

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            jobTitle: '',
            jobPosition: '',
            shortDescription: '',
        }
    }

    createPost = () => {
        const { user: { _id: userId } } = this.props;
        return {
            postedBy: userId,
            likedBy: [],
            dislikedBy: [],
            ...this.state,
        }
    };

    postButtonHandler = async () => {
        const { insertPost, stopPost } = this.props;
        await insertPost(this.createPost());
        stopPost();
        message.success('Post added successfully!');
    };

    handleEditorChange = (e) => {
        this.setState({
            content: e.target.getContent(),
        })
    };

    handleInputChange = (e, propertyName) => {
        this.setState({
            [propertyName]: e.target.value
        })
    };

    render() {
        const { user, stopPost } = this.props;
        const { nickname, profilePictureUrl } = user;
        const { jobTitle, jobPosition, shortDescription } = this.state;
        return (
            <div>
                <div id="overlay" onClick={stopPost}/>
                <div className='editor-container'>
                    <Card title={<span><Icon type="edit" /> Post an offer</span>} extra={<Icon onClick={stopPost} type="close" />} >
                        <div className='posted-by-container'>
                            <AvatarComponent src={profilePictureUrl} size='large'/>
                            <span>{nickname}</span>
                        </div>
                        <div />
                        <div>
                            <Form {...formItemLayout}>
                                <Form.Item label="Title">
                                    <Input className='job-title-input' onChange={(e) => this.handleInputChange(e, 'jobTitle')} placeholder='Job Title' value={jobTitle}/>
                                </Form.Item>
                                <Form.Item label="Position">
                                    <Input className='job-position-input' onChange={(e) => this.handleInputChange(e, 'jobPosition')}  placeholder='Job Position' value={jobPosition}/>
                                </Form.Item>
                                <Form.Item label="Short Description">
                                    <TextArea className='job-short-description-input' rows={4} onChange={(e) => this.handleInputChange(e, 'shortDescription')}  placeholder='Short Description' value={shortDescription}/>
                                </Form.Item>
                            </Form>
                        </div>
                        <Editor
                            apiKey='filzaov29ux3b3g2fukyq3x66t9eotokfmyvg896syyrjikg'
                            initialValue=""
                            value={this.state.content}
                            selector='.editor-container'
                            toolbar= 'myCustomToolbarButton'
                            init={{
                                height: 150,
                                placeholder: 'test',
                                setup: function (editor) {
                                    editor.on('init', function () {
                                        this.setContent('<p style="opacity: 0.5">Job posting content...</p>');
                                    });
                                    editor.on('focus', function () {
                                        this.setContent('');
                                    })
                                },
                                templates: [
                                    {title: 'Some title 1', description: 'Some desc 1', content: 'My content'},
                                    {title: 'Some title 2', description: 'Some desc 2', url: 'development.html'}
                                ],
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen'
                                ],
                            }}
                            onChange={this.handleEditorChange}
                        />
                        <div className='button-container'>
                            <Button className='post-button' onClick={this.postButtonHandler} type='primary'><Icon type="book" />Post</Button>
                        </div>
                    </Card>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user }
}

const mapDispatchToProps = dispatch => ({
    insertPost: (post) => dispatch(PostActions.insertPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorComponent)
