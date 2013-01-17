var GrooveeController = (function () {
	return Backbone.Controller.extend({
		initialize:function (cfg) {
			this.cfg = cfg;
			this.view = new GrooveeView();

			this.initFacebook();
		},

		initFacebookConnect:function() {
			FB.getLoginStatus($.proxy(function(response) {
				if (response.status === 'connected') {
					var uid = response.authResponse.userID,
						accessToken = response.authResponse.accessToken;

					FB.api('/me', $.proxy(function(response) {
						this.view.setLoginMode({
							isLogged:true,
							name:response.name,
							image:'http://graph.facebook.com/' + response.id + '/picture?type=large'
						});
						console.log('http://graph.facebook.com/' + response.id + '/picture?type=large');
					}, this));
				} else if (response.status === 'not_authorized') {
					this.view.setLoginMode(false);
				} else {
					// the user isn't logged in to Facebook.
					this.view.setLoginMode(false);
				}
			}, this));
		},

		initFacebook:function () {
			window.fbAsyncInit = $.proxy(function() {
				FB.init({
					appId:this.cfg.appId
				});

				this.initFacebookConnect();
			}, this);

			(function(d, debug){
				var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement('script'); js.id = id; js.async = true;
				js.src = '//connect.facebook.net/en_US/all' + (debug ? '/debug' : '') + '.js';
				ref.parentNode.insertBefore(js, ref);
			}(document, false));
		}
	});
})();