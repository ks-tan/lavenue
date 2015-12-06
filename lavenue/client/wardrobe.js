Template.wardrobe.onRendered(function(){
	$('.ui.segment').transition({
		animation: 'fade up',
		duration: '1s'
	});
	$('.special.card .image').dimmer({
	  on: 'hover'
	});
});

Template.wardrobe.events({
	'click #profileBreakdownButton': function(){
		$(".ui.modal").modal('show');
	}
});

Template.wardrobe.helpers({
	getRemaining: function(){
		if (Profile.findOne({userId: Meteor.userId()}).wallet == null){
			var id = Profile.findOne({userId: Meteor.userId()})._id;
			Profile.update(id, {$set: {wallet: 0}});
		}
		return Profile.findOne({userId: Meteor.userId()}).wallet;
	},
	purchases: function(){
		var myPurchases = Purchases.find({userId : Meteor.userId()}).fetch();
		for (x in myPurchases) {
			var itemId = myPurchases[x].itemId;
			var item = Items.findOne({_id : itemId});
			myPurchases[x].item = item;
		}
		return myPurchases;
	},
	imageUrl: function() {
		return ShopItems.find({}).fetch();
	},
	getImageFromInstagram: function() {
		if (ShopItems.find().count() == 0 || ShopItems == null){
			Meteor.call("getImageInfo", "https://api.instagram.com/v1/users/2288136085/media/recent/?client_id=36a3a03c63914bb48edb68724a33e548", function(err, result){
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
				// var shopImages = [];
				for (x in imagesData) {
					// var tags = imagesData[x].tags;

					// if (tags.length <= 0) {
					// 	continue;
					// }
					
					// shopImages.push(imagesData[x].images.standard_resolution.url);
					imageUrl = imagesData[x].images.standard_resolution.url;
					rand = Math.floor((Math.random() * 3) + 1);
					if (rand == 3){
						rent = "yes";
						publish = "yes";
					}else{
						rent = "no";
						publish = "no";
					}
					console.log(imageUrl);
					ShopItems.insert({
						imageUrl: imageUrl, 
						description: "", 
						price: "", 
						likes: "", 
						style: "",
						publish: publish,
						rented: rent
					});
					// for (y in tags) {
					// 	// change the tag to correct one
					// 	if (tags[y] === "inktober") {
					// 		var url = imagesData[x].images.standard_resolution.url;
					// 		console.log(url);
					// 		Session.set("shopImage", url);
					// 	}
					// }
				}
			});
		}	
	},
	getUserStylePreference: function(){
		var preference = Profile.findOne(Meteor.userId).preference[0];
		return preference;
	}
});

Template.yourShopCard.helpers({
	hasPrice: function(){
		if (this.price==""){
			return false;
		}
		return true;
	},
	isPublished: function(){
		if (this.publish != "yes"){
			return false;
		}
		return true;
	},
	isStyleIndicated: function(){
		if (this.style==""){
			return false;
		}
		return true;
	},
	isDescriptionEntered: function(){
		if (this.description == ""){
			return false;
		}
		return true;
	},
	isRented: function(){
		if (this.rented != "yes"){
			return false;
		}
		return true;
	}
});

Template.yourShopCard.events({
	"submit #insertPrice": function(event){
		event.preventDefault();
		var price = event.target.text.value;
		var id=this._id;
		ShopItems.update(id, {$set: {price: price}});
	},
	"click #publishButton": function(event){
		var id=this._id;
		ShopItems.update(id, {$set: {publish: "yes"}});
	},
	"submit #insertDescription": function(event){
		event.preventDefault();
	    var x = document.getElementById("insertDescription");
	    var description = "";
	    var i;
	    for (i = 0; i < x.length ;i++) {
	    	if (i == 0){
	    		var bust = x.elements[i].value;
	    	} else if (i == 1){
	    		var waist = x.elements[i].value;
	    	} else if (i == 2) {
	    		var hip = x.elements[i].value;
	    	}
	    }
	    var id = this._id
	    var description = document.getElementById(id+'insertDescription').value;
	    ShopItems.update(id, {$set: {bust: bust, waist: waist, hip: hip, description: description}});
	    console.log(description);
	}
});

