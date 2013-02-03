$(document).ready(function() {

  var map = L.map('map-hb').setView([31, 12], 1);

  var fullScreen = new L.Control.FullScreen();
  map.addControl(fullScreen);

  new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.Google(),
    zoomLevel: 10,
  }).addTo(map);

  L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
    key: 'BC9A493B41014CAABB98F0471D759707'
  }).addTo(map);

  var markers = new L.MarkerClusterGroup();


  loadGist('406aef518e12a98b56d2', function (data) {
    var layer = L.geoJson(data, {
      onEachFeature: onEachFeature
    });
    markers.addLayer(layer);
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());
  });

  function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.description) {
      layer.bindPopup(feature.properties.description);
    }
    layer.bindLabel(feature.properties.name);
  }

  function loadGist(gistid, callback) {
    $.ajax({
      url: 'https://api.github.com/gists/'+gistid,
      type: 'GET',
      dataType: 'jsonp'
    }).success( function(gistdata) {
      var objects = [];
      for (file in gistdata.data.files) {
        if (gistdata.data.files.hasOwnProperty(file)) {
          var o = JSON.parse(gistdata.data.files[file].content);
          if (o) {
            objects.push(o);
          }
        }
      }
      if (objects.length > 0) {
        callback(objects[0]);
      }
    }).error(function(e) {
      // ajax error
    });
  }

});
