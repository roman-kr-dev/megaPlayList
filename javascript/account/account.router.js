var AccountRouter = (function () {
	return Backbone.Router.extend({
		routes: {
			'':'initAccount'
		},

		initialize:function (cfg) {
			this.cfg = cfg;
		},

		initAccount:function () {
			console.log('xxxx');
		}
	});
})();