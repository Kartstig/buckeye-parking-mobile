var win = Titanium.UI.createWindow();

var addr = "2138 Triad Court";
var city = "Columbus";
var state = "OH";

var pinList = { "Pins" : [
{
"name" : "Tommy's Pizza",
"address" : "1350 W Lane Ave",
"city" : "Columbus",
"state" : "OH",
"price" : "30",
}
{
"name" : "CVS",
"address" : "2160 N High St",
"city" : "Columbus",
"state" : "OH",
"price" : "25",
}
{
"name" : "Campus Pit Stop",
"address" : "868 W Lane Ave",
"city" : "Columbus",
"state" : "OH",
"price" : "20",
}
{
"name" : "Newmann Center",
"address" : "64 W Lane Ave",
"city" : "Columbus",
"state" : "OH",
"price" : "30",
}
]
}

function createPin(address, callback) {

	var lat_long = [];

	var addrsplit = address.split(" ");
	var citysplit = city.split(" ");

	var addrjoin = addrsplit.join("+");
	var cityjoin = citysplit.join("+");

	var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?address=" + addrjoin + "," + cityjoin + "," + state + "&sensor=false";

	Ti.API.info(addrUrl);

	/* web-service call */
	var addrReq = Titanium.Network.createHTTPClient();
	addrReq.open("GET", addrUrl);
	addrReq.send();

	addrReq.onload = function() {
		var response = JSON.parse(this.responseText);
		Ti.API.info(response.toString());
		if (response.status == "OK") {
			// Debugging
			Ti.API.info("lat : " + response.results[0].geometry.location.lat);
			Ti.API.info("lng : " + response.results[0].geometry.location.lng);

			lat_long[0] = response.results[0].geometry.location.lat;
			lat_long[1] = response.results[0].geometry.location.lng;

			callback(Titanium.Map.createAnnotation({
				title : "Parking Spots",
				pincolor : Titanium.Map.ANNOTATION_RED,
				animate : true,
				latitude : lat_long[0],
				longitude : lat_long[1],

			}));

			//return lat_long;
		} else {
			showAlert('', 'Unable to find Address');
		}
	};

}

function display_annotation(anno) {
	//Ti.API.info(anno);

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
		annotations : [anno],
	});

	win.add(mapView);

	win.open();
}

var pins = [createPin(addr, display_annotation)];
