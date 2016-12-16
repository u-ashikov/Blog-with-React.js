import React, {Component} from 'react';

export default class SideBar extends Component {
    render() {
        return (
        <div className="side-panel col-sm-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><strong>Most commented posts</strong></h4>
                </div>
                <div className="list-group margin-b-3">
                    <span>
                        {this.props.postsTitles}
                    </span>
                </div>
            </div>
        </div>
        )
    }
}