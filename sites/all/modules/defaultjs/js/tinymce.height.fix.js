jQuery(document).ready(function(){
  jQuery(document).on('DOMNodeInserted', '.mceIframeContainer', function(e) {
    return true;
  });
});