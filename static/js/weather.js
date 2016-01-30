//API key 87282408cfa536e5b2ef2790f40928cf

var weather = {
	apiBase: 'http://api.openweathermap.org/data',
	apiVersion: '2.5',
	weatherEndpoint: 'weather',
	forecastEndpoint: 'forecast/daily',
	refreshTime: 60 * 60 * 1000, //1 hour
	params: {
            id: '5206379',
            units: 'imperial',
            lang: 'en',
            APPID: '' //replace with yours
    },
    iconMap: {
    	'01d':'wi-day-sunny',
    	'02d':'wi-day-sunny-overcast',
    	'03d':'wi-day-cloudy',
    	'04d':'wi-cloudy',
    	'09d':'wi-showers',
    	'10d':'wi-rain',
    	'11d':'wi-storm-showers',
    	'13d':'wi-snow',
    	'50d':'wi-fog',
    	'01n':'wi-night-clear',
    	'02n':'wi-night-alt-partly-cloudy',
    	'03n':'wi-night-alt-cloudy',
    	'04n':'wi-cloudy',
    	'09n':'wi-night-alt-showers',
    	'10n':'wi-night-alt-rain',
    	'11n':'wi-night-alt-storm-showers',
    	'13n':'wi-night-alt-snow',
    	'50n':'wi-night-fog'
    }
}


weather.currentWeather = function() {
	$.ajax({
			type: 'GET',
			url: weather.apiBase + '/' + weather.apiVersion + '/' + weather.weatherEndpoint,
			dataType: 'json',
			data: weather.params,
			success: function(data) {
				var temperature =  Math.round(parseFloat(data.main.temp));
				var humidity = data.main.humidity;
				var wind = data.wind.speed;
				var city = data.name;
				var title = data.weather[0].main;
				var subtitle = data.weather[0].description;
				var icon = data.weather[0].icon;
				var sunrise = moment(data.sys.sunrise*1000).format('hh:mm');
				var sunset = moment(data.sys.sunset*1000).format('hh:mm');

				var iconHTML = '<span class="wi ' + weather.iconMap[icon] + '"></span>';
				var temperatureHTML = iconHTML + ' ' + temperature + '&deg;';

				$(".temp").fadeOut("slow", function(){
					$(".temp").html(temperatureHTML);
					$(".temp").fadeIn("slow");
				});

				var now = moment().format('HH:mm');
				var sunriseMilitary = moment(data.sys.sunrise*1000).format('HH:mm');
				var sunsetMilitary = moment(data.sys.sunset*1000).format('HH:mm');

				var sunHTML = '<span class="wi wi-sunrise"></span>' + ' ' + sunrise;

				if(sunriseMilitary < now && now < sunsetMilitary){
					var sunHTML = '<span class="wi wi-sunset"></span>' + ' ' + sunset;
				}

				$(".sun").fadeOut("slow", function(){
					$(".sun").html(sunHTML);
					$(".sun").fadeIn("slow");
				});

			}
	});
}

weather.currentForecast = function(){
	$.ajax({
			type:'GET',
			url: weather.apiBase + '/' + weather.apiVersion + '/' + weather.forecastEndpoint,
			dataType: 'json',
			data: weather.params,
			success: function(data){
				var forecastHTML = '<table class="forecast-table">';
				var opacity = 1;

				$.each(data.list, function(index, date){
					var day = moment(date.dt*1000).format('ddd');
					var max = Math.round(parseFloat(date.temp.max));
					var min = Math.round(parseFloat(date.temp.min));
					var subtitle = date.weather[0].description;
					var icon = date.weather[0].icon;

					forecastHTML += '<tr style="opacity:' + opacity + '">';

					forecastHTML += '<td class="icon-small wi ' + weather.iconMap[icon] + '"></td>';
					forecastHTML += '<td class="day">' + day + '</td>';
					forecastHTML += '<td class="temp-max">' + max + '</td>';
					forecastHTML += '<td class="temp-min">' + min + '</td>';

					forecastHTML += '</tr>';

					opacity -= 0.115;

				});

				forecastHTML += '</table>';

				$(".forecast").fadeOut("slow", function(){
					$(".forecast").html(forecastHTML);
					$(".forecast").fadeIn("slow");
				});
			}
	});
}

weather.init = function() {
	weather.currentWeather();
	weather.currentForecast();
	setInterval(function(){
		weather.currentWeather();
		weather.currentForecast();
	}, weather.refreshTime);
}
