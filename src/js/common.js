
require('../css/base.css');
require('../css/common.css');

// header通用js
$(function(){   
    // 修改li标签的active类    
    $(".fs_navbar .navbar-nav li").each(function () {
        var a = $(this).find("a:first")[0];
        // console.log(a);
        // console.log(location.pathname);
        if ($(a).attr("href") === location.pathname ) {
            $(this).addClass("active");
        } else{
            $(this).removeClass("active");
        }
        if ($(this).hasClass('dropdown')) {
            $(this).click(function(){
                $(this).toggleClass('open');
                var $liDropdown = $(this).find('a[class="dropdown-toggle"]');
                if ($(this).hasClass('open')) {
                    $liDropdown.attr('aria-expanded','true');
                } else{
                    $liDropdown.attr('aria-expanded','false');
                }
            });
        }
    });
    if (location.pathname==='/dist/index.html') {
        $(".fs_navbar").find("li").eq(0).addClass('active');
    }
    // console.log($('.dropdown-menu li').hasClass('active'));
    if ($('.dropdown-menu li').hasClass('active')) {
        $('.dropdown').addClass('active');
    }


    // 移动端点击其他地方、滚动屏幕时隐藏下拉列表
    // 对下拉列表所在div的click事件阻止其冒泡
    $('.collapse').on('click',function(event){
        event.stopPropagation();
    });
    $(document).on('click',function(event){
        // bootstrap框架中的方法
        $('.collapse').collapse('hide');
        // console.log(event);
        // 当点击的不是按钮.navbar-toggle或其子元素时，隐藏列表同时去掉按钮颜色
        var target=event.target;
        if ($('.navbar-toggle')[0].contains(target)) {
            target=$('.navbar-toggle')[0];
        }
        if (target!=$('.navbar-toggle')[0]) {
            $('.navbar-toggle').css('backgroundColor','transparent');
            $('.navbar-toggle').find('span').css('backgroundColor','#888');
        }            
    });
    $(window).scroll(function(){
        $('.collapse').collapse('hide');  
        $('.navbar-toggle').css('backgroundColor','transparent');
        $('.navbar-toggle').find('span').css('backgroundColor','#888');       
    });
    $('.navbar-toggle').click(function(event){
        // console.log($('.collapse').css('display'));
        // 当.collapse显示时，点击按钮将其隐藏后去掉按钮颜色；反则添加颜色
        if ($('.collapse').css('display')=='block'){
            $(this).css('backgroundColor','transparent');
            $(this).find('span').css('backgroundColor','#888');

        } else{
            $(this).css('backgroundColor','rgba(44,134,218,0.6)');
            $(this).find('span').css('backgroundColor','rgba(255,255,255,0.8)');
        }
    }); 
});  

// footer通用js
$(function(){  
    // 显示、隐藏 返回顶部按钮  
    if ($(document).scrollTop()>=200) {
        $('.to_top').stop().animate({'opacity':1,'right':8},80);
    }
    function toTop(){
        $(document).scroll(function(){
            // console.log($(document).scrollTop());
            if ($(document).scrollTop()>=200) {
                $('.to_top').stop().animate({'opacity':1,'right':8},80);
            } else{
                $('.to_top').stop().animate({'opacity':0,'right':-46},80);
            }
        });
    }  
    toTop();
    // 点击返回顶部
    $('.to_top').click(function(){            
        $('html,body').animate({scrollTop:0},350);
    })
}) 