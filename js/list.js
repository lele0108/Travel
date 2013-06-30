var trip_array;

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
			trip_array = best_trip.place.elements;
			console.log(trip_array);
			var trip_length = trip_array.length;

			for(var index = 0; index < trip_length; index++)
			{
				html_insert += "<a class='place_link' href='#'><div onclick='clicked(this);' id='"+index+"' class='row-fluid place'>";
				html_insert += "<div class='info'>";
				html_insert += "<p class='title'>"+(index+1)+". "+trip_array[index].placeName+"</p>";
				html_insert += "</div></div></a><hr>";
			}

			$(".locations").html(html_insert);


		}
	});
});

function clicked(place)
{
	var id = place.id;
	var place_obj = trip_array[id];
	var insert = "<h3><u>"+place_obj.placeName+"</u></h3>";
	insert += "<p>Time to spend here: "+place_obj.avgTimeSpent+"</p>";
	insert += "<p>Traverse Score: "+place_obj.score+"</p>";
	$(".details").transition({height:'300px'});
	$(".details_contents").html(insert);
}






