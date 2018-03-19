// JavaScript Document
///progress.init(5,'正在提交..');
///progress.remo(5);
///


var progress={
	init:function(n,str){
		this.shade();
		this.circle(n);
		this.content(str);
		},
	circle:function(n){
		var progressArry=[], //用于存放每个圆点元素对象数组，js中数组大小可变，类似于list集合/
		tempArray=[],//用于存放progressArray抛出来的每个对象。窗口大小改变后，充值每个对象的圆心坐标
		timer=200;// 每隔多少毫秒执行一个元素对象run方法的定时器
	
		//创建圆点元素对象，存入数组中，这里创建5个对象
		for(var i=0;i<n;i++){
			progressArry.push(new progressBar(i).defaultSetting());
			}
	
		//扩展数组each方法，c#中的lambda大都这样实现
		Array.prototype.each=function(fn){
			for(var i=0,len=this.length;i<len;){
				fn.call(this[i++],arguments);
				}
			}
		//窗口大小改变事件，充值每个元素对象的圆心坐标
		window.onresize= function(){
			tempArray.each(function(){
				this.pageWidth= window.innerWidth;
				this.pageHeight=window.innerHeight;
				if(typeof this.pageWidth !="number"){
					if(document.compatMode == "number"){
						this.pageWidth=document.documentElement.clientWidth;
						this.pageHeight=document.documentElement.clientHeight;
						}else{
							this.pageWidth=document.body.clientWidth;
							this.pageHeight=document.body.clientHeight;
						}
					}
				
				
				this.fixed.left=(this.pageWidth/2);
				this.fixed.top=(this.pageHeight/2);
				
				});
			};
		//每个多少毫秒执行数组集合的元素对象run方法
		timer=setInterval(function(){
			// 清除此定时器，不然会一直执行（setTimeOut：延迟多少毫秒执行，一次；setInterval：每隔多少毫秒执行，多次)
			if(progressArry.length<=0){
				clearInterval(timer);
				}else{
					// shift()方法 用于把数组的第一个元素从中删除，并返回第一个元素的值。
					var entity=progressArry.shift();
					tempArray.push(entity);
					entity.run();
				}
			
			},timer);
		},
		shade:function(){
			var shadiv=document.createElement('div');
			shadiv.id="shade";
			shadiv.style.position="fixed";
			shadiv.style.width='100%';
			shadiv.style.height=document.body.scrollHeight+'px';
			shadiv.style.background='#FFF';
			shadiv.style.opacity='0.6';
			shadiv.style.filter='alpha(opacity=60)';
			shadiv.style.top='0px';
			document.body.appendChild(shadiv);
			},
		remo:function(n){
			
			new progressBar(n).delet();
			},
		content:function(str){
			var title=document.createElement('div');
			title.id='tle';
			title.style.position="fixed";
			title.style.color='#666';
//			this.pageWidth= window.innerWidth;
//			this.pageHeight=window.innerHeight;
//			if(typeof this.pageWidth !="number"){
//				if(document.compatMode == "number"){
//					this.pageWidth=document.documentElement.clientWidth;
//					this.pageHeight=document.documentElement.clientHeight;
//				}else{
					this.pageWidth=document.body.clientWidth;
					this.pageHeight=document.body.clientHeight;
//				}
//			}

			title.innerHTML=str;
			document.body.appendChild(title);
			
			}
			
	};
	

function progressBar(num){
	this.oriangle=270; //初始角度（不变）
	this.oridelay=20;
	this.idtop='cirl_';
	this.num=num;
	this.flage=0;
	//圆心坐标
	this.fixed={left:0,top:0};
	//html 标签元素坐标
	this.position={left:0,top:0};
	
	this.radius =20;//圆半径
	this.angle=270; //默认角度
	
	this.delay=20; //定时器延迟毫秒
	this.timer=null; //定时器时间对象
	this.dom=null; //html标签元素
	this.aplpha=0;
	//html 标签元素样式 
	this.style={
		position:"fixed",
		width:"8px",
		height:"8px",
		"border-radius":"4px",
		background:"#37B978"
	};
	this.style.filter='alpha(opacity=100)';
	this.style.opacity='1';

}

