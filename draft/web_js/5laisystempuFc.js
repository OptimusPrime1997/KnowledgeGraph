/*
 * 右边内容的高度
 */
function sigshowHeight(){
	var f=document.getElementById('sigshow');
	var bodyHeight=document.documentElement.clientHeight||document.body.scrollHeight;
	f.style.minHeight=bodyHeight-574+'px';
}


(function(){
	if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {//若为谷歌浏览器，去除黄色背景和自动记忆
	  $(window).load(function(){
		$('input:-webkit-autofill').each(function(){
		  var text  = $(this).val();
		  var name = $(this).attr('name');
		  $(this).after(this.outerHTML).remove();
		  $('input[name=' + name + ']').val(text);
		});
	  });
	}
	//在首页判断浏览器 进行提示。
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=parseFloat(b_version);
	var bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
	var bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var list="<div style='width: 550px;position: fixed;margin-top: 20%;top:0;left: 0; border-radius: 3px;z-index: 9999;overflow:hidden;background-color: #fff;margin-left:"+(bodyWidth-550)/2+'px'+"'>"+
		"  <div style='height: 42px;border-bottom: 1px solid #e5e5e5;background-color: #f7f7f7;line-height:41px;' class='clearfix fs16'>"+
		"    <div class='pl20 textC inline'>温馨提示</div>"+
		"    <span class='fright mr20 close pt10 inline'>&times;</span>"+
		"  </div>"+
		"  <div style='padding:24px 20px 30px 20px;' >"+
		"    <p class='fs14'>您的浏览器版本过低，可能存在安全风险，建议试试以下浏览器的最新版本</p>"+
		"    <div style='padding-top: 24px;padding-bottom: 16px;' class='fs16'>"+
		"      <i style='background: url(wlaicom/icos/llqicon.png) no-repeat; width:61px;height:59px; display:inline-block;vertical-align: middle;'></i><a class='strong ml20 inline' target='_blank' href='http://chrome.360.cn/'>360浏览器（极速模式）</a>"+
		"    </div>"+
		"    <div style='padding-bottom: 24px;' class='fs16'>"+
		"      <i style='background: url(wlaicom/icos/llqicon.png) no-repeat; width:61px;height:52px; display:inline-block;vertical-align: middle; background-position-y: -57px;'></i><a class='strong ml20 inline' target='_blank' href='http://rj.baidu.com/soft/detail/14744.html?ald'>谷歌浏览器</a>"+
		"    </div>"+
		"    <p class='fs12'>您可以选择：</p>"+
		"    <p class='fs12'>QQ浏览器、猎豹浏览器、搜狗浏览器、遨游浏览器、火狐浏览器</p>"+
		"  </div>"+
		"</div>";
	list=$(list);
	list.find("span.close").click(function(){
		list.remove();
		$('#shadeDiv').remove();
	});
	if(navigator.userAgent.indexOf("MSIE")>0) { 
		function getOs(){  
	        if(navigator.userAgent.indexOf("MSIE 6.0")>0){ //判断是否为ie6
	        	return "IE6";  
	        }
	        if(navigator.userAgent.indexOf("MSIE 7.0")>0){ //判断是否为ie7
	        	return "IE7";  
	        }
	        if(navigator.userAgent.indexOf("MSIE 8.0")>0){ //判断是否为ie8
	        	return "IE8";  
	        }
	        return false;    
		}  
		var browsertype=getOs();
		if(browsertype){
			$('body').append("<div id='shadeDiv' style='width:"+bodyWidth+"px;height:"+bodyHeight+"px;display:block;filter = alpha(opacity=50);position:fixed;'></div>").append(list);
	
		}
	}
   	if(navigator.userAgent.indexOf("Firefox")>0 || navigator.userAgent.indexOf("Chrome")>0 || navigator.userAgent.indexOf("Safari")>0 || navigator.userAgent.indexOf("Gecko/")>0){  
   		if (!((browser=="Netscape"||browser=="Microsoft Internet Explorer") && (version>=4))){
   			$('body').append("<div id='shadeDiv' style='width:"+bodyWidth+"px;height:"+bodyHeight+"px;opacity=0.5;display:block;position:fixed;'></div>").append(list);
   		}
   	}     

})();

//2016-10-27 lhj new 一些功能库 后台模版1 数据类

