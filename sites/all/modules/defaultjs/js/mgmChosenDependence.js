var mgmChosenDependence={
  observed_widgets: [],
  /**
   * Adds a new dependency widget
   */
  addDependency: function (widget)
  {
    var observed_array=[];

    if (typeof widget.observed_id === "string")
    {
      observed_array.push(widget.observed_id)
    }
    else
    {
      observed_array=widget.observed_id;
    }

    widget.observed_array=observed_array;
    this.updateObservedWidgets(widget);
    jQuery(observed_array).each(function(k , v)
    {
      jQuery('body').on(
        'change',
        v,
        widget,
        mgmChosenDependence.dependencyUpdated);
      /*
      jQuery(v).live(
        'change',
        widget,
        mgmChosenDependence.dependencyUpdated);
      jQuery(v).change(widget, mgmChosenDependence.dependencyUpdated);
      */
    });

    jQuery(observed_array).each(function(k , v) { jQuery(v).change(); });
  },
  /**
   * This is the callback that will be called when some dependency changes
   */
  dependencyUpdated: function (event)
  {
    var observed_values = {};
    var widget = event.data;

    var query = '';

    var tmpUrlIds = 'url_ids' in widget? widget.url_ids : widget.observed_array;

    var complete_query = true;
    jQuery(tmpUrlIds).each(function (k, v)
    {
      if(jQuery(v).val() && jQuery(v).val() != "") {
        query = query + '/' + jQuery(v).val();
      }

      complete_query = complete_query && jQuery(v).val() && jQuery(v).val() != "";
    });

    if(complete_query) {
      var tmpUrl = widget.url + query;
      if (typeof jQuery(widget.id).data(tmpUrl) != "undefined")
      {
        mgmChosenDependence.updateOptions(widget, jQuery(widget.id).data(tmpUrl));
      }
      else
      {
        jQuery.ajax(
        {
          //cacheJStorage: true,
          async: true,
          type: 'GET',
          url: tmpUrl,
          beforeSend: function ()
          {
            mgmChosenDependence.createLoadingImage(widget).insertAfter(jQuery(widget.id.replace(/-/g, '_')+'_chosen'));
            jQuery(widget.id).prop("disabled", true);
            jQuery(widget.id).trigger('chosen:updated');
          },
          error: function(request, textStatus, errorThrown)
          {
            //jQuery("#"+widget.update_id).html('<span class="error">'+textStatus+'</span>');
          },
          success: function(data, textStatus, request)
          {
            jQuery('#' + mgmChosenDependence.generateLoadingImageId(widget)).remove();
            jQuery(widget.id).data(tmpUrl, data);
            mgmChosenDependence.updateOptions(widget, data);
          },
          complete: function () {
            jQuery(widget.id).prop("disabled", false);
            jQuery(widget.id).trigger('chosen:updated');
          }
        });
      }
    }
    else {
      mgmChosenDependence.updateOptions(widget, {results: []});
    }
  },
  generateLoadingImageId: function (widget)
  {
    return widget.id.replace('#', '') + '_loading_img';
  },
  createLoadingImage: function (widget)
  {
    var img = jQuery('#' + mgmChosenDependence.generateLoadingImageId(widget));
    if (img.length == 0)
    {
      var img = jQuery('<img src="/sites/all/modules/defaultjs/images/ajax-loader.gif" style="height: 25px; margin-left: 12px; margin-bottom: -10px;">');
      jQuery(img).attr('id', mgmChosenDependence.generateLoadingImageId(widget));
    }
    return img;
  },
  updateOptions: function (widget, data)
  {
    element = jQuery(widget.id);
    element.children('option').each(function () { jQuery(this).remove()});
    if((Object.keys(data.results).length > 0) && (typeof widget.add_empty != 'undefined') && widget.add_empty)
    {
      data.results = jQuery.extend({"": ((typeof widget.add_empty == 'string') ? widget.add_empty : "")}, data.results);
    }
    jQuery.each(data.results, function (key, value) {
      str = '<option value="'+key+'"'+(widget.value == key? 'selected="selected"' : '' )+'>'+value+'</option>';
      element.append(jQuery(str));
    });
    element.trigger('chosen:updated');
    element.change();
  },
  updateObservedWidgets: function (widget)
  {
    if (this.observed_widgets.length == 0)
    {
      jQuery(window).load(function(){
        jQuery.each(mgmChosenDependence.observed_widgets, function(){
          if (this.root)
          {
            jQuery(this.observed_id).change();
          }
        });
      });
    }

    jQuery.each(widget.observed_array,function (){
        var object={
          observed_id: this,
          id:          widget.id,
          root:        true
        };

        jQuery.each(mgmChosenDependence.observed_widgets,function(){
          if (this.observed_id == object.id)
          {
            this.root=false;
          }

          if (this.id == object.observed_id)
          {
            object.root=false;
          }
        });
        mgmChosenDependence.observed_widgets.push(object);
    });
  }
}
