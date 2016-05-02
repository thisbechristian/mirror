var fuelband = {
	fuelUrl: '/fuel',
	refreshTime: 60 * 60 * 1000, //1 hour
	dayMap: {
		'monday': 0,
		'tuesday': 1,
		'wednesday': 2,
		'thursday': 3,
		'friday': 4,
		'saturday': 5,
		'sunday': 6,
	}
}

fuelband.currentFuelBand = function(){
	$.getJSON(fuelband.fuelUrl, function(data){
		if(data){

			var day = moment().format('dddd').toLowerCase();
			var thisWeekCounter = fuelband.dayMap[day];
			var thisWeek = data.weekly[1];
			var lastWeek = data.weekly[0];

			var fuelbandHTML = '<table class="fuelband-table">';
			var opacity = 1;

			function display(day, today){
				var steps = day.steps;
				var fuel = day.fuel;
				// date is in GMT not EST (add 5 hours in milliseconds)
				var date = parseInt(day.startDate) + 18000000;
				date = moment(date).format('ddd');
				var goal = day.dailyGoal.dailyGoalsSuccessful;
				var icon = goal ? 'fa fa-check' : 'fa fa-times';

				// add day to fuelband table
				fuelbandHTML += '<tr style="opacity:' + opacity + '">';
				fuelbandHTML += '<td class="icon-small ' + icon + '"></td>';
				fuelbandHTML += '<td class="day">' + date + '</td>';
				fuelbandHTML += '<td class="fuel">' + fuel + '</td>';
				fuelbandHTML += '<td class="steps">' + steps + '</td>';
				fuelbandHTML += '</tr>';

				// special display for today's date
				if(today){
					var fuelIconHTML = '<span class="wi wi-lightning"></span>';
					var fuelHTML = fuelIconHTML + ' ' + fuel;
					var stepsIconHTML = '<span class="fa fa-heartbeat"></span>';
					var stepsHTML = stepsIconHTML + ' ' + steps;

					$(".fuel").fadeOut("slow", function(){
						$(".fuel").html(fuelHTML);
						$(".fuel").fadeIn("slow");
					});

					$(".steps").fadeOut("slow", function(){
						$(".steps").html(stepsHTML);
						$(".steps").fadeIn("slow");
					});
				}

				opacity -= 0.115;
			}

			// cycle through this week
			for(i = thisWeekCounter; i >= 0; i--){
				today = (i == thisWeekCounter);
				display(thisWeek.history[i], today);
			}

			// cycle through last week
			for(i = 6; i > thisWeekCounter; i--){
				display(lastWeek.history[i], false);
			}

			fuelbandHTML += '</table>';

			$(".fuelstats").fadeOut("slow", function(){
				$(".fuelstats").html(fuelbandHTML);
				$(".fuelstats").fadeIn("slow");
			});

		}
	});
}

fuelband.init = function() {
	fuelband.currentFuelBand();
	setInterval(function(){
		fuelband.currentFuelBand();
	}, fuelband.refreshTime);
}