//解析时间日期格式 字符串
//type 需要返的回时间格式
function formatT(time,type){
	var datetype=type||"ymdhms";
	if(time){
		var date = new Date(parseInt(time));
		var y= date.getFullYear();
	    var month=date.getMonth()+1;
	    if(month<10){
	    	month="0"+month;
	    	}
	    var day=date.getDate()
	    if(day<10){
	    	day="0"+day;
	   		}
	    var h=date.getHours();
	    if(h<10){
	    	h="0"+h;
	    	}
	    var m=date.getMinutes();
	    if(m<10){
	    	m="0"+m;
	    	}
		var s=date.getSeconds();
		if(s<10){
			s="0"+s;
			}
		
		switch(datetype){
			case "ymdhms"://年月日时分秒
			
				return y+"-"+month+"-"+day+" "+h+":"+m+":"+s;
			case "ymdhm"://年月日时分
			
				return y+"-"+month+"-"+day+" "+h+":"+m;
			case "ymdh"://年月日时
			
				return y+"-"+month+"-"+day+" "+h+":00:00";
			case "ymd"://年月日
			
				return y+"-"+month+"-"+day;
			case "ym"://年月
				return y+"-"+month;
				
			case "md"://月日
				
				return month+"-"+day;
			case "hm"://时分
				
				return h+"-"+m;
			case "mdhm"://月日时分
				
				return month+"-"+day+" "+h+"-"+m;
			case "y"://年
		
				return y;
			case "h"://时

				return h;
			}
		}	
	}
	
//压缩时间为时间字符串 time  时间格式eg:2012-11-12
function timeStr(time){
	var t=time || new Date();
	if(typeof time==='string'){
		t=Trim(time.replace(/-/g,'/'));
	}
	if(t){
		return Date.parse(new Date(t));
	}
	return "";
}
	
//URI参数解析
//type:需要返回的值名称
function getURICode(type){
	if(type){
		var code=window.location.search.replace(/\?/g,'');
		var arr=code.split('&');
		var key={},b;
		for(var i=0;i<arr.length;i++){
			b=arr[i].split('=');
			key[b[0]]=b[1];
			}
		}
	
	return key[type] ? decodeURI(key[type]) : undefined;
	}
	
//关键字标红
//key：需要校验的内容  string
//code:检测规则 string
//cs：需要添加的css类  string
function tipfuc(key,code,cs){
	if(code){
		var c=new RegExp(code,'gi');
		var k=key.replace(c,"<span class='"+cs+"'>"+code+"</span>");
		return k;
	}else{return key;}
}	
	
//钱格式转换
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {  
  places = !isNaN(places = Math.abs(places)) ? places : 2;  
  symbol = symbol !== undefined ? symbol : "¥";  
  thousand = thousand || ",";  
  decimal = decimal || ".";  
  var number = this,  
      negative = number < 0 ? "-" : "",  
      i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",  
      j = (j = i.length) > 3 ? j % 3 : 0;  
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");  
};  


//图片弹出查看
function seePhoto(obj){
	$(obj).bind('click',function(e){
		var target=e.target;
		var cSrc=$(target).attr('src');
		if(cSrc){
			var bodyWidth = $(window).width();
			var bodyHeight= $(window).height();
			var shad=$('<div id="imgshade" class="shademask"></div>').click(function(){
				$(this).remove();
				$('#bigimg').remove();
				});
			$('body').append(shad);
			var maxWidth=(bodyWidth-100)*0.9+'px';
			var maxHeight=bodyHeight*0.9+'px';
			var img = $("<img src='"+cSrc+"' id='bigimg' class=''/>").css({
				"max-height":maxHeight,
				"max-width":maxWidth,
				'position':"fixed",
				"z-index":200
				});
			$('body').append(img);
			var imgtop=bodyHeight/2-img.height()/2+'px';
			var imgleft=(bodyWidth+100)/2-img.width()/2+'px';
			img.css({
				"top":imgtop,
				"left":imgleft
							});
		}

		});
	
	}

