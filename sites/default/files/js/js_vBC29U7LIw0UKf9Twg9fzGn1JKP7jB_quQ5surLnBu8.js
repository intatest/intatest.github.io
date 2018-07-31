var MAX_AUTHORS_COUNT = 3;

jQuery(document).ready(function() {
  jQuery(".view-streaming-en-vivo .views-field-title").marquee({
    //speed in milliseconds of the marquee
    duration: 15000,
    //gap in pixels between the tickers
    gap: 50,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: false
  });
});

jQuery(document).ready(function(){
  if(jQuery(".hide-on-empty").length > 0) {
    jQuery(".hide-on-empty").each(function(index){
      if(jQuery(this).text().trim() == "") {
        jQuery(this).closest(".parent-to-hide").hide();
      }
    });
  }
  if(jQuery(".proyectos-carteras-title").length > 0) {
    if(jQuery(".proyectos-cartera").length == 0) {
      jQuery(".proyectos-carteras-title").hide();
    }
  }
  if(jQuery(".proyectos-carteras-title-coordina").length > 0) {
    if(jQuery(".proyectos-cartera-coordina").length == 0) {
      jQuery(".proyectos-carteras-title-coordina").hide();
    }
  }
  if(jQuery(".unidad-integrantes-title").length > 0) {
    if(jQuery(".unidad-integrantes").length == 0) {
      jQuery(".unidad-integrantes-title").hide();
    }
  }
  if(jQuery(".unidad-dependientes-title").length > 0) {
    if(jQuery(".unidad-dependientes").length == 0) {
      jQuery(".unidad-dependientes-title").hide();
    }
  }
  if(jQuery(".autores-container").length > 0) {
   // var inta_a = true, extra_a = true;
    jQuery(".autores-container").each(function() {
      var inta_a = true, extra_a = true;
      var container = jQuery(this);
      var ainta = container.find(".autores-inta");
      if((ainta.length > 0) && (ainta.eq(0).text().trim() == "")) {
        inta_a = false;
        container.find(".autores-coma-separadora").hide();
      }
      var aninta = container.find(".autores-no-inta");
      if((aninta.length > 0) && (aninta.eq(0).text().trim() == "")) {
        extra_a = false;
        container.find(".autores-coma-separadora").hide();
      }
      if(!inta_a && !extra_a) {
        container.closest(".parent-to-hide").hide();
      }
    });
    /*if(jQuery(".autores-container .autores-inta").text().trim() == "") {
      inta_a = false;
      jQuery(".autores-container .autores-coma-separadora").hide();
    }
    if(jQuery(".autores-container .autores-no-inta").text().trim() == "") {
      extra_a = false;
      jQuery(".autores-container .autores-coma-separadora").hide();
    }
    if(!inta_a && !extra_a) {
      jQuery(".autores-container").closest(".parent-to-hide").hide();
    }*/
  }
  jQuery(".views-field-field-collection-autores .field-content .item-list:empty").each(function(){
    jQuery(this).closest(".views-field-field-collection-autores").hide();
  });
  jQuery(".views-field-field-collection-autores .field-content .item-list").each(function(){
    var count = jQuery(this).find("ul li").length;
    if(count > MAX_AUTHORS_COUNT) {
      jQuery(this).find("ul li").eq(MAX_AUTHORS_COUNT-1).addClass("last");
      for(var i = MAX_AUTHORS_COUNT; i < count; i++) {
        jQuery(this).find("ul li").eq(i).hide();
      }
      jQuery(this).find("ul").first().append('<li class="autores-otros">y otros</li>');
    }
  });
  
  jQuery(".views-field-field-collection-autores.editores-compiladores").each(function() {
    var element = jQuery(this);
    if(element.find(".field-content .entity-field-collection-item").length > MAX_AUTHORS_COUNT) {
      var acount = element.find(".field-content .autores-inta .entity-field-collection-item").length;
      var ncount = element.find(".field-content .autores-no-inta .entity-field-collection-item").length;
      if(acount >= MAX_AUTHORS_COUNT) {
        element.find(".field-content .autores-inta ul li").eq(MAX_AUTHORS_COUNT-1).addClass("last");
        element.find(".field-content .autores-no-inta").hide();
        for(var i = MAX_AUTHORS_COUNT; i < acount; i++) {
          element.find(".field-content .autores-inta ul li").eq(i).hide();
        }
        element.find(".field-content .autores-inta ul").first().append('<li class="autores-otros">y otros</li>');
      }
      else {
        var adiff = MAX_AUTHORS_COUNT - acount;
        element.find(".field-content .autores-no-inta ul li").eq(adiff-1).addClass("last");
        for(var i = adiff; i < ncount; i++) {
          element.find(".field-content .autores-no-inta ul li").eq(i).hide();
        }
        element.find(".field-content .autores-no-inta ul").first().append('<li class="autores-otros">y otros</li>');
        //element.find(
      }
    }
  });
});

