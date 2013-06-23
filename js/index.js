$(document).ready(function(){
	 var availableTags = ["Dolores Park, San Francisco","Mission Dolores, San Francisco","State Building, San Francisco","Haight-Ashbury, San Francisco","Botanical Garden, San Francisco","Spreckels Mansion, San Francisco","Veterans Building, San Francisco","Panhandle Park, San Francisco","Conservatory of Flowers, San Francisco","Japanese Tea Garden, San Francisco","Louise M. Davies Symphony Hall, San Francisco","M.H. De Young Museum, San Francisco","War Memorial Opera House, San Francisco","Saint Ignatius Church, San Francisco","Alamo Square, San Francisco","City Hall, San Francisco","Golden Gate Park, San Francisco","Ocean Beach, San Francisco","Civic Center, San Francisco","St. Mary\u0027s Cathedral, San Francisco","Yerba Buena Gardens, San Francisco","Museum of Modern Art, San Francisco","Japantown, San Francisco","Union Square, San Francisco","Dutch Windmill, San Francisco","Sutro Heights, San Francisco","Alta Plaza, San Francisco","Holy Virgin Cathedral, San Francisco","Temple Emanu-El, San Francisco","Columbarium, San Francisco","Grace Cathedral, San Francisco","Huntington Park, San Francisco","555 California Street, San Francisco","Lafayette Park, San Francisco","Pacific-Union Club, San Francisco","Old St. Mary\u0027s Church, San Francisco","Nob Hill, San Francisco","Haas-Lilienthal House, San Francisco","Washington Square, San Francisco","Chinatown, San Francisco","Cable Cars, San Francisco","Embarcadero Center, San Francisco","TransAmerica Pyramid, San Francisco","Ferry Building, San Francisco","Octagon House, San Francisco","Vedanta Temple, San Francisco","Cliff House, San Francisco","Palace of the Legion of Honor, San Francisco","Seal Rocks, San Francisco","Sutro Bath Ruins, San Francisco","Lombard Street, San Francisco","Saints Peter and Paul Church, San Francisco","Baker Beach, San Francisco","Coit Tower, San Francisco","Lincoln Park, San Francisco","Palace of Fine Arts, San Francisco","Ghirardelli Square, San Francisco","Fisherman\u0027s Wharf, San Francisco","Presidio Park, San Francisco","Fort Mason, San Francisco","Pier 39, San Francisco","Crissy Field, San Francisco","Hyde Street Pier, San Francisco","USS Pampanito, San Francisco","Golden Gate Bridge, San Francisco","Alcatraz Island, San Francisco","Bay Bridge, San Francisco","Chinatown Gate, San Francisco"];
	 $("#location").autocomplete({
	 	source: function(request, response){
	 		var results = $.ui.autocomplete.filter(availableTags, request.term);
	 		response(results.slice(0, 10));
	 	}
	 });
});



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