import React from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';

var map = undefined;

const mapStyle = {
  height: '90%',
  width: '100%'
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    // Declare map instance
    this.map = {};
  }

  componentDidMount() {
    loadGoogleMapsAPI({
      key: "AIzaSyDxXV2ROw4zIWXpZnqUeZbvmG1StaY8Wl0",
      v: '3.25'
    }).then((googleMaps) => {
      this.initMap(googleMaps);
    });
  }

  initMap(googleMaps) {
    // Prevents future API calls
    googleMaps = googleMaps;

    var hackReactor = { lat: 37.791066, lng: -122.3991683 }

    // Acquires current location of user
/*    navigator.geolocation.getCurrentPosition(function(position) {
      var latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };*/

    // Creates map object for rendering 
    map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: hackReactor,
    });

    // Creates a marker at the current location
    var marker = new googleMaps.Marker({
      position: hackReactor,
      map: map,
      draggable: true,
    });

    // Populate map with all properties;
    this.populateMap(googleMaps);
  }

  populateMap(googleMaps) {

    let geocoder = new googleMaps.Geocoder();

    // Convert all property addresses to geolocations and place markers at each location
    this.props.properties.forEach((property) => {
      geocoder.geocode({address: property.location}, (results, status) => {
        var newMarker = new googleMaps.Marker({
          map: map,
          position: {
            lat: results[0].geometry.location.lat(), 
            lng: results[0].geometry.location.lng()
          }
        });
        var infoWindow = new googleMaps.InfoWindow();
        newMarker.addListener('click', function() {
          infoWindow.setContent( property.name + '<br>' +property.location );
          infoWindow.open(map, newMarker);
        });
      });
    });


  }

  render() {
    return (
      <div id='map' style={ mapStyle }>
      </div>
    );
  }
}

export default Map;