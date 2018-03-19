$(function(){
	/*var s=location.search.split('?')[1];
	if(s){
		s=s.split('&');
		var sear=$('#search');
		for(var i=0; i<s.length; i++){
			var b=s[i].split('=');
			sear.find('input[name="twpc.'+b[0]+'"]').val(decodeURIComponent(b[1]));
		}
	}*/
	
	
	getInfo(1,15);
	getNow();
	addEvent();
	var syslog={
			code:'a02000000',
			isczc:false,
			des:'我来商城',
		}
	postsyslog(syslog);
})
function addEvent(){
	$('#searchBtn').click(function(e){
		$('#cata').val('');
		getInfo(1,15);
		var t=$(e.target);
		var doms=$('#search').find('input');
		var json=getSelectJson({},doms);
		json && (json=JSON.stringify(json).replace("{",'').replace("}",'').replace(/twpc./g,''));
		var syslog={
			code:t.attr('syscode'),
			des:"点击"+t.text(),
			// ispost:false
			}
		json && (syslog.cont=json);
		postsyslog(syslog);
	})
	var user=getUserObj();
	$('#toprolis').click(function(e){
		var t=$(e.target);
		var syslog={
			code:t.attr('syscode'),
			des:'点击发布商品',
			href:'../prolis.jsp'
		}
		postsyslog(syslog);
		if(!user){
			Prompt.init({title:'温馨提示',shade:true,html:'登录后，才能发布现货信息！',yes:"去登录", ConfirmFun:function(){
				location.href=$('#buysystemroot').val()+"176.html";//users/orderLogin.jsp
			}, CancelFun:true});	
		}else if(user && user.sonumtype=='0'){
			Prompt.init({title:'温馨提示',shade:true,html:'认证企业通过后，才能发布现货信息！',yes:"去认证", ConfirmFun:function(){
				location.href=$('#buysystemroot').val()+"94.html";//buySys/comCheck.jsp
			}, CancelFun:true});
		}else{
			location.href=$("#sellsysroot").val()+'30.html';//sellerSys/jsp/prolis.jsp
		}
	});
	
}

//获取主要信息
function getInfo(page,rows){
	showProcess(true,'','');
	var json={};
	var doms=$('#search').find('input');
	json=getSelectJson(json,doms);
	var cont='';
	json && (cont=JSON.stringify(json).replace("{",'').replace("}",'').replace(/twpc./g,''));
	if(cont.length){
		json.syslogcon=cont;
	}
	json.page=page;
	json.rows=rows;
	json.syslogcode='a02010033';
	var box=$('#item');
	$.post('sellitems!findBySE.action',json,function(data){
		data=$.parseJSON(data);
		if(data.rows.length){
			var pare=$('<div></div>');
			var child;
			$.each(data.rows,function(i,n){
				child=$(getList(n));
				child.find('.one-it').click(function(e){
					showDetail(n,e.target);
				});
				pare.append(child);
			});
			box.empty().append(pare);
			
			var allpage=Math.ceil(data.total/rows);
			if(allpage==1){
				$(".tcdPageCode").addClass('noshow');
			}else{
				$(".tcdPageCode").removeClass('noshow').createPage({
					 pageCount:allpage,
					 current:page,
					 pagetotal:rows,
					 nextfunction:'getInfo'
				 });
			}
		}else{
			$(".tcdPageCode").addClass('noshow');
			var list='<div class="t-a-C bgW bs-t pt30 pb48 fs18" style="word-break:break-all;">'+
						'<p class="tc9">抱歉！没有找到"<span class="textC pl10 pr10">'+(json['twpc.itemname'] || '---')+'<i class="pl10 pr10 textB">|</i>'+(json['twpc.brand'] || '---')+'<i class="pl10 pr10 textB">|</i>'+(json['twpc.catnum'] || '---')+'</span>"相关产品</p>'+
						'<p class="tc9">请搜索其他产品</p>'+
					'</div>';
			box.empty().append(list);
		}
		showProcess(false);
	})

}
//获取即时信息
function getNow(){
	var pare=$('<div class="now-all"></div>');
	var child;
	$.post('sellitems!finditemandspec.action',{},function(data){
		data=$.parseJSON(data);
		$.each(data.rows,function(i,n){
			child=$(getlist3(n));
			child.find('a').click(function(e){
				var t=$(e.target);
				var syslog={
					code:t.attr('syscode'),
					des:'点击查看商品'
				}
				postsyslog(syslog);
			});
			pare.append(child);
		})
		$('#now').append(pare);
		if(data.rows.length>7){
			$('#now').myScroll({speed:40,rowHeight:56})
		}
		
	})
}



