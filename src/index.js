import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {IndexRoute, Router, Route, browserHistory} from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import Home from './Components/Home/HomeView'
import Login from './Components/User/Login/LoginController'
import Register from './Components/User/Register/RegisterController'
import Logout from './Components/User/Logout/LogoutController'
import Posts from './Components/Post/AllPosts/AllPostsController'
import CreatePost from './Components/Post/Create/CreatePostController';
import EditPost from './Components/Post/Edit/EditPostController';
import SinglePost from './Components/Post/SinglePost/SinglePostController';
import DeletePost from './Components/Post/Delete/DeletePostController';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route name="WebStep" path="/" component={App}>
            <IndexRoute name="Home" component={Home}/>
            <Route name="Home" path="/home" component={Home}/>
            <Route name="Login" path="/login" component={Login}/>
            <Route name="Register" path="/register" component={Register}/>
            <Route name="Logout" path="/logout" component={Logout}/>
            <Route name="Posts" path="/posts">
                <IndexRoute component={Posts}/>
                <Route name="PostLocator" path=":postID" component={SinglePost}>
                    <Route name="Edit Post" path="edit" component={EditPost}/>
                    <Route name="Delete Post" path="delete" component={DeletePost}/>
                </Route>
            </Route>
            <Route name="Create Post" path="/create-post" component={CreatePost}/>
        </Route>
    </Router>,
  document.getElementById('root')
);
