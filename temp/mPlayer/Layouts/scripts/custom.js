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
	
	setLayout();
	
	artistsBlocks();

});

$(document).ready(function() {
	
	Body = $('BODY');
	Wrapper = $('#wrapper');
	Header = $('#header');
	Player = $('#player');
	Middle = $('#middle');
	SidePanel = $('#side-panel');
	Content = $('#content');
	
	setLayout();
	
	$('.button.expandable').click(function(){
		if ( $(this).hasClass('open') ) {
			$(this).removeClass('open');
		}
			else {
				$(this).addClass('open');
			}
	});
	
	$('#sort UL LI').click(function(){
		$(this).addClass('selected');
		$(this).siblings().removeClass('selected');
	});
	
	Body.bind('click', function(e) {
		if( $(e.target).parents().is('.button') || $(e.target).is('.button') ) return false;
		$('.button').removeClass('open');
	});
	
	//$('#playlist').tableDnD();
	
	// Clears input onfocus
	$('.focusedInput').not("[oldVal]").each(function() {
		$(this).attr("oldVal",$(this).val());								 
	}).bind("blur", function(e) {
		if ( $(e.fromElement).is('#search') || $(e.fromElement).parents().is('#search') ) {
			return false;
		}
		if (BlurInput(this,$(this).attr("oldVal")))
			$(this).parent().parent().removeClass('selected');
	}).bind("focus", function() {
		if (FocusInput(this,$(this).attr("oldVal")))
			$(this).parent().parent().addClass('selected');
	});
	
	SidePanel.find('UL LI UL LI').click(function(){
		$(this).siblings().removeClass('selected').removeClass('prev-selected');
		$(this).parents('LI:first').siblings('LI').find('UL LI').removeClass('selected').removeClass('prev-selected');
		$(this).addClass('selected');
		$(this).prev('LI').addClass('prev-selected');
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
	
	$('#order-funcs').find('.icon').bind('mousedown', function(){
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
	
	$('#search').bind('mousedown', function(){
		setTimeout(function(){
			$('#search').find('INPUT').focus();
		}, 5);
	});
	
	$('#search').find('.select-target').bind('mousedown', function(){
		$(this).addClass('pressed');
		
	}).bind('mouseup', function(){
		$(this).removeClass('pressed');
		if ( $('#search').find('.select-target').attr('data-selected') == 'youtube' ) {
			$(this).find('.icons').stop(true, true).animate({
				'margin-top': '-21px'
			}, 250);
			$('#search').find('.select-target').attr('data-selected', 'library');
		}
			else {
				$(this).find('.icons').stop(true, true).animate({
					'margin-top': '4px'
				}, 250);
				$('#search').find('.select-target').attr('data-selected', 'youtube');
			}
	});
	
	$('#add-playlist').click(function(){
		if ( $(this).hasClass('selected') ) {
			$(this).removeClass('selected');
			$(this).siblings('UL').find('.new').animate({
				'opacity': '0',
				'height': '0',
				'padding-top': '0',
				'padding-bottom': '0'
			})
			setTimeout(function(){
				$('#add-playlist').siblings('UL').find('.new').css('display', 'none');
			},300);
		}
			else {
				$(this).addClass('selected');
				$(this).siblings('UL').find('.new').css('display', 'block').animate({
					'opacity': '1',
					'height': '23px',
					'padding-top': '10px',
					'padding-bottom': '10px'
				});
				setTimeout(function(){
					$('#add-playlist').siblings('UL').find('.new').find('INPUT').select();
				},250);
			}
	});
	
	$('TABLE TH.sortable').bind('mousedown', function(){
		$(this).addClass('pressed');
	}).bind('mouseup', function(){
		$(this).removeClass('pressed');
		if ( $(this).hasClass('selected') ) {
			if ( $(this).hasClass('des') ) {
				$(this).removeClass('des');
			}
				else {
					$(this).addClass('des');
				}
		}
			else {
				$(this).addClass('selected');
				$(this).siblings().removeClass('selected').removeClass('des');
			}
	});
	
	$('TABLE TBODY TR').dblclick(function(){
		$(this).siblings().removeClass('playing');
		$(this).siblings().removeClass('prev-playing');
		$(this).addClass('playing');
		$(this).prev().addClass('prev-playing');
	});
	
	//make table rows sortable
	$('#playlist TR').bind('mousedown', function(){
		$(this).addClass('pressed');
	}).bind('mouseup', function(){
		$(this).removeClass('pressed');
	});
    $('#playlist tbody').sortable({
		axis: 'y',
        start: function (event, ui) {
            //fix firefox position issue when dragging.
            if (navigator.userAgent.toLowerCase().match(/firefox/) && ui.helper !== undefined) {
                ui.helper.css('position', 'absolute').css('margin-top', $(window).scrollTop());
                //wire up event that changes the margin whenever the window scrolls.
                $(window).bind('scroll.sortableplaylist', function () {
                    ui.helper.css('position', 'absolute').css('margin-top', $(window).scrollTop());
                });
            }
        },
        beforeStop: function (event, ui) {
            //undo the firefox fix.
            if (navigator.userAgent.toLowerCase().match(/firefox/) && ui.offset !== undefined) {
                $(window).unbind('scroll.sortableplaylist');
                ui.helper.css('margin-top', 0);
            }
        },
        helper: function (e, ui) {
            ui.children().each(function () {
                $(this).width($(this).width());
            });
            return ui;
        },
        scroll: true,
        stop: function (event, ui) {
            //SAVE YOUR SORT ORDER                    
        }
    }).disableSelection();
	
	$('.progress.buffering').each(function() {
		var oEl = $(this);
		var Int = 0;
		var iTime = new Date().getTime();
		var speedPerSecond = 400;
		
		setInterval(function(){
			Int++;
			if (Int % 20 == 0)
				Int = 0;
			oEl.css({
				'background-position': Int + 'px'
			});
		},13);
	});
	
	$('.icon.actions').bind('click', function(){
		if ( $(this).hasClass('selected') ) {
			$('.icon.actions').removeClass('selected');
		}
			else {
				$(this).addClass('selected');
			}
	}).dblclick(function(){
		return false;
	});
	
	Body.bind('click', function(e) {
		if( $(e.target).parents().is('.icon.actions') || $(e.target).is('.icon.actions') ) return false;
		$('.icon.actions').removeClass('selected');
	});
	
	$('.checkbox').bind('mousedown', function(e){
		$(this).addClass('pressed');
		e.stopPropagation();
	}).bind('mouseup', function(){
		$(this).removeClass('pressed');
		if ( $(this).hasClass('selected') ) {
			$(this).removeClass('selected');
			if ( $(this).parent().is('TD') ) {
				$(this).parents('TR').removeClass('selected');
			}
			if ( $(this).parent().is('TH') ) {
				$(this).parents('TR').removeClass('selected');
				$(this).parents('TABLE').find('.checkbox').removeClass('selected');
				$(this).parents('TABLE').find('TR').removeClass('selected');
			}
		}
			else {
				$(this).addClass('selected');
				if ( $(this).parent().is('TD') ) {
					$(this).parents('TR').addClass('selected');
				}
				if ( $(this).parent().is('TH') ) {
					$(this).parents('TR').addClass('selected');
					$(this).parents('TABLE').find('.checkbox').addClass('selected');
					$(this).parents('TABLE').find('TR').addClass('selected');
				}
			}
		e.stopPropagation();
	}).dblclick(function(){
		return false;
	});
	
	$('.play-button').bind('mousedown', function(){
		$(this).addClass('pressed');
	}).bind('mouseup', function(){
		$(this).removeClass('pressed');
		if ( $(this).hasClass('playing') ) {
			$(this).removeClass('playing');
		}
			else {
				$(this).parents('TR').siblings().removeClass('prev-playing');
				$(this).parents('TR').siblings().removeClass('playing');
				$(this).parents('TR').prev().addClass('prev-playing');
				$(this).parents('TR').addClass('playing');
			}
	}).dblclick(function(){
		return false;
	});
	
	artistsBlocks();
	
});


function setLayout() {
	Middle.css({
		'height': Wrapper.height() - ( ( Header.height() + 1 ) + Player.height() ) + 'px',
		'top': ( Header.height() + 1 ) + 'px'
	});
	
	Content.css({
		'height': Middle.height() + 'px'
	});
	
	$('#artists-scroll').each(function() {
		$(this).css({
			'height': Middle.height() - ( $('#artists-layout').find('.header').height() + $('#artists-layout').find('#sort').height() ) - 40 + 'px'
		});
	});
	
	$('TABLE.fixedHeader').each(function() {
		var TableWidth = $(this).width();
		var Cols = $(this).find('THEAD TH').length;
		$(this).find('TH, TD').each(function() {
			//alert($(this).parent().children().index(this))
			if ( !$(this).hasClass('checkbox-col') && !$(this).hasClass('icon-col') && !$(this).hasClass('actions-col') ) {
				$(this).css('width', (TableWidth - ( 3 * 38 )) / (Cols - 3) - 2 + 'px')
			}
		});
	});
	
	$('#results-layout .artists UL > LI').bind('mouseenter', function(){
		var oEl = $(this);
		var ArrowButton ='\
		<div class="arrow-button">\
			<div class="dd">\
				<ul>\
					<li class="first">Add songs to queue</li>\
					<li>Share artist list</li>\
					<li class="sub sub-last">\
						Add songs to playlist\
						<div class="dd right">\
							<ul>\
								<li class="first">Avril Lavigne</li>\
								<li class="last">Moti\'s awful music</li>\
							</ul>\
						</div>\
					</li>\
					<li class="last">Delete artist</li>\
				</ul>\
			</div>\
		</div>';
		
		if ( $(this).hasClass('hovered') ) {
			return false;
		}
			else {
				$(this).addClass('hovered');
				oEl.find('.pic').append(ArrowButton);
				oEl.find('.arrow-button').bind('click', function(){
					$('.arrow-button').not($(this)).removeClass('selected');
					if ( $(this).hasClass('selected') ) {
						$(this).removeClass('selected');
					}
						else {
							$(this).addClass('selected');
						}
				});
			}

	});
	
	$('.did-u-mean .x').click(function(){
		$(this).parent().slideUp(200);
	});
}

function artistsBlocks() {
	var Artists = $('#artists-blocks');
	var itemsLength = Artists.find('UL:first').children('LI').length;
	var currentLeft = 0;
	var currentTop = 0;
	var minGap = 20;
	var itemWidth = Artists.find('UL:first').children('LI').width();
	var itemHeight = Artists.find('UL:first').children('LI').height() + 20;
	var inRow = checkInRow(Artists.width(), itemWidth, minGap);
	var remainingWidth = Artists.width() - ( ( inRow * itemWidth ) );
	var inCol = Math.ceil(itemsLength / inRow);
	
	console.log('ITEMS LENGTH: ' + itemsLength + ', INROW:' +inRow + ', INCOL' + inCol + ', ITEM HEIGHT' + itemHeight)
	
	Artists.find('UL:first').css({
		'height': inCol * itemHeight + 'px'
	});
	
	Artists.find('UL:first').children('LI').each(function() {
		var oEl = $(this);
		var Idx = ($(this).parent().children().index(this));
		$(this).css({
			'left': (Idx % inRow) * (itemWidth + ( remainingWidth / (inRow-1) )) + 'px',
			'top': (Math.floor(Idx/inRow) * itemHeight) + 'px'
		});
	}).bind('mouseenter', function(){
		var oEl = $(this);
		var ArrowButton ='\
		<div class="arrow-button">\
			<div class="dd">\
				<ul>\
					<li class="first">Add songs to queue</li>\
					<li>Share artist list</li>\
					<li class="sub sub-last">\
						Add songs to playlist\
						<div class="dd right">\
							<ul>\
								<li class="first">Avril Lavigne</li>\
								<li class="last">Moti\'s awful music</li>\
							</ul>\
						</div>\
					</li>\
					<li class="last">Delete artist</li>\
				</ul>\
			</div>\
		</div>';
		
		if ( $(this).hasClass('hovered') ) {
			return false;
		}
			else {
				$(this).addClass('hovered');
				oEl.find('.pic').append(ArrowButton);
				oEl.find('.arrow-button').bind('click', function(){
					$('.arrow-button').not($(this)).removeClass('selected');
					if ( $(this).hasClass('selected') ) {
						$(this).removeClass('selected');
					}
						else {
							$(this).addClass('selected');
						}
				});
			}

	});
	
	Body.bind('click', function(e) {
		if( $(e.target).parents().is('.arrow-button') || $(e.target).is('.arrow-button') ) return false;
		$('.arrow-button').removeClass('selected');
	});
	
	$('#edit-playlist-name').click(function(){
		confirmPopup({
			buttonYes: "Save",
			buttonNo: "Cancel",
			title: "Edit playlist name",
			message: '<input name="" type="text" value="Avril Lavigne" />'
		});
	});
}

function checkInRow(coversWindowWidth, coverWidth, minMargin) {
	var x = Math.floor(coversWindowWidth / ( coverWidth ));
	var y = coversWindowWidth - ( x * coverWidth );
	if ( y < ( ( x-1 ) * minMargin ) ) x--;
	return x;
}

function confirmPopup(options) {
	var defaultOptions = {
		popupWidth: 450,
		popupHeight: 210,
		buttonYes: "Yes",
		buttonNo: "No",
		fCallbackYes: null,
		fCallbackNo: null,
		title: "Title",
		message: "Message"	
	}
	
	$.extend(defaultOptions,options);
		
		var oPopup = $('<div class="popup" style="width:' + defaultOptions.popupWidth + 'px; margin-left:' + -(defaultOptions.popupWidth / 2) + 'px;">\
							<div class="popup-box">\
								<div class="popup-title">' + defaultOptions.title + '</div>\
								<div class="popup-body">\
									<div class="module-button R blue yes">' + defaultOptions.buttonYes + '</div>\
									<div class="module-button R space no">' + defaultOptions.buttonNo + '</div>\
									<div class="p">' + defaultOptions.message + '</div>\
									<div class="clear"><!----></div>\
								</div>\
							</div>\
							<div class="popup-border"><!----></div>\
						</div>');
	
	$('#popup-wrapper').prepend(oPopup);
	$('#popup-wrapper').show();
	$('#popup-wrapper').find('INPUT').select();
	
	Body.bind('click', function(e) {
		if( $(e.target).parents().is('.popup') || $(e.target).is('.popup-button') || $(e.target).is('.popup') ) return false;
		$('#popup-wrapper').find('.popup').remove();
		$('#popup-wrapper').hide();
	});
	
	/*oPopup.find('.yes').bind('click', function() {
		if (defaultOptions.fCallbackYes) {
			defaultOptions.fCallbackYes();
		}
	});
	
	oPopup.find('.no').bind('click', function() {
		oPopup.remove();
		hideSmlPopup();
		//defaultOptions.fCallbackNo();
	});
	
	oPopup.find('.x').bind('click', function(){
		oPopup.remove();
		hideSmlPopup();
	});*/
}