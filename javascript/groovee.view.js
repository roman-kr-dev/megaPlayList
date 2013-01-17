var GrooveeView = (function () {
	return Backbone.View.extend({
		el:'#header',
		template:function (name) {
			return Handlebars.compile(Backbone.Templates['templates/' + name]);
		},

		events:{
			'click .facebook-login-button':'facebookLogin'
		},

		setLoginMode:function (isLogged) {
			/*var html = this.template('user_menu')({isLogged:isLogged});

			$('#user-menu').html(html);*/
		},

		facebookLogin:function () {
			FB.login(function(response) {
				if (response.authResponse) {
					console.log('Welcome!  Fetching your information.... ');
					console.log(response);
				
					FB.api('/me', function(response) {
						console.log('Good to see you, ' + response.name + '.');
					});
				} else {
					console.log('User cancelled login or did not fully authorize.');
				}
			}, {scope:'publish_actions'});
		}
	});
})();