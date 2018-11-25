
/*定义一个全局变量*/
window.ykObj = {};/*存储将要封装的事件方法*/

/*设置 属性 定义一个  tap事件绑定方法*/
ykObj.tap = function(dom,callback,childSelector){
    /*
    *tap:
     1.响应速度要比click快
     2.不能滑动过
    * */
    if(dom && typeof dom === 'object'){
        /*记录是否滑动过*/
        var isMove = false;
        var startTime = 0;        
        if (childSelector && typeof childSelector === 'string') {
        	dom.on('touchstart',childSelector,function(e){
	            startTime = Date.now();  /*new Date().getTime();获取时间戳*/	            
	        });
	        /*触摸滑动事件*/
	        dom.on('touchmove',childSelector,function(e){
	            isMove = true;
	        });
	        /*触摸结束事件*/
	        dom.on('touchend',childSelector,function(e){
	            /*
	             *tap:
	             1.响应速度要比click快  click 300ms 响应时间  150ms
	             2.不能滑动过
	             * */
	            if((Date.now()-startTime) < 150 && !isMove){
	                /*在end事件的时候才执行click需要执行的操作  提高的响应*/
	                /*onclick = function(e){}*/
	                // console.log(Date.now()-startTime);
	                // console.log(isMove);
	                // console.log(callback);
	                // console.log($(this));
	                var $_this=$(this);
	                callback && callback.call($_this);
	            }

	            /*重置*/
	            isMove = false;
	            startTime = 0;
	        })
        } else {
	        dom.on('touchstart',function(e){
	            startTime = Date.now();  /*new Date().getTime();获取时间戳*/
	        });
	        /*触摸滑动事件*/
	        dom.on('touchmove',function(e){
	            isMove = true;
	        });
	        /*触摸结束事件*/
	        dom.on('touchend',function(e){
	            /*
	             *tap:
	             1.响应速度要比click快  click 300ms 响应时间  150ms
	             2.不能滑动过
	             * */
	            if((Date.now()-startTime) < 150 && !isMove){
	                /*在end事件的时候才执行click需要执行的操作  提高的响应*/
	                /*onclick = function(e){}*/
	                var $_this=$(this);
	                callback && callback.call($_this);
	            }

	            /*重置*/
	            isMove = false;
	            startTime = 0;
	        })
        }
    }
}

// 判断是否为PC端  
ykObj.IsPC = function(){  
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
}

// 固定定位元素
ykObj.autoFixed = function(obj,scroTop,fixedStyle) {
	if('object' != typeof obj) return false;
	$(document).scroll(function () {
		if($(document).scrollTop() >= scroTop) {
			obj.addClass('fixed ' + fixedStyle);
		} else {
			obj.removeClass('fixed ' + fixedStyle);
		}
	});
}

// 取消定位
//function resetFixed(obj,fixedStyle) {
//	if('object' != typeof obj) return false;
//	$(document).scroll(function () {
//		//alert($(window).height())
//		if($(document).height() - $(document).scrollTop() - $(window).height() -90 < 0) {
//			obj.removeClass('fixed ' + fixedStyle);
//		}
//	});
//}