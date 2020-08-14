import {request, baseUrl} from './content/request.js'

var _connects = {};
chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {

    if (/api/gi.test(req.type)) {
        console.log(req.type, req.info.method, req.info.url, req)
        request(req.info).then(res => {
            sendResponse(res.data)
        })
        return;
    }
    
    if (/cookie/gi.test(req.type)) {
        console.log(req.type, req.method, req)
        if (/get/gi.test(req.method)) {

            if (req.info.name) {
                chrome.cookies.get(req.info, function(res){
                    sendResponse(res)
                })
            }else{
                chrome.cookies.getAll(req.info, function(res){
                    sendResponse(res)
                })
            }
            
        }
        return;
    }

    sendResponse({})

});

chrome.cookies.onChanged.addListener(function(changeInfo) {
    
    if (baseUrl.indexOf(changeInfo.cookie.domain) >= 0) {
        console.log('onChanged', changeInfo.cookie.domain, changeInfo)
        if (Object.keys(_connects).length) {
            Object.keys(_connects).forEach(function(v,i){
                _connects[v].postMessage(changeInfo)
            })
        }
    }
});

chrome.extension.onConnect.addListener(function(port) {


    if (Object.keys(_connects).indexOf(port.name) < 0) {
        _connects[port.name] = port;
    }
    console.log(_connects)
    port.onMessage.addListener(function(msg) {
        console.log('onConnect', msg)
    });

    port.onDisconnect.addListener(function(port){
        console.log('onDisconnect',port)
        // 取断开时 长链的 host,token,key
        // chrome.extension.sendRequest(obj, cb);
        if (Object.keys(_connects).indexOf(port.name) >= 0) {
            delete _connects[port.name];
        }
    })
});
