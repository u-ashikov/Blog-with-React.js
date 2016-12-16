import React, { Component } from 'react';
import Alert from 'react-s-alert';
import {browserHistory} from 'react-router';
import DeletePostForm from './DeletePostForm';

import {loadSinglePost,deletePost} from '../../../Models/PostModel';
import {getCommentsByPostId,deleteComment} from '../../../Models/CommentModel';

export default class DeletePostController extends Component {
    constructor(props) {
        super(props);
        this.state=({
            postID: null,
            post: null
        });
        this.ondelete = this.ondelete.bind(this);
    }

    componentDidMount(){
        let _self = this;
        loadSinglePost(this.props.params.postID)
            .then(function (post) {
           _self.setState({
               postID: post._id,
               post: <DeletePostForm title={post.title} body={post.body} author={post.author} ondelete={_self.ondelete}/>
           })
        });
    }

    render() {
        if(this.state.post){
            return (
                <div className="posts-view">
                    <h1>Delete Post</h1>
                    {this.state.post}
                </div>
            );
        }
        return <div className="alert alert-success" role="alert">Loading...</div>;
    }

    ondelete(ev){
        ev.preventDefault();
        getCommentsByPostId(this.state.postID)
            .then(function (comments) {
                if (comments.length>0) {
                    for (let comment of comments) {
                        deleteComment(comment._id);
                    }
                }
            })
            .then(
                deletePost(this.state.postID)
                    .then(function (success) {
                        browserHistory.push('/posts');
                        Alert.success('Post Deleted', {
                            timeout: 1500,
                            effect: 'bouncyflip',
                            position: 'bottom',
                            offset: 50
                        })
                })
            )
    }
}
