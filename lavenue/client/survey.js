var numOfPicturesSwiped = 0;

Template.survey.onRendered(function(){
	$('.special.card .image').dimmer({
	  on: 'hover'
	});
	$('.surveyCard').hide();
	$('.surveyCard').first().transition('horizontal flip').addClass('shown');
	$('#surveyDoneMsg').hide();
});

Template.survey.helpers({
	surveyImages: function(){
		return Images.find().fetch();
	}
});

Template.survey.events({
	'click #positiveSurvey': function(){
		$('.surveyCard.shown').last().transition('horizontal flip');
		setTimeout(function(){
			$('.surveyCard.shown').last().next().transition('horizontal flip').addClass("shown");
		}, 600);
		numOfPicturesSwiped++;
		if (numOfPicturesSwiped == 5){
			$('#surveyDoneMsg').transition('fade up');
		}
	}
});