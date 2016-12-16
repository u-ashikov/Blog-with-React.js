import Requester from '../utilities/KinveyRequester'

let UserModel = {
    loginUser: function (data) {
        let loginRequest = new Requester('Basic');
        return loginRequest.ajaxPOST('user','login', data)
    },
    registerUser: function (data){
        let registerRequest = new Requester('Basic');
        return registerRequest.ajaxPOST('user','', data)
    },
    logoutUser: function(){
        let logoutRequest = new Requester('Kinvey');
        return logoutRequest.ajaxPOST('user','_logout')
    }
};

export default UserModel;

