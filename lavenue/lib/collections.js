Images = new Mongo.Collection('images');


//debug code
Images.remove({});
for (i = 0; i < 30; i++) {
	Images.insert({imageUrl: "images/model.png", description: "Am I pretty?", price: "$9.99", likes: "99", style: "Classy urban"});
}