var express = require('express');
app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp');
// SCHEMA
var campgoundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgoundSchema);

// Campground.create(
// 	{name: 'Goat Cheese Lake', image: 'https://pixabay.com/get/e83db30820f7033ed1584d05fb1d4e97e07ee3d21cac104497f2c170a5e5b0b0_340.jpg',
// description: 'This is RV Heaven.Lots of fellow RVers here'}, 
// 			function(err, campground){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					console.log(campground);
// 				}
// });




// var campgrounds = [{name: 'Salmon Creek', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f9c070afebb5_340.jpg'},
// 									{name: 'Goat Cheese Lake', image: 'https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f9c070afebb5_340.jpg'},
// 									{name: 'Yellow Stream', image: 'https://pixabay.com/get/ea37b3072af7063ed1584d05fb1d4e97e07ee3d21cac104497f1c878aee5b3b8_340.jpg'},
									
// ];

app.get("/", function(req, res){
	res.render('landing');
});

//INDEX ROUTE
app.get("/campgrounds", function(req, res){
	//get all campgrounds from db
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render('index', {campgrounds: campgrounds});
		}
	});
});

//NEW ROUTE
app.get('/campgrounds/new', function(req, res){
	res.render('new.ejs');
});

//CREATE ROUTE
app.post('/campgrounds', function(req, res){
	// get data from from and add to campgounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var campground = {name:name, image:image, description:desc};
	// Create a new campground and save to database
	Campground.create(campground, function(err, newCamp){
		if(err){
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

//SHOW ROUTE
//Must go after camgounds/new
app.get('/campgrounds/:id', function(req, res){
	Campground.findById(req.params.id, function(err, foundCamp){
		if(err){
			console.log(err);
		} else {
			res.render('show', {camp: foundCamp});
		}
	});
});

app.listen(3000, function () {
	console.log("YelpCamp server started...");
});