//模态对话框实现
function myModalDialog(url, arg, feature) {
    var opFeature = feature.split(";");
    var featuresArray = new Array()
    if (document.all) {
        for (var i = 0; i < opFeature.length - 1; i++) {
            var f = opFeature[i].split("=");
            featuresArray[f[0]] = f[1];
        }
    }
    else {
        for (var i = 0; i < opFeature.length - 1; i++) {
            var f = opFeature[i].split(":");
            featuresArray[f[0].toString().trim().toLowerCase()] = f[1].toString().trim();
        }
    }
    var h = "200px", w = "400px", l = "100px", t = "100px", r = "yes", c = "yes", s = "no";
    if (featuresArray["dialogheight"]) h = featuresArray["dialogheight"];
    if (featuresArray["dialogwidth"]) w = featuresArray["dialogwidth"];
    if (featuresArray["dialogleft"]) l = featuresArray["dialogleft"];
    if (featuresArray["dialogtop"]) t = featuresArray["dialogtop"];
    if (featuresArray["resizable"]) r = featuresArray["resizable"];
    if (featuresArray["center"]) c = featuresArray["center"];
    if (featuresArray["status"]) s = featuresArray["status"];
    var modelFeature = "height = " + h + ",width = " + w + ",left=" + l + ",top=" + t + ",model=yes,alwaysRaised=yes" + ",resizable= " + r + ",celter=" + c + ",status=" + s;

    var model = window.open(url, "", modelFeature, null);

    model.dialogArguments = arg;

}

//选课方法
function chooseCourse(htmlurl, tmpWidth, tmpHeight) {
    htmlurl = getRandomUrl(htmlurl);
    var newwin = '';
    var buf = confirm('确定选课吗?');
    if (buf) {
        var modWidth = tmpWidth + 200;
        var modHeight = tmpHeight - 100;
        var iTop = (window.screen.height - 30 - modHeight) / 2; //获得窗口的垂直位置; 
        var iLeft = (window.screen.width - 10 - modWidth) / 2; //获得窗口的水平位置; 

        newwin = myModalDialog(htmlurl, window, "dialogWidth:" + modWidth + "px;status:no;dialogHeight:" + modHeight + "px;dialogleft:" + iLeft + "px;dialogtop:" + iTop + "px;");
        var form1 = document.getElementsByName("Form1")[0];
        creating.style.visibility = "visible";
        form1.PageNum.value = 1;
        form1.submit();
        document.getElementById('alldiv').disabled = true;
    }
}

//退选方法
function unChooseCourse(htmlurl, tmpWidth, tmpHeight) {
    htmlurl = getRandomUrl(htmlurl);
    var newwin = '';
    var buf = confirm('您确定要退选吗?')
    if (buf) {
        var modWidth = tmpWidth + 200;
        var modHeight = tmpHeight - 100;
        var iTop = (window.screen.height - 30 - modHeight) / 2; //获得窗口的垂直位置; 
        var iLeft = (window.screen.width - 10 - modWidth) / 2; //获得窗口的水平位置; 
        newwin = myModalDialog(htmlurl, window, "dialogWidth:" + modWidth + "px;status:no;dialogHeight:" + modHeight + "px;dialogleft:" + iLeft + "px;dialogtop:" + iTop + "px;");
        setTimeout(function () {//延时刷新选中课程列表
            var form2 = document.getElementsByName("Form1")[0];
            form2.OrderBy.value = "kcmc desc";
            creating.style.visibility = "visible";
            form2.PageNum.value = 1;
            form2.submit();
            document.getElementById('alldiv').disabled = true;
        }, 500);

    }
}