//王安然  2016-10-19
//显示时间控件，防止时间控件位置错乱
//selector，字符串，jquery选择器
//pickerParam，WdatePicker插件的配置参数，json格式
function datePick(selector,pickerParam){
	var selfHeight=$(selector).get(0).offsetHeight;
	var param=pickerParam || {};
	var args=$.extend({
		skin:'whyGreen',
		dateFmt:'yyyy-MM-dd HH:mm:ss',
		minDate:'1900-1-1',
		maxDate:'2100-03-10'
	},pickerParam);
	$(selector).click(function(e){
		var newTop=e.target.getBoundingClientRect().top+selfHeight+2;
		var newLeft=e.target.getBoundingClientRect().left;
		args['position']={left:newLeft,top:newTop};
		WdatePicker(args);
		$('#_my97DP').find('iframe').css({'min-height':'224px'}); //待改，防止时间控件显示一半
	})
}
	
function loadInfo(obj,action,arr,out,operate){
	loadInfo.prototype.main(obj,action,arr,out,operate);
}
loadInfo.prototype={
	main:function(obj,action,arr,out,operate){
	
		var that=this;
		if(action){
			showProcess(true,"","");
			$.post(action,arr,function(data){
				var json=$.parseJSON(data);
				$(obj).html("");
				if(json.rows.length){
					$.each(json.rows,function(i,n){
						var datau=$('<div class="dataunit"></div>');
						var list='',btndiv='';
						$.each(out,function(j,m){
							var names=m.name.split(',');
							if(names.length==1){
								var filed=m.name;
								list+="<div class='"+m.css+"'>";
								if(m['href']){
									list+='<a href="'+m['href']+(n[m['hrefvalue']] || '')+'">';
									if(m.textfuc){
										list+=that.textfuc(m.textfuc,n);
									}else{
										list+=n[filed];
									}
									list+='</a>'
								}else{
									if(m.textfuc){
										list+=that.textfuc(m.textfuc,n);
									}else{
										list+=n[filed];
									}
								}
								list+="</div>";
							}else{//王安然，2016-11-13，扩充一个单元格显示多个字段
								var csses=[];
								if(m.spancss){
									csses=m.spancss.split(',');
								}
								var textfucs=[];
								if(m.textfuc.length===undefined){
									var textfuc=m.textfuc;
								}else{
									textfucs=m.textfuc;
								}
								if(m['href']){
									var href=m['href'].split(',');
									if(m['hrefvalue']){
										var hrefvalue=m['hrefvalue'].split(',');
									}
								}
								list+="<div class='"+m.css+"'>";
								$.each(names,function(o,p){
									list+="<span class='"+(csses[o] || csses[0] || '')+"'>";
									if(href[o]){
										list+='<a href="'+href[o]+(n[hrefvalue[o]] || '')+'">'
										var tfunc=textfucs[o] || textfuc;
										if(tfunc){
											list+=that.textfuc(tfunc,n);
										}else{
											list+=n[p];
										}
										list+='</a>'
									}else{
										var tfunc=textfucs[o] || textfuc;
										if(tfunc){
											list+=that.textfuc(tfunc,n);
										}else{
											list+=n[p];
										}
									}
									list+="</span>";
								})
								list+="</div>";
							}
						});
						if(operate){
							if(operate.btn){//判断是否有按钮功能
								var btnf=operate.btn;
								var btn1='',btn2='',btn3='';
								btndiv=$("<div class='"+btnf.css+"'></div>");
								if(btnf.islook){//查看按钮
									btn1=$('<a href="'+btnf.islook.url+n[btnf.islook.name]+'" allcode="'+(btnf.islook.allcode || '')+'">'+(btnf.islook.btnname || '查看')+'</a>');
									if(btnf.islook.css){
										btn1.addClass(btnf.islook.css);
									}
								}
								if(btnf.isedit){//编辑按钮
									btn2=$('<a href="'+btnf.isedit.url+n[btnf.isedit.name]+'" allcode="'+(btnf.isedit.allcode || '')+'">'+(btnf.isedit.btnname || '编辑')+'</a>');
									if(btnf.isedit.css){
										btn2.addClass(btnf.isedit.css);
									}
									if(btnf.isedit.func){
										btn2.click(function(){
											btnf.isedit.func(n);
										});
									}
								}
								if(btnf.isdelt){//删除按钮
									btn3=$('<a href="javascript:;" allcode="'+(btnf.isdelt.allcode || '')+'">'+(btnf.isdelt.btnname || '删除')+'</a>');
									if(btnf.isdelt.css){
										btn3.addClass(btnf.isdelt.css);
									}
									var did=n[btnf.isdelt.name];//name 删除的数据参数
									if(btnf.isdelt.name){
										btn3.attr('deltid',did);
									}
									if(btnf.isdelt.url){
										btn3.click(function(){
											if(btnf.isdelt.func){ //弹窗之前执行的函数
												if(!btnf.isdelt.func(n)){
													return false;
												}
											}
											Prompt.init({title:'温馨提示',html:'确认'+(btnf.isdelt.btnname||'删除')+'该信息？',shade:true, ConfirmFun:function(){
												if(btnf.isdelt.deltfuc){//deltfuc 点击确认删除后执行的函数 否则执行内置的函数 
													return btnf.isdelt.deltfuc(did);
												}else{
													deltfuc(did);//内置的删除函数
													}
												},CancelFun:true});	
											function deltfuc(did){
												var posturl=btnf.isdelt.url;//url 删除时 链接后台的方法名
												var postn={};//deltname 给后台传递的参数名
												postn[btnf.isdelt.deltname]=did;
												$.post(posturl,postn,function(data){
													if(Trim(data)==1){
														 window.location.reload();
													}else{
														Prompt.init({title:'温馨提示',html:'删除失败，请重新删除！',shade:true, ConfirmFun:true});
													}
												});
											}
										});
									}
								}
								btndiv.append(btn1).append(btn2).append(btn3);
							}
							//2016-11-11   王安然   自定义按钮
							if(operate.freebtn){
								if(!btndiv){
									btndiv=$("<div class='"+operate.freebtn.css+"'></div>");
								}
								var btnlist='';
								var freebtn=null;
								$.each(operate.freebtn.btns,function(j,k){
									if(k['exist'] && !k['exist'](n)){
										return true;
									}
									//按钮<a class="" href="" attr="" >
									btnlist='<a class="'+(k['css'] || '')+'" href="'+( k['href'] || 'javascript:;')+(n[k['hrefvalue']] || '')+'" '+(k['attr'] || '')+(n[k['attrvalue']] || '')+'>';
									//按钮文本内容
									if(k['textfuc']){ //需要处理后显示的内容
										btnlist+=that.textfuc(k['textfuc'],n)+'</a>';
									}else{//不需要处理即可显示的内容
										btnlist+=k['btnname']+'</a>';
									}
									freebtn=$(btnlist);
									if(k['func']){
										freebtn.click(function(e){
											k['func'](n,e);
										})
									}
									btndiv.append(freebtn);
								})
							}
						}
						datau.html(list);
						if(btndiv){
							datau.append(btndiv);
						}
						$(obj).append(datau);
					});
					//判断是否有分页
					if(operate.page){
						var allpage=Math.ceil(json.total/arr.rows);
						$(".tcdPageCode").createPage({
							 pageCount:allpage,
							 current:arr.page,
							 pagetotal:arr.rows,
							 nextfunction:"init",
							 backFn:function(p){
								 console.log(p);
							 }
						 });
					}
					if(operate.callback){
						operate.callback(json);
					}
				}else{
					var row='<h3 class="mc t-a-C">抱歉，暂无数据╰(￣▽￣)╮</h3>';
					$(obj).append(row);
					if(operate.page){
						$(".tcdPageCode").html('');
					}
				}
				showProcess(false,"","");
			});
		}
	},
	textfuc:function(text,n){
		var param=[];
		//遍历参数
		$.each(text['param'],function(l,h){
			if(h['variable']){
				param.push('"'+n[h['attr']]+'"');
			}else{
				param.push('"'+h['attr']+'"');
			}
		});
		//返回处理文字的函数
		var func=new Function('return '+text['fucname']+'('+param.join(',')+')');
		return func();
//		(function(){
//			return  'return '+text['fucname']+'('+param.join(',')+')';
//		})()							
//		return text['fucname'](param.join(','));
	}
}
//删除某条记录，修改某条记录的某个字段等等
	//action,string,post请求的url
	//json,json,post请求传递的参数
	//msg，json，其他配置参数{}
