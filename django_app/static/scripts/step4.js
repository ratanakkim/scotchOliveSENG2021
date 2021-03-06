// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var wikiRes = "";
var markers = [];
var tempID = 0;
//var positionList = [];

function goToDirections(){
	var addrArgs = [];
	for (i=0; i<markers.length; i++){
		if (markers[i].saved == 1){
			addrArgs.push(markers[i].position.lat()+","+markers[i].position.lng());
		}
	}
	if (document.location.href.indexOf("?") === -1){
		document.location.href = document.location.href.substring(0, document.location.href.length-4)+"presets?places="+addrArgs.join("_"); //url with args
	}
	else{
		document.location.href = document.location.href.substring(0, document.location.href.indexOf("?")-4)+"presets?places="+addrArgs.join("_");
	}
}

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
    getInfo('Sydney');
    var curURL = location.href;
    var idStr = curURL.match(/idType=.+$/g);
    var list = document.getElementById('myList');
    //map.controls[google.maps.ControlPosition.LEFT_CENTER].push(myList);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    var placeList = [];

    if (typeof(Storage) !== "undefined") {
        window.sessionStorage.setItem("markerList", JSON.stringify(markers));
    } else {
        alert("No sessionStorage! PANIC!!")
    }
    if (idStr != null) {
        document.getElementById('map').style.visibility = "visible";
        var idType = idStr[0].substr(7);
        var searchQ = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query="
        var keyQ = "&key=AIzaSyB4d2ew9UfHchhlYl_VBLtGryqgwbD18eA";
        var fullSearchQ = searchQ.concat(searchQ).concat(keyQ);
    }

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
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
        var name1 = " ";
        var name2 = " ";
        var name3 = " ";
        var xmlHttp = new XMLHttpRequest();
        document.getElementById('map').style.visibility = "visible";
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                var myResponse = JSON.parse(xmlHttp.responseText);
            //callback(xmlHttp.responseText);
            document.getElementById('firstVideo').textContent = watchStr + (myResponse.items[0].id.videoId);
            document.getElementById('secondVideo').textContent = watchStr + (myResponse.items[1].id.videoId);
            document.getElementById('thirdVideo').textContent = watchStr + (myResponse.items[2].id.videoId);
            //alert(getInfo('Sydney'));
            //getInfo('Sydney');
            name1 = myResponse.items[0].snippet.title;
            name2 = myResponse.items[1].snippet.title;
            name3 = myResponse.items[2].snippet.title;
            console.log(myResponse.items.length)
            Allsrc = []
            for (i = 0; i < myResponse.items.length - 1; i++) {
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
        /*markers.forEach(function(marker) {
         marker.setMap(null);
         });
         */
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
                saved: 0,
                deleted: 0,
                number: markers.length,


            }));


            console.log(markers.length);
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        map.fitBounds(bounds);
    });
    google.maps.event.addListener(map, 'rightclick', function(event) {
        console.log(markers.length);
        addMarker(event.latLng, map, markers);
    });

	//we are just implementing the categories to help someone who is very stupid, enter something appropriate into the search box
	//now going to check if we have an argument in the url
	if (document.location.href.indexOf("?idType=") != -1){ //have an id argument
		var argField = document.location.href.substring(document.location.href.indexOf("?idType=")+8, document.location.href.length);
		window.alert("try entering \"" + argField + "\" into the search box to get your preferred content");
	}
}

function showPlayer(index) {
    
    document.getElementById("wikiPane").innerHTML = wikiRes;
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


function dimMap() {
    document.getElementById('map').opacity = "0.5";
}

function searchFocus() {
    document.getElementById('pac-input').focus();
}

function addMarker(location, map, markers) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        saved: 0,
        deleted: 0,
        number: markers.length,
    });
    markers[markers.length] = marker;
    console.log(markers.length);
    console.log(marker.number + "sup");

    markers.forEach(function(marker) {
        google.maps.event.addListener(marker, 'click', function() {
            tempID = marker.number;
            console.log(markers.length.toString());
            var save1;
            var coord = marker.getPosition();
            var transCoor = coord.toString();
            var compiled = '<button onclick="savePlace()">Save me to List</button>' +
                '<button onclick=deletePlace()>Reset list</button>';

            infoWindow.setContent('<p>' + transCoor + '</p>' + compiled);

            infoWindow.open(map, marker);
        });

    });
}

function savePlace() {
    var temp = 0;
    while (temp != tempID && temp < 20) {
        temp++;
    }
    if (markers[temp].saved == 1) {
        window.alert("This place has already been added into list!");
    } else {
        markers[temp].saved = 1;
        markers[temp].deleted = 0;
        var x = document.createElement('LI');
        var a = document.createElement('a');
        a.className = "dr-icon1 dr-icon-loc";
        var textNode = document.createTextNode(markers[temp].getPosition().toString() + "\n");
        //positionList.push(markers[temp].number);
        x.appendChild(a);
        x.appendChild(textNode);
        document.getElementById('placeList').appendChild(x);
        console.log(markers[temp].saved + "saved place");
        window.alert("Cheers, u have saved this place to list!");
    }
    console.log(markers[temp].saved + "iiii");
}

function deletePlace() {
    /*
    var temp = 0;
    var temp1 = 0;
    var list = document.getElementById('placeList');

    while(markers[temp].number != tempID && temp<markers.length){
        temp++;
    }

    while(markers[temp].number != positionList[temp1] && temp1<list.childElementCount){
        temp1++;
    }


    if (markers[temp].deleted == 1) {
        window.alert("The place has been deleted/not added, no need to do again");
    } else {
        console.log(temp+"ooooo");




        if(markers[temp].number == tempID && markers[temp].number== positionList[temp1]){
            console.log("doing");
            list.removeChild(list.childNodes[temp1]);
            markers[temp].deleted = 1;
            markers[temp].saved = 0;
        }
        console.log(temp);
        console.log(temp1);

        console.log("deleted");
        //window.alert("Cheers, the place has now been removed from list");
    }
    */
    markers.forEach(function (marker){
        marker.saved = 0;
    });
    var list = document.getElementById('placeList');
    list.textContent = '';


}



function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url, true);
    } else {
        // CORS not supported.
        xhr = null;

    }
    return xhr;
}

function getInfo(name) {
    var url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + encodeURI(name);

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    //xhr.onload = function() {
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = xhr.responseText;
            var jsonReponse = JSON.parse(response);
            var text = Object.values(jsonReponse.query.pages)[0].extract;
            //alert(text);

            document.getElementById("wikiPane").innerHTML = text;
            return text;
        }
    };

    xhr.onerror = function() {
        alert('Woops, there was an error getting information.');
    };
    xhr.send();
}
