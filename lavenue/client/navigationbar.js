Template.navigationBar.events({
	'click .logoutButton': function (event, template) {
		Meteor.logout();
	}
});