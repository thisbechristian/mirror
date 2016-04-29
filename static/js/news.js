var news = {
	newsUrl:'/news',
	categories: 4,
	headlines: 7,
	categoryMap: {
		1: '<i class="fa fa-newspaper-o"></i>',
		2: '<i class="fa fa-smile-o"></i>',
		3: '<i class="fa fa-laptop"></i>',
		4: '<i class="fa fa-futbol-o"></i>',
		5: '<i class="fa fa-building-o"></i>'
	},
	refreshTime: 15 * 60 * 1000 //15 minutes
}

news.currentNews = function(){
	var opacity = 1;
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
						headline++;
					}
					opacity -= 0.15;
					if(c == news.categories){
						newsHTML += '</p>';
						$(".news").fadeOut("slow", function(){
							$(".news").html(newsHTML);
							$(".news").fadeIn("slow");
						});
					}
				}
			}
		}(i));
	}
}

news.init = function(){
	news.currentNews();
	setInterval(function(){
		news.currentNews();
	}, news.refreshTime);
}
