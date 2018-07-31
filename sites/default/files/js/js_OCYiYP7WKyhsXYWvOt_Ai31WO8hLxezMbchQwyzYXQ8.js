(function ($) {
  Drupal.behaviors.defaultjs = {
    attach: function (context, settings) {
      $('.jp-jplayer', context).once('defaultjs-jplayer', function () {
        var player = $(this);
        player.bind($.jPlayer.event.play, function(event) { // Add a listener to report the time play began
          //console.log("Play began at time = " + event.jPlayer.status.currentTime);
          $(".jp-jplayer").closest(".views-field").find(".audio-default-image").hide();
          $(".jp-jplayer").closest(".views-field").find(".audio-on-playing-image").show();
        });
        player.bind($.jPlayer.event.pause, function(event) { // Add a listener to report the time play pause
          //console.log("Play pause at time = " + event.jPlayer.status.currentTime);
          $(".jp-jplayer").closest(".views-field").find(".audio-on-playing-image").hide();
          $(".jp-jplayer").closest(".views-field").find(".audio-default-image").show();
        });
        /*
        player.bind($.jPlayer.event.ended, function(event) { // Add a listener to report the time play began
          console.log("Play ended at time = " + event.jPlayer.status.currentTime);
        });
        */
        $(".jp-playlist li").each(function() {
          var lie = $(this);
          var anchor = lie.find("a").eq(0);
          lie.append('<a href="' + anchor.attr("href") + '" target="_blank" class="download">Descargar</a>');
        });
      });
    }
  };
}(jQuery));
;
// $Id$

/**
 * @file
 * OM Maximenu script
 *
 * @author: Daniel Honrade http://drupal.org/user/351112
 *
 */
 
jQuery(document).ready(function($){  
	//back to top scroll function. Any link with a hash (#) will scroll to that id on the page
	$('.om-maximenu li.om-leaf a').addClass('om-autoscroll');

	$('a.om-autoscroll[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
			  var targetOffset = $target.offset().top;
				  //targetOffset = targetOffset - 90;
				$('html,body').animate({scrollTop: targetOffset - 0}, 500);
				return false;
			}
		}
	});
	// stay open
	$('.om-maximenu-open input').each(function() {
		//alert($(this).attr('checked'));
		// jQuery 1.7 has changed it's value checking for checkbox to checked instead of true
	  if(($(this).attr('checked') == true) || ($(this).attr('checked') == 'checked')) {
	    $(this).parent().parent().addClass('open');
	    $(this).parent().parent().parent().addClass('open');
	    $(this).parent().parent().removeClass('closed');
	  }
	  else {
	    $(this).parent().parent().removeClass('open');
	    $(this).parent().parent().parent().removeClass('open');
	    $(this).parent().parent().addClass('closed');
	  }
	});
	$('.om-maximenu-open input').click(function() {
		//alert($(this).attr('checked'));
	  if(($(this).attr('checked') == true) || ($(this).attr('checked') == 'checked')) {
	    $(this).parent().parent().addClass('open');
	    $(this).parent().parent().parent().addClass('open');
	    $(this).parent().parent().removeClass('closed');
	  }
	  else {
	    $(this).parent().parent().removeClass('open');
	    $(this).parent().parent().parent().removeClass('open');			
	    $(this).parent().parent().addClass('closed');
	  }
	});		
	// image hover replacement
  $('.om-maximenu img.om-hover').hover(function () {
    var src = $(this).attr('src');
    var altsrc = src.replace(/([^.]+)(\.[^.]+$)/, '$1_hover$2');
    $(this).attr({ src: altsrc, altsrc: src });
  },function () {
    var src = $(this).attr('src');
    var altsrc = src.replace(/_hover/, '');
    $(this).attr({ src: altsrc, altsrc: src });
  });	
});	 
;
