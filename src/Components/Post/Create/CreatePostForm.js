import React, { Component } from 'react';
import '../../../styles/PostFormStyle.css';

export default class CreatePostForm extends Component {
    render() {
        return (
        <div className="form-style-5">
            <form onSubmit={this.props.onsubmit}>
                <fieldset>
                    <legend><span className="glyphicon glyphicon-pencil"></span> Create Post</legend>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        required
                        placeholder="Post title*"
                        value={this.props.title}
                        onChange={this.props.onchange}
                        disabled={this.props.submitDisabled}
                    />
                    <textarea
                        className="form-control"
                        type="text"
                        name="description"
                        required
                        placeholder="Post description*"
                        rows="10"
                        value={this.props.description}
                        onChange={this.props.onchange}
                        disabled={this.props.submitDisabled}
                    >
                    </textarea>
                    <input
                        className="uploaded-file"
                        name="uploadedFile"
                        type="file"
                        onChange={this.props.fileSubmit}
                        disabled={this.props.submitDisabled}
                    />
                </fieldset>
                <input className="btn btn-default" type="submit" value="Create Post" disabled={this.props.submitDisabled}/>
            </form>
        </div>
        )
    }
}