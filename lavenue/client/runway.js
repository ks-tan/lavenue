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
			return shuffle(Items.find().fetch());
		}
	}
});

Template.card.events({
	'click #likeButton': function(){
		var itemId = event.target.value;
		Cart.insert({userId: Meteor.userId(), itemId: itemId});
	},
	'click #descriptionHolder': function(event) {
		event.preventDefault();
		var id = event.currentTarget.title;
		var item = Items.findOne({_id: id});
		$('#moreDetailsModal').modal('show', id);
		// $('h1.title').text("TITLE HERE");
		// $('img.image').attr('src', item.imageUrl);
		// $('p.description').text(item.description);
		// $('h3#price').text(item.price);
	}
});