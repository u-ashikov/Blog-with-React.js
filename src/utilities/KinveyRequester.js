import $ from 'jquery'
import errorHandler from '../utilities/errorHandler'

const appKey = 'kid_r15MCj0Mx';
const appSecret = 'fa4ad2bea7ea4565aee56ff4511ed329';
const baseUrl = 'https://baas.kinvey.com/';
const basicAuthBase64 = btoa(appKey+":"+appSecret);


export default class Requester {
    constructor(authType) {
        switch (authType) {
            case 'Basic':
                this.authorization = {Authorization: 'Basic ' + basicAuthBase64};
                break;
            case 'Kinvey':
                this.authorization = {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')};
                break;
            default: console.log('wrong authorization in request'); break;
        }
    }

    ajaxGET(module, uri, id){
        if(id){
            return $.ajax({
                method: 'GET',
                url: `${baseUrl + module}/${appKey}/${uri}/${id}`,
                headers: this.authorization,
                error: errorHandler.handleAjaxError
            })
        }else{
            return $.ajax({
                method: 'GET',
                url: `${baseUrl + module}/${appKey}/${uri}`,
                headers: this.authorization,
                error: errorHandler.handleAjaxError
            })
        }
    }

    ajaxPOST(module, uri, data){
        return $.ajax({
            method: 'POST',
            url: `${baseUrl + module}/${appKey}/${uri}`,
            headers: this.authorization,
            data: JSON.stringify(data),
            contentType: 'application/json',
            error: errorHandler.handleAjaxError
        })
    }

    ajaxPUT(module, uri, id, data){
        return $.ajax({
            method: 'PUT',
            url: `${baseUrl + module}/${appKey}/${uri}/${id}`,
            headers: this.authorization,
            data: JSON.stringify(data),
            contentType: 'application/json',
            error: errorHandler.handleAjaxError
        })
    }

    ajaxDELETE(module, uri, id){
        return $.ajax({
            method: 'DELETE',
            url: `${baseUrl + module}/${appKey}/${uri}/${id}`,
            headers: this.authorization,
            error: errorHandler.handleAjaxError
        })
    }
}

