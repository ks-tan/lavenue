var numOfPicturesSwiped = 0;

Template.survey.onRendered(function(){
	numOfPicturesSwiped = 0;
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
	'click .ui.big.button': function(){
		if (numOfPicturesSwiped == 4){
			$('.surveyCard.shown').last().transition('horizontal flip');
			$('#analysing').transition('fade up');
			setTimeout(function(){
				$('#analysing').hide();
				$('#surveyDoneMsg').transition('fade up');
			}, 600);
		} else {
			$('.surveyCard.shown').last().transition('horizontal flip');
			setTimeout(function(){
				$('.surveyCard.shown').last().next().transition('horizontal flip').addClass("shown");
			}, 600);
			numOfPicturesSwiped++;
		}
	},
	'click #goLater': function() {
		$('#surveyDoneMsg').transition('fade up');
		$('#surveyDoneMsg').hide();
		setTimeout(function(){
			$('.surveyCard.shown').last().next().transition('horizontal flip').addClass("shown");
		}, 600);
		numOfPicturesSwiped++;
	}
});