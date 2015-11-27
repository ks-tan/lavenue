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
		return 200 - totalPrice;
	}
});

Template.stylingRoom.events({
	'click #subscriptionButton':function(){
		$('#subscriptionModal').modal('show');
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