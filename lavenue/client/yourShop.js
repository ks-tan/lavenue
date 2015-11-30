Template.yourShop.helpers({
	imageUrl: function() {
		return Session.get("shopImages");
	},
	getImageFromInstagram: function() {
		Meteor.call("getImageInfo", "https://api.instagram.com/v1/users/382872795/media/recent/?client_id=36a3a03c63914bb48edb68724a33e548", function(err, result){
			if (typeof err !== "undefined") {
				console.log(err);
			}

			if (typeof result === "undefined") {
				return;
			}
				
			imagesData = result.data.data
			if (typeof imagesData === "undefined") {
				return;
			}

			// get images with certain tag
			var shopImages = [];
			for (x in imagesData) {
				// var tags = imagesData[x].tags;

				// if (tags.length <= 0) {
				// 	continue;
				// }
				
				shopImages.push(imagesData[x].images.standard_resolution.url);
				// for (y in tags) {
				// 	// change the tag to correct one
				// 	if (tags[y] === "inktober") {
				// 		var url = imagesData[x].images.standard_resolution.url;
				// 		console.log(url);
				// 		Session.set("shopImage", url);
				// 	}
				// }
			}
			Session.set("shopImages", shopImages);
		});
	}
});