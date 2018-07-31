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
