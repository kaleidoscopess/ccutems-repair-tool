//初始化菜单参数
var menuItems = new Array();
var topMenuItems = new Array();
var linkItems = new Array();
var userId = "";
var topmenu;//用来保存顶级菜单
var topMenuLength = 0;
var menuLength = 0;
var linkLength = 0;
//父节点ID，本身ID，权限名称，权限描述，权限路径，权限图片
function send_request(url, SystemBh) {

	xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
	xhr.send();
	fixLoad(xhr.responseXML, SystemBh);
}

function fixLoad(tmpxml, SystemBh) {

	try {
		//加载顶层菜单开始
		var topXml = document.evaluate("/Menus/topMenus/Menu", tmpxml, null, XPathResult.ANY_TYPE, null);
		var topItem = topXml.iterateNext(); //枚举第一个元素

		while (topItem) { // 对 nodes 执行操作; 
			topMenuItems[topMenuLength] = new Array();
			topMenuItems[topMenuLength][0] = topItem.getAttribute('parentid');
			topMenuItems[topMenuLength][1] = SystemBh + "_" + topItem.getAttribute('id');
			topMenuItems[topMenuLength][2] = topItem.getAttribute('name');
			topMenuItems[topMenuLength][3] = topItem.getAttribute('title');
			topMenuItems[topMenuLength][4] = topItem.getAttribute('path');
			topMenuItems[topMenuLength][5] = topItem.getAttribute('imageUrl');
			topMenuItems[topMenuLength][6] = topItem.getAttribute('defaultPage');
			topMenuLength++;
			topItem = topXml.iterateNext(); //枚举下一个元素
		}
		//加载顶层菜单结束

		//加载一层菜单开始
		var menuXml = document.evaluate("/Menus/Level1Menus/Menu", tmpxml, null, XPathResult.ANY_TYPE, null);
		var menuItem = menuXml.iterateNext(); //枚举第一个元素
		while (menuItem) {
			menuItems[menuLength] = new Array();
			menuItems[menuLength][0] = SystemBh + "_" + menuItem.getAttribute("parentid");
			menuItems[menuLength][1] = SystemBh + "_" + menuItem.getAttribute("id");
			menuItems[menuLength][2] = menuItem.getAttribute("name");
			menuItems[menuLength][3] = menuItem.getAttribute("title");
			menuItems[menuLength][4] = menuItem.getAttribute("path");
			menuItems[menuLength][5] = menuItem.getAttribute("imageUrl");
			menuLength++;
			menuItem = menuXml.iterateNext(); //枚举下一个元素
		}
		//加载一层菜单结束

		//加载二层菜单开始
		var linkXml = document.evaluate("/Menus/Level2Menus/Menu", tmpxml, null, XPathResult.ANY_TYPE, null);
		var linkItem = linkXml.iterateNext(); //枚举第一个元素
		while (linkItem) {
			linkItems[linkLength] = new Array();
			linkItems[linkLength][0] = SystemBh + "_" + linkItem.getAttribute("parentid");
			linkItems[linkLength][1] = SystemBh + "_" + linkItem.getAttribute("id");
			linkItems[linkLength][2] = linkItem.getAttribute("name");
			linkItems[linkLength][3] = linkItem.getAttribute("title");
			linkItems[linkLength][4] = linkItem.getAttribute("path");
			linkItems[linkLength][5] = linkItem.getAttribute("imageUrl");
			linkLength++;
			linkItem = linkXml.iterateNext(); //枚举下一个元素
		}
		//加载二层菜单结束
	}
	catch (eii) {
		alert("加载编号为" + SystemBh + "的应用系统失败，可能是网络延迟问题！");
		console.log(eii)
	}

}

var tmptbody = "";

