function convertInputToChosen(selector, choices, chosen_params, default_key, add_empty) {
  inputTag = jQuery(selector);
  if (inputTag.length > 0)
  {
    tagId    = inputTag.attr('id');
    tagName  = inputTag.attr('name');
    tagValue = inputTag.val();

    inputTag.attr('id', '____');
    inputTag.attr('name', '____');

    if (typeof choices.length == "undefined" && jQuery.isEmptyObject(choices) || choices.length == 0)
    {
      choices[tagValue] = tagValue;
    }

    if(typeof default_key == "undefined") {
      default_key = false;
    }

    if(typeof add_empty != "undefined") {
      choices = jQuery.extend({"": (typeof add_empty == "string" ? add_empty : "")}, choices);
    }

    selectTag = jQuery('<select></select>', {
       id : tagId,
       name : tagName
    });

    jQuery.each(choices, function (key, value) {
      selectTag.append(jQuery('<option '+ (((tagValue.length > 0 && tagValue == key) || (tagValue.length == 0 && default_key && key == ((typeof default_key == 'boolean') ? 'Argentina' : default_key)))? 'selected="selected"' : '') +' value="' + key + '">'+value+'</option>'));
    });

    inputTag.after(selectTag);
    inputTag.remove();

    selectTag.chosen(jQuery.extend({ width: '250px'}, chosen_params));
  }
}

function addCountryStateCityDependencies(params) {
  var country_selector = params.country_selector, 
      state_selector   = params.state_selector, 
      city_selector    = params.city_selector;
  var country_default_key = typeof params.country_default_key != "undefined" ? params.country_default_key : false,
      state_default_key   = typeof params.state_default_key != "undefined" ? params.state_default_key : false
      city_default_key    = typeof params.city_default_key != "undefined" ? params.city_default_key : false;
  var country_add_empty = typeof params.country_add_empty != "undefined" ? params.country_add_empty : false,
      state_add_empty   = typeof params.state_add_empty != "undefined" ? params.state_add_empty : false
      city_add_empty    = typeof params.city_add_empty != "undefined" ? params.city_add_empty : false;
  if(jQuery(country_selector).length > 0) {
    jQuery.ajax({
        url : '/defaultjs/ajax/geocountry/all',
        //cacheJStorage: true,
        type: 'GET',
        async: true,
        success: function (data, textStatus, jqXHR)
        {
          if(jQuery(country_selector.replace(/-/g, "_")+"_chosen").length > 0) return;
          convertInputToChosen(country_selector, data.results, {no_results_text: 'Ningún resultado coincide con'}, country_default_key, country_add_empty);
          convertInputToChosen(state_selector, {}, {placeholder_text:  'Seleccione el país', no_results_text: 'Ningún resultado coincide con'}, state_default_key, state_add_empty);
          convertInputToChosen(city_selector, {}, {placeholder_text:  'Seleccione la provincia', no_results_text: 'Ningún resultado coincide con'}, city_default_key, country_add_empty);
          mgmChosenDependence.addDependency({
            id:             state_selector,
            observed_id:    country_selector,
            no_value_text:  'Seleccione el país por favor',
            loading_image:  'Espere por favor...',
            url:            '/defaultjs/ajax/geostate',
            value :         jQuery(state_selector).val(),
            add_empty:      state_add_empty
          });
          mgmChosenDependence.addDependency({
            id:             city_selector,
            observed_id:    state_selector,
            url_ids :       [country_selector, state_selector],
            no_value_text:  'Seleccione la provincia por favor',
            loading_image:  'Espere por favor...',
            url:            '/defaultjs/ajax/geocity',
            value:          jQuery(city_selector).val(),
            add_empty:      city_add_empty
          });
          if(!country_add_empty){
            jQuery(country_selector).change();
          }
        }
      });
  }
}

function updateLocalizationCollectionDependencies(father) {
  var elements = jQuery([]);
  var selector = 'input:regex(id,edit-field-locazation-collection-und-\\d+-field-pais-und-0-value)';
  if(typeof father != 'undefined') {
    elements = father.find(selector);
  }
  else {
    elements = jQuery(selector);
  }
  elements.each(function() {
    var elem = jQuery(this);
    var container = elem.closest('td');
    var state = container.find('input:regex(id,edit-field-locazation-collection-und-\\d+-field-provincia-und-0-value)');
    var city = container.find('input:regex(id,edit-field-locazation-collection-und-\\d+-field-ciudad-und-0-value)');
    addCountryStateCityDependencies({
      country_selector:    '#' + elem.attr('id'), 
      state_selector:      '#' + state.attr('id'), 
      city_selector:       '#' + city.attr('id'),
      country_default_key: false,
      country_add_empty:   '--Seleccione--',
      state_add_empty:     '--Seleccione--',
      city_add_empty:      '--Seleccione--'
    });
    var err = new Error();
  });
}

jQuery(document).ready(function() {
  addCountryStateCityDependencies({
    country_selector:    '#edit-field-pais-und-0-value', 
    state_selector:      '#edit-field-provincia-und-0-value', 
    city_selector:       '#edit-field-ciudad-und-0-value', 
    country_default_key: 'Argentina'
  });
  addCountryStateCityDependencies({
    country_selector:    'div.advanced-search-view #edit-field-pais', 
    state_selector:      '#edit-field-provincia', 
    city_selector:       '#edit-field-ciudad', 
    country_default_key: false,
    country_add_empty:   '--Seleccione--',
    state_add_empty:     '--Seleccione--',
    city_add_empty:      '--Seleccione--'
  });
  updateLocalizationCollectionDependencies();

  jQuery(document).on('DOMNodeInserted', 'div.field-name-field-locazation-collection table.field-multiple-table tbody', function(e) {
    if (e.target.tagName === 'A' && e.target.className == "tabledrag-handle") {
      updateLocalizationCollectionDependencies(jQuery(e.target).closest('tr.draggable'));
    }
  });
});

