var win = Titanium.UI.createWindow();

function getLatLong(address){
      var geo = new google.maps.Geocoder;

      geo.geocode({'address':address},function(results, status){
              if (status == google.maps.GeocoderStatus.OK) {
                return results[0].geometry.location.lattitude;
                return results[0].geometry.location.longitude;
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }

       });

  }
 
var mapView = Titanium.Map.createView({
	    mapType : Titanium.Map.STANDARD_TYPE,
    	region : {latitude:40.001780, longitude:-83.019691,latitudeDelta:0.04, longitudeDelta:0.04},            
    	animate : true,
    	regionFit : true,
    	userLocation : false
});
 
win.add(mapView);

win.open();
