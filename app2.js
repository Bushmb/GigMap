var map;
var tour;
var markers = [];
var pageCount = 1;
var totalList = [];
var eventList;
var lastClicked = 0;

function initMap(locations) {

	var styledMapType = new google.maps.StyledMapType(
	[
	  {
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#212121"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.icon",
	    "stylers": [
	      {
	        "visibility": "on"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#757575"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "color": "#212121"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#757575"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative.country",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#9e9e9e"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative.locality",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#bdbdbd"
	      }
	    ]
	  },
	  {
	    "featureType": "poi",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#757575"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#181818"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#616161"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "color": "#1b1b1b"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "stylers": [
	      {
	        "visibility": "off"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "geometry.fill",
	    "stylers": [
	      {
	        "color": "#2c2c2c"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#8a8a8a"
	      }
	    ]
	  },
	  {
	    "featureType": "road.arterial",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#373737"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#3c3c3c"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway.controlled_access",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#4e4e4e"
	      }
	    ]
	  },
	  {
	    "featureType": "road.local",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#616161"
	      }
	    ]
	  },
	  {
	    "featureType": "transit",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#757575"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#000000"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#3d3d3d"
	      }
	    ]
	  }
	],
	{name: 'Styled Map'});

	//initializing map and default settings

	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 5,
	  center: {lat: 39.0119, lng: -98.4842},
	  mapTypeControlOptions: {
	              mapTypeIds: ['styled_map']
	            }
	});

	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');	

}  //end of initMap();