jQuery(document).ready(function(){
  jQuery("body.faqs .view-wrap-faqs .view-preguntas-de-faq .views-field-title a").each(function(index) {
    var link = jQuery(this);
    jQuery(this).closest(".views-row").find(".views-field.views-field-body").hide();
    link.click(function(ev) {
      ev.preventDefault();
      jQuery(this).closest(".views-row").find(".views-field.views-field-body").toggle();
    });
  });
});

function createPopup(selector, button_selector) {
  if(jQuery(selector).length > 0) {
    if(jQuery(selector + " .block-inner").length > 0) {
      jQuery('<button title="Close (Esc)" type="button" class="mfp-close" style="position:inherit; float: right;">×</button>').insertBefore(selector + " .block-inner");
    }
    else {
      jQuery('<button title="Close (Esc)" type="button" class="mfp-close" style="position:inherit; float: right;">×</button>').insertBefore(selector + " .well-heading");
    }
  }
  var popu = jQuery(button_selector).magnificPopup({
    items: {
      src: selector,
      type: 'inline'
    },
    callbacks: {
      beforeOpen: function() {
        jQuery(selector).show();
      }
    },
    closeBtnInside: true
  });
  if(jQuery(selector + " .form-item .error").length > 0) {
    console.log(jQuery(selector + " .form-item .error"));
    popu.magnificPopup('open');
  }
}

jQuery(document).ready(function(){
  createPopup(".contact-popup", ".contactar");
  createPopup(".event-registration-popup", ".event-registration");
  if(jQuery(".sedes-dependientes-popup").length > 0) {
    createPopup(".sedes-dependientes-popup", "a.sedes-dependientes");
  }
  else {
    jQuery("a.sedes-dependientes").parent().hide();
  }
  jQuery(".contactar-marca a").click(function(){alert("Funcionalidad en desarrollo. Vuelva a intentar en breve."); return false;});
});

function sortSearchResultsBy(container, name, ev) {
  jQuery(container + " form .views-widget-sort-by select.form-select").val(name);
  jQuery(container + " form").submit();
  ev.preventDefault();
}

function sortSearchResultsIn(container, order, ev) {
  jQuery(container + " form .views-widget-sort-order select.form-select").val(order);
  jQuery(container + " form").submit();
  ev.preventDefault();
}

