/**
 * Tweetit jQuery plugin
 *
 * Offer the option to post selected text on tweeter
 *
 * Options:
 *	- via
 *	- url
 *  - hashtags
 * 
 */
(function($) {
	'use strict';

	$.fn.tweetit = function (opts) {
	
		var defaultOptions = {
			url : window.location.href
		};
	
		var opts = $.extend({}, defaultOptions, opts);
	
		// TODO: validate inputs

		var win = null;
		var $target = this;
		var $ico = $('<svg class="svg-icon" viewBox="0 0 20 20"><path fill="none" d="M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266"></path></svg>');
		var $btn = $('<a id="tweetit-btn" target="_blank" title="Tweet it"></a>').html($ico);


	    $target
	    .on('mousedown', function(e){
	    	$("#tweetit-btn").hide('fast', function () {
	    		$("#tweetit-btn").remove();
	    	});
	    })
	    .on('mouseup', function(e){
	    	e.stopPropagation();
	    	e.preventDefault();
	        var sel;
	        var mainUrl = 'https://twitter.com/intent/tweet?text={0}';
	        var twitterHt = '&hashtags=' + opts.hashtags;
	        var twitterVia = '&via=' + opts.via;
	        var twitterUrl = '&url=' + opts.url;
	        var chars = 140;

	        if (opts.hashtags) { 
	        	chars -= (opts.hashtags.match(/,/g) || []).length + 1 + opts.hashtags.length;
	        	mainUrl+=twitterHt; 
	        }
	        if (opts.via) {
	        	chars -= opts.via.length + 5;
	        	mainUrl+=twitterVia;
	        }
	        if (opts.url) {
	        	chars -= opts.url.length;
	        	mainUrl+=twitterUrl;
	        }


	        $("#tweetit-btn").hide().remove();

			if(window.getSelection){
				sel = window.getSelection();
			}else if(document.getSelection){
				sel = document.getSelection();
			}else if(document.selection){
				sel = document.selection.createRange().text;
			}

			if (sel.toString() !== '') {

		        var x = e.pageX;
				var y = e.pageY;
				var range;

	            if (sel.getRangeAt) {
					range = sel.getRangeAt(0).cloneRange();
					} else {
					// Older WebKit doesn't have getRangeAt
					range.setStart(sel.anchorNode, sel.anchorOffset);
					range.setEnd(sel.focusNode, sel.focusOffset);

					if (range.collapsed !== sel.isCollapsed) {
					    range.setStart(sel.focusNode, sel.focusOffset);
					    range.setEnd(sel.anchorNode, sel.anchorOffset);
					}
				}

	            var markerStart = document.createElement("span");
	            markerStart.id = "tweetit-start";
	            var markerEnd = document.createElement("span");
	            markerEnd.id = "tweetit-end";
	            
	            range.insertNode(markerStart);
	           	range.collapse(false);
	            range.insertNode(markerEnd);
	            

				var t = $("#tweetit-start").position().top;
				var b = $("#tweetit-end").position().top + $("#tweetit-end").height();
				$("#tweetit-start").remove();
				$("#tweetit-end").remove();
				var shift = "+=10";
			
				mainUrl = mainUrl.replace('{0}', sel.toString().substring(0, chars - 4));

				$("body").append($btn.attr('href', mainUrl));
				if (Math.abs(t-y) > Math.abs(b-y))
				{
					y = b;
				}
				else {
					y = t - $btn.height() - 15;
					shift = "-=10";
				}

				$btn.css('top'); // apparently, just by reading the top style value is enough to reset
				$btn.css({ 'top' : parseInt(y) + 'px', 'left' : x }).show();

				$btn.animate({ top: shift }, .2);

				$btn.on("click", function(e) {
					e.preventDefault();
					e.stopPropagation();

					var width	= 550,
						height	= 350,
						top		= (window.screen.height - height)/2,
						left	= (window.screen.width - width)/2; 

					var config = [
						'scrollbars=yes','resizable=yes','toolbar=no','location=yes',
						'width='+width,'height='+height,'left='+left, 'top='+top
					].join(',');

					win = window.open($(this).attr('href'), 'TweetitWindow',config);
				});

			}
		});


		return $target;
	};



})(jQuery);
