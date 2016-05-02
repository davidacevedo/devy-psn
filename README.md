# devy-psn
A library that allows you to access the playstation network APIs

## Usage
```javascript
var DevyPsn = require('devy-psn');
var devyPsn = new DevyPsn();

// First you need to grab the session cookie
devyPsn.getAndSetCookieFromPSN('myPSNUsername', 'myPSNPassword').then(function() {
	// You may call to a PSN api once the cookie is set
	// We will call to the titles API (aka, list of games)
	return devyPsn.getTitles();
}).then(function(res) {
	// Calling the APIs will return a promise that will resolve with the response as a JSON object
	// res will be the list of your titles
	console.log(res); //Do something with res;
});
```

## Methods
 - **getCookieFromPSN(**psnUsername, psnPassword**)** - is a function that returns a promise resolving with a json object that contains the cookie information. 
 - **getAndSetCookieFromPSN(**psnUsername, psnPassword**)** - is a function that returns a promise that resolves when the cookie has been set.
 - **setCookie(**cookie**)** - Sets the cookie for API usage. Cookie must be in the form of a json object. Works with getCookieFromPSN.
 - **getTitles()** - gets the list of titles for the current user.

**More Coming Soon**


## Setup To Contribute
- Install [NodeJS](http://nodejs.org/)
- Clone the source code: `git clone https://github.com/davidacevedo/psn-api.git`
- Inside the `devy-psn` directory, run `npm install` to install the modules the app uses.
