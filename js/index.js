$("#location").keypress(function(event){
	if(event.which == 13)
	{
		event.preventDefault();
		window.location = "/list.html?location="+$("#location").text()+"&duration="+$("#duration").text();
	}
});
$("#duration").keypress(function(event){
	if(event.which == 13)
	{
		event.preventDefault();
		window.location = "/list.html?location="+$("#location").text()+"&duration="+$("#duration").text();
	}
});