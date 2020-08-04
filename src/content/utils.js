import {baseUrl} from './request.js'

function searchParse() {
    var resultObj = {};
    var search = window.location.search;
    if (search && search.length > 1) {
        var search = search.substring(1);
        var items = search.split('&');
        for (var index = 0; index < items.length; index++) {
            if (!items[index]) {
                continue;
            }
            var kv = items[index].split('=');
            resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1];
        }
    }
    return resultObj;
}

function getCookie(obj,cb){
    console.log(obj)
    chrome.extension.sendRequest(obj, cb);
}

function sendRequest(obj, cb) {
    obj.info.url = baseUrl + obj.info.url;
    chrome.extension.sendRequest(obj, cb);
}
export {
    searchParse,
    sendRequest,
    getCookie
}