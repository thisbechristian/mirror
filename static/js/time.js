var time = {
	refreshTime: 1000
}

time.currentTime = function(){
	var now = moment();
	var date = moment().format("dddd, LL");
	$('.time').html(now.format('h:mm[<span class="sec">]ss[</span>]'));
	$('.date').html(date);
}

time.init = function(){
	time.currentTime();
	setInterval(function(){
		time.currentTime();
	}, time.refreshTime);
}