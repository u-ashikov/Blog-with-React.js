import React, { Component } from 'react';
import '../../../styles/PostFormStyle.css';

export default class EditPostView extends Component {
    render() {
        return (
            <div className="form-style-5">
                <form onSubmit={this.props.onsubmit}>
                    <fieldset>
                        <legend><span className="glyphicon glyphicon-pencil"></span> Edit Post</legend>
                        <input
                            className="form-control"
                            type="text"
                            name="postTitle"
                            required
                            value={this.props.title}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onchange}
                        />
                        <textarea
                            className="form-control"
                            type="text"
                            name="postBody"
                            rows="10"
                            required
                            value={this.props.body}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onchange}
                        >
                    </textarea>
                    </fieldset>
                    <input className="btn btn-default" type="submit" value="Edit Post" disabled={this.props.submitDisabled}/>
                </form>
            </div>
        )
    }
}