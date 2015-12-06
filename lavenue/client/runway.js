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

		for (x in items) {
			if (itemInCarts.indexOf(items[x]._id) > -1) {
				items[x].liked = true
			} else {
				items[x].liked = false
			}
		}

		var profile = Profile.findOne({userId: Meteor.userId()});
		if (typeof items != "undefined" && typeof profile != "undefined") {
			var preference = profile.preference;
			var result = [];
			for (x in preference) {
				for (y in items) {
					if (preference[x] == items[y].style) {
						result.push(items[y]);
					}
				}
			}
			return result;
		} else {
			return items;
		}
	}
});

Template.card.events({
	'click #likeButton': function(){
		var itemId;
		if(event.target.id == "likeButton") {
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
		console.log(event.target.id);
		if(event.target.id == "unlikeButton") {
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
		console.log(event.target)
		if(event.currentTarget.id == "descriptionHolder") {
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