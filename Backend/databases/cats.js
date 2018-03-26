var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");


var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperment: String
});

var Cat = mongoose.model("Cat", catSchema);

// add cats to the database
// var bella = new Cat({
// 	name: "Blackie",
// 	age: 3,
// 	temperment: "Evil"
// });

// bella.save(function(err, cat){
// 	if(err){
// 		console.log('Something went wrong');
// 	} else {
// 		console.log('We just saved a cat to the DB');
// 		console.log(cat);
// 	}
// });

// Another way to add a record
// Cat.create({
// 	name: "Snatch",
// 	age: 9,
// 	temperment: "Mean"
// }, function(err, cat){
// 		if(err){
// 			console.log('Something went wrong');
// 		} else {
// 			console.log('We just saved a cat to the DB');
// 			console.log(cat);
// 		}
// });
//retrieve all cats from the DB
Cat.find({}, function(err, cats){
	if(err){
		console.log(err);
	} else {
		console.log(cats);
	}
});