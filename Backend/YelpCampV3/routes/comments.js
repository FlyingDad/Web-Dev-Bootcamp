// COMMENTS ROUTES

var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

router.get("/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
				console.log(err);
			} else {
				res.render('comments/new', {camp: campground});
			}
	});
});

router.post('/', isLoggedIn, function(req, res){
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
						//add username and id to comment
						comment.author.id = req.user._id;
						comment.author.username = req.user.username;
						comment.save();
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

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		//console.log('authenticated');
		return next();
	}
	res.redirect('/login');
}

module.exports = router;