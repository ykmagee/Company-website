
require('../css/solution_all.css');

// fullpage插件初始化设置
var myFullpage = new fullpage('#fullpage', {                
            verticalCentered: false,
            sectionsColor: ['#4BBFC3','#ccddff','#73d9c4','#cddcdc','#7BAABE', '#1bbc9b'],
            anchors: ['page1', 'page2', 'page3', 'page4'],
            navigation: true,
            scrollOverflow: true,

            licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
        });

$(function(){
    // 导航按钮最后一个隐藏
	$('#fp-nav li').last().addClass('hidden');

    //如果是PC端
    if(ykObj.IsPC()){
        // 导航按钮 hover效果
        $('#menu li').hover(function(){
            if (!$(this).hasClass('active')) {
                $(this).addClass('hover');
            }
        },function(){
            $(this).removeClass('hover');
        });
    }
   
    //如果是移动端
    if(!ykObj.IsPC()){
        $('#myVideo').remove();
    }
})