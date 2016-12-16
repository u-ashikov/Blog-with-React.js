import Alert from 'react-s-alert'

let errorHandler = {
    handleAjaxError: function (reason) {
        let errorMsg = JSON.stringify(reason);
        if (reason.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (reason.responseJSON &&
            reason.responseJSON.description)
            errorMsg = reason.responseJSON.description;
        Alert.error(errorMsg, {timeout: false, position: 'top', offset: 50})
    }
};

export default errorHandler;