function convertSortSelectsInLinks(container, append_to) {
  if(jQuery(container + " .views-widget-sort-by").length  > 0) {
    jQuery(container + " .views-exposed-form .views-widget-sort-by").hide();
    jQuery(container + " .views-exposed-form .views-widget-sort-order").hide();

    if(jQuery(container + " .views-exposed-widgets").length > 0) {
      // Generate the sort links
      var sort_links = '<div class="results-sorter"><ul><li class="label">Ordenar por:</li>';
      var count = 1, total = jQuery(container + " .views-exposed-form .views-widget-sort-by select.form-select option").length;
      var last = "", content = "", current = "";
      jQuery(container + " .views-exposed-form .views-widget-sort-by select.form-select option").each(function(){
        current = "";
        last = (count == total) ? " last" : "";

        if(jQuery(this).is(":selected")) {
          current = " current";
          content = jQuery(this).text();
        }
        else {
          content = '<a href="#" onclick="sortSearchResultsBy(\''+ container +'\',\'' + jQuery(this).attr('value') + '\', event); return false;">' + jQuery(this).text() + '</a>'
        }
        sort_links += '<li class="option' + current + last +'">';
        sort_links += content;
        sort_links += '</li>';
        count++;
      });

      sort_links += '<li class="label"> - </li>';

      count = 1;
      total = jQuery(container + " .views-exposed-form .views-widget-sort-order select.form-select option").length;
      content = "";
      jQuery(container + " .views-exposed-form .views-widget-sort-order select.form-select option").each(function(){
        current = "";
        last = (count == total) ? " last" : "";
        if(jQuery(this).is(":selected")) {
          current = " current";
          content = jQuery(this).text();
        }
        else {
          content = '<a href="#" onclick="sortSearchResultsIn(\''+ container +'\',\'' + jQuery(this).attr('value') + '\', event); return false;">' + jQuery(this).text() + '</a>'
        }
        sort_links += '<li class="option' + current + last +'">';
        sort_links += content;
        sort_links += '</li>';
        count++;
      });

      sort_links += '</ul></div>';
      if(typeof append_to != "undefined" && append_to) {
        jQuery(append_to).append(sort_links);
      }
      else {
        jQuery(sort_links).insertBefore(container + " .views-exposed-widgets .views-exposed-widget.views-submit-button");
      }
    }
  }
}

function putPlaceholders() {
  var inputs_selectors = ["#edit-search-api-views-fulltext", "#edit-buscar", "body.node-type-unidad #edit-search-api-views-fulltext", "body.page-taxonomy-term #edit-search-api-views-fulltext"];
  var input_selectors_text = {
      "#edit-search-api-views-fulltext": "Buscar en esta sección.",
      "#edit-buscar": "Ingresar texto...",
      "body.node-type-unidad #edit-search-api-views-fulltext": "Buscar en esta sede.",
      "body.page-taxonomy-term #edit-search-api-views-fulltext": "Buscar en esta sección."
      };
  for(var i = 0; i < inputs_selectors.length; i++) {
    jQuery(inputs_selectors[i]).attr("placeholder", (inputs_selectors[i] in input_selectors_text) ? input_selectors_text[inputs_selectors[i]]: "Ingresar texto...");
  }
}

jQuery(document).ready(function(){
  convertSortSelectsInLinks(".formulario-expuesto-busqueda", ".sort-options-container");
  putPlaceholders();
});

jQuery(document).ready(function(){
  jQuery(".resultados-busqueda-seccion .icono-contenido").click(function(){
    var anchors = jQuery(this).next().find("a");
    if(anchors.length > 0) {
      anchors[0].click();
    }
    else {
      var titles = jQuery(this).siblings(".views-field-title");
      if(titles.length > 0) {
        var title_anchors = titles.find("a");
        if(title_anchors.length > 0) {
          title_anchors[0].click();
        }
      }
    }
  });
});

