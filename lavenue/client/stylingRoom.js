Template.stylingRoom.onRendered(function(){
	$('.special.card .image').dimmer({
	  on: 'hover'
	});
	$('.card').hide();
	$('.card')
	  .transition({
	    animation : 'horizontal flip',
	    duration  : 800,
	    reverse   : 'auto',
	    interval  : 200
	  })
});

Template.stylingRoom.helpers({
	chosenItem: function(){
		var myCart = Cart.find({userId : Meteor.userId()}).fetch();
		for (x in myCart) {
			var itemId = myCart[x].itemId;
			var item = Items.findOne({_id : itemId});
			myCart[x].item = item;
		}
		console.log(myCart);
		return myCart;
	},
	totalPrice: function() {
		var chosenToRentCart = Cart.find({userId : Meteor.userId(), isChosenToRent: true}).fetch();
		var total = 0;
		for (x in chosenToRentCart) {
			var itemId = chosenToRentCart[x].itemId;
			var item = Items.findOne({_id : itemId});
			total += item.price;
		}
		return total;
	},
	getRemaining: function(totalPrice) {
		if (Profile.findOne({userId: Meteor.userId()}) == null || isNaN(Profile.findOne({userId: Meteor.userId()}).wallet)){
			var id = Profile.findOne({userId: Meteor.userId()})._id;
			Profile.update(id, {$set: {wallet: 0}});
		}
		return Profile.findOne({userId: Meteor.userId()}).wallet - totalPrice;
	},
	hasNotEnoughMoney: function(totalPrice){
		return (Profile.findOne({userId: Meteor.userId()}).wallet-totalPrice) < 0;
	}
});

Template.stylingRoom.events({
	'click #subscriptionButton':function(){
		$('#subscriptionModal').modal('show');
	},
	'click #topupButton': function(){
		$('#topupModal').modal('show');
	},
	'click #paypalButton': function(){
		$('#paypalModal').modal('show');
		$('#paypalLoading').fadeIn().delay(500).fadeOut(100);
		$('#paypalSuccess').hide().delay(1000).fadeIn();

		var chosenToRentCart = Cart.find({userId : Meteor.userId(), isChosenToRent: true}).fetch();
		for (x in chosenToRentCart) {
			Meteor.userId();
			Purchases.insert(chosenToRentCart[x]);
			var id = chosenToRentCart[x]._id;
			Cart.remove(id);
		}
	},
	'click #rentButton': function(event) {
		event.preventDefault();
		var cartId = event.target.value;
		
		Cart.update(cartId, {$set : {isChosenToRent: true}});
	},
	'click #unrentButton': function(event) {
		event.preventDefault();
		var cartId = event.target.value;
		
		Cart.update(cartId, {$set : {isChosenToRent: false}});
	}
});

Template.subscription.events({
	'click #paypalButton': function(event){
		$('#paypalModal').modal('show');
		$('#paypalLoading').fadeIn().delay(500).fadeOut(100);
		$('#paypalSuccess').hide().delay(1000).fadeIn();
	}
});

Template.topup.events({
	'click #paypalButton': function(event){
		$('#paypalModal').modal('show');
		$('#paypalLoading').fadeIn().delay(500).fadeOut(100);
		$('#paypalSuccess').hide().delay(1000).fadeIn();
		var topupAmount = Number(event.target.value);
		var walletRemaining = Number(Profile.findOne({userId: Meteor.userId()}).wallet) + topupAmount;
		var id = Profile.findOne({userId: Meteor.userId()})._id;
		Profile.update(id, {$set: {wallet: walletRemaining}});
	}
});