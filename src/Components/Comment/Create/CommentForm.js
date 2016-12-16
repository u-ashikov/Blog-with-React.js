import React, {Component} from 'react';
import '../../../styles/CommentFormStyle.css';

export default class CommentForm extends Component {
    render() {
        return (
            <div className="comment-form">
                <form onSubmit={this.props.onSubmitHandle}>
                    <fieldset>
                        <label name="field6"><span>Comment text: </span>
                            <textarea
                                name="commentBody"
                                className="textarea-field"
                                value={this.props.body}
                                onChange={this.props.onChangeHandler}
                        >
                        </textarea></label>
                        <label><span>&nbsp;</span><input className="btn btn-default" type="submit" value="Create Comment"/></label>
                    </fieldset>
                </form>
            </div>
            )
    }
}
