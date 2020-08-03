import axios from './content/request.js'





chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

    if (/api/gi.test(request.type)) {
        axios(request.info).then(res => {
            sendResponse(res.data)
        })
        return;
    }

    if (/cookie/gi.test(request.type)) {
        chrome.cookies.getAll({
            url: request.info.url
        }, function(res) {
            console.log(res)
            sendResponse(res)
        })
        return;
    }

    sendResponse({})

});

chrome.cookies.onChanged.addListener(function(changeInfo) {
    console.log(9090990, changeInfo)
});

setTimeout(function(){
    chrome.cookies.set({url:'https://mp.weixin.qq.com/cgi-bin/bizlogin?action=validate&lang=zh_CN&account=2698646143%40qq.com&token=',name: 'x111', value: '1111'})
},5000)
