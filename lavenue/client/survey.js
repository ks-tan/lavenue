Template.survey.onRendered(function(){
	$('.special.card .image').dimmer({
	  on: 'hover'
	});
	$('.card').hide();
	$('.buttons').hide();
	$('.card').first().transition('horizontal flip');
	$('.buttons').first().transition({animation: 'fade up', duration: 600});
});

Template.survey.helpers({
	surveyImages: function(){
		return Images.find().fetch();
	}
});

Template.survey.events({

});