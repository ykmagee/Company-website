
require('../css/index.css');

$(function(){
	// 修改bootstrap轮播图默认时间
	$('.carousel').carousel({
		interval:3500
	});
	

    // 通过ajax请求数据并处理
    $.ajax({
        url:"./data/mockData.json",
        // url:"./data/main-product.php",
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
            var str=template("template_01",data);
            // 使用 jq 追加到容器中
            $("#product_01").append(str);
            $("#product_02").append($(".cabling_system"));
            $("#product_03").append($(".switches"));
            console.log("success");
            // $(".product").append(str);
        },
        error:function(){
            console.log("Error");
        }
    });


    // 我们是谁区域 窗口缩放后文本换行 保持整体高度一致
    var maxHeight=0;
    $(".about_us div.txt").each(function(){
        var v=$(this).height();
        if (v>maxHeight) {
            maxHeight=v;
        }
    });
    $(".about_us div.txt").height(maxHeight);


    // 我们的优势区域手风琴效果，桌面端及平板横排显示，手机端竖排显示
    var ulWidth=0;    
    var count=$(".advantage li").length;    
    // li桌面端固定高度
    var liHeightB=400;
    // li移动端初始高度
    var liHeightS=56;
    ulWidth=$('.advantage>div').width();

    // 给每个li加背景图
    $(".advantage li").each(function(){
        var index=$(this).index();
        $(this).css({'backgroundImage':'url(images/static/content/advantage-'+index+'.jpg)'});
    });

    function liSize(){
        if (ulWidth>767) {
            $(".advantage li").width(ulWidth/count);
            $(".advantage li").height(liHeightB);
        } else{
            $(".advantage li").width(ulWidth);
            $(".advantage li").height(liHeightS);
        }
    }
    liSize();    
    // 窗口缩放后更新li的宽度和高度
    $(window).resize(function(){
        ulWidth=$(".advantage>div").width();
        liSize();
    });

    //如果是PC端
    if(ykObj.IsPC()){
        // 我们的产品区域 hover效果
        $('.main_product .nav-pills a').hover(function(){
            if (!$(this).parent('li').hasClass('active')) {
                $(this).addClass('hover');
            }
        },function(){
            $(this).removeClass('hover');
        });

        $('.main_product .tab-pane').on('mouseover mouseout','.back',function(event){
            if (event.type=='mouseover') {
                $(this).addClass('hover');
            } else if(event.type=='mouseout'){
                $(this).removeClass('hover');
            }            
        });

        // 我们的优势区域 hover效果
        $(".advantage li").hover(function(){
            $(this).addClass('hover');
            if (ulWidth>767) {
                // 桌面端被激活li的宽度
                var activeLiW=500;
                if (ulWidth<900) {
                    activeLiW=420;
                }
                var otherLiW=ulWidth-activeLiW;
                var otherCount=count-1;
                var liWidth=otherLiW/otherCount;
                $(".advantage li").stop().animate({width:liWidth},500);
                $(this).stop().animate({width:activeLiW},500);
            } else{
                // 移动端被激活li的高度
                var activeLiH=220;
                $(this).stop().animate({height:activeLiH},500);
            }
        },function(){
            $(this).removeClass('hover');
            if (ulWidth>767) {
                $(this).stop().animate({width:ulWidth/count},500);
                $(".advantage li").stop().animate({width:ulWidth/count},500);
            } else{            
                $(this).stop().animate({height:liHeightS},500);
            }
        }); 
    }
   
    
   
    //如果是移动端
    if(!ykObj.IsPC()){
        console.log('移动端');
        // document.body.addEventListener('touchstart', function(){ });
         
        // 我们的产品区域 类hover效果
        ykObj.tap($('.main_product'),function(){
            // console.log('11');
            if ($(this).hasClass('hover')) {
                $(this).removeClass('hover');
            } else {
                $('.back').removeClass('hover');
                $(this).css('transition','none');
                $(this).addClass('hover');
            }       
        },'.back');
        // 阻止.back事件冒泡
        $('.main_product').on('touchstart','.back',function(event){
            event.stopPropagation();
        });
        // 点击其余地方也会删掉hover类
        ykObj.tap($(document),function(){
            $('.main_product .back').removeClass('hover');
        });

        // 我们的优势区域 类hover效果
        ykObj.tap($(".advantage li"),function(){
            if (!$(this).hasClass('hover')) {
                
                $('.advantage li').stop().animate({height:liHeightS},300);
                $('.advantage li').removeClass('hover');
                $(this).addClass('hover');
                // 移动端被激活li的高度
                var activeLiH=220;
                $(this).stop().animate({height:activeLiH},300);
            } else{
                $(this).removeClass('hover');
                $(this).stop().animate({height:liHeightS},300);                
            }                
        });
        $('.advantage li').on('touchend','.back',function(){
            if ($(this).height()==liHeightS && $(this).hasClass('hover')){
                $(this).removeClass('hover');
            }
        });
        // 阻止.advantage li事件冒泡
        $('.advantage li').on('touchstart touchmove touchend',function(event){
            event.stopPropagation();
        });
        // 点击其余地方也会删掉hover类
        ykObj.tap($(document),function(){
            if ($('.advantage li').hasClass('hover')) {
                $('.advantage li').removeClass('hover');
                $('.advantage li').stop().animate({height:liHeightS},300);               
            }                
        });
    }
})