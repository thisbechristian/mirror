var news = {
	newsUrl:'/news',
	categories: 4,
	headlines: 10,
	items: [],
	flashTime: 7 * 1000, //7 seconds
	refreshTime: 15 * 60 * 1000, //15 minutes
	categoryMap: {
		1: '<i class="fa fa-newspaper-o"></i>',
		2: '<i class="fa fa-smile-o"></i>',
		3: '<i class="fa fa-laptop"></i>',
		4: '<i class="fa fa-futbol-o"></i>',
		5: '<i class="fa fa-building-o"></i>'
	}
}

news.currentNews = function(){
	var opacity = 1;
	var items = [];
	var newsHTML = '<p class="marquee">';
	for(i = 1; i <= news.categories; i++){
		var params = {t:'day', c: i.toString()};
		$.getJSON(news.newsUrl, params, function(c){
			return function(data) {
				if(data){
					//var category = news.categoryMap[c];
					//newsHTML += '<div class="news-category">' + category + '</div>';
					//newsHTML += '<hr style="opacity:' + opacity + '"><p class="headlines">';
					var headline = 0;
					while(headline < news.headlines && headline < data.length){
						var title = data[headline].title;
						var likes = data[headline].w;
						newsHTML += ' &#149; &#149; &#149; ' + title + '.';
						items.push(title);
						headline++;
					}
					opacity -= 0.15;
					if(c == news.categories){
						news.items = items;
						newsHTML += '</p>';
						// uncomment for marquee news
						// $(".scroll").fadeOut("slow", function(){
						// 	$(".scroll").html(newsHTML);
						// 	$(".scroll").fadeIn("slow");
						// });
					}
				}
			}
		}(i));
	}
}

news.flash = function(){
	var range = news.items.length;
	if(range == 0) { return; }
	var rnd = Math.floor(Math.random() * range);
	var icon = '<i class="fa fa-newspaper-o"></i>'
	var title = news.items[rnd]
	var headline = icon + " " + title;
	$('.popup').html(headline);
	$('.popup').show("slow");
}

news.init = function(){
	news.currentNews();

	setInterval(function(){
		$('.popup').hide("slow");
		setTimeout(function(){
			news.flash();
		}, 1000);
	}, news.flashTime);

	setInterval(function(){
		news.currentNews();
	}, news.refreshTime);
}