progressBar.prototype={ 
	run:function(){
		if(!document.getElementById('shade')){clearTimeout(this.timer);return;}
		//设置html标签元素坐标 即计算圆上的点x,y轴坐标
		this.position.left=Math.cos(Math.PI * this.angle / 180) * this.radius+this.fixed.left;
		this.position.top=Math.sin(Math.PI * this.angle / 180) * this.radius+this.fixed.top;
		this.dom.style.left=this.position.left-this.radius+'px';
		this.dom.style.top=this.position.top-this.radius*3+'px';
		document.getElementById('tle').style.top=this.pageHeight/2+document.getElementById('tle').offsetHeight+this.radius+'px';
		document.getElementById('tle').style.left=this.pageWidth/2-document.getElementById('tle').offsetWidth/2-this.radius/2+'px';
		

		//判断元素x与圆心X坐标大小。设置定时器的延迟时间
		if((this.position.top==(Math.sin(Math.PI * this.oriangle / 180) * this.radius+this.fixed.top)) && (this.position.left==(Math.cos(Math.PI * this.oriangle / 180) * this.radius+this.fixed.left))){
		//	this.delay=20;
			this.angle=270;
			this.dom.style.filter="alpha(opacity=100)";
			this.dom.style.opacity= '1';
			}
			//改变角度
		this.angle++;
		if(this.position.left<this.fixed.left){
			this.delay+=.5;
		}else{
			this.delay-=.5;
		}
		var taralpha=this.dom.style.filter||this.dom.style.opacity;
		if(this.dom.style.opacity){
			var taralpha=this.dom.style.opacity;
			}else{
				var taralpha=this.dom.style.filter.a.replace('alpha(opacity=','').replace(')','')/100;
				
				}
		
		if(taralpha>this.aplpha){
			taralpha-=.0027;
			
			this.dom.style.filter="alpha(opacity="+taralpha*100+")";
			this.dom.style.opacity= taralpha;
			}if(taralpha<=this.aplpha){
				this.dom.style.filter="alpha(opacity=100)";
				this.dom.style.opacity= 1;
			}
		

		var scope=this;
		//定时器，循环调用run方法，有点递归的感觉
		this.timer=setTimeout(function(){
			scope.run()},this.delay);
	},
	//html 标签元素初始化设置
	defaultSetting:function(){
		//创建一个span元素
		this.dom = document.createElement("span");
		this.dom.id=this.idtop+this.num;
		//设置span元素的样式,js中对象的遍历是属性
		for(var property in this.style){
			//js中对象的方法可以用，操作符，也可以通过键值对的方式
			this.dom.style[property]=this.style[property];
		}
		//innerWidth innerHeight 窗口中文档显示区域的宽度，不包括边框和滚动条，该属性可读可写
			//获取innerWidth innerHeight 窗口中文档显示区域的宽度（兼容）
		this.pageWidth= window.innerWidth;
		this.pageHeight=window.innerHeight;
		if(typeof this.pageWidth !="number"){
			if(document.compatMode == "number"){
				this.pageWidth=document.documentElement.clientWidth;
				this.pageHeight=document.documentElement.clientHeight;
			}else{
				this.pageWidth=document.body.clientWidth;
				this.pageHeight=document.body.clientHeight;
			}
		}
	
		
		this.fixed.left=(this.pageWidth/2);
		this.fixed.top=(this.pageHeight/2);
		//设置span元素的初始坐标
		this.position.left=Math.cos(Math.PI * this.angle / 180) * this.radius+this.fixed.left;
		this.position.top=Math.sin(Math.PI * this.angle / 180) * this.radius+this.fixed.top;
		this.dom.style.left=this.position.left-this.radius+'px';
		this.dom.style.top=this.position.top-this.radius*3+'px';
		//把span标签添加到document里面
		document.body.appendChild(this.dom);
		return this;
	},
	delet:function(){
		for(var i=0;i<this.num;i++){
			var a=document.getElementById(this.idtop+i);
			if(a){
			a.parentNode.removeChild(a);}
			}
		var s=document.getElementById('shade');
		if(s){s.parentNode.removeChild(s);}
		var t=document.getElementById('tle');
		if(t){t.parentNode.removeChild(t);}
		}
		
};


$(window).load(function(){progress.remo(5);});
$(document).ready(function(){progress.init(5,'页面正在加载..');});