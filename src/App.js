import React, { Component } from 'react';
import './App.css';
//import components
import Header from './Components/Common/Header';
import observer from '../src/utilities/observer';
import Breadcrumbs from 'react-breadcrumbs';
import Alert from 'react-s-alert';
import Footer from './Components/Common/Footer'

class App extends Component {
    constructor(){
        super();
        this.state = {
            username: null
        };

        this.sessionChange = this.sessionChange.bind(this);
        observer.sessionChange = this.sessionChange;
    }

    sessionChange(){
        if(sessionStorage.getItem('userID')){
            this.setState({
                username: sessionStorage.getItem('username')
            })
        }else{
            this.setState({
                username: null
            })
        }
    }

    render() {
    return (
          <div className="App">
              <Header/>
              <Breadcrumbs routes={this.props.routes} params={this.props.params} setDocumentTitle={true}/>
              <div style={{minHeight: "488px"}}>
                 {this.props.children}
              </div>
              <Footer />
              <Alert stack={{limit: 3}} />
          </div>
        );
    }
}

export default App;
