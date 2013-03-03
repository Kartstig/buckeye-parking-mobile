// Main UI Window
var win1 = Titanium.UI.createWindow({
	title : 'Map View',
	backgroundColor : '#fff',
	tabBarHidden : true,
	navBarHidden : true,

});
/*
 // Change default image view for splash
 var splashView = Titanium.UI.createImageView({
 image : '/Resources/default.png',
 defaultImage : '/Resources/default.png'
 });
 */
function createPin(currentView) {

	// JSON that has all the pins to put on the map
	var pinsUrl = "https://raw.github.com/Kartstig/buckeye-parking-mobile/master/pins.json";

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
			for (var i = 0; i < response.pins.length; i++) {
				currentPin = response.pins[i];

				/* Debugging
				 Ti.API.debug("lat : " + currentPin.lat);
				 Ti.API.debug("lng : " + currentPin.lng);
				 */

				var annos = Titanium.Map.createAnnotation({
					title : currentPin.name,
					pincolor : Titanium.Map.ANNOTATION_RED,
					animate : true,
					latitude : currentPin.lat,
					longitude : currentPin.lng,

				});

				currentView.addAnnotation(annos);
			}

		} else {
			showAlert('', 'Unable to find Address');

		}

	};

}

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
	top : 40
	// use annotations to place pins on the map
	//annotations : createPin()
});

// Button View
var buttonView = Titanium.UI.createView({
	top : 0,
	height : 40,
	backgroundGradient : {
		type : 'linear',
		colors : ['#15317E', '#151B54'],
		startPoint : {
			x : 0,
			y : 0
		},
		endPoint : {
			x : 0,
			y : 40
		},
		backFillStart : false
	}
})

// Buttons
var loginButton = Titanium.UI.createButton({
	top : 2,
	right : 1,
	height : 35,
	width : 46,
	backgroundImage : '/user.png'
});
buttonView.add(loginButton);

var searchButton = Titanium.UI.createButton({
	top : 2,
	right : 66,
	height : 35,
	width : 34,
	backgroundImage : '/search.png'
});
buttonView.add(searchButton);

// Listeners
loginButton.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the button");
});

searchButton.addEventListener('click', function(f) {
	Titanium.API.info("You clicked the button");
});

createPin(mapView);

// Add Views
win1.add(mapView);
win1.add(buttonView);

win1.open();

