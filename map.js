(function() {
  var office = new L.LatLng(41.384, 2.200);
  // replace "toner" here with "terrain" or "watercolor"
  var layer = new L.StamenTileLayer("toner");
  // var layer = new L.StamenTileLayer("watercolor");

  var map = new L.Map("map");
  map.setView(office, 12).addLayer(layer);
	
	// Add a marker
  marker = new L.Marker(office);
  var popupContent = '<h3>Our headquarters</h3>';
  popupContent += "<p>We are located in Barcelona, Spain.</p>";
  popupContent += "<p>Calle Escullera del Poble Nou 15<br/>08005 Barcelona<br/>Spain</p>";
	map.addLayer(marker);
  // marker.bindPopup(popupContent).openPopup();
  marker.bindPopup(popupContent);
}());