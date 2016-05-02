var fetch = require('node-fetch');
var getSessionCookie = require('./getSessionCookie');

var TROPHIES_API = 'https://io.playstation.com/playstation/psn/profile/user/titles?userInfoCookie=';

var psnAPI = function() {
    var self = this;
    this.cookie = null;

    var getPSNRequest = function(uri) {
        return fetch(uri, {
            method: 'GET',
            headers: {
                Origin: 'https://www.playstation.com'
            }
        }).then(function(res) {
            return res.json().then(function(response) {
                return response;
            })
        })
    }

    /**
     *	Get a session cookie from the playstation store
     *	@param username - Your PSN username
     *	@param password - Your PSN password
     *	return - A promise returning a json object with the cookie
     */
    this.getCookieFromPSN = function(username, password) {
        return getSessionCookie(username, password)
    };

    this.getAndSetCookieFromPSN = function(username, password) {
        return getSessionCookie(username, password).then(function(cookie) {
            self.setCookie(cookie);
        });
    };

    /**
     *	Set the cookie
     *	@param cookie - Your session cookie
     */
    this.setCookie = function(cookie) {
        self.cookie = cookie;
    }

    this.getTitles = function() {
        if(self.cookie) {
            return getPSNRequest(TROPHIES_API + self.cookie.userinfo);
        }
    }
};

module.exports = psnAPI;