//生成Top菜单
function loadTopMenu() {

	var topMenu = "";
	var top = 77;//固定高度等于77
	var left = 28;//固定左边宽度

	for (var i = 0; i < topMenuItems.length; i++) {
		topMenu += "<div id='KjFs" + i + "' class=desktop_ico style='position: absolute; left:" + left + "px; top:" + top + "px;'>";
		topMenu += "<p class='p1'>";
		topMenu += "<img style='cursor: pointer ' src='../framework/images/menu_icons/" + topMenuItems[i][5] + "' ondblclick=";
		topMenu += "javascript:KjFsLinkEvent(document.getElementById('KjFsBt" + i + "').innerText,'new_window.jsp?lianjie=" + topMenuItems[i][6] + "','" + topMenuItems[i][1] + "'); ";
		topMenu += "onmousedown=javascript:m('KjFs" + i + "');    />";
		topMenu += "</p><p class='p1' id='KjFsBt" + i + "' >" + topMenuItems[i][2] + "</p></div>";

		//判断页面高度是否大与450  如果大与 则换移动左边距
		top = top + 85;
		if (top > 450) {
			left = left + 86;
			top = 77;
		}
	}

	document.getElementById("centernav").innerHTML = topMenu;
}

//创建菜单条上的小菜单
function createBottomTd(title) {

	var divbot = document.getElementById("topMenuDiv");
	var newCell = document.getElementById("subToolTbl").rows[0].insertCell();
	if (getIEVersion() >= 8) {
		document.getElementById("subToolTbl").width = 109 * document.getElementById("subToolTbl").rows[0].cells.length;
	} else {
		document.getElementById("subToolTbl").style.width = 109 * document.getElementById("subToolTbl").rows[0].cells.length;
	}
	newCell.id = "subToolTblTd" + Winid;
	newCell.title = title;
	newCell.name = "tableWin" + Winid;
	newCell.innerHTML = "<span menu='menu4' id=subToolTblTd" + Winid + ";>" + title + "</span>";
	newCell.onclick = new Function("showCurrentPage(" + Winid + ")");
	newCell.menu = 'menu4';
	showCurrentPage(Winid);
}

//显示Tab菜单
function showCurrentPage(PageNum) {

	if (PageNum == 0 || document.getElementById("win" + PageNum) == null) {
		return (false);
	}

	if (PageNum == currentPage) {
		if (document.getElementById("win" + PageNum).style.display == "none") {
			MyWin.Show("win" + PageNum);
			return (false);
		}
		if (oldPageNum == 0 || document.getElementById("win" + oldPageNum) == null) {
			if (document.getElementById("win" + PageNum).style.display == "none") {

				MyWin.Show("win" + PageNum);
			}
			else {
				document.getElementById("subToolTblTd" + PageNum).className = "tdClassNoSelect";
				document.getElementById("win" + PageNum).style.display = "none";
			}
		}
		else {
			if (document.getElementById("win" + oldPageNum).style.display == "none") {
				document.getElementById("subToolTblTd" + PageNum).className = "tdClassNoSelect";
				document.getElementById("win" + PageNum).style.display = "none";
			}
			else {
				showCurrentPage(oldPageNum);
			}
		}
		return (false);
	}

	MyWin.Show("win" + PageNum);
}

//关闭tab菜单
function closeSubPage(PageNum) {

	document.getElementById("iframeTr" + PageNum).removeNode(true);
	document.getElementById("subToolTblTd" + PageNum).removeNode(true);

	showCurrentPage(0);
}
//刷新当前页面
function refurbishCurrentPage() {
	var temp = document.getElementById("currentPage").value;
	document.getElementById("frm" + temp).src = document.getElementById("frm" + temp).src;
}


//移动菜单DIV
var Timer;
function aa(Dir) {
	document.all('MENUDIV').doScroll(Dir); Timer = setTimeout('aa("' + Dir + '")', 100);
}

//停止滚动条	
function StopScroll() {
	try {
		if (Timer != null) clearTimeout(Timer)
	}
	catch (exception) {
		;
	}
}

//打开二级菜单窗口

function KjFsLinkEvent(BT, URL, menuid) {
	topmenu = menuid;//获取顶级菜单ID 保存到topmenu里
	MyWin.Create(BT, "[pg]" + URL, 1, document.documentElement.clientWidth - 70, document.documentElement.clientHeight - 38, 1, 1);
	createBottomTd(BT);

}

