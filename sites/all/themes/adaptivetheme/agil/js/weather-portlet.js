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


