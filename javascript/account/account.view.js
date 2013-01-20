var GrooveeView = (function () {
	return Backbone.View.extend({
		el:'#header',
		template:function (name) {
			return Handlebars.compile(Backbone.Templates['templates/' + name]);
		},

		events:{
			'click .facebook-login-button':'facebookLogin'
		},

		setLoginMode:function (cfg) {
			var html = this.template('user_menu')(cfg);

			$('#user-menu').html(html);
		},

		facebookLogin:function () {
			this.trigger('request-fb-login');
		}
	});
})();