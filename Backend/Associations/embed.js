var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);
//USER - email, name
var userSchema = new mongoose.Schema({
		email: String,
		name: String,
		posts: [postSchema] // embed an array of posts for the user
});
var User = mongoose.model("User", userSchema);



// var  newUser = new User({
// 	email: "lucy@brown.edu",
// 	name: "Lucy Lu"
// });
// newUser.posts.push({
// 	title: "I love piano",
// 	content: "My boyfriend plays the piano"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Pumkins",
// 	content: "The great pumkon never shows up for my friend Linus"
// });
// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });

// User.findOne({name: "Lucy Lu"}, function(err, user){
// 		if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 		user.posts.push({
// 				title: "Football",
// 				content: "Charlie Brown always misses the kick."
// 			});
// 		user.save(function(err, user){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				console.log(user);
// 			}
// 		});
// 	}
// });
