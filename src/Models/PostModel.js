import Requester from '../utilities/KinveyRequester'

function loadPosts() {
    let requester=new Requester('Kinvey');
    return requester.ajaxGET('appdata','posts');
}

function create(post) {
    let requester=new Requester('Kinvey');
    return requester.ajaxPOST('appdata','posts',post);
}

function loadSinglePost(postId) {
    let requester=new Requester('Kinvey');
    return requester.ajaxGET('appdata','posts',postId);
}

function getImage(postId) {
    let requester=new Requester('Kinvey');
    return requester.ajaxGET('blob', `?query={"postId":"${postId}"}`);
}

function editPost(postId,data) {
    let requester=new Requester('Kinvey');
    return requester.ajaxPUT('appdata','posts',postId,data);
}

function deletePost(postId) {
    let requester=new Requester('Kinvey');
    return requester.ajaxDELETE('appdata','posts',postId)
}

export {
        loadPosts,
        create,
        loadSinglePost,
        editPost,
        deletePost,
        getImage
};






