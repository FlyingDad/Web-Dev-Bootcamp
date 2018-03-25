var express = require('express');
app = express();
app.set('view engine', 'ejs');

var campgrounds = [{name: 'Salmon Creek', image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f9c070afebb5_340.jpg'},
									{name: 'Goat Cheese Lake', image: 'https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f9c070afebb5_340.jpg'},
									{name: 'Yellow Stream', image: 'https://pixabay.com/get/ea37b3072af7063ed1584d05fb1d4e97e07ee3d21cac104497f1c878aee5b3b8_340.jpg'}
];

app.get("/", function(req, res){
	res.render('landing');
});

app.get("/campgrounds", function(req, res){
	res.render('campgrounds', {campgrounds: campgrounds});
});



app.listen(3000, function () {
	console.log("YelpCamp server started...");
});