import axios from './content/request.js'





chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {


    if (/api/gi.test(request.type)) {

    	axios(request.info).then(res=>{
    		sendResponse(res.data)
    	})

    	return;
    }


    sendResponse({})
});