var trip_array;
var id;

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
			
			trip_array = best_trip.place.elements;
			var trip_length = trip_array.length;

			for(var index = 0; index < trip_length; index++)
			{
				html_insert += "<a class='place_link' href='#'><div onClick='clicked(this);' id='"+index+"' class='place'>";
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
	if (id != null)
	{
		var last = document.getElementById(id);
		last.className = "place";
	}
	id = place.id;
	var current = document.getElementById(id);
	current.className = current.className + " place_clicked";
	var place_obj = trip_array[id];
	console.log(place_obj);
	var insert = "<h3><u>"+place_obj.placeName+"</u></h3>";
	insert += "<p>Time to spend here: "+place_obj.avgTimeSpent+" minutes</p>";
	insert += "<p class='score'>Traverse Score: "+place_obj.score+"</p>";
	insert += "<div id='map'></div>";

	var point = new google.maps.LatLng(place_obj.lat, place_obj.lon);

	// now doing google map
	var mapOptions = {
    zoom: 15,
    center: point,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  	}

	$(".details").html(insert);
	$(".details").slideDown('slow');
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var marker = new google.maps.Marker({
		position: point,
		animation: google.maps.Animation.DROP,
		map: map, 
		title: place_obj.placeName
	});
}