jQuery(document).ready(function() {
  addCountryStateCityDependencies({
    country_selector:    '#edit-field-lugar-consulta-contacto-und-0-field-pais-und-0-value',
    state_selector:      '#edit-field-lugar-consulta-contacto-und-0-field-provincia-und-0-value',
    city_selector:       '#edit-field-lugar-consulta-contacto-und-0-field-ciudad-und-0-value',
    country_default_key: false,
    country_add_empty:   '--Seleccione--',
    state_add_empty:     '--Seleccione--',
    city_add_empty:      '--Seleccione--'
  });
  addCountryStateCityDependencies({
    country_selector:    '#edit-field-lugar-residencia-contacto-und-0-field-pais-und-0-value',
    state_selector:      '#edit-field-lugar-residencia-contacto-und-0-field-provincia-und-0-value',
    city_selector:       '#edit-field-lugar-residencia-contacto-und-0-field-ciudad-und-0-value',
    country_default_key: false,
    country_add_empty:   '--Seleccione--',
    state_add_empty:     '--Seleccione--',
    city_add_empty:      '--Seleccione--'
  });
  updateLocalizationCollectionDependencies();
});


// FACETAS
function getFacetId(element) {
  if(typeof element != 'undefined') {
    var classes = element.closest(".panel-pane.pane-block.pane-facetapi").attr('class').split(' ');
    for (var i = 0; i < classes.length; i++) {
      var matches = /^pane\-facetapi\-(.+)/.exec(classes[i]);
      if (matches != null) {
        return matches[1];
      }
    }
  }
  return "";
}

function toggleChildItems(link) {
  var element = jQuery(link);
  if(element.hasClass("expanded-link")) {
    hideChildItems(element);
  }
  else {
    showChildItems(element);
  }
}

function hideChildItems(element) {
  element.removeClass("expanded-link");
  element.addClass("not-expanded-link");
  element.closest("li.expanded").find("div.item-list").hide();
  element.find("img.less-img").hide();
  element.find("img.more-img").show();
}

function showChildItems(element) {
  element.removeClass("not-expanded-link");
  element.addClass("expanded-link");
  element.closest("li.expanded").find("div.item-list").show();
  element.find("img.more-img").hide();
  element.find("img.less-img").show();
}

function filterFacetBlock(el) {
  var element = jQuery(el);
  var toFilter
}

jQuery(document).ready(function(){
  
  jQuery(".pane-facetapi.block .item-list a.facetapi-limit-link").each(function() {
    var anchor = jQuery(this);
    var toShow = anchor.closest(".panel-pane.pane-block").clone(true);
    anchor.closest(".panel-pane.pane-block").find('li.leaf:hidden').remove();
    anchor.closest(".panel-pane.pane-block").find('li.expanded:hidden').remove();
    anchor.closest(".panel-pane.pane-block").find('li.collapsed:hidden').remove();
    var facet_id = anchor.siblings("ul").attr('id');
    toShow.addClass('facet-popup');
    toShow.find(".item-list a.facetapi-limit-link").hide();
    toShow.find(".item-list ul li.leaf").attr("style", "");
    toShow.find(".item-list ul li.expanded").attr("style", "");
    toShow.find(".item-list ul li.expanded").prepend('<a href="#" class="expand-link" onclick="return toggleChildItems(this);" style="float: right; margin-top: 4px;"><img class="more-img" src="/sites/all/themes/adaptivetheme/agil/images/menu-collapsed.png" title="Mostrar hijos"/><img class="less-img" src="/sites/all/themes/adaptivetheme/agil/images/menu-expanded.png" style="display:none;" title="Esconder hijos"></a>');
    toShow.find(".item-list ul li.expanded div.item-list").hide();
    toShow.find(".item-list ul li.collapsed").attr("style", "");
    toShow.addClass('contextual-links-region');
    if(toShow.find(".pane-title").length > 0) {
      toShow.find(".pane-title").eq(0).append(jQuery('<input name="filter" class="filter" placeholder="buscar ..."/>'));
    }
    var toPopup = jQuery('<div style="display: none;" class="popup-container" id="' + getFacetId(anchor) + '"></div>');
    toPopup.append(toShow);
    jQuery('body').append(toPopup);
    jQuery('.facet-popup input.filter').keyup(function() {
      var searchText = jQuery(this).val();
      var elementsToShow = [];
      jQuery(this).closest('.facet-popup').find('.item-list li a').each(function(){
        var currentLiText = jQuery(this).text(),
            showCurrentLi = currentLiText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        jQuery(this).unhighlight({ element: 'em', className: 'popup-highlight'});
        jQuery(this).highlight(searchText, { element: 'em', className: 'popup-highlight'});
        if(showCurrentLi) {
          jQuery(this).closest('li').show();
          elementsToShow.push(jQuery(this));
          jQuery(this).parents('li.expanded').each(function() {
            var el = jQuery(this);
            el.show();
            el.find('.expand-link').each(function(){
              showChildItems(jQuery(this));
            });
          });
        }
        else {
          jQuery(this).closest('li').hide();
        }
      });
      /*
      for(var i = 0; i < elementsToShow.length; i++) {
        elementsToShow[i].parents('li.expanded').each(function() {
          var el = jQuery(this);
          el.find('.expand-link').each(function(){
            showChildItems(jQuery(this));
          });
        });
      }*/
    });

  });
  
  jQuery(".pane-facetapi.block .item-list a.facetapi-limit-link").each(function (e) {
    var anchor = jQuery(this);
    anchor.click(function(e) { e.preventDefault(); });
    var toPopupId = getFacetId(anchor);
    var popu = anchor.magnificPopup({
      items: {
        src: "#" + toPopupId,
        type: 'inline'
      },
      callbacks: {
        beforeOpen: function() {
          jQuery("#" + toPopupId).show();
        }
      },
      closeBtnInside: true
    });
  });

});
// FIN FACETAS


