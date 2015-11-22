Images = new Mongo.Collection('images');


//debug code
Images.remove({});
for (i = 0; i < 30; i++) {
	Images.insert({seller: "ChickyGirl85", imageUrl: "images/model.png", description: "Blue jacket and cool looking scarf makes you look classy while keeping you warm", price: "$9.99", likes: "99", style: "Classy urban"});
}
