// Main UI Window
var win = Titanium.UI.createWindow({
	title : 'Map View',
	backgroundColor : '#fff',
	tabBarHidden : true,
	navBarHidden : true,

});

// Change default image view for splash
var splashView = Titanium.UI.createImageView({
	image : '/image_name.png',
	defaultImage : '/my_default_BG_image.png'
});

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

				// Debugging
				Ti.API.debug("lat : " + currentPin.lat);
				Ti.API.debug("lng : " + currentPin.lng);

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

/*
bb1.addEventListener('click',function(e)
{
// handle tableview click events
var idx = e.index;
switch(idx)
{
case 0: {win.add(tableview); Ti.API.info("login");break;}
case 1: {win.add(reg_tableview); Ti.API.info("register"); break; }
case 2: {Ti.API.info("configure"); break; }

}
});
*/

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
	userLocation : false
	// use annotations to place pins on the map
	//annotations : createPin()
});

createPin(mapView);

win.add(mapView);

win.open();

