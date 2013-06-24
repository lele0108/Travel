$(document).ready(function(){
	var prmstr = window.location.search.substr(1);
	var prmarr = prmstr.split ("&");
	var params = {};

	for ( var i = 0; i < prmarr.length; i++) {
		var tmparr = prmarr[i].split("=");
		params[tmparr[0]] = tmparr[1];
	}
	//this contains the query
	var duration = params.duration;
	var duration_text = decodeURI(duration);
	var city = params.location;
	var city_text = decodeURI(location);
	var location = params.location;
	var location_text = decodeURI(location);

	$("#location").html("<p>The location you entered is: "+location_text+"</p>");
	$("#duration").html("<p>The duration you entered is: "+duration_text+"</p>");


	var JSON_RESPONSE;
	var html_insert = '';

	MyModel = Backbone.Model.extend({
		urlRoot: "http://blankket-mk8te7kbzv.elasticbeanstalk.com/incoming?location=Louise%20M.%20Davies%20Symphony%20Hall(San%20Francisco)&duration=5",
		defaults:{
			// set defaults here!
		},
		initialize: function(){
			console.log("MyModel made.");
		}
	});
	var the_model = new MyModel();
	the_model.url = 'http://blankket-mk8te7kbzv.elasticbeanstalk.com/incoming?location='+location+'&duration='+duration;
	the_model.fetch({
		success: function(response){
			JSON_RESPONSE = response.toJSON();
			best_trip = JSON_RESPONSE[0];
			console.log(best_trip);

			var size = 0;
			for (var key in best_trip)
			{
				if(best_trip.hasOwnProperty(key))
					size++;
			} 

			console.log("size is: "+size);
			for (var index = 0; index < size; index++)
			{
				var place = best_trip.place[index];
				html_insert += "<p>Place Name"+place.placeName+"</p>";
			}
			$("#content").html(html_insert);


		}
	});
});





