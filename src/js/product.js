
require('../css/product.css');

$(function(){  
    // 通过ajax请求数据并处理 
    $.ajax({
        url:"./data/mockData.json",
        type:"GET",
        dataType:"json",
        async:true,
        success:function(data){
            // console.log(data);
            // 将返回的数据转化为数组
            // var dataArr=eval("("+data+")");
            // console.log(dataArr);
            // var dataObj={
            //     "items":dataArr
            // }
            // 模板插件方法生成html标签
            var str=template("template",data);
            // 使用 jq 追加到容器中               
            $(".product").append(str);
        },
        error:function(){
            console.log('Error');
        }
    }); 

    //如果是PC端
    if(ykObj.IsPC()){
        $('.product').on('mouseover mouseout','.back',function(event){
            if (event.type=='mouseover') {
                $(this).addClass('hover');
            } else if(event.type=='mouseout'){
                $(this).removeClass('hover');
            }            
        });
    }

    //如果是移动端
    if(!ykObj.IsPC()){
        ykObj.tap($('.product'),function(){
            if ($(this).hasClass('hover')) {
                $(this).removeClass('hover');
            } else {
                $('.back').removeClass('hover');
                $(this).css('transition','none');
                $(this).addClass('hover');
            }            
        },'.back');
        // 阻止.back事件冒泡
        $('.product').on('touchstart','.back',function(event){
            event.stopPropagation();
        });
        // 点击其余地方也会删掉hover类
        ykObj.tap($(document),function(){
            $('.product .back').removeClass('hover');
        });
    } 

})