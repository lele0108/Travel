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
	var city = params.city;
	var city_text = decodeURI(city);
	var location = params.location;
	var location_text = decodeURI(location);

	$("#location").html("<p>The location you entered is: "+location_text+"</p>");
	$("#duration").html("<p>The duration you entered is: "+duration_text+"</p>");


	var JSON_RESPONSE;
	var html_insert = '';

	MyModel = Backbone.Model.extend({
		urlRoot: "",
		defaults:{
			// set defaults here!
		},
		initialize: function(){
			//constructor for this model
		}
	});
	var the_model = new MyModel();
	the_model.url = 'http://blankket-mk8te7kbzv.elasticbeanstalk.com/getroutes?city='+city+'&duration='+duration+'&location='+location;
	the_model.fetch({
		success: function(response){
			JSON_RESPONSE = response.toJSON();
			if(JSON_RESPONSE[0] != null)
				best_trip = JSON_RESPONSE[0];
			
			console.log(best_trip);
			var trip_array = best_trip.place.elements;
			console.log(trip_array);
			var trip_length = trip_array.length;

			for(var index = 1; index < trip_length+1; index++)
			{
				html_insert += "<p>"+index+". Place Name: "+trip_array[index-1].placeName+"</p>";
				html_insert += "<ul>";
				html_insert += "<li>Latitude: "+trip_array[index-1].lat+"</li>";
				html_insert += "<li>Longitude: "+trip_array[index-1].lon+"</li>";
				html_insert += "<li>Time to spend here: "+trip_array[index-1].avgTimeSpent+"</li>";
				html_insert += "<li style='color:#42ba98;'>Traverse Score&copy; : "+trip_array[index-1].score+"</li>";
				html_insert += "</ul>";
			}

			$("#content").html(html_insert);


		}
	});
});





