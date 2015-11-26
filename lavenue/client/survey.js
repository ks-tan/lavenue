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
		return shuffle(Items.find().fetch());
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
	//assign 10 for each first
	var remainingPercentage = 50;
	var randomClassicPercentage = Math.floor(Math.random() * (remainingPercentage)) + 10;
	remainingPercentage -= randomClassicPercentage - 10;

	var randomChicPercentage = Math.floor(Math.random() * (remainingPercentage)) + 10;
	remainingPercentage -= randomChicPercentage - 10;
	
	var randomBohemianPercentage = Math.floor(Math.random() * (remainingPercentage)) + 10;
	remainingPercentage -= randomBohemianPercentage - 10;
	
	var randomAvantGrandePercentage = Math.floor(Math.random() * (remainingPercentage)) + 10;
	remainingPercentage -= randomAvantGrandePercentage - 10;
	
	var randomWhimscalPercentage = remainingPercentage + 10;

	var allPercentage = [randomClassicPercentage, randomChicPercentage, randomBohemianPercentage, randomAvantGrandePercentage, randomWhimscalPercentage];
	allPercentage.sort(sortNumber);
	console.log("sorted percentage " + allPercentage);

// var style = ["Whimsical", "Avant-garde", "Bohemian", "Chic", "Classic"];
	var sortedStyle = [];
	for (x in allPercentage) {
		if (allPercentage[x] == randomWhimscalPercentage) {
			sortedStyle.push("Whimsical");
		} else if (allPercentage[x] == randomBohemianPercentage) {
			sortedStyle.push("Bohemian");
		} else if (allPercentage[x] == randomChicPercentage) {
			sortedStyle.push("Chic");
		} else if (allPercentage[x] == randomClassicPercentage) {
			sortedStyle.push("Classic");
		} else if (allPercentage[x] == randomAvantGrandePercentage) {
			sortedStyle.push("Avant-garde");
		}
	}

	console.log(sortedStyle);

	var oldProfile = Profile.findOne({userId: Meteor.userId()});
	if (typeof oldProfile != "undefined") {
		Profile.update(oldProfile._id, {
       					 $set: {preference: sortedStyle}
       					});

	} else {
		Profile.insert({userId: Meteor.userId(), 
						preference: sortedStyle});
	}

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
                ['Classic',   randomClassicPercentage],
                ['Chic',      	randomChicPercentage],
                ['Bohemian',   randomBohemianPercentage],
                ['Avant-garde',   randomAvantGrandePercentage],
                ['Whimsical',     randomWhimscalPercentage]
            ]
        }]
    };
};

function sortNumber(a,b) {
    return b - a;
}