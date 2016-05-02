var fetch = require('node-fetch');
var PLAYSTATION_AUTH = 'https://auth.api.sonyentertainmentnetwork.com/login.do';
var PLAYSTATION_OAUTH = 'https://auth.api.sonyentertainmentnetwork.com/2.0/oauth/authorize?service_entity=urn:service-entity:psn&response_type=code&scope=openid&client_id=93be7f95-7d1f-461b-baf0-aa07bd53af84&request_locale=en_US&redirect_uri=https://io.playstation.com/playstation/psn/acceptLogin';
var ACCEPT_LOGIN = 'https://io.playstation.com/playstation/psn/acceptLogin?code=';

module.exports = function(username, password) {
	var params = 'j_username=' + encodeURIComponent(username) + '&j_password=' + encodeURIComponent(password);
	return fetch(PLAYSTATION_AUTH, {
	    method: 'POST',
	    headers: {
		    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		    'Content-Length': params.length,
		    'Content-Type': 'application/x-www-form-urlencoded'
		},
	    body: params,
	    redirect: 'manual'
	}).then(function(res) {
	    return res.headers.getAll('set-cookie').map(function (h) {
	            return h.split('; ')[0];
	        }).join('; ');
	}).then(function(cookie) {
		return fetch(PLAYSTATION_OAUTH, {
			method: 'GET',
			headers: {
				Cookie: cookie
			},
			redirect: 'manual'
		})
	}).then(function(res) {
		return res.headers['_headers']['x-np-grant-code'][0];
	}).then(function(code) {
		return fetch(ACCEPT_LOGIN + code, {
			method: 'GET',
			redirect: 'manual'
		})
	}).then(function(res) {
		var values = {};
		res.headers.getAll('set-cookie').map(function(h) {
			var valueToSave = h.split('; ')[0].split('=');
			values[valueToSave[0]] = valueToSave[1];
		});

		return values;
	})
}