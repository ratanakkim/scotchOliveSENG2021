function renewMap(coordinate){
  var mapObj = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 18,
    center: coordinate,
  });
  return mapObj;
}

function getJSON(url){
  var Httpreq = new XMLHttpRequest(); // Init a request
  Httpreq.open("GET", url,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function getCoordinate(ip){
  var json_str = getJSON("http://freegeoip.net/json/" + ip); // Send request to freegeoip to get json string -> hence parse it to a json object;
  var json = JSON.parse(json_str);
  var coordinate = {lat: json.latitude, lng: json.longitude};
  return coordinate;
}

function getMarker(hop){
  var coordinate = getCoordinate(hop);
  var marker = new google.maps.Marker({
    position: coordinate,
    animation: google.maps.Animation.DROP,
  });
  return marker;
}