//鼠标监听
//主要功能：M（） 桌面图标单击移动 
//		  D_NewMouseMove()鼠标左键点下拖动鼠标时
//          D_NewMouseUp()  鼠标左键按下时
var Mouse_Obj = "none";
var pX
var pY
function m(c_Obj) {
	Mouse_Obj = c_Obj;

	pX = parseInt(document.all(Mouse_Obj).style.left) - event.x;
	pY = parseInt(document.all(Mouse_Obj).style.top) - event.y;
	document.onmousemove = D_NewMouseMove;
	document.onmouseup = D_NewMouseUp;
}
function D_NewMouseMove() {

	if (Mouse_Obj != "none") {

		document.all(Mouse_Obj).style.left = pX + event.x;

		document.all(Mouse_Obj).style.top = pY + event.y;

		event.returnValue = false;
	}
}
function D_NewMouseUp() {

	if (Mouse_Obj != "none") {

		var tmpx = document.all(Mouse_Obj).offsetLeft;
		var tmpy = document.all(Mouse_Obj).offsetTop;

		try {
			var str = tmpx + "," + tmpy;
			setCookie(userId + Mouse_Obj, str);
		}
		catch (erro) {
			alert('本机已阻止cookie运行，请更改安全设置！');
		}
		Mouse_Obj = "none";
	}

}
/////拖动层结束

/**左边下拉列表JS**/
var LastLeftID = "";
function menuFix() {
	try {
		var obj = document.getElementById("leftmenu").getElementsByTagName("li");

		for (var i = 0; i < obj.length; i++) {
			obj[i].onmouseover = function () {
				this.className += (this.className.length > 0 ? " " : "") + "sfhover";
			}
			obj[i].onMouseDown = function () {
				this.className += (this.className.length > 0 ? " " : "") + "sfhover";
			}
			obj[i].onMouseUp = function () {
				this.className += (this.className.length > 0 ? " " : "") + "sfhover";
			}
			obj[i].onmouseout = function () {
				this.className = this.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
			}
		}
	} catch (erro) {
	}
}
function DoMenu(emid) {
	try {
		var obj = document.getElementById(emid);
		obj.className = (obj.className.toLowerCase() == "expanded" ? "collapsed" : "expanded");
		if ((LastLeftID != "") && (emid != LastLeftID)) //关闭上一个Menu
		{
			document.getElementById(LastLeftID).className = "collapsed";
		}
		LastLeftID = emid;
	} catch (erro) {
	}
}
function GetMenuID() {
	var MenuID = "";
	var _paramStr = new String(window.location.href);
	var _sharpPos = _paramStr.indexOf("#");

	if (_sharpPos >= 0 && _sharpPos < _paramStr.length - 1) {
		_paramStr = _paramStr.substring(_sharpPos + 1, _paramStr.length);
	}
	else {
		_paramStr = "";
	}

	if (_paramStr.length > 0) {
		var _paramArr = _paramStr.split("&");
		if (_paramArr.length > 0) {
			var _paramKeyVal = _paramArr[0].split("=");
			if (_paramKeyVal.length > 0) {
				MenuID = _paramKeyVal[1];
			}
		}

	}

	if (MenuID != "") {
		DoMenu(MenuID)
	}
}
GetMenuID(); //*这两个function的顺序要注意一下，不然在Firefox里GetMenuID()不起效果
menuFix();

//MAIN页面右边箭头收缩

function switchSysBar() {
	//document.getElementById("jiantou").style.display="none";
	document.getElementById("ind_right").style.display = "none";;
	document.getElementById("jiantou").innerHTML = "<div style=position: absolute; right:0px; top:0px;  ><div style='height:100%;  text-align:right; vertical-align:middle; float:right; padding-top:260px;'><img src=../framework/images/new_08.gif onclick='switchSysBaropen();' /></div></div>";
}
//MAIN页面右边箭头掌开
function switchSysBaropen() {
	document.getElementById("jiantou").innerHTML = "<div class=shortcuts id=jiantou style=' position: absolute; right:0px; top:0px;' ><div class='arrow'><img src=./images/new_09.gif onclick='switchSysBar();' /></div></div>"
	document.getElementById("ind_right").style.display = "";;
}
//页面刷新