function editRecord(action,json,msg){
	var args={};
	//before，post前是否有弹窗确定，默认为true，有;
	if(msg.before === undefined){
		args['before']=true;
	}else{
		args['before']=msg.before;
	}
	args['beforeText']=msg.beforeText || '确定要删除该条记录？';  //删除前的提示信息
	args['callback']=msg.callback ||false;  //callback:function，post请求后的回调函数，配置该属性则不执行内置的提示函数，可以不写
	args['ifSuccess']=msg.ifSuccess || '1';  //ifSuccess，string，post请求后验证是否操作成功的字符串，将该字符串与后台字符串比较
	args['successText']=msg.successText || '操作成功!';  //successText：操作成功后的提示信息
	args['successFunc']=msg.successFunc ||true;  //successFunc:操作成功后的回调函数
	args['errorText']=msg.errorText || '操作失败，请稍后重试!';  //errorText:操作失败后的提示信息
	args['errorFunc']=msg.errorFunc ||true;  //errorFunc:操作失败后的回调函数
	//success，操作成功后是否弹窗提示，默认为true，有;
	if(msg.success === undefined){
		args['success']=true;
	}else{
		args['success']=msg.success;
	}
	
	if(args['before']){
		Prompt.init({
			title:'温馨提示',
			html:args['beforeText'],
			shade:true, 
			ConfirmFun:postEdit,
			CancelFun:true
		});		
	}else{
		postEdit();
	}
	function postEdit(){
		$.post(action,json,function(data){
			if(msg.callback){
				msg.callback(data);
				return false;
			}
			if(Trim(data)==args.ifSuccess){
				if(args['success']){
					Prompt.init({title:'温馨提示',html:args['successText'],shade:true, ConfirmFun: args['successFunc']});	
				}else{
					if(typeof args['successFunc'] !== "boolean"){
						args['successFunc']();
					}
				}
			}else{
				Prompt.init({title:'温馨提示',html:args['errorText'],shade:true, ConfirmFun: args['errorFunc']});
			}
		})			
	}
}

