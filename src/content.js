var _version = '1.0.0'

document.addEventListener('DOMContentLoaded', function() {

    console.log('插入DOM元素!');

    if (location.host == 'mp.weixin.qq.com') {
        var panel = document.createElement('div');
        panel.id = 'chrome-plugin-insertPage';
        document.body.insertBefore(panel, document.body.childNodes[0])
    }

    if (location.host == '45.63.123.94') {
        var panel = document.createElement('div');
        panel.id = 'chrome-plugin-insertPage';
        panel.style.display = 'none'
        panel.innerText = _version;

        if (!document.getElementById('chrome-plugin-insertPage')) {
            document.body.insertBefore(panel, document.body.childNodes[0])
        }
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