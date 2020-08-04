document.addEventListener('DOMContentLoaded', function() {

    if (location.host == 'mp.weixin.qq.com') {
        console.log('插入DOM元素!');
        var panel = document.createElement('div');
        panel.id = 'chrome-plugin-insertPage';
        document.body.insertBefore(panel, document.body.childNodes[0])
    }
});



// 向页面注入JS
function injectCustomJs(jsPath) {
    if (jsPath) {
        var temp = document.createElement('script');
        temp.setAttribute('type', 'text/javascript');
        // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
        temp.src = chrome.extension.getURL(jsPath);
        temp.onload = function() {
            // 放在页面不好看，执行完后移除掉
            this.parentNode.removeChild(this);
        };
        document.body.appendChild(temp);
    }

}


// chrome.extension.sendRequest({
//     type: 'cookie',
//     info: {
//         url: "https://mp.weixin.qq.com/cgi-bin/bizlogin?action=validate&lang=zh_CN&account=2698646143%40qq.com&token="
//     }
// }, function(res) {
//     console.log('weixin', res)
// });

// chrome.extension.sendRequest({
//     type: 'cookie',
//     info: {
//         url: "http://45.63.123.94/backend/Moodle/login"
//     }
// }, function(res) {
//     console.log('45.63.123.94', res)
// });
