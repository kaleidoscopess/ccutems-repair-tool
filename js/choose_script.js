function chooseFix(mainFrame) {
    centerFrame = mainFrame.contentWindow.document.getElementById("centerFrame")
    if (centerFrame == null) {
        return
    }

    centerFrameHead = centerFrame.contentWindow.document.getElementsByTagName("head")[0];
    if (centerFrameHead == null) {
        return
    }
    
    centerFrameA = centerFrame.contentWindow.document.getElementsByTagName("a");
    centerFrameDocument = centerFrame.contentWindow.document;
    for (i = 0; i < centerFrameA.length; ++i) {
        if(centerFrameA[i].innerHTML.indexOf('选中') == -1){
            continue;
        }
        onClickAttribute = centerFrameA[i].getAttribute('onclick');//得到最初的onclick内容
        if (onClickAttribute.indexOf('vJsMod') > -1) {
            aParentNode = centerFrameA[i].parentNode//父节点
            aParentNode.removeChild(centerFrameA[i]);//删除a标签

            newonClick = onClickAttribute.replace('vJsMod', 'chooseCourse')
            var myA = centerFrameDocument.createElement('a');//新建a标签
            myA.setAttribute('href', 'javascript:void(0);');
            myA.setAttribute('onclick', newonClick);
            myA.innerHTML = "选中"
            aParentNode.appendChild(myA);
        }

    }
    if (!(centerFrameHead.innerHTML.indexOf('chose_fixA1') > -1)) {
        var oScript = centerFrameDocument.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = chrome.extension.getURL("js/chose_fixA1.js");
        centerFrameHead.appendChild(oScript);
    }
}

function unChooseFix(mainFrame) {
    bottomFrame = mainFrame.contentWindow.document.getElementById("bottomFrame")
    if (bottomFrame == null) {
        return
    }

    bottomFrameDocument = bottomFrame.contentWindow.document;
    bottomFrameHead = bottomFrameDocument.getElementsByTagName("head")[0];

    if (bottomFrameHead == null) {
        return
    }
    
    
    bottomFrameA = bottomFrameDocument.getElementsByTagName("a");

    for (i = 0; i < bottomFrameA.length; ++i) {
        if(bottomFrameA[i].innerHTML.indexOf('退选') == -1){
            continue;
        }
        onClickAttribute = bottomFrameA[i].getAttribute('onclick');//得到最初的onclick内容
        if (onClickAttribute.indexOf('vJsMod') > -1) {
            aParentNode = bottomFrameA[i].parentNode//父节点
            aParentNode.removeChild(bottomFrameA[i]);//删除a标签

            newonClick = onClickAttribute.replace('vJsMod', 'unChooseCourse')
            var myA = bottomFrameDocument.createElement('a');//新建a标签
            myA.setAttribute('href', 'javascript:void(0);');
            myA.setAttribute('onclick', newonClick);
            myA.innerHTML = "退选"
            aParentNode.appendChild(myA);
        }

    }
    if (!(bottomFrameHead.innerHTML.indexOf('chose_fixA1') > -1)) {
        var oScript = bottomFrameDocument.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = chrome.extension.getURL("js/chose_fixA1.js");
        bottomFrameHead.appendChild(oScript);
    }
}

function setTimer() {
    var t1 = window.setInterval(function () {

        outerFrame = document.getElementsByTagName("iframe")[0]
        if (outerFrame == null) {
            return
        }
        mainFrame = outerFrame.contentWindow.document.getElementsByName("mainFrame")[0]
        if (mainFrame == null) {
            return
        }
        chooseFix(mainFrame)
        unChooseFix(mainFrame)

    }, 1000);
}

setTimer();