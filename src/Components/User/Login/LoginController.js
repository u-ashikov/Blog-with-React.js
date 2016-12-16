import React, { Component } from 'react';
import LoginForm from './LoginForm'
import UserModel from '../../../Models/UserModel'
import Session from '../../../utilities/sessionStorageManager'
import {browserHistory} from 'react-router'
import observer from '../../../utilities/observer'
import Alert from 'react-s-alert'

export default class LoginController extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            submitDisabled:false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Login Form</h1>
                <LoginForm
                username={this.state.username}
                password={this.state.password}
                submitDisabled={this.state.submitDisabled}
                onChangeHandler={this.onChangeHandler}
                onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        )
    }

    onSubmitHandler(ev){
        ev.preventDefault();
        this.setState({
            submitDisabled:true
        });
        let that=this;
        let userData = {
            username: this.state.username,
            password: this.state.password
        };
        UserModel.loginUser(userData).then(function (response) {
                Session.save(response);
                observer.sessionChange();
                observer['password']=userData.password;
                Alert.closeAll();
                Alert.success('Successfully logged in', {timeout: 2000});
                browserHistory.push('/home');
        })
            .catch(function (err) {
                that.setState({
                    submitDisabled:false
                });
            })
    }

    onChangeHandler(event){
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }
}

LoginController.contextTypes = {
    router: React.PropTypes.object
};
