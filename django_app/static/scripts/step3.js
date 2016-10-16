// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {

  infoWindow = new google.maps.InfoWindow();
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -33.8688,
      lng: 151.2195
    },
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  var list = document.getElementById('myList');
  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(myList);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);


  //create an empty list of places firstly
  var placeList = [];

  var markers = [];




  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  google.maps.event.addListener(map, 'rightclick', function(event) {
    addMarker(event.latLng, map,placeList);
  });


  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    var resName = places[0].name;
    var apiQ = "https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet&q=";
    var searchQ = resName;
    var keyQ = "&key=AIzaSyB4d2ew9UfHchhlYl_VBLtGryqgwbD18eA";
    var resQuery = apiQ.concat(searchQ).concat(keyQ);
    var watchStr = "https://www.youtube.com/watch?v="
    var embedStr = "https://www.youtube.com/embed/"
    var wholeEmbedStr = " "
    var xmlHttp = new XMLHttpRequest();
    //added var
    var name1 = " ";
    var name2 = " ";
    var name3 = " ";
    //
    document.getElementById('map').style.visibility = "visible";
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        var myResponse = JSON.parse(xmlHttp.responseText);

      //callback(xmlHttp.responseText);
      document.getElementById('firstVideo').textContent = watchStr + (myResponse.items[0].id.videoId);
      document.getElementById('secondVideo').textContent = watchStr + (myResponse.items[1].id.videoId);
      document.getElementById('thirdVideo').textContent = watchStr + (myResponse.items[2].id.videoId);
      //
      name1 = myResponse.items[0].snippet.title;
      name2 = myResponse.items[1].snippet.title;
      name3 = myResponse.items[2].snippet.title;
      console.log(myResponse.items.length)
      Allsrc = []
      for(i =0;i < myResponse.items.length -1 ;i++){
        mySrc = myResponse.items[i].id.videoId
        console.log(mySrc)
        embedStr = "https://www.youtube.com/embed/"
        Allsrc.push(mySrc)
      }
      console.log(Allsrc)
      //wholeEmbedStr = embedStr + Allsrc[0]
      document.getElementById('playerFrame').src = wholeEmbedStr;
      //document.getElementById('playerFrame').src = wholeEmbedStr;
      document.getElementById('info-box').textContent = wholeEmbedStr;


    }



    //var vidID = myResponse.items[0].id.videoId ;
    //var vidLink = "https://www.youtube.com/watch?v=".concat(vidID);
    xmlHttp.open("GET", resQuery, false);
    // true for asynchronous
    xmlHttp.send(null);

    document.getElementById('firstVideo').textContent = name1;
    document.getElementById('secondVideo').textContent = name2;
    document.getElementById('thirdVideo').textContent = name3;
    //document.getElementById('firstVideo').href = "youtube.com";
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    //markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,

      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

function showPlayer(index) {
  embedStr = "https://www.youtube.com/embed/"
  if (document.getElementById('playerFrame').style.visibility == "hidden") {
    document.getElementById('playerFrame').src = embedStr + Allsrc[index]
    document.getElementById('playerFrame').style.visibility = "visible";

    //document.getElementById('info-box').textContent = embedStr + Allsrc[index]
  } else {
  //  document.getElementById('playerFrame').src = embedStr + Allsrc[index]
  //  document.getElementById('info-box').textContent = embedStr + Allsrc[index]
    document.getElementById('playerFrame').style.visibility = "hidden"
  //  document.getElementById('playerFrame').src = embedStr + Allsrc[index]

  }


}
function dimMap(){
	document.getElementById('map').opacity="0.5";
}
function searchFocus(){
	document.getElementById('pac-input').focus();
}

function addMarker(location, map,placeList) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  /*var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
  });*/
  //infowindow.open(map,marker);
  google.maps.event.addListener(marker, 'click', function() {
    var coord = marker.getPosition();
    var transCoor = coord.toString();
    infoWindow.setContent('<p>'+transCoor+'</p>'+'<button onclick="addIntoListFunc(location,map,placeList)">Save me to List</button>');
    infoWindow.open(map, marker);

  });
}

function addIntoListFunc(location, map,placeList){

  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  /*
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if(results[1]){

      }

    }
  }
  */

  placeList = [{placeName: 'name',placePosition:marker.position.toString()}];
  console.log(marker);
}