Template.home.helpers({
	browseImages: function() {
		return Images.find().fetch();
	}
});