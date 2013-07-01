$(document).ready(function(){

	$("#city").focus();

	GET_PLACES = Backbone.Model.extend({
		urlRoot: "",
		defaults:{},
		initialize: function(){
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

$(".search").click(function(){
	if($('#duration').val() == '')
	{
		$('#duration').val('3');
	}
	window.location = "list.html?city="+$("#city").val()+"&duration="+$("#duration").val()+"&location="+$("#location_place").val();
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

// Makes sure input is always a number. REMEMBER we still need some server side validations.

addEvent(document.getElementById('duration'),'keyup',validate);
addEvent(document.getElementById('duration'),'mouseover',validate);

function validate(event){
    
    var str=this.value;
    
    var charsAllowed="0123456789";
    var allowed;
    
    for(var i=0;i<this.value.length;i++){
        
        allowed=false;
        
        for(var j=0;j<charsAllowed.length;j++){
            if( this.value.charAt(i)==charsAllowed.charAt(j) ){ allowed=true; }
        }
        
        if(allowed==false){ this.value = this.value.replace(this.value.charAt(i),""); i--; }
    }
    
    return true;
}



function addEvent(obj,type,fn) {
 
    if (obj.addEventListener) {
        obj.addEventListener(type,fn,false);
        return true;
    } else if (obj.attachEvent) {
        obj['e'+type+fn] = fn;
        obj[type+fn] = function() { obj['e'+type+fn]( window.event );}
        var r = obj.attachEvent('on'+type, obj[type+fn]);
        return r;
    } else {
        obj['on'+type] = fn;
        return true;
    }
}



