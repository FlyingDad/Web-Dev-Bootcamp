var express 							= require('express'),
		mongoose 							= require('mongoose'),
		passport							= require('passport'),
		bodyparser 						= require('body-parser'),
		User									= require('./models/user.js'),
		LocalStrategy 				= require('passport-local'),
		passportLocalMongoose = require('passport-local-mongoose');
	
mongoose.connect('mongodb://localhost/auth_demo');
var app = express();
app.use(require('express-session')({
	secret: 'dad is great',
	resave: false,
	saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.urlencoded({extended: true}));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
//===========
//ROUTES
//===========
app.get('/', function(req, res){
	res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res){
	console.log('render secret');
	res.render('secret');
});

//Auth Routes
app.get('/register', function(req, res){
	res.render('register');
});

app.post('/register', function(req, res){
	User.register(new User({username: req.body.username}),
		req.body.password, function(err, user){
			if(err){
				console.log(err);
				return res.render('register');
			}
			passport.authenticate('local')(req, res, function(){
				res.redirect('/secret');
			});
		});
});

//Login ROUTES
app.get('/login', function(req, res){
	//console.log('login page');
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login'
}), function(req, res){

});

//Logout
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		console.log('authenticated');
		return next();
	}
	res.redirect('/login');
}

app.listen(3000, function(){
	console.log('Auth Server Started...');
});