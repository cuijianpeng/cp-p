import {request, baseUrl} from './content/request.js'

// status
// 0 - 9 [插件]
// 10 - 19 [cms] 10[未登录]
// 20 - 29 [平台]
var _connects = {},
    _status = 0;



chrome.browserAction.onClicked.addListener(function(tab) {
    // if (/^10$/gi.test(_status)) {
    //     window.open('http://45.63.123.94/backend/Moodle/login');
    //     return;
    // }
    // if (/^11$/gi.test(_status)) {
    //     window.open('http://45.63.123.94/backend/moodle/mainPage#');
    //     return;
    // }
    
});
chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {

    if (/fn/gi.test(req.type)) {
        if (/setBadgeText/gi.test(req.method)) {
            if (/\?/gi.test(req.info.text)) {
                _status = 10;
            }
            if (/!/gi.test(req.info.text)) {
                _status = 11;
            }
            chrome.browserAction.setBadgeText(req.info)
        }
        if (/setIcon/gi.test(req.method)) {
            chrome.browserAction.setIcon(req.info)
        }
        
        return;
    }
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
        var _portNameArray = port.name.split('-')
        // 取断开时 长链的 host,token,key
        // chrome.extension.sendRequest(obj, cb);
        if (Object.keys(_connects).indexOf(port.name) >= 0) {

            if (_portNameArray.length == 3) {

                chrome.cookies.getAll({url: baseUrl + 'backend/moodle'}, function(res){
                    var _cookies = {}
                    if (res && res.length) {
                      res.forEach(function(v,i){
                        _cookies[v.name] = v.value;
                      })
                    }

                    if (_cookies['mtk']) {
                        request({
                            url: baseUrl + 'backend/Moodle/platLogoff',
                            method: 'get',
                            headers: {
                                mtk: _cookies['mtk']?_cookies['mtk']: '',
                                fromHost: _portNameArray[0],
                                fromHostKey: _cookies['slave_user']?_cookies['slave_user']: '',
                                fromHostEmail: '',
                                fromHostAvatar: '',
                                fromHostNick: '',
                                fromHostBroken: 1,
                                fromHostToken: _portNameArray[1],
                            },
                            data: {}
                        }).then(res => {
                            console.log(res)
                            delete _connects[port.name];
                        }) 

                        return;
                    }

                    delete _connects[port.name];
                    

                })

                return;
            }

            delete _connects[port.name];
        }
    })
});
