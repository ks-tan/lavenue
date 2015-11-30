Template.wardrobe.onRendered(function(){
	$('.ui.segment').transition({
		animation: 'fade up',
		duration: '1s'
	});
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
	}
});