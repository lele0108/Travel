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

			$("#location").autocomplete({
				source: function(request, response){
			 		var results = $.ui.autocomplete.filter(array, request.term);
			 		response(results.slice(0, 10));
			 	}
			});
		}
	});

});



$("#city").keypress(function(event){
	if(event.which == 13)
	{
		event.preventDefault();
		if($('#duration').val() == '')
			$('duration').val('3');
		window.location = "list.html?location="+$("#city").val()+"&duration="+$("#duration").val();
	}
});

$("#city").keyup(function(event){
	if($("#city").val()=='San Francisco' || $("#city").val()=='Boston' || $("#city").val()=='New York')
		$("#starting_point").css('display', 'block');
	else
		$("#starting_point").css('display', 'none');
});

$("#duration").keypress(function(event){
	if(event.which == 13)
	{
		event.preventDefault();
		if($('#duration').val() == '')
			$('duration').val('3');
		window.location = "list.html?location="+$("#city").val()+"&duration="+$("#duration").val();
	}
});



