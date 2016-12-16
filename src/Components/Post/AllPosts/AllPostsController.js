import React, { Component } from 'react';
import Post from './Post'
import './AllPosts.css'
import Requester from '../../../utilities/KinveyRequester'
import SideBar from '../../Common/SideBar';
import '../../Common/SideBar.css';
import Pager from 'rc-pager';
import 'rc-pager/assets/bootstrap.css';
import {Link} from 'react-router';
import {loadPosts} from '../../../Models/PostModel';
import {getCommentsByPostId} from '../../../Models/CommentModel';

export default class AllPostsController extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: new Map(),
            current: 0,
            mostCommentedPosts: []
        };
        this.requester = new Requester('Kinvey');
        this.prevPages=[0];
        this.pagesCount = 0;
        this.postsPerPage = [];
    }

    handleSkip(page) {
        this.setState({
            current: page,
        });
        if(this.prevPages.includes(page)){
            this.postsPerPage = [1];
        }
        if(!this.prevPages.includes(page)){
            this.postsPerPage = [];
            this.prevPages.push(page);
            let _self = this;
            this.requester.ajaxGET('appdata', `posts/?query={}&sort={"date":-1}&limit=4&skip=${page * 4}`).then(function (success) {
                for(let post of success){
                    _self.postsPerPage.push(<Post key={post._id}
                                     id={post._id}
                                     title={post.title}
                                     body={post.body.length>100 ?
                                     post.body.substring(0,100)+"..."
                                         :
                                         post.body
                                     }
                                     author={post.author}
                                     date={post.date}
                                     postCreator={post._acl.creator}
                    />);
                }
                let postsMap = new Map(_self.state.posts);
                postsMap.set(`page${page}` , _self.postsPerPage);
                _self.setState({ posts: postsMap })
            });
        }
    }

    componentDidMount(){
        let _self = this;
        this.postsPerPage = [];
        let mostCommentedPosts={};
        loadPosts().then(function (success){
            for (let post of success) {
                getCommentsByPostId(post._id)
                    .then(function (comments) {
                        let commentsLength=comments.length;
                        let postTitle=post.title;
                        mostCommentedPosts[post._id]={};
                        let obj={
                            title:postTitle,
                            comments:commentsLength
                        };
                        mostCommentedPosts[post._id]=obj;
                        let keys=Object.keys(mostCommentedPosts).sort(function (postA,postB) {
                            return mostCommentedPosts[postB].comments-mostCommentedPosts[postA].comments;
                        });
                        let allPostsComments=[];
                        for (let i=0;i<5;i++) {

                            let postComments=mostCommentedPosts[keys[i]].comments;
                            let postTitle=mostCommentedPosts[keys[i]].title;
                            if (postComments>3) {
                                allPostsComments.push(<div className="list-group-item" key={i}><div><Link to={'/posts/' + keys[i]}>{postTitle}</Link></div><div className="pulse"><strong>{postComments}</strong></div></div>);

                                _self.setState({
                                    mostCommentedPosts:allPostsComments
                                });
                            }
                        }
                    });
            }
            _self.pagesCount = Math.ceil(success.length/4);
            _self.requester.ajaxGET('appdata', 'posts/?query={}&sort={"date":-1}&limit=4&skip=0').then(function (success) {
                for(let post of success){
                    _self.postsPerPage.push(<Post key={post._id}
                                     id={post._id}
                                     title={post.title}
                                     body={post.body.length > 100 ?
                                     post.body.substring(0,200)+"..."
                                         :
                                         post.body
                                     }
                                     author={post.author}
                                     date={post.date}
                                     postCreator={post._acl.creator}
                    />);
                }
                let postsMap = new Map(_self.state.posts);
                postsMap.set('page0', _self.postsPerPage);
                _self.setState({ posts: postsMap })
            });
        });
    }

    render() {
        if(this.state.posts.size !== 0 && this.postsPerPage.length !== 0){
            return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <SideBar
                                    postsTitles={this.state.mostCommentedPosts}
                                />
                                <div className="posts-view col-sm-8">
                                    <h1>All Posts</h1>
                                    {this.state.posts.get(`page${this.state.current}`)}
                                </div>
                            </div>
                        </div>
                        <Pager total={this.pagesCount}
                               current={this.state.current}
                               onSkipTo={this.handleSkip.bind(this)}/>
                    </div>
            )
        }
        return <div className="alert alert-success" role="alert">Loading...</div>;
    }
}
