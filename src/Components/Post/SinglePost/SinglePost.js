import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Requester from '../../../utilities/KinveyRequester'
import './SinglePost.css'
import '../AllPosts/AllPosts.css'
import '../../Comment/SingleComment.css';

export default class SinglePost extends Component {
    constructor(props){
        super(props);
        this.state={
            comments: null
        }
    }

    componentDidMount(){
        let requester = new Requester('Kinvey');
        let that = this;
        let postID = '' + this.props.id;
        requester.ajaxGET('appdata', `comments/?query={"postID":"${postID}"}`).then(function (success) {
            that.setState({
                comments: success.length
            })
        })
    }

    render() {
        return (
                <div className="single-post">
                    <div className="page-header">
                        <h1 className="post-title">{this.props.title}</h1>
                        <br/>
                        <img className="single-post-img" src={this.props.imageURL} role="presentation"/>
                        <p>Posted by  <span className="glyphicon glyphicon-user"/> <a href="#">{this.props.author}</a> on <span className="glyphicon glyphicon-time">{this.props.date.substring(0, 10)}</span>
                            <span className="post-buttons">{this.props.postCreator===sessionStorage.getItem('userID') ?
                            <span>
                                <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Edit</button> <button className="btn btn-primary" onClick={this.handleDelete.bind(this)}>Delete</button>
                            </span>
                            :null
                        }</span>
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <p>
                                {this.props.body}
                            </p>
                            <hr/>
                        </div>
                    </div>
                </div>
        );
    }

    handleClick(event) {
        event.preventDefault();
        browserHistory.push('/posts/'+this.props.id +'/edit');
    }

    handleDelete(event) {
        event.preventDefault();
        browserHistory.push('/posts/'+this.props.id + '/delete');
    }
}