//展开详情
function showDetail(o,target){
	target=$(target).parents('.item-one');
	var userObj=getUserObj();
	if(userObj && userObj.usertype=='2'){
		var b=true;
	}else{
		var b=false;
	}
	if(target.hasClass('onthis')){
		//已经有下拉
		target.removeClass('onthis')
			.find('.icon_sq').removeClass('icon_sq').addClass('icon_fk');
	}else{
		//没有下拉
		var one=target.find('.one-info');
		$('#item').find('.onthis').removeClass('onthis')
			.find('.icon_sq').removeClass('icon_sq').addClass('icon_fk');
		if(one.children().length){
			//曾经下拉过
			target.addClass('onthis')
			.find('.icon_fk').removeClass('icon_fk').addClass('icon_sq');
		}else{
			//第一次下拉
			var pare=$('<div class="datacontent"></div>');
			if(userObj){
				var comname=userObj.companyname;
			}
			//大侠  o.kindid  产品的id
			$.post('sellitems!findetails.action',{'param':o.kindid,'sdiscount.ccompanyname':comname},function(data){
				data=$.parseJSON(data);
				var pare=$('<div class="datacontent"></div>');
				$.each(data.rows,function(i,n){
					var store=data.map1[n.companyid];
					if(store){
						n.url=store.url;
					}
					var child=$(getList2(n,b,o));
					pare.append(child);
				})
				one.empty().append(pare);
				target.addClass('onthis').find('.icon_fk').removeClass('icon_fk').addClass('icon_sq');
			})
			

		}
	}
}



function getList(n){
	var list='';
	list+='<div class="item-one">'+
			'<div class="dataunit one-it">'+
				'<div class="wid01 t-a-l icon icon_fk textG" title="'+n.itemname+'">'+n.itemname+'</div>'+//limlt(n.itemname,10,'...')
				'<div class="wid02" title="'+n.catnum+'">'+n.catnum+'</div>'+
				'<div class="wid03" title="'+n.brand+'">'+n.brand+'</div>'+
				'<div class="wid04 lh20 onerow">市场价：<span class="textR fs14">'+getPrice(n.price)+'</span></div>'+
			'</div>'+
			'<div class="one-info bgG2">'+
			'</div>'+
		'</div>';
	return list;
}
//n.规格表
//o.索引
function getList2(n,b,o){
	//大侠    原o.companyname 改成 n.companyname
	var list='<div class="dataunit borbe2">'+
				'<div class="wid05 fs12" title="'+n.companyname+'" href="javascritpt:;" syscode="a02050037">';
	if(n.url){
		list+='<a href="../shopdetail/'+n.url+'" target="_blank" class="textG">'+limlt(n.companyname,9,'...')+'</a>';
	}else{
		list+='<span onclick="c_noStore(this)" class="fs12 pl5">'+limlt(n.companyname,9,'...')+'</span>'
	}
				list+='<span class="ml10 textO icon icon_vipdengji">V2</span>'+'</div>'+
				'<div class="wid06">'+
					'<div class="fs10 lintt onerow" title="'+o.itemname+'">名称：'+o.itemname+'</div>'+//limlt(o.itemname,10,'...')
					'<div class="fs10 lintt">规格：'+limlt(n.spec,10,'...')+'</div>'+///计量单位：+'/'+(o.uom || '---')
				'</div>'+
				'<div class="wid05">'+
					'<div class="fs10 lintt">市场价：<span >'+getPrice(n.bprice)+'</span></div>'+
					'<div class="fs10 lintt">终端价：<span >'+getPrice(n.tprice)+'</span></div>'+
					'<div class="fs10 lintt">经销价：<span class="textR fs12">'+(b ? getPrice(n.price):'认证企业可查看')+'</span></div>'+
				'</div>'+
				'<div class="wid">'+
					'<a href="../selldetail/127_' + n.sellitemsid + '_' + n.id +'.html" target="_blank" class="btn" syscode="a02030035">购买</a>'+
				'</div>'+//goddet.jsp
			'</div>';
	list=$(list);
	list.find('a').click(function(e){
		var t=$(e.target);
		var syslog={
			code:t.attr('syscode'),
			des:t.text()
		}
		if(syslog.code=="a02050037")
		{
			syslog.des='点击店铺入口';
			syslog.href="../"+m.url;
		}
		postsyslog(syslog);
		getclick(o.id);
	});

	return list;
}

