import React, { Component } from 'react';

class HomeView extends Component {
    render() {
        return (
            <div className="Home jumbotron">
                {sessionStorage.getItem('username') ?
                    <h1>Welcome, {sessionStorage.getItem('username')}</h1>
                    : <h1>Welcome , please Login or Register!!!</h1>
                }
            </div>
        );
    }
}

export default HomeView;
