---
layout: page
locale: ""
title: "Contact"
description: ""
---
{% include JB/setup %}

<div id="map" style="height: 350px"></div>


<script>
  var map = new L.Map('map');
  // var url = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png';
  // var url = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
  var url = 'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png32';
  var attribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
  var layer = new L.TileLayer(url, {maxZoom: 18, attribution: attribution});
  
  var OCIcon = L.Icon.extend({
    options: {
      iconUrl: '{{ site.IMG_PATH }}/oc_square_logo_128_reasonably_small.png',
      // shadowUrl: '{{ site.IMG_PATH }}/oc_square_logo_111.png',
      // shadowUrl: '../docs/images/leaf-shadow.png',
      iconSize: new L.Point(60, 60),
      // shadowSize: new L.Point(68, 95),
      iconAnchor: new L.Point(30, 30),
      popupAnchor: new L.Point(0, -30)
    }
  });
  var LeafIcon = L.Icon.extend({
    options: {
       iconUrl: '{{ site.IMG_PATH }}/leaf-green.png',
       shadowUrl: '{{ site.IMG_PATH }}/leaf-shadow.png',
       iconSize: new L.Point(38, 95),
       shadowSize: new L.Point(68, 95),
       iconAnchor: new L.Point(22, 94),
       popupAnchor: new L.Point(-3, -76)
    } 
  });
    
  var myIcon = new OCIcon();
  // var myIcon = new LeafIcon();
  
  map.setView(new L.LatLng(41.383931, 2.199927), 14).addLayer(layer);
  marker = new L.Marker(new L.LatLng(41.383931, 2.199927), {icon: myIcon});
  
  map.addLayer(marker);
  marker.bindPopup("Open Consortium<br/>Calle Escullera de Poblenou 15<br/>08005 Barcelona<br/><b>SPAIN</b>.<br/><a id='email' class='btn btn-large' href='mailto:infoREMOVE@marzeelabsTHIS.org' title='Want to know more?'>Contact Us</a>").openPopup();
</script>