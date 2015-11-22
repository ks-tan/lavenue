Images = new Mongo.Collection('images');


//debug code
Images.remove({});
for (i = 0; i < 30; i++) {
	Images.insert({imageUrl: "images/model.png", description: "Am I pretty?"});
}