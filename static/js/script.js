var lastLoad = 0;

//refresh data
function loadLoop() {
	var secSinceLast = ((new Date().getTime() - lastLoad)/1000);
	if (secSinceLast > 60) {
		//fuelBand();
		lastLoad = (new Date().getTime()/1000);
	}
	setTimeout('loadLoop();', 1000);
}

// var category = 1; //1,2,3,4
// var period = 'day'; //min hour day week
// var therequest = 'bid=us' + '-' + period + '-' + category;
// var url = "http://top.io/api/rb.php?" + therequest;
// 
// // $.getJSON(url,
// //     function(data){
// //         console.log(data);
// //        return false;
// //     });
// 
// $.ajax({
// 	url: "http://www.top.io/api/rb.php",
// 	type: "GET",
// 	contentType: 'text/plain',
// 	dataType: "json",
// 	data: therequest,
// 	cache: false,
// 	xhrFields: {withCredentials: false},
// 	success: function (data) {
// 		console.log(data);
// 	},
//  	error: function(xhr, status, error) {
//    		console.log("readyState: " + xhr.readyState);
//     	console.log("responseText: "+ xhr.responseText);
//     	console.log("status: " + xhr.status);
//     	console.log("text status: " + status);
//     	console.log("error: " + error);
//  	}
// });