var win = Titanium.UI.createWindow();

// JSON that has all the pins to put on the map
var pinsUrl = "https://raw.github.com/Kartstig/buckeye-parking-mobile/master/pins.json";

function createPin(callback) {

	var lat_long = [];

	// Debug URL
	Ti.API.debug(pinsUrl);

	/* web-service call */
	var pinsReq = Titanium.Network.createHTTPClient();
	pinsReq.open("GET", pinsUrl);
	pinsReq.send();

	pinsReq.onload = function() {
		var response = JSON.parse(this.responseText);
		if (response.status == "OK") {
			// iterate through the JSON to build annotation sets
			var currentPin;
			for (var i = 0; i < response.pins.length - 1; i++) {
				currentPin = response.pins[0];

				// Debugging
				Ti.API.debug("lat : " + currentPin.lat);
				Ti.API.debug("lng : " + currentPin.lng);

				var annos = ( {
					title : currentPin.name,
					pincolor : Titanium.Map.ANNOTATION_RED,
					animate : true,
					latitude : currentPin.lat,
					longitude : currentPin.lng,

				});
			}
			
			callback(Titanium.Map.createAnnotation(annos));

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
