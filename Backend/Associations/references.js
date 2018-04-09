var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");
var Post = require("./models/post");
var User = require("./models/user");


// User.create({
// 	email: "lucy@brown.edu",
// 	name: "Lucy Lu"
// });

Post.create({
		title: "Grass",
	content: "I only like green grass"
}, function(err, post){
	User.findOne({name: "Lucy Lu"}, function(err, foundUser){
		if(err){
			console.log(err);
		}else{
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err){
					console.log(err);
				}else{
					console.log(data);
				}
			});
		}
	});
});


// Find user and all their posts
// User.findOne({name: "Lucy Lu"}).populate("posts").exec(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user.name);
// 		console.log(user.posts[0].title);
// 		console.log(user.posts[0].content);
// 	}
// });



