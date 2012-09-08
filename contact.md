---
layout: page
locale: ""
title: "Contact"
description: ""
group: menu
weight: 5
---
{% include JB/setup %}

<div class="row">
  <div class="span6">
    
    <h4>Want to work with us?</h4>
      <p>Send us an email or pass by our office. We'd love to chat with you.</p>
      <p>
        <i class="icon-envelope"> </i> You can send us an email at <a href="mailto:info@openconsortium.org">info@openconsortium.org</a> and we'll get in touch in with you.</br>
        <i class="icon-headphones"> </i> Or call us on Skype: <a href="skype:openconsortium">openconsortium</a>
      </p>
      <p>
        <a id="email" class="btn btn-info" href="mailto:info@openconsortium.org" title="Want to know more?"><span class="add-on"><i class="icon-envelope icon-white"> </i></span> <b>Send us an email</b></a>
      </p>    
    
    <br>
    
    <h4>Meet our Team</h4>
      <p>We are young professionals with a shared interest in science, technology and communication.</p>
      {% assign team_collate = site.categories.team %}
      <ul class="thumbnails">
        {% for person in team_collate %}
          <li class="span3">
            <div class="thumbnail">            
              <a href="{{ BASE_PATH }}{{ person.permalink }}">
                <img src="http://placekitten.com/270/100" alt="{{ person.title}}" title="{{ person.title}}">
              </a>
              <h5>{{ person.title}}</h5>
              <p>{{ person.short_bio}}</p>
              <address>
                <a href="mailto:{{ person.email}}">{{ person.email}}</a>,
                <a href="http://twitter.com/{{ person.twitter}}">@{{ person.twitter}}</a>
              </address>
            </div>
          </li>
        {% endfor %}
      </ul>
      {% assign team_collate = nil %}    
      <p>We can also count on <a href="http://twitter.com/nunoveloso">Nuno Veloso</a>, open-source contributor and all-round technologist, and <a href="http://twitter.com/fidibiko">Joao Belchior</a>, designer and creator of the logo of Open Consortium.</p>
    
  </div>
  <div class="span6">
    <h4>Where to find us</h4>
      <p>We live and work in the center of Barcelona, Spain, a modern city in Europe and a hub for science, innovation and technology.</p>
      <div class="well well-small">
        <!-- <i class="icon-bullhorn"></i> -->
        <address><i class="icon-map-marker"> </i>
          <strong>Open Consortium</strong><br>
          Calle Escullera de Poblenou 15<br>
          08005 Barcelona, Spain<br>
        </address>
      </div>
      <div id="map" style="height: 400px; width: 100%"></div>
  </div>
</div>




<script>
  var map = new L.Map('map');
  // var url = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png';
  // var url = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
  // var url = 'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png32';
  var url = 'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-chester/{z}/{x}/{y}.png32';
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
  
  map.setView(new L.LatLng(41.383931, 2.199927), 4).addLayer(layer);
  // marker = new L.Marker(new L.LatLng(41.383931, 2.199927), {icon: myIcon});
  marker = new L.Marker(new L.LatLng(41.383931, 2.199927));
  
  map.addLayer(marker);
  
  html = 'Calle Escullera de Poblenou 15<br/>08005 Barcelona, Spain<br/><br/>';
  html += "<a href='https://www.google.com/maps/ms?msa=0&amp;msid=216938678935670822755.0004c2306ab10c2258707&amp;ie=UTF8&amp;ll=41.386166,2.198068&amp;spn=0.00449,0.009589&amp;t=m&amp;source=embed' class='btn btn-small btn-info'><i class='icon-map-marker icon-white' target='_blank'> </i> <b>Open in Google Maps</b></a>";
  
  marker.bindPopup(html, {closeButton: false});
</script>