function setMarkers(locations, eventDate, eventName) {

	var count = 1;
	var bounds = new google.maps.LatLngBounds();

	// setting map parameters to fit all markers

		for(i = 0; i < locations.length; i++) {
			bounds.extend(locations[i]);
		}

		if(locations.length > 1) {
			map.fitBounds(bounds);
			map.panToBounds(bounds);
		}

		else {
		map.setCenter(locations[0]);
		map.setZoom(4);
		}
	
	// loop over locations array and add markers to map

		locations.forEach(function(location, i){
			window.setTimeout(function() {	
			  markers.push(new google.maps.Marker({
			    position: location,
			    map: map,
			    id: count,
			    icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+count+'|5e769b|000000',
			    title: eventName[i] + " "+ eventDate[i],
			    animation: google.maps.Animation.DROP
			  }));


			  markers[i].addListener('click', function() {
			  	map.setZoom(5);
			  	map.setCenter(markers[i].getPosition());
	            markers[i].setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
	            markers[lastClicked].setIcon('https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+(lastClicked+1)+'|5e769b|000000')
	            markers[i].setIcon('https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+(i+1)+'|ff0f0f|000000')
	            // markers[lastClicked].setAnimation(null);
	            // markers[i].setAnimation(google.maps.Animation.BOUNCE);
	            // setTimeout(function () {
	            //     markers[i].setAnimation(null);
	            // }, 1500); // current maps duration of one bounce (v3.13)
	            
	          });

			  count++;
			}, i * 50);
		})

		// setting polyline on map based on locations array
		
		tour = new google.maps.Polyline({
		  path: locations,
		  geodesic: true,
		  strokeColor: 'yellow',
		  strokeOpacity: 0.5,
		  strokeWeight: 2
		});

		tour.setMap(map);
						
	pageCount = 1;

}

function clearMarkers() {

	totalList = [];
	$('#results-bar').html("");

	if(tour) {
		tour.setMap(null);
	}

	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(null);
	}

	markers = [];


}


function getArtistIdFromApi(searchTerm) {

	var myApiKey = "ofqFcyXEVBW3U9se";
	var url = "https://api.songkick.com/api/3.0/search/artists.json?query="+searchTerm+"&apikey="+myApiKey;

	$.getJSON(url + "&jsoncallback=?", function(data){
		var artistList = data.resultsPage.results.artist;

		// sets up the drop down list based on results form artist name search

		var create = '<select id="artistSelection">';
		    for(var i = 0; i < artistList.length;i++)
		    {
		        create += '<option value="'+artistList[i].id+'">'+artistList[i].displayName+'</option>';
		    }
		    create += '</select>';
		    jQuery('#dropdown').append(create);
   		
   		//gets event history from top returned value

		getEventHistoryFromApi(artistList[0].id);
		
	});
}

function getEventHistoryFromApi(artistId) {
	
	var myApiKey = "ofqFcyXEVBW3U9se";
	var url = "https://api.songkick.com/api/3.0/artists/" + artistId + "/gigography.json?apikey=" + myApiKey + "&min_date=2012-01-01&max_date=2016-12-31";
	
	$.getJSON(url + "&page=" + pageCount + "&jsoncallback=?", function(data){
		var eventList = data.resultsPage.results.event;
		
		if (eventList == undefined){
			if(totalList.length >= 1){
				reduceMyData(totalList);
			}
			else {
				$('.errMsg').show().fadeOut(1200);     
				return false;
			}
		}

		else {
			pageCount++;
			totalList = totalList.concat(eventList);
			getEventHistoryFromApi(artistId);
		}
	});	
}

function reduceMyData(totalList){

	//takes totalList which contains all the data from songkick about the concerts and strips out certain data
	//to be used in other functions

	var eventName = totalList.reduce(function(eventArr, event){
		if(event) {
			var s = event.displayName;
			var n = s.indexOf('(');
			s = s.substring(0, n != -1 ? n : s.length)
			eventArr.push(s);
		}
		return eventArr;
	}, []);

	var eventDate = totalList.reduce(function(eventArr, event){
		if(event) {
			eventArr.push(event.start.date);	
		}
		return eventArr;
	}, []);

	var locations = totalList.reduce(function(eventArr, event){
		if(event){
			delete event.location.city;

			//checking for bad lat & long data, and replaces it with arbitrary point

			if(event.location.lat == null || event.location.lng == null) {
				event.location = {lat: 40.7128, lng: 74.0059}
				eventArr.push(event.location);
			}
			else {
				eventArr.push(event.location);	
			}	
		}
		return eventArr;
			
	}, []);
	
	populateResults(eventName, eventDate);
	setMarkers(locations, eventDate, eventName);
}

function populateResults(eventName, eventDate){
	
	var toAppend = ''
	for(i=0; i < eventName.length; i++){
		toAppend += "<div class='result' data-id="+ i +"><a href='#' class='fillthediv'>" +
					"<div class='numResult'>"+(i+1)+"</div>" +
					// "<div class='textResult'>" + 
					"<span class='fulldivhead'>" + eventName[i] + "</span>" +
					"<br/>" +
					"<span class='fulldivp'>" + eventDate[i] + "</span>" +
					// "</div>" +
					"</a></div>"


		// toAppend += "<div class='result'>" + eventName[i] + "</div>" + "<button data-id="+ i +">button"+(i+1)+"</button>";
	}
	$('#results-bar').append(toAppend);
}


function watchSubmit() {

	$('.js-search-form').submit(function(e) {
		e.preventDefault();
		$("#bandname").blur(); 
		$('#dropdown').html("");
		// $('#results-bar').show();
		var searchTerm = $('#bandname').val();
		clearMarkers();
		getArtistIdFromApi(searchTerm);	
	});
 }

function watchArtistSelection() {

	$("#search-bar").on('change',"#artistSelection", function(){
	    clearMarkers();
	    pageCount = 1;
	    getEventHistoryFromApi(this.value);
	});  
}

function selectPin() {

	$("#results-bar").on('click', ".result", function(){
		var i = $(this).data('id')
	    google.maps.event.trigger(markers[i], 'click');
	    lastClicked = i;
	});  
}

 $(document).ready(function() {

 	watchSubmit();
 	watchArtistSelection();
 	selectPin();

 });

 $(document).on({
     ajaxStart: function() { $("body").addClass("loading");},
     ajaxStop: function() { $("body").removeClass("loading");}    
 });




