var Campground = require('../models/campground');
var Comment = require('../models/comment');
// all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCamp){
			if(err){
				res.redirect("back");
			} else {
				//does user own campground
				if(foundCamp.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}			
			}
		});
	} else {
		res.redirect('back');
	}
};

middlewareObj.checkCommentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				//does user own comment
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}			
			}
		});
	} else {
		res.redirect('back');
	}
};

middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		//console.log('authenticated');
		return next();
	}
	req.flash('success', 'Please log in first!');
	res.redirect('/login');
};

module.exports = middlewareObj;