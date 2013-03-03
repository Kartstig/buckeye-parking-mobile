	var lat_long = [];

	var addrsplit = address.split(" ");
	var citysplit = city.split(" ");

	var addrjoin = addrsplit.join("+");
	var cityjoin = citysplit.join("+");

	var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?address=" + addrjoin + "," + cityjoin + "," + state + "&sensor=false";
	
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