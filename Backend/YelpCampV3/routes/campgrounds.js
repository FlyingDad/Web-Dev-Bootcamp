//CAMPGROUND ROUTES

var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var Campground = require('../models/campground');

router.get("/", function(req, res){
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
router.get('/new', middleware.isLoggedIn,function(req, res){
	res.render('campgrounds/new.ejs');
});

//CREATE ROUTE
router.post('/', middleware.isLoggedIn,function(req, res){
	// get data from from and add to campgounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var campground = {name:name, image:image, description:desc, author:author };
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
router.get('/:id', function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			console.log(err);
		} else {
			//console.log(foundCamp);
			res.render('campgrounds/show', {camp: foundCamp});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampOwnership, function(req, res){
	//is user logged in, if not redirest, if yes does he own campground?
		Campground.findById(req.params.id, function(err, foundCamp){
			res.render("campgrounds/edit", {camp: foundCamp});
		});
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampOwnership,function(req, res){
	//find and update campground

	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampOwnership, function(req, res){
	//find and delete campground
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;