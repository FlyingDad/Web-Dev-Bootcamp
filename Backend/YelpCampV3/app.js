var express 		= require('express'),
		app 				= express(),
		bodyParser 	= require('body-parser'),
		mongoose 		= require('mongoose'),
		Campground 	= require("./models/campground"),
		Comment 		= require("./models/comment"),
		User 				= require("./models/user");
		seedDB			= require("./seed");

seedDB();		
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost/yelp_camp_v3');

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
			res.render('campgrounds/index', {campgrounds: campgrounds});
		}
	});
});

//NEW ROUTE
app.get('/campgrounds/new', function(req, res){
	res.render('campgrounds/new.ejs');
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
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			console.log(err);
		} else {
			//console.log(foundCamp);
			res.render('campgrounds/show', {camp: foundCamp});
		}
	});
});

// COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
				console.log(err);
			} else {
				res.render('comments/new', {camp: campground});
			}
	});
});

app.post('/campgrounds/:id/comments', function(req, res){
	//lookup camp using id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
				console.log(err);
				res.redirect("/campgounds");
			} else {
				//console.log(req.body.comment);
				//create new comment
				Comment.create(req.body.comment, function(err, comment){
					if(err){
						console.log(err);
					} else {
						//connect comment to campground
						campground.comments.push(comment);
						campground.save();
						//redirect to camp showpage
						res.redirect('/campgrounds/' + campground._id);
					}	
				});
			}
	});
});
app.listen(3000, function () {
	console.log("YelpCamp server started...");
});