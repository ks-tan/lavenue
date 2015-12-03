Template.firstTimeUser.events({
	'click #introOne .button': function(){
		$("#introOne").transition('fade down');
		setTimeout(function(){
			$("#introTwo").transition('fade up');
		}, 250);
	},
	'click #introTwo .button': function(event){
		event.preventDefault();
		$("#introTwo").transition('fade down');
		setTimeout(function(){
			$("#introThree").transition('fade up');
		}, 250);
	},
	'click #introThree .button': function(event){
		$("#introThree").transition('fade down');
		setTimeout(function(){
			Router.go('/survey');
		}, 250);
	}
});