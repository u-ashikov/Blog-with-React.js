import React, { Component } from 'react';
import CreatePostForm from './CreatePostForm';
import {create} from '../../../Models/PostModel';
import {browserHistory} from 'react-router';
import Alert from 'react-s-alert';
import $ from 'jquery';
import observer from '../../../../src/utilities/observer';

export default class CreatePostController extends Component{
    constructor(props) {
        super(props);
        this.state={
            title:'',
            description:'',
            uploadedFile:'',
            submitDisabled:false,
            userPass:''
        }
    }

    componentDidMount() {
        let newState={
            'userPass':observer.password
        };
        this.setState(newState);
    }

    render() {
        return (
            <div>
                <CreatePostForm
                    title={this.state.title}
                    description={this.state.description}
                    onsubmit={this.handleSubmit.bind(this)}
                    onchange={this.handleChange.bind(this)}
                    submitDisabled={this.state.submitDisabled}
                    fileSubmit={this.handleImageChange.bind(this)}
                />
            </div>
        )
    }

    handleImageChange(event) {
      event.preventDefault();
      let newState={};
      newState[event.target.name]=event.target.files[0];
      this.setState(newState);
    }

    handleSubmit(event) {
        let that=this;
        event.preventDefault();
        this.setState({
            submitDisabled:true
        });
        let file=this.state.uploadedFile;

        let data={
            title:this.state.title,
            author:sessionStorage.getItem('username'),
            body:this.state.description,
            date:new Date()
        };
        create(data)
            .then(function (response) {
                if (file!=="") {
                    let metadata= {
                        '_filename':file.name,
                        'size':file.size,
                        'mimeType':file.type,
                        'postId':response._id,
                        "_public":true
                    };
                    that.uploadData(metadata,file);
                }
                Alert.closeAll();
                Alert.success('Post created !', {timeout: 2000});
                browserHistory.push('/posts')
            });
    }

    uploadData(data,file) {
        let username=sessionStorage.getItem('username');
        let password=this.state.userPass;
        let userCredentials=btoa(username+":"+password);
        let requestURL='https://baas.kinvey.com/blob/kid_r15MCj0Mx';
        let requestHeaders={
            'Authorization':'Basic '+userCredentials,
            'Content-Type':'application/json',
            'X-Kinvey-Content-Type':data.mimeType
        };

        $.ajax({
            method:'POST',
            url:requestURL,
            headers:requestHeaders,
            data:JSON.stringify(data)
        })
            .then (function (success) {
                let innerHeaders=success._requiredHeaders;

                innerHeaders['Content-Type']=file.type;

                let uploadUrl=success._uploadURL;
                //let id=success._id;

                    $.ajax({
                        method:'PUT',
                        url:uploadUrl,
                        headers:innerHeaders,
                        processData:false,
                        data:file
                    })
                        .then(function (success) {
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    handleChange(event) {
        let newState={};
        newState[event.target.name]=event.target.value;
        this.setState(newState);
    }
}

