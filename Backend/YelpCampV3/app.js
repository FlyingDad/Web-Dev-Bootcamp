var express 		= require('express'),
		app 				= express(),
		bodyParser 	= require('body-parser'),
		mongoose 		= require('mongoose'),
		passport		= require('passport'),
		LocalStrategy		= require('passport-local'),
		methodOverride = require('method-override'),
		Campground 	= require("./models/campground"),
		Comment 		= require("./models/comment"),
		User 				= require("./models/user");
		seedDB			= require("./seed");

		var commentRoutes 		= require('./routes/comments'),
				campgroundRoutes 	= require('./routes/campgrounds'),
				indexRoutes 			= require('./routes/index');

// seedDB();		
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.connect('mongodb://localhost/yelp_camp_v3');

//PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'Dad is awesome',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Sends user data to every route
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});
//================

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use(indexRoutes);

app.listen(3000, function () {
	console.log("YelpCamp server started...");
});