import React, { Component } from 'react';
import EditPostView from './EditPostView';
import {loadSinglePost,editPost} from '../../../Models/PostModel';
import {browserHistory} from 'react-router';
import Alert from 'react-s-alert';

export default class EditPostController extends Component {
    constructor(props) {
        super(props);
        this.state=({
            postTitle:'',
            postAuthor:'',
            postBody:'',
            postDate:'',
            submitDisabled:false
        });

        this.savePostInformation=this.savePostInformation.bind(this);
        this.onChangeHandler=this.onChangeHandler.bind(this);
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        loadSinglePost(this.props.params.postID)
            .then(this.savePostInformation)
    }

    savePostInformation(post) {
       this.setState({
           postTitle:post.title,
           postAuthor:post.author,
           postBody:post.body,
           postDate:new Date()
       })
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState={};
        newState[event.target.name]=event.target.value;
        this.setState(newState);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({
            submitDisabled:true
        });
        let editedPost={
            title:this.state.postTitle,
            author:this.state.postAuthor,
            body:this.state.postBody,
            date:this.state.postDate
        };
        editPost(this.props.params.postID,editedPost)
            .then(function (response) {
                Alert.closeAll();
                Alert.success('Post Edited !', {timeout: 2000});
                browserHistory.push('/posts');
            })
    }

    render() {
        return (
            <div>
                <EditPostView
                    title={this.state.postTitle}
                    body={this.state.postBody}
                    onchange={this.onChangeHandler}
                    onsubmit={this.onSubmitHandler}
                    submitDisabled={this.state.submitDisabled}
                />
            </div>
        )
    }
}