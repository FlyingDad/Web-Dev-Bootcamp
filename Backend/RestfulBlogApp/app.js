var express = require('express');
app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_blog_app');
app.use(express.static('public'));

// SCHEMA
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);
// TEST DATA
// Blog.create({
// 	title: "Test Blog",
// 	image: 'https://images.unsplash.com/photo-1520992048127-03c7e5176a4e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0448927799c929e8f4f25f1b2be1c76c&auto=format&fit=crop&w=2301&q=80',
// 	body: 'Hello, this is a blog post'
// 	}); 

//RESTFUL ROUTES
app.get('/', function(req, res){
	res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render('index', {blogs:blogs});
		}		
	});
	
});



app.listen(3000, function () {
	console.log("Blog server started...");
});