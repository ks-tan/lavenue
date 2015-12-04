Template.runway.onRendered(function(){
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

Template.runway.helpers({
	browseImages: function() {
		var items = Items.find().fetch();
		var carts = Cart.find({userId: Meteor.userId()}).fetch();
		var itemInCarts = [];
		for (x in carts) {
			itemInCarts.push(carts[x].itemId);
		}
		var profile = Profile.findOne({userId: Meteor.userId()});
		if (typeof items != "undefined" && typeof profile != "undefined") {
			var preference = profile.preference;
			var result = [];
			for (x in preference) {
				for (y in items) {
					if (preference[x] == items[y].style) {
						if (itemInCarts.indexOf(items[y]._id) > -1) {
							items[y].liked = true
						} else {
							items[y].liked = false
						}
						result.push(items[y]);
					}
				}
			}
			return result;
		} else {
			return shuffle(Items.find().fetch());
		}
	}
});

Template.card.events({
	'click #likeButton': function(){
		var itemId;
		if(event.target == document.getElementById('likeButton')) {
			itemId = event.target.value;
		} else {
			itemId = event.target.parentNode.value;
		}
		if (typeof itemId !== "undefined") {
			Items.update(itemId, { $inc : { likes: 1 } });
			Cart.insert({userId: Meteor.userId(), itemId: itemId});
		}
	},
	'click #unlikeButton': function() {
		var itemId;
		if(event.target == document.getElementById('unlikeButton')) {
			itemId = event.target.value;
		} else {
			itemId = event.target.parentNode.value;
		}
		var cartId = Cart.findOne({userId: Meteor.userId(), itemId: itemId})._id;

		if (typeof cartId !== "undefined") {
			Items.update(itemId, { $inc : { likes: -1 } });
			Cart.remove(cartId);
		}
	},
	'click #descriptionHolder': function(event) {
		if(event.target == document.getElementById('descriptionHolder')) {
			event.preventDefault();
			var id = event.currentTarget.title;
			console.log(id);
			var item = Items.findOne({_id: id});
			$('#moreDetailsModal').modal('show');
			$('h1.title').text("TITLE HERE");
			$('img.image').attr('src', item.imageUrl);
			$('p.description').text(item.description);
			$('h3#price').text(item.price);
    	}
	}
});