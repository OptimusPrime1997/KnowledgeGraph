//用户权限管理
function userRightsManage(allcodeStr,callback){
	var userid=$("#userRightsManageId").val(); //获取用户id
	var code={};
	var btn=$("[allcode]");//获取元素
	var allcode="";
	$.post("roles!judgeright.action",{"allcode":allcodeStr,"users.id":userid},function(data){
		var json=$.parseJSON(data);
		//将json.rows由数组转化成json格式
		json.rows.each(function(i){
			code[this[0]]=this[1];
		})
		//处理按钮权限
		btn.each(function(i,ele){
			allcode=$(ele).attr("allcode");
			if(allcode!==undefined){
				if(code[allcode]==0){
					console.log("按钮不可用");
					$(ele).css("display","none");
					if(callback){
						callback();
					}
				}else if(code[allcode]==1){
					console.log("按钮可用");
				}
			}
		})
	})
}


//进度条代码
function showProcess(isShow, title, msg) {
    if (!isShow) {
   //     $.messager.progress('close');
        progress.remo(5);
       return;
   }
    
    var win=progress.init(5,msg);
//   var win = $.messager.progress({
//      title: title,
//      msg: msg
//   });
}
function noNumbers(e) {
	var keynum;
	var keychar;
	var numcheck;

	if (window.event) // IE  
	{
		keynum = e.keyCode
	} else if (e.which) // Netscape/Firefox/Opera  
	{
		keynum = e.which
	}
	keychar = String.fromCharCode(keynum);
	numcheck = /['"<>$&^￥-]/g;

	return !numcheck.test(keychar);
}

function fixWidthTable(tabelePercent,percent,cows) {
	return (getTableWidth(tabelePercent)-26-1*(cows+2)) * percent;
}

//获取当前浏览器的宽度
function getWidth(percent) {
	return $(window).width() * percent;
}

//获取当前浏览器的高度
function getHeight(percent) {
	return $(window).height() * percent;
}

//设置table的宽度，是以业务模块的内容为依据，如果是内容的100% percent=1
function getTableWidth(percent) {
	return ($(window).width()-75) * percent;
}

//设置table的高度，是以业务模块的内容为依据，如果是内容的100% percent=1
function getTableHeight(percent) {
	return ($(window).height()-155) * percent;
}
//禁止右键
$(document).ready(function() {
	//catch the right-click context menu
	$(document).bind("contextmenu",function(e) {				 
		return false;
	});
});
$.ajaxSetup({
    cache: false,
    contentType:"application/x-www-form-urlencoded;charset=utf-8",  
    global:true,
    dataFilter:function(data,type){
        
        if(data.indexOf('ajaxSessionTimeOut')>-1){
        	  var s=data.split("@");
           sessionTimeOut(s[1]);  
        }
        else if(data.indexOf('ajaxNoLimit')>-1){
        	  var s=data.split("@");
            noLimit(s[1]);  
        }else{
        	return data;
        }
    },error: function (xhr, status, e) { 
    	
   	show.append('error invoke! status:' + status+'<br/>'); 
    	}

});
  
function sessionTimeOut(msg){	
	// var pop=document.createElement('div');
	// pop.className='popUp';
	// pop.style.display='block';
	// pop.style.left="42%";
	// pop.style.top="38%";
	// pop.id='pop-box';
	// if(document.getElementById('pop-box')==null){
	// 	var content='<div class="pop-it-b"><span id="prompt_title">温馨提示</span><i class="pop-it-x" id="popX"></i></div>'+
	// 	'<div class="pop-txt-b"><p class="pop-content" id="prompt_body">用户登录会话已过期，请重新登录？</p></div>'+
	// 	'<div class="pop-btn-b" id="prompt_bottom"><a class="pop-btn margrtt" id="pop-btn-O">确定</a><a class="pop-btn" id="pop-btn-n">取消</a></div>';
	// 	pop.innerHTML=content;
	// 	document.body.appendChild(pop);
	// 	var ok=document.getElementById('pop-btn-O');/*确认*/
	// 	if(ok){
	// 		eventUnit.addHandler(ok,'click',function(){
	// 			document.getElementById('pop-box').parentNode.removeChild(document.getElementById('pop-box'));
		
	// 			returnlogin();
		
	// 		});
			
	// 	}
	// 	var no=document.getElementById('pop-btn-n');
	// 	if(no){
	// 		eventUnit.addHandler(no,'click',function(){//cancle
	// 			document.getElementById('pop-box').parentNode.removeChild(document.getElementById('pop-box'));
	// 		});
	// 	}
	// }
	
	
	
	
//    $.messager.confirm('操作提示', '用户登录会话已过期，请重新登录！', function(r){
//    	                if (r){
//    	                    window.location.href=$('#getAntibodySystemIP').val()+'login.jsp';
//    	                }
//    	            });
}



function returnlogin(){
	
	 window.location.href=$('#headerbasePath').val()+'176.html';
}
  
function noLimit(msg){
    $.messager.alert('操作提示','无相应操作权限，请联系系统管理员！('+msg+')','warning');  
}
//增加对象的前缀
function addPrefix(o, prefix) {
	var obj = {};
	$.each(o, function(i, n) {
		obj[prefix + i] = n;
	});
	return obj;
}


function popdiv() {
	this.winheight = 400;
	this.winwidth = 400;
	this.wintitle = "";
	this.winurl = "弹窗地址";
	this.action = "提交的地址";
	this.buttons = [];
	this.onLoad = function() {
	}
	this.onClose = function() {
	}
}
function popupdiv(obj) {
	var time = new Date().getTime();
	var id = "dialog_" + time;
	$("body").append('<div id="' + id + '" ></div>');
	$('#' + id).dialog({
		title : obj.wintitle,
		iconCls : "icon-add",
		width : obj.winwidth,
		height : obj.winheight,
		zIndex : 1000,
		cache : true,
		modal : true,
		buttons : obj.buttons,
		href : obj.winurl,
		onLoad : function() {
			obj.onLoad(this);
		},
		onClose : function() {
			obj.onClose();
			$(this).dialog("destroy", false);
		}
	});
}


Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
		format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		}
	}
	return format; 
}
function cjkEncode(text) {                                                                             
    if (text == null) {          
      return "";          
    }          
    var newText = "";          
    for (var i = 0; i < text.length; i++) {          
      var code = text.charCodeAt (i);           
      if (code >= 128 || code == 91 || code == 93) {  //91 is "[", 93 is "]".          
        newText += "[" + code.toString(16) + "]";          
      } else {          
        newText += text.charAt(i);          
      }          
    }          
    return newText;          
  }