// Encabezado de portadas
jQuery(document).ready(function(){
  if(jQuery(".bloque-encabezado").length > 0) {
    jQuery(".bloque-encabezado").click(function(ev) {
      if(jQuery(ev.target).prop("tagName") != "A") {
        if(jQuery(ev.target).attr("target") == "_blank") {
          window.open(jQuery(".bloque-encabezado .imagen-encabezado a").first().attr("href"));
        }
        else {
          jQuery(location).attr("href", jQuery(".bloque-encabezado .imagen-encabezado a").first().attr("href"));
        }
      }
    });
  }
});
// Fin de Encabezado de portadas


// Fix todos los temas en búsqueda contextual
jQuery(document).ready(function(){
  if(jQuery(".formulario-expuesto-busqueda").length > 0) {
    jQuery(".formulario-expuesto-busqueda form").append('<input type="hidden" value="1" name="search"/>');
  }
});
;
var weather_searched = {};

function changeEstacion(portlet_id) {
  jQuery("#" + portlet_id + " .change-estacion-link").hide();
  jQuery("#" + portlet_id + " div.select-estacion-container").show();
  return false;
}

function cancelChangeEstacionSubmit(portlet_id) {
  jQuery("#" + portlet_id + " .change-estacion-link").show();
  jQuery("#" + portlet_id + " div.select-estacion-container").hide();
  return false;
}

function parseNumber(num) {
  var tmp_num = num;
  if(!isNaN(tmp_num)) {
    tmp_num = parseFloat(tmp_num);
    tmp_num = tmp_num.toPrecision(3);
  }
  return tmp_num;
}

function setWeatherPorletData(portlet_id, weather) {
  jQuery("#" + portlet_id + " .rain-value").text(parseNumber(weather.rain));
  jQuery("#" + portlet_id + " .wind-value").text(parseNumber(weather.wind));
  jQuery("#" + portlet_id + " .wind-dir-value").text(weather["wind-dir"]);
  jQuery("#" + portlet_id + " .weather-station-name").text(weather["estacion-name"]);
  jQuery("#" + portlet_id + " .humidity-value").text(parseNumber(weather.humidity));
  jQuery("#" + portlet_id + " .temperature-value").text(parseNumber(weather.temperature));
  jQuery("#" + portlet_id + " .temperature-max-value").text(parseNumber(weather["temperature-max"]));
  jQuery("#" + portlet_id + " .temperature-min-value").text(parseNumber(weather["temperature-min"]));
  jQuery("#" + portlet_id + " .select-estacion-container select").val(weather["estacion-id"]);
}

