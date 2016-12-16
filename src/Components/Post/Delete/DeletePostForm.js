import React, { Component } from 'react';
import '../../../styles/PostFormStyle.css';

export default class DeletePostForm extends Component {
    render() {
        return (
            <div className="form-style-5">
                <form onSubmit={this.props.ondelete}>
                    <fieldset>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={this.props.title}
                            readOnly="readOnly"
                        />
                        <input
                            className="form-control"
                            type="text"
                            name="author"
                            value={this.props.author}
                            readOnly="readOnly"
                        />
                        <textarea
                            className="form-control"
                            type="text"
                            name="description"
                            required
                            rows="10"
                            value={this.props.body}
                            readOnly="readOnly"
                        >
                    </textarea>
                    </fieldset>
                    <input className="btn btn-default" type="submit" value="Delete Post"/>
                </form>
            </div>
        )
    }
}