function getclick(id){//统计点击量
	$.post('itemspecs!addorupdate.action',{'sellitemspecs.id':id},function(data){
		
	})
};

function getlist3(n){
	var list='<div class="borb clearfix in-new-one">'+//goddet.jsp
		'<h3 class="tc05 fs12" title="' + n.itemname + '"><a class="textG onerow" href="../selldetail/127_' + n.sellitemsid + '_' + n.id +'.html" syscode="a02040036">'+n.itemname+'</a></h3>'+//limlt(n.itemname,15,'...')
				'<div class="fs10 textB pt10"><span>'+limlt(n.catalognametree.split('/')[0],15,'...')+'</span></div>'+
			'</div>';
	return list;
}


//剩余几天
function leftTime(s,start){
	var curTime=start ? new Date(formatT(start)) : $("#headtime").val();
	var endTime=new Date(formatT(s));
	var leftTime=parseInt((endTime.getTime()-curTime.getTime())/1000);
	var day=leftTime/(60*60*24);
	if(start){
		return parseInt(day);
	}
	if(leftTime<0){
		return '已结束';
	}else{
		if(day>1){
			return '剩余<span class="textR">'+parseInt(day)+'</span>天';
		}else{
			return '剩余<span class="textR">'+day.toFixed(1)+'</span>天'
		}
	}
}
//获取cookie
function getUserObj(){
	var cookie=document.cookie;
	var arr=cookie.split('; ');
	for(var i=0; i<arr.length; i++){
		if(arr[i].indexOf('userobject')>-1){
			var b=arr[i];
			break;
		}
	}
	if(b){
		var c=unescape(b);
		c=c.split('=')[1];
		return $.parseJSON(c);
	}else{
		return false;
	}
}

//限制字数显示
function limlt(str,num,style){
	if(str && str.length>num){
		return str.substr(0,num)+style || "---";
	}else{
		return str;
	}
}


//跑马灯
(function($){
	$.fn.myScroll = function(options){
	//默认配置
	var defaults = {
		speed:40,  //滚动速度,值越大速度越慢
		rowHeight:20 //每行的高度
	};
	
	var opts = $.extend({}, defaults, options),intId = [];
	
	function marquee(obj, step){
		obj.find(".now-all").animate(
			{marginTop: '-=1'},
			0,
			function(){
				var s = Math.abs(parseInt($(this).css("margin-top")));
				if(s >= step){
					$(this).find(".in-new-one").slice(0, 1).appendTo($(this));
					$(this).css("margin-top", 0);
				}
			});
		}
		if(this.find(".now-all").height()>this.height()){
			this.each(function(i){
				var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
				intId[i] = setInterval(function(){
						if(_this.find(".now-all").height()<=_this.height()){
							clearInterval(intId[i]);
						
						}else{
							marquee(_this, sh);
						}
					}, speed);

			_this.hover(function(){clearInterval(intId[i]);},
				function(){
					intId[i] = setInterval(function(){
						if(_this.find(".now-all").height()<=_this.height()){
							clearInterval(intId[i]);
						}else{
							marquee(_this, sh);
						}
					}, speed);
				});
		
			});
		}

	}

})(jQuery);

//清除空格的方法
function Trim(str){ return str.replace(/(^\s*)|(\s*$)/g, ""); }

function getPrice(p){
	p=parseFloat(p);
	if(p===0){
		return '---';
	}else{
		return '￥'+p.toFixed(2);
	}
}
//该店铺暂未开通
function c_noStore(target){
	var dom=$('<div class="c-overtip">该店铺暂未开通</div>');
	var pare=$(target).parent();
	if(!pare.find('.c-overtip').length){
		dom.css({'margin-left': '0','display':'none'});
		pare.append(dom);
		dom.fadeIn('fast',function(){
			setTimeout(function(){
				dom.fadeOut('slow',function(){
					dom.remove();
				});
			},500);
		})
	}
}