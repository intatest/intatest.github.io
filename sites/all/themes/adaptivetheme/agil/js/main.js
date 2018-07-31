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