function getWeatherDataForEstacion(estacion_id, portlet_id) {
  jQuery("#" + portlet_id + " p.loading").show();
  jQuery.ajax({
    url: "/default_inta/get_weather_for_estacion/" + estacion_id,
    dataType: "json",
    method: "GET"
  }).
  done(function(data){
    console.log(data.data);
    if(data.result.toUpperCase().localeCompare("OK") == 0) {
      setWeatherPorletData(portlet_id, data.data);
    }
    else {
      //alert("No se encontraron datos del clima para la estación seleccionada. Por favor, seleccione otra y vuelva a intentarlo.");
    }
  }).
  fail(function( jqXHR, textStatus ) {
    alert( "Request failed: " + textStatus );
  }).
  always(function() {
    jQuery("#" + portlet_id + " p.loading").hide();
  });
  return false;
}

function changeEstacionSubmit(portlet_id) {
  return getWeatherDataForEstacion(jQuery("#" + portlet_id + " .select-estacion-container select").val(), portlet_id);
}

function updateWeatherPortletWithCurrentLocation(portlet_id) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        weather_searched[portlet_id] = true;
        getWeatherData(position.coords.latitude + "," + position.coords.longitude, portlet_id);
      },
      function(error) {
      }
    );
    setTimeout(function(){
      if(!(portlet_id in weather_searched) || !weather_searched[portlet_id]) {
        weather_searched[portlet_id] = true;
        getWeatherData(null, portlet_id);
      }
    }, 10000);
  }
  else {
    weather_searched[portlet_id] = true;
    getWeatherData(null, portlet_id);
  }
}

function getWeatherData(user_location, portlet_id) {
  jQuery("#" + portlet_id + " p.loading").show();
  var url_call = user_location ? "/default_inta/get_weather_for_location/" + user_location : "/default_inta/get_weather_for_actual_location";
  jQuery.ajax({
    url: url_call,
    dataType: "json",
    method: "GET"
  }).
  done(function(data){
    if(data.result.toUpperCase().localeCompare("OK") == 0) {
      setWeatherPorletData(portlet_id, data.data);
    }
  }).
  fail(function( jqXHR, textStatus ) {
    alert( "Request failed: " + textStatus );
  }).
  always(function() {
    jQuery("#" + portlet_id + " p.loading").hide();
  });
}


