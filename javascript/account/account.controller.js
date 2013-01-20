var GrooveeController = (function () {
	return Backbone.Controller.extend({
		initialize:function (cfg) {
			this.cfg = cfg;
			this.view = new GrooveeView();

			this.initFacebook();
			this.initEvents();
		},

		initEvents:function () {
			this.view.on('request-fb-login', $.proxy(this.requestFacebookLogin, this));
		},

		initFacebookConnect:function() {
			var uid, accessToken;

			FB.getLoginStatus($.proxy(function(response) {
				if (response.status === 'connected') {
					uid = response.authResponse.userID,
					accessToken = response.authResponse.accessToken;

					$.when($.ajax({
						url:'/ajax/login.php',
						data:{
							uid:uid,
							accessToken:accessToken
						},
						type:'POST',
						dataType:'json'
					})).then($.proxy(function (response) {
						if (response.success) {
							this.view.setLoginMode({
								isLogged:true,
								name:$.cookie('name'),
								image:$.cookie('image')
							});
						}
					}, this));
				} else if (response.status === 'not_authorized') {
					this.view.setLoginMode({
						isLogged:false
					});
				} else {
					// the user isn't logged in to Facebook.
					this.view.setLoginMode({
						isLogged:false
					});
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
		},

		requestFacebookLogin:function () {
			var uid, accessToken;

			FB.login($.proxy(function(response) {
				if (response.authResponse) {
					uid = response.authResponse.userID,
					accessToken = response.authResponse.accessToken;
				
					FB.api('/me', $.proxy(function(response) {	
						$.when($.ajax({
							url:'/ajax/login.php',
							data:{
								uid:uid,
								accessToken:accessToken,
								name:response.name,
								image:'http://graph.facebook.com/' + uid + '/picture?type=large'
							},
							type:'POST',
							dataType:'json'
						})).then($.proxy(function (response) {
							if (response.success) {
								top.location.href = '/account.php';
							}
						}, this));
					}, this));
				} else {
					//console.log('User cancelled login or did not fully authorize.');
				}
			}, this), {scope:'publish_actions'});
		}
	});
})();