function doShowDesk() {
	if (document.getElementById("subToolTbl").rows[0].cells.length > 0) {
		tmpId = document.getElementById("subToolTbl").rows[0].cells[document.getElementById("subToolTbl").rows[0].cells.length - 1].id.substring(12);
		document.getElementById("win" + tmpId).style.display = "";
	}
	for (i = 0; i < document.getElementById("subToolTbl").rows[0].cells.length; i++) {
		tmpId = document.getElementById("subToolTbl").rows[0].cells[i].id.substring(12);
		if (document.getElementById("win" + tmpId).style.display == "") {
			MyWin.Min("win" + tmpId);
		}
	}
}

//移动底部菜单
function doMoveTopDiv(moveFlag) {
	if (moveFlag == "left") {
		if (parseInt(document.getElementById("subToolTbl").style.pixelLeft) + parseInt(document.getElementById("subToolTbl").style.width) > document.getElementById("idContainer2").clientWidth)
			document.getElementById("subToolTbl").style.pixelLeft = document.getElementById("subToolTbl").style.pixelLeft - 107;
	}
	else {
		if (document.getElementById("subToolTbl").style.pixelLeft < 0)
			document.getElementById("subToolTbl").style.pixelLeft = document.getElementById("subToolTbl").style.pixelLeft + 107;
	}
}

function getUserId(UserId) {
	userId = UserId;
}

//设置cookie，默认保持30天
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	//document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookie
function getCookie(name) {
	//var arr = document.cookie.match(new RegExp("(^|   )" + name + "=([^;]*)(;|$)"));
	var arr = document.cookie.split(";");
	if (arr != null) {
		for (var i = 0; i < arr.length; i++) {
			var theTmp = arr[i].split("=");
			if (name == trimstr(theTmp[0]))
				return unescape(theTmp[1]);
		}
	}
	return "";
}
//删除一个cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}
//右键菜单最大化
function Maximize(e) {
	var aid = e.name;
	aid = aid.replace(";", "");
	var wind = aid.substring(aid.lastIndexOf("d") + 1, aid.length);
	var win = document.getElementById("win" + wind);
	MyWin.Show(win.id);
}
//右键菜单最小化
function Minimize(e) {
	var aid = e.name;
	aid = aid.replace(";", "");
	var wind = aid.substring(aid.lastIndexOf("d") + 1, aid.length);
	var windId = "win" + wind;
	MyWin.Min(windId);
}
//右键菜单关闭窗口
function WinClose(e) {
	var aid = e.name;
	aid = aid.replace(";", "");
	var wind = aid.substring(aid.lastIndexOf("d") + 1, aid.length);
	var windId = "win" + wind;
	var aid = e.name;
	MyWin.Close(windId, 0);
}

function findshortcuts(userid) {

	kjcdMonitor.findFrmshortcuts(userid, getFrmshortcuts);
}
function getFrmshortcuts(list) {
	var path = getRootPath();

	var menulist = new Array();
	menulist = list;
	var rightmenu = document.getElementById("ChildMenu4");
	var textbody = "";

	for (var i = 0; i < menulist.length; i++) {
		//	textbody+="<li  style='background:url("+menulist[i][5]+") no-repeat 30px 30px;'  ><a href=javascript:KjFsLinkEvent('"+menulist[i][2]+"','new_window.jsp?lianjie="+menulist[i][3]+"&fater="+menulist[i][6]+"') >"+menulist[i][2]+"</a></li>";
		textbody += "<li no-repeat 30px 30px;'  ><a href=javascript:KjFsLinkEvent('" + menulist[i][2] + "','new_window.jsp?lianjie=" + menulist[i][3] + "&fater=" + menulist[i][6] + "') ><p class=icopp1><img src='" + path + "/framework/images/kjcd_icons/" + menulist[i][5] + "' /></p><p class=icopp2>" + menulist[i][2] + "</a></li>";
	}
	rightmenu.innerHTML = textbody;
}