//post请求
	//action，字符串，post请求的action
	//json，json格式，post请求传递的参数
	//callback，function，post请求的回调函数，一个参数，服务器返回的值
function postAll(action,json,callback){
	$.post(action,json,function(data){
		callback(data);
	})
}

//拼接字符串
	//nodes,数组,要遍历的节点对象，[one,two,three]
	//symbol,数组，长度与nodes相同，[',','/','=']
	//返回值，字符串,形如"联系人姓名/联系人电话/联系人微信/联系人QQ,联系人2姓名/联系人2电话/联系人2微信/联系人2QQ"
function getStr(nodes,symbol,way){
	var pare=$(nodes[0]);
	var arr=[];
	if(nodes[1]){
		pare.each(function(i){
			var arr1=[];
			pare.eq(i).find(nodes[1]).each(function(j){
				arr1.push($(this).val()||$(this).text());
			})
			arr.push(arr1.join(symbol[1]));
		});
	}else{
		pare.each(function(i){
			if(way){
				arr.push($(this).attr(way));
			}else{
				arr.push($(this).val()||$(this).text());
			}
			
		})
	}
	return arr.join(symbol[0]);
}

//解析字符串，返回数组，用于字段解析
	//s,string，形如"联系人姓名/联系人电话/联系人微信/联系人QQ,联系人2姓名/联系人2电话/联系人2微信/联系人2QQ"
	//a，string，第一个分隔符
	//b，string，第二个分隔符
function strToArr(s,a,b){
	var c=[],d=[];
	var e=s.split(a);
	if(b){
		$.each(e,function(i,n){
			d=n.split(b);
			c.push(d);
		})
		return c;
	}else{
		return e;
	}
}

//拼接字段，获取页面中的表单元素，拼接成数组
	//newlist,数组，父元素的集合
	//child,string，父元素下获取子元素的string串,input的name属性值作为key
	//返回值类型，数组，格式：[{'key':value,'key':value},{}]
function getArr(newlist,child){
	var args=[];
	var key=null;
	for(var i=0; i<newlist.length; i++){
		dom=newlist.eq(i).find(child);
		newJson={};
		for(var j=0; j<dom.length;j++){
			key=dom.eq(j).attr('name');
			if(key!==undefined){
				newJson[key]=dom.eq(j).val();
			}
		}
		args.push(newJson);
	}
	return args;	
}

//获取查询条件，没有即为空
	//json，object，传给服务器的json
	//doms，jQobject，要遍历的节点对象
function getSelectJson(json,doms){
	var a=json||{};
	var key='';
	var val='';
	doms.each(function(i){
		key=$(this).attr('name');
		val=Trim($(this).attr("attr0") || $(this).val());
		if(val){
			json[key]=val;
		}
	})
	console.log(json)
	return json;
}


