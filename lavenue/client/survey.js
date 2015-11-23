var numOfPicturesSwiped = 0;

Template.survey.onRendered(function(){
	$('.special.card .image').dimmer({
	  on: 'hover'
	});
	$('.surveyCard').hide();
	$('.surveyCard').first().transition('horizontal flip').addClass('shown');
	if (numOfPicturesSwiped < 5){
		$('#surveyDoneMsg').hide();
	} else {
		$('#analysing').hide();
	}
});

Template.survey.helpers({
	surveyImages: function(){
		return Images.find().fetch();
	}
});

Template.survey.events({
	'click .ui.big.button': function(){
		$('.surveyCard.shown').last().transition('horizontal flip');
		setTimeout(function(){
			$('.surveyCard.shown').last().next().transition('horizontal flip').addClass("shown");
		}, 600);
		numOfPicturesSwiped++;
		if (numOfPicturesSwiped == 5){
			$('#analysing').transition('fade up');
			setTimeout(function(){
				$('#analysing').hide();
				$('#surveyDoneMsg').transition('fade up');
			}, 600);
		}
	},
	'click #goLater': function() {
		$('#surveyDoneMsg').transition('fade up');		
	}
});