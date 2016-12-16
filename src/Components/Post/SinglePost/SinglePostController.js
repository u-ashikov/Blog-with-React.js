import React, { Component } from 'react';

import SinglePost from '../SinglePost/SinglePost'
import SingleComment from '../../Comment/SingleComment';
import CommentForm from '../../Comment/Create/CommentForm';

import {loadSinglePost, getImage} from '../../../Models/PostModel';
import {createComment,loadComments} from '../../../Models/CommentModel';

import Alert from 'react-s-alert';

import $ from 'jquery';

import observer from '../../../../src/utilities/observer';

export default class SinglePostController extends Component {
    constructor(props){
        super(props);
        this.state ={
            post: null,
            postId:null,
            postComments:[],
            commentBody:null,
            userPass:''
        }
    }

    componentDidMount(){
        let _self = this;
        let newState={
            'userPass':observer.password
        };
        _self.setState(newState);
        sessionStorage.setItem('singlePostId',this.props.params.postID);
        let imageDiv=$('<div>');
        loadSinglePost(this.props.params.postID)
            .then(function (post) {
                let imageURL = '';
                getImage(post._id)
                    .then (function (success) {
                        if(success.length > 0){
                            let url=success[0]._downloadURL;
                            imageURL = success[0]._downloadURL;
                            let link=document.createElement('a');
                            link.download=url.substr(url.lastIndexOf('/'));
                            link.href=url;
                            imageDiv
                                .append(link);
                        }
                        _self.setState({
                            post: <SinglePost key={post._id}
                                              id={post._id}
                                              title={post.title}
                                              body={post.body}
                                              author={post.author}
                                              date={post.date}
                                              postCreator={post._acl.creator}
                                              image={imageDiv}
                                              imageURL={imageURL}
                            />,
                            postId:post._id
                        });
                })
                    .catch(function (err) {
                        console.log(err);
                    })
                ;
        });
        loadComments()
            .then(function (comments) {
                let currentPostId=sessionStorage.getItem('singlePostId');
                let commentsPost=[];
                comments=comments.filter(c=>c.postID===(currentPostId.toString()));
                for (let comment of comments) {
                    commentsPost.push(<SingleComment
                        key={comment._id}
                        body={comment.body}
                        author={comment.author}
                        date={comment.date.substring(0,10)}
                    />)
                }
                _self.setState({
                   postComments:commentsPost
                });
            })
    }

    handleCommentSubmit(event) {
        event.preventDefault();
        let comment={
            author:sessionStorage.getItem('username'),
            body:this.state.commentBody,
            date:new Date(),
            postID:this.state.postId
        };
        createComment(comment)
            .then(function (response) {
                Alert.closeAll();
                Alert.success('Comment created !', {timeout: 2000});
                window.location.reload();
            })
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }


    render() {
        let style={
            float:'left',
            margin:'10px 20px 50px 50px'
        };
        if(this.state.post){
            let currentLocation = this.props.location.pathname.split('/').pop();
            if(currentLocation === 'delete' || currentLocation === 'edit'){
                return <div>{this.props.children}</div>
            }
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            {this.state.post}
                        </div>
                    </div>
                        <div>
                            <h1>{this.state.postComments.length || undefined} Comments:</h1>
                            <hr/>
                            {this.state.postComments}
                        </div>
                    <hr/>
                    <div style={style}>
                        <h1>Leave a comment: </h1>
                        <CommentForm
                            onChangeHandler={this.onChangeHandler.bind(this)}
                            onSubmitHandle={this.handleCommentSubmit.bind(this)}
                        />
                    </div>
                </div>
            )
        }
        return <div className="alert alert-success" role="alert">Loading...</div>;
    }
}
