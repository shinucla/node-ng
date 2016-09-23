var request = require('request');

module.exports = function(app) {
  var facebook = { appId: '1101692349925950',
		   appSecret: 'f3d987f42ea760fb8a5a4ba2e8a780f2',
		   accessToken: '',
		   refreshToken: '' };

  app
    .route('/oauth/api/facebook')

    .get(function(req, res) {
      var authToken = req.query.code;
      var redirectUri = 'http://aws101.ddns.net/oauth/api/facebook';
      
      if (!authToken) {
	res.redirect('https://www.facebook.com/dialog/oauth'
		     + '?client_id=' + facebook.appId
		     + '&scope=ads_management,business_management'
		     + '&redirect_uri=' + redirectUri);
      } else {
	request.post('https://graph.facebook.com/v2.5/oauth/access_token',
		     { json: true,
		       body: { client_id: facebook.appId,
			       client_secret: facebook.appSecret,
			       code: authToken,
			       redirect_uri: redirectUri }},
		     function(err, resp, body) {
		       var accessToken = body.access_token;
		       request.post('https://graph.facebook.com/v2.5/oauth/access_token',
				    { json: true,
				      body: { client_id: facebook.appId,
					      client_secret: facebook.appSecret,
					      grant_type: 'fb_exchange_token',
					      fb_exchange_token: accessToken }},
				    function(err, resp, body) {
				      console.log(body.access_token);
				      res.json({ code: body.access_token });
				    });
		     });
      }
    });
  
};