//根据秒数格式化时间
function getNowFormatDateForSecond(flg) {
	if(flg!=null){
		if(typeof flg!="string"){
			 var date = new Date().format("yyyy-MM-dd");    
			 var now=new Date(flg.time).format("yyyy-MM-dd");
			 return now;
		}else{
			return flg;
		}
		
	}
   
    
}
//根据秒数格式化时间2
function getNowFormatDateForSecond2(flg) {
	if(flg!=null){
		if(typeof flg!="string"){
			var date = new Date().format("yyyy-MM-dd hh:mm:ss");    
			var now=new Date(flg.time).format("yyyy-MM-dd hh:mm:ss");
			return now;
		}else{
			return flg;
		}
		
	}
}

//清除空格的方法
function Trim(str){ return str.replace(/(^\s*)|(\s*$)/g, ""); }

//ie8 兼容dom方法 document.getElementByClassName
if(!document.getElementsByClassName){
	document.getElementsByClassName = function(className, element){
	var children = (element || document).getElementsByTagName('*');
	var elements = new Array();
	for (var i=0; i<children.length; i++){
		var child = children[i];
		var classNames = child.className.split(' ');
		for (var j=0; j<classNames.length; j++){
			if (classNames[j] == className){ 
				elements.push(child);
				break;
			}
		}
	} 
	return elements;
	};
}

