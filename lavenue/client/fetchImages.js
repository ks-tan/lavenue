var style = ["Whimsical", "Avant-garde", "Bohemian", "Chic", "Classic"];
Template.fetchItems.onRendered(function(){
	var imagesCollection = Items.find().fetch();
	if (imagesCollection.length == 0) { 
		var shortCodes = ["-VIYqHBDm1", "-TXJxmhDqe", "-QtblvBDic", "-LjRjThDga", "-DscBvhDpx", "-DKhZfhDrk", "93AzlxhDpk", "-DZwWkhDhs", "-TgjguhDmO", "-W67u-x3jv", "-UI_U7R3hh", "-Ix2dIx3gy", "9_ioc2R3jU", "9yeINCR3qP", "-K9tfvw8AB", "-EN8GDQ8LS", "-BRhstQ8Gi", "96DXB3w8JI", "9vlirVQ8Cc", "-VkQHBivF5", "-S6fHCivLb", "-QV5H9ivOh", "-LHU54ivPN", "-A4NRaivF0", "97uBmDCvAR", "95VYW-CvC-", "-SZN2Dmcqy", "-PorLkGcs9", "-FMkzqGcjR", "966goTmcg9", "9UdzE-Gcsw", "9PB2h5Gcs7"]
		shortCodes = shuffle(shortCodes);
		for (i = 0; i < shortCodes.length; i++) {
			var url = "https://api.instagram.com/v1/media/shortcode/" + shortCodes[i] + "?client_id=36a3a03c63914bb48edb68724a33e548"
			Meteor.call("getImageInfo", url, function(error, result){
				var nLikes = Math.floor(Math.random() * 100) + 50;
				if (typeof error !== "undefined") {
					console.log(error);
					return;
				}

				var data = result.data.data;
				if (typeof data === "undefined") {
					console.log("cannot get data");
					return;
				}
				var images = data.images;
				var imageUrl = images.standard_resolution.url;
				if (typeof imageUrl === "undefined") {
					console.log("imageUrl undefined");
					return;
				}
				console.log(imageUrl);
				var randomStyle = Math.floor(Math.random() * 5);

				var possibility = Math.random();
				var randomPrice;
				if (possibility > 0.9) {
					randomPrice = Math.floor(Math.random() * 300) + 200;
				} else {
					randomPrice = Math.floor(Math.random() * 150) + 50;
				}
				Items.insert({imageUrl: imageUrl, 
							description: "Am I pretty?", 
							price: "$" + randomPrice + ".00", 
							likes: nLikes, 
							style: style[randomStyle]});
			});
		}
	}
});

shuffle = function(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	}

	return array;
}