var GlobalFuncs = {
	radioBox: function() {
		$('.radiobox').click(function(){
			$(this).addClass('selected');
			$(this).siblings().removeClass('selected');
		});
	},
	checkBox: function() {
		$('.checkbox').click(function(){
			if ( $(this).hasClass('selected') ) {
				$(this).removeClass('selected');
			}
				else {
					$(this).addClass('selected');
				}
		});
	},
	popupAlert: function(options) {
		var defaultOptions = {
			popupWidth: 500,
			popupHeight: 190,
			xButton: false,
			buttonOk: "OK",
			fCallbackYes: null,
			fCallbackNo: null,
			title: "Title",
			message:"Message"	
		}
		
		$.extend(defaultOptions,options);
		
		var aPopup = $('<div class="popup aPopup" style="width:' + defaultOptions.popupWidth + 'px; height:' + defaultOptions.popupHeight + 'px; margin-left:' + ( -defaultOptions.popupWidth / 2 ) + 'px; margin-top:' + ( -defaultOptions.popupHeight / 2 ) + 'px;">\
							' + (defaultOptions.xButton ? '<div class="x"><!----></div>' : '') + '\
							<div class="popup-body center">\
								<div class="right">\
									<div class="title">' + defaultOptions.title + '</div>\
									<div class="clear h10"><!----></div>\
									<p>' + defaultOptions.message + '</p>\
									<div class="clear h20"><!----></div>\
									<div class="button01 ok">' + defaultOptions.buttonOk + '<span class="right"><!----></span></div>\
								</div>\
							</div>\
						</div>');
		
		$('#popup-wrapper').append(aPopup);
		
		aPopup.find('.ok').bind('click', function() {
			aPopup.remove();
			hideSmlPopup();
			//defaultOptions.fCallbackNo();
		});
		
		aPopup.find('.x').bind('click', function(){
			aPopup.remove();
			hideSmlPopup();
		});
	}
}

$(document).ready(function() {
	$.each(GlobalFuncs,function() {
		this();
	});
});