//解析字符串，返回json，用于url解析、cookie解析
	//s,string，形如"__root_domain_v=.5lai.com; cookUser=12345678900;"
	//a，string，第一个分隔符
	//b，string，第二个分隔符
function strToJson(s,a,b){
	var c=[],d={};
	var e=s.split(a);
	$.each(e,function(i,n){
		c=n.split(b);
		d[c[0]]=c[1];
	})
	return d;
	}

//获取n天前的时间 返回：2016-11-30
function getBeforeDate(n){
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
            if(mon>1) {
               mon=mon-1;
            }
           else {
             year = year-1;
             mon = 12;
             }
           }
          d.setDate(d.getDate()-n);
          year = d.getFullYear();
          mon=d.getMonth()+1;
          day=d.getDate();
    s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
    return s;
}

//war-2017-3-27-仿easyui表格加载
(function($){
	//获取表格主体
	function getContent(data,o){ 
		var column=o.columns;
		var content=$('<div class="datacontent"></div>');
		var unit,cell,rows,field,formatter,getRow;
		if(o.getRow){
			getRow=o.getRow;
		}else{
			getRow=getUnit;
		}
		
		for(var i=0; i<data.length; i++){
			rows=data[i];
			
			unit=getRow(rows) || getUnit();
			if(typeof unit ==='string'){
				unit=$(unit);
			}
			
			for(var j=0; j<column.length; j++){
				field=column[j]['field']; //字段名称

				cell=getCell();
				cell.addClass(column[j]['cls']);
				formatter=column[j]['formatter'];
				text=rows[field];
				if(formatter){
					text=formatter(text,rows,i);
				}
				if(o.tableCell){
					cell.append(getCell().append(text));
				}else{
					cell.append(text);
				}
				
				unit.append(cell);
			}
			content.append(unit);
		}
		return content;
	}
	//获取单个的dataunit
	function getUnit(){
		var div='<div class="dataunit"></div>';
		return $(div);
	}
	//获取单个单元格
	function getCell(){
		var div='<div></div>'
		return $(div);
	}
	

	
	//获取标题
	function getHead(columns){
		var head=$('<div class="dataTitle"><ul></ul></div>');
		var headUl=head.find('ul');
		var headCell;
		for(var i=0 ; i<columns.length ; i++){
			headCell=getHeadCell(columns[i]['title']);
			headCell.addClass(columns[i]['cls']);
			headUl.append(headCell);
		}
		return head;
	}
	//获取标题单元格
	function getHeadCell(s){
		var li=$('<li></li>');
		li.append(s);
		return li;
	}
	//获取无数据时的提示信息
	function getTip(s){
		var div='<div class="datacontent"><div class="f-s-M mc t-a-C pt20 pb20">'+s+'</div></div>';
		return $(div);
	}

	$.fn.extend({
		showGrid:function(o){
			// var target=$(this);
			var data=o.data || [];
			var tip=o.tip || '抱歉，暂时没有数据！';
			var columns=o.columns ;
			var box=$('<div></div>');
			var content;
			//获取标题行
			box.append(getHead(columns));

			//获取内容，有内容
			if(data.length){
				
//				if(o.getRow){
//					content=getContent(data,columns,o.getRow);
//				}else{
					content=getContent(data,o);
//				}
				
				if(o.select){
					content.find('.dataunit').click(function(e){
						if(!$(e.target).hasClass('check')){
							$(this).find('.check').click();
						}
					})	
				}
				box.append(content);
			}else{
				//没有内容
				box.append(getTip(tip));
			}
			if(o.callback){
				o.callback(box);
			}else{
				//填充进html
				$(this).empty().append(box.children());
			}		
		}
	});	
})(jQuery);

(function($){
	$.fn.extend({
		popover:function(o){
			var dom=$('<div class="c-overtip"></div>');
			dom.append(o.content);
			$(this).mouseenter(function(e){
				var left=e.clientX-e.offsetX+$(window).scrollLeft();
				var top=e.clientY-e.offsetY+$(window).scrollTop()+$(this).height();
				$('body').append(dom);
				
				if(o.width){
					dom.css({'width':o.width});
				}
				left=left-dom.width();
				dom.css({'top':top,'left':left});
			}).mouseout(function(e){
				dom.remove();
			})
		}
	});
})(jQuery)

function getQQChat(number){
	return 'http://wpa.qq.com/msgrd?v=3&uin='+number+'&site=qq&menu=yes';
}