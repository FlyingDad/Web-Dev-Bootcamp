var express = require('express');
app = express();
var request = require('request');
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render('search');
});

app.get("/results", function (req, res) {
	//res.send("It works");
	let search = req.query.search;
	request(`http://www.omdbapi.com/?s=${search}&apikey=thewdb`, function (error, response, body) {
		if (error) {
			console.log('error:', error); // Print the error if one occurred
		} else {
			if (response.statusCode == 200) {
				var parsedData = JSON.parse(body);
				res.render('results', {data: parsedData});
				//res.send(parsedData.Search[0].Title);
			}
		}
	});
});




app.listen(3000, function () {
	console.log("Movie server started...");
});