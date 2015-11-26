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
		return shuffle(Items.find().fetch());
	}
});

Template.card.events({
	'click #likeButton': function(){
		var itemId = event.target.value;
		var item = Items.findOne({_id: itemId});
		Cart.insert({item: item});
	}
});