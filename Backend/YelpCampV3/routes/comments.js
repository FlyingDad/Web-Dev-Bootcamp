// COMMENTS ROUTES
var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
				console.log(err);
			} else {
				res.render('comments/new', {camp: campground});
			}
	});
});

router.post('/', middleware.isLoggedIn, function(req, res){
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

//EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership,function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect('back');
		} else {
			res.render("comments/edit", {camp_id: req.params.id, comment: foundComment});
		}
	});
	
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership,function(req, res){
	//find and update comment
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY
//DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
	//find and delete campground
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;