;
/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */
(function(f){f.fn.marquee=function(x){return this.each(function(){var a=f.extend({},f.fn.marquee.defaults,x),b=f(this),c,h,t,u,k,e=3,y="animation-play-state",n=!1,E=function(a,b,c){for(var e=["webkit","moz","MS","o",""],d=0;d<e.length;d++)e[d]||(b=b.toLowerCase()),a.addEventListener(e[d]+b,c,!1)},F=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c+":"+a[c]);b.push();return"{"+b.join(",")+"}"},p={pause:function(){n&&a.allowCss3Support?c.css(y,"paused"):f.fn.pause&&c.pause();b.data("runningStatus",
"paused");b.trigger("paused")},resume:function(){n&&a.allowCss3Support?c.css(y,"running"):f.fn.resume&&c.resume();b.data("runningStatus","resumed");b.trigger("resumed")},toggle:function(){p["resumed"==b.data("runningStatus")?"pause":"resume"]()},destroy:function(){clearTimeout(b.timer);b.find("*").andSelf().unbind();b.html(b.find(".js-marquee:first").html())}};if("string"===typeof x)f.isFunction(p[x])&&(c||(c=b.find(".js-marquee-wrapper")),!0===b.data("css3AnimationIsSupported")&&(n=!0),p[x]());else{var v;
f.each(a,function(c,d){v=b.attr("data-"+c);if("undefined"!==typeof v){switch(v){case "true":v=!0;break;case "false":v=!1}a[c]=v}});a.speed&&(a.duration=a.speed*parseInt(b.width(),10));u="up"==a.direction||"down"==a.direction;a.gap=a.duplicated?parseInt(a.gap):0;b.wrapInner('<div class="js-marquee"></div>');var l=b.find(".js-marquee").css({"margin-right":a.gap,"float":"left"});a.duplicated&&l.clone(!0).appendTo(b);b.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');c=b.find(".js-marquee-wrapper");
if(u){var m=b.height();c.removeAttr("style");b.height(m);b.find(".js-marquee").css({"float":"none","margin-bottom":a.gap,"margin-right":0});a.duplicated&&b.find(".js-marquee:last").css({"margin-bottom":0});var q=b.find(".js-marquee:first").height()+a.gap;a.startVisible&&!a.duplicated?(a._completeDuration=(parseInt(q,10)+parseInt(m,10))/parseInt(m,10)*a.duration,a.duration*=parseInt(q,10)/parseInt(m,10)):a.duration*=(parseInt(q,10)+parseInt(m,10))/parseInt(m,10)}else k=b.find(".js-marquee:first").width()+
a.gap,h=b.width(),a.startVisible&&!a.duplicated?(a._completeDuration=(parseInt(k,10)+parseInt(h,10))/parseInt(h,10)*a.duration,a.duration*=parseInt(k,10)/parseInt(h,10)):a.duration*=(parseInt(k,10)+parseInt(h,10))/parseInt(h,10);a.duplicated&&(a.duration/=2);if(a.allowCss3Support){var l=document.body||document.createElement("div"),g="marqueeAnimation-"+Math.floor(1E7*Math.random()),A=["Webkit","Moz","O","ms","Khtml"],B="animation",d="",r="";l.style.animation&&(r="@keyframes "+g+" ",n=!0);if(!1===
n)for(var z=0;z<A.length;z++)if(void 0!==l.style[A[z]+"AnimationName"]){l="-"+A[z].toLowerCase()+"-";B=l+B;y=l+y;r="@"+l+"keyframes "+g+" ";n=!0;break}n&&(d=g+" "+a.duration/1E3+"s "+a.delayBeforeStart/1E3+"s infinite "+a.css3easing,b.data("css3AnimationIsSupported",!0))}var C=function(){c.css("margin-top","up"==a.direction?m+"px":"-"+q+"px")},D=function(){c.css("margin-left","left"==a.direction?h+"px":"-"+k+"px")};a.duplicated?(u?a.startVisible?c.css("margin-top",0):c.css("margin-top","up"==a.direction?
m+"px":"-"+(2*q-a.gap)+"px"):a.startVisible?c.css("margin-left",0):c.css("margin-left","left"==a.direction?h+"px":"-"+(2*k-a.gap)+"px"),a.startVisible||(e=1)):a.startVisible?e=2:u?C():D();var w=function(){a.duplicated&&(1===e?(a._originalDuration=a.duration,a.duration=u?"up"==a.direction?a.duration+m/(q/a.duration):2*a.duration:"left"==a.direction?a.duration+h/(k/a.duration):2*a.duration,d&&(d=g+" "+a.duration/1E3+"s "+a.delayBeforeStart/1E3+"s "+a.css3easing),e++):2===e&&(a.duration=a._originalDuration,
d&&(g+="0",r=f.trim(r)+"0 ",d=g+" "+a.duration/1E3+"s 0s infinite "+a.css3easing),e++));u?a.duplicated?(2<e&&c.css("margin-top","up"==a.direction?0:"-"+q+"px"),t={"margin-top":"up"==a.direction?"-"+q+"px":0}):a.startVisible?2===e?(d&&(d=g+" "+a.duration/1E3+"s "+a.delayBeforeStart/1E3+"s "+a.css3easing),t={"margin-top":"up"==a.direction?"-"+q+"px":m+"px"},e++):3===e&&(a.duration=a._completeDuration,d&&(g+="0",r=f.trim(r)+"0 ",d=g+" "+a.duration/1E3+"s 0s infinite "+a.css3easing),C()):(C(),t={"margin-top":"up"==
a.direction?"-"+c.height()+"px":m+"px"}):a.duplicated?(2<e&&c.css("margin-left","left"==a.direction?0:"-"+k+"px"),t={"margin-left":"left"==a.direction?"-"+k+"px":0}):a.startVisible?2===e?(d&&(d=g+" "+a.duration/1E3+"s "+a.delayBeforeStart/1E3+"s "+a.css3easing),t={"margin-left":"left"==a.direction?"-"+k+"px":h+"px"},e++):3===e&&(a.duration=a._completeDuration,d&&(g+="0",r=f.trim(r)+"0 ",d=g+" "+a.duration/1E3+"s 0s infinite "+a.css3easing),D()):(D(),t={"margin-left":"left"==a.direction?"-"+k+"px":
h+"px"});b.trigger("beforeStarting");if(n){c.css(B,d);var l=r+" { 100%  "+F(t)+"}",p=c.find("style");0!==p.length?p.filter(":last").html(l):c.append("<style>"+l+"</style>");E(c[0],"AnimationIteration",function(){b.trigger("finished")});E(c[0],"AnimationEnd",function(){w();b.trigger("finished")})}else c.animate(t,a.duration,a.easing,function(){b.trigger("finished");a.pauseOnCycle?b.timer=setTimeout(w,a.delayBeforeStart):w()});b.data("runningStatus","resumed")};b.bind("pause",p.pause);b.bind("resume",
p.resume);a.pauseOnHover&&b.bind("mouseenter mouseleave",p.toggle);n&&a.allowCss3Support?w():b.timer=setTimeout(w,a.delayBeforeStart)}})};f.fn.marquee.defaults={allowCss3Support:!0,css3easing:"linear",easing:"linear",delayBeforeStart:1E3,direction:"left",duplicated:!1,duration:5E3,gap:20,pauseOnCycle:!1,pauseOnHover:!1,startVisible:!1}})(jQuery);
;
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});;
/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */

jQuery.extend({
    highlight: function (node, re, nodeName, className) {
        if (node.nodeType === 3) {
            var match = node.data.match(re);
            if (match) {
                var highlight = document.createElement(nodeName || 'span');
                highlight.className = className || 'highlight';
                var wordNode = node.splitText(match.index);
                wordNode.splitText(match[0].length);
                var wordClone = wordNode.cloneNode(true);
                highlight.appendChild(wordClone);
                wordNode.parentNode.replaceChild(highlight, wordNode);
                return 1; //skip added node in parent
            }
        } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
            for (var i = 0; i < node.childNodes.length; i++) {
                i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
            }
        }
        return 0;
    }
});

jQuery.fn.unhighlight = function (options) {
    var settings = { className: 'highlight', element: 'span' };
    jQuery.extend(settings, options);

    return this.find(settings.element + "." + settings.className).each(function () {
        var parent = this.parentNode;
        parent.replaceChild(this.firstChild, this);
        parent.normalize();
    }).end();
};

jQuery.fn.highlight = function (words, options) {
    var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
    jQuery.extend(settings, options);
    
    if (words.constructor === String) {
        words = [words];
    }
    words = jQuery.grep(words, function(word, i){
      return word != '';
    });
    words = jQuery.map(words, function(word, i) {
      return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    if (words.length == 0) { return this; };

    var flag = settings.caseSensitive ? "" : "i";
    var pattern = "(" + words.join("|") + ")";
    if (settings.wordsOnly) {
        pattern = "\\b" + pattern + "\\b";
    }
    var re = new RegExp(pattern, flag);
    
    return this.each(function () {
        jQuery.highlight(this, re, settings.element, settings.className);
    });
};

;
