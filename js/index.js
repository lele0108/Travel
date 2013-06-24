$(document).ready(function(){

	GET_PLACES = Backbone.Model.extend({
		urlRoot: "",
		defaults:{},
		initialize: function(){
			console.log("get places made");
		}
	});

	var get_stuff = new GET_PLACES();
	get_stuff.url = 'http://blankket-mk8te7kbzv.elasticbeanstalk.com/getcities';
	get_stuff.fetch({
		success: function(response){
			var array = [];

			var size = 0;
			for (var key in response.changed)
			{
				if(response.changed.hasOwnProperty(key))
					size++;
			} 

			for (var i = 0; i < size; i++)
			{
				array.push(response.changed[i]);
			}
			$("#city").autocomplete({
		 	source: array
		 	});
		}
	});

	get_stuff.url = 'http://blankket-mk8te7kbzv.elasticbeanstalk.com/getplaces?city=San%20Francisco';
	get_stuff.fetch({
		success: function(response){
			console.log(response);
			var array = [];

			var size = 0;
			for (var key in response.changed)
			{
				if(response.changed.hasOwnProperty(key))
					size++;
			}

			for (var i = 0; i < size; i++)
			{
				array.push(response.changed[i]);
			}

			$("#location_place").autocomplete({
				source: function(request, response){
			 		var results = $.ui.autocomplete.filter(array, request.term);
			 		response(results.slice(0, 10));
			 	}
			});
		}
	});

});


setInterval(function(){
	if($("#city").val()=='San Francisco' || $("#city").val()=='Boston' || $("#city").val()=='New York')
		$("#point_interest").css('display', 'block');
	else
		$("#point_interest").css('display', 'none');
}, 20);


$("#city").keypress(function(event){
	if(event.which == 13)
	{
		event.preventDefault();
		if($('#duration').val() == '')
		{
			$('#duration').val('3');
		}
		alert($("#location_place").val());
		window.location = "list.html?city="+$("#city").val()+"&duration="+$("#duration").val()+"&location="+$("#location_place").val();
	}
});

$("#duration").keypress(function(event){
	if(event.which == 13)
	{
		event.preventDefault();
		if($('#duration').val() == '')
		{
			$('#duration').val('3');
		}
		window.location = "list.html?city="+$("#city").val()+"&duration="+$("#duration").val()+"&location="+$("#location_place").val();
	}
});

$("#location_place").keypress(function(event){
	if(event.which == 13)
	{
		event.preventDefault();
		if($('#duration').val() == '')
		{
			$('#duration').val('3');
		}
		window.location = "list.html?city="+$("#city").val()+"&duration="+$("#duration").val()+"&location="+$("#location_place").val();
	}
});



