var numOfPicturesSwiped = 0;

Session.set("surveyDone", false);

Template.survey.onRendered(function(){
	numOfPicturesSwiped = 0;
	$('.special.card .image').dimmer({
	  on: 'hover'
	});
	$('.surveyCard').hide();
	$('.surveyCard').first().transition('horizontal flip').addClass('shown');
});

Template.survey.helpers({
	surveyImages: function(){
		return Items.find().fetch();
	},
	whichOne: function(){
		if (Session.get("surveyDone") == true){
			return 'surveyDoneMsg';
		}
	}
});

Template.survey.events({
	'click .ui.big.button': function(){
		if (numOfPicturesSwiped == 5){
			Session.set("surveyDone", true);
			numOfPicturesSwiped = 0;
			$('.surveyCard.shown').last().transition('horizontal flip');
			$('#analysing').transition('fade up');
			setTimeout(function(){
				$('#analysing').hide();
				$('#surveyDoneMsg').transition('fade up');
			}, 600);
		} else {
			Session.set("surveyDone", false);
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
			$('#analysing').transition('fade up');
			$('.surveyCard.shown').last().next().transition('horizontal flip').addClass("shown");
		}, 600);
		numOfPicturesSwiped++;
	}
});

Template.surveyDoneMsg.onRendered(function(){
	$('#surveyDoneMsg').hide();
});

Template.surveyDoneMsg.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: "Your style preference:<br><b>Classic!</b>"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'genre',
            data: [
                ['Classic',   50],
                ['Chic',       20],
                ['Bohemian',   15],
                ['Avant-garde',    10],
                ['Whimsical',     5]
            ]
        }]
    };
};