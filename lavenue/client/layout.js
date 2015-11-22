Template.layout.events({
	'click #openMenu': function(event){
		$('.ui.sidebar').sidebar('toggle');
	},
	'click .item': function (event, template) {
		$('.ui.sidebar').sidebar('toggle');
	},
	'click .logoutButton': function (event, template) {
		Meteor.logout();
	}
});