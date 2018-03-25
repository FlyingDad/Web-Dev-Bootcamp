var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   //console.log('body:', body); // Print the HTML for the Google homepage.
// });

request('http://swapi.co/api/people/1', function (error, response, body) {
	if(error) {
		console.log('error:', error); // Print the error if one occurred
	} else {
		if(response.statusCode == 200){
			var parsedData = JSON.parse(body);
			console.log(parsedData.name);
		}
	}
});