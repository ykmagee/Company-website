
require('../css/service.css');

$(function(){
	$('.area>span').click(function(){
		var $contact_phone = $(this).siblings('.contact_phone');
		$contact_phone.slideToggle(400);
		$contact_phone.parent('.area').find('span i').toggleClass('glyphicon-menu-down glyphicon-menu-up');		
	});
	var addressFn = function(){
		var $addressLi=$('.content ul.row li');
		var height1 = $addressLi.eq(0).height();
		var height2 = $addressLi.eq(1).height();
		var maxHeight=Math.max(height1,height2);
		console.log(height1);
		$addressLi.eq(0).height(maxHeight);
		$addressLi.eq(1).height(maxHeight);
	}
	addressFn();
	// $(window).resize(function(){
	// 	addressFn();
	// 	console.log('222');
	// });
	
})

