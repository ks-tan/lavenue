Template.home.onRendered(function(){
	$('.special.card .image').dimmer({
	  on: 'hover'
	});
	$('.card').transition('horizontal flip');
	$('.card').transition('horizontal flip');
});

Template.home.helpers({
	browseImages: function() {
		return Images.find().fetch();
	}
});