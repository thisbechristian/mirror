var fuelband = {
	fuelUrl: '/fuel',
	dayMap: {
		'monday': 0,
		'tuesday': 1,
		'wednesday': 2,
		'thursday': 3,
		'friday': 4,
		'saturday': 5,
		'sunday': 6,
	},
	refreshTime: 24 * 60 * 60 * 1000 //1 day
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
		
		for(i = thisWeekCounter; i >= 0; i--){
			var day = thisWeek.history[i];
			var steps = day.steps;
			var fuel = day.fuel;
			//Date is in GMT not EST (add 5 hours in milliseconds)
			var date = parseInt(day.startDate) + 18000000;
			date = moment(date).format('ddd');
			var goal = day.dailyGoal.dailyGoalsSuccessful;
			var icon = goal ? 'fa fa-check' : 'fa fa-times';
			
			//Date is today
			if(i == thisWeekCounter){
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
			else
			{
				fuelbandHTML += '<tr style="opacity:' + opacity + '">';
			
				fuelbandHTML += '<td class="' + icon + '"></td>';
				fuelbandHTML += '<td class="day">' + date + '</td>';
				fuelbandHTML += '<td class="fuel">' + fuel + '</td>';
				fuelbandHTML += '<td class="steps">' + steps + '</td>';
			
				fuelbandHTML += '</tr>';
			}
			
			opacity -= 0.115;
		}
		
		for(i = 6; i > thisWeekCounter; i--){
			var day = lastWeek.history[i];
			var steps = day.steps;
			var fuel = day.fuel;
			//Date is in GMT not EST (add 5 hours in milliseconds)
			var date = parseInt(day.startDate) + 18000000;
			date = moment(date).format('ddd');
			var goal = day.dailyGoal.dailyGoalsSuccessful;
			var icon = goal ? 'fa fa-check' : 'fa fa-times';
			
			fuelbandHTML += '<tr style="opacity:' + opacity + '">';
			
			fuelbandHTML += '<td class="icon-small ' + icon + '"></td>';
			fuelbandHTML += '<td class="day">' + date + '</td>';
			fuelbandHTML += '<td class="fuel">' + fuel + '</td>';
			fuelbandHTML += '<td class="steps">' + steps + '</td>';
			
			fuelbandHTML += '</tr>';
			
			opacity -= 0.115;
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