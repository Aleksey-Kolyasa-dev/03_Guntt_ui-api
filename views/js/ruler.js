$(document).ready(function() {
/*RULER SECTION START*/

//ruler switcher
$('.ruler-main').hide();
$('#ruler-button').click(function(e){
	
	if(!e.target.rulerStatus){
		e.target.rulerStatus = true;
		$('.ruler-main').show();



	}
	else{
		e.target.rulerStatus = false;
		$('.ruler-main').hide();

	}
});

// Ruler move
$('.ruler-move button').mousemove(function(xPos){
		var positionX = xPos.pageX;
	
		/*$('.ruler-main').css({
								'left': positionX -  
							});*/

		$('.ruler-main').offset({left:positionX - ( $('.ruler-main').width()/2 ) });					
});

//ruler size control
$('.plus').click(function(){
	var test = $('.ruler-main').width();

	$('.ruler-main').width(test+5);

});
$('.minus').click(function(){
	var test = $('.ruler-main').width();

	$('.ruler-main').width(test-5);

});

// RULER RESIZABLE




/*RULER SECTION END*/


}); // DOCUMENT End