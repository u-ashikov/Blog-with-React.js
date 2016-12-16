let Session = {
    save: function (data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('authToken', data._kmd.authtoken);
        sessionStorage.setItem('userID', data._id);
    },
    clear: function(){
        sessionStorage.clear();
    }
};

export default Session;
