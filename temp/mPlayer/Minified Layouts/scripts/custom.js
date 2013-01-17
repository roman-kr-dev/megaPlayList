function FocusInput(oInput,sText) {if ($(oInput).val() == sText) {$(oInput).val("");return true;}return false; }
function BlurInput(oInput,sText) {if ($.trim($(oInput).val()) == ""){ $(oInput).val(sText);return true;}return false; }

var Body;
var Wrapper;
var Header;
var Player;
var Middle;
var SidePanel;
var Content;

$(window).bind('resize', function() {

});

$(document).ready(function() {
	
	Body = $('BODY');
	Wrapper = $('#wrapper');
	Header = $('#header');
	Player = $('#player');
	
    $("#playlist-wrapper").niceScroll("#playlist-scroller",{
		bouncescroll: false,
		scrollspeed: 100
	});
	
	$('#shuffle, #repeat').bind('mousedown', function(){
		$(this).addClass('pressed');
	}).bind('mouseup', function(){
		$(this).removeClass('pressed');
		if ( $(this).hasClass('selected') ) {
			$(this).removeClass('selected');
		}
			else {	
				$(this).addClass('selected');
			}
	});
	
	$('.seek-bar').each(function() {
		$(this).find('.circle').bind('mousedown', function(){
			$(this).addClass('pressed');
		}).bind('mouseup', function(){
			$(this).removeClass('pressed');
		});
	});
	
	$('#play-pause').bind('mousedown', function(){
		$(this).addClass('pressed');
	}).bind('mouseup', function(){
		$(this).removeClass('pressed');
		if ( $(this).hasClass('playing') ) {
			$(this).removeClass('playing');
		}
			else {
				$(this).addClass('playing');
			}
	});
	
	$('#playlist-dd').click(function(){
		if ( $(this).hasClass('selected') ) {
			$(this).removeClass('selected');
		}
			else {
				$(this).addClass('selected');
			}
	});
	
	$('#playlist-dd').find('LI').click(function(){
		var oldVal = $('#playlist-dd').find('.select-button .text').text();
		
		$('#playlist-dd').find('.select-button .text').text($(this).find('.text').text());
	});
	
	Body.bind('click', function(e) {
		if( $(e.target).parents().is('#playlist-dd') || $(e.target).is('#playlist-dd') ) return false;
		$('#playlist-dd').removeClass('selected');
	});
	
	$('#playlist').find('LI').dblclick(function(){
		$(this).addClass('playing');
		$(this).siblings().removeClass('playing');
	});
	
	$('.play-button').bind('mousedown', function(){
		$(this).addClass('pressed');
	}).bind('mouseup', function(){
		$(this).removeClass('pressed');
		if ( $(this).hasClass('playing') ) {
			$(this).removeClass('playing');
		}
			else {
				$(this).parents('LI').siblings().removeClass('prev-playing');
				$(this).parents('LI').siblings().removeClass('playing');
				$(this).parents('LI').prev().addClass('prev-playing');
				$(this).parents('LI').addClass('playing');
			}
	}).dblclick(function(){
		return false;
	});
	
});