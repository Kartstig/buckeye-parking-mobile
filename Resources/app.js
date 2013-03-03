var win = Titanium.UI.createWindow();

// JSON that has all the pins to put on the map
var pinsUrl = "https://raw.github.com/Kartstig/buckeye-parking-mobile/master/pins.json";

function createPin(callback) {

	var lat_long = [];

	Ti.API.debug(pinsUrl);

	/* web-service call */
	var pinsReq = Titanium.Network.createHTTPClient();
	pinsReq.open("GET", pinsUrl);
	pinsReq.send();

	pinsReq.onload = function() {
		var response = JSON.parse(this.responseText);
		if (response.status == "OK") {
			// iterate through the JSON to build annotation sets
			for (var i = 0; i < response.pins.length; i++) {
				// Debugging
				Ti.API.debug("lat : " + response.pins[i].lat);
				Ti.API.debug("lng : " + response.pins[i].lng);

				callback(Titanium.Map.createAnnotation({
					title : response.pins[i].name,
					pincolor : Titanium.Map.ANNOTATION_RED,
					animate : true,
					latitude : response.pins[i].lat,
					longitude : response.pins[i].lng,

				}));
			}

		} else {
			showAlert('', 'Unable to find Address');
		}
	};

}

function display_annotation(anno) {
	
	// Google Maps View
	var mapView = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		region : {
			latitude : 40.001780,
			longitude : -83.019691,
			latitudeDelta : 0.04,
			longitudeDelta : 0.04
		},
		animate : true,
		regionFit : true,
		userLocation : false,
		// use annotations to place pins on the map
		annotations : [anno],
	});

	win.add(mapView);

	win.open();
}

createPin(display_annotation);
