import {Component} from 'react'
import Session from '../../../utilities/sessionStorageManager'
import {browserHistory} from 'react-router'
import UserModel from '../../../Models/UserModel'
import observer from '../../../utilities/observer'
import Alert from 'react-s-alert'

export default class LogoutController extends Component{

    componentDidMount(){
        UserModel.logoutUser();
        Session.clear();
        observer.sessionChange();
        Alert.success('Logged OUT successfully', {
           position: 'top-right',
            effect: 'bouncyflip',
            timeout: 1500
        });
        browserHistory.push('/home');
    }

    render(){
        return null
    }
}


