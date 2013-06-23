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
	console.log("duration is: "+duration);
	var location = params.location;
	console.log("location is: "+location);



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
			console.log(JSON_RESPONSE);

			var size = 0;
			for (var key in JSON_RESPONSE)
			{
				if(JSON_RESPONSE.hasOwnProperty(key))
					size++;
			}
			console.log("size: "+size);

			html_insert += "<ul>";
			for(var index = 0; index < size; index++)
			{
				html_insert += "<li>"+(JSON_RESPONSE[index].score).toString()+"</li>";
			}
			html_insert +="</ul";
			$("#content").html(html_insert);
		}
	});
});





