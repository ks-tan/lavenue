Meteor.methods({
	"getImageInfo": function (url) {
	    this.unblock();
	    return Meteor.http.call("GET", url);
	}
});