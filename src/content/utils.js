import axios from './request.js'

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

function sendRequest(obj, cb) {
    var _searchObj = searchParse();
    if (_searchObj['mtk']) {
        obj.info.headers = {};
        obj.info.headers['mtk'] = _searchObj['mtk'];
        chrome.extension.sendRequest(obj, cb);
        return;
    }
    cb({})
}
export {
    searchParse,
    sendRequest
}