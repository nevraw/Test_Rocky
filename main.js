(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
 //  console.log('Cancel');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for selecting presets or color choice
var $presetValue;

$("input[name=presetRadio]").change(function () {
 $presetValue = parseInt(this.value);
});



function loadOptions() {
 if (localStorage.preset) {
  $presetValue = localStorage.preset;
  console.log('localStorage.preset: ' + $presetValue);
  // setting radio' value
  $("input[name=presetRadio][value='" + $presetValue + "']").attr('checked', 'checked');
 } else {
  $presetValue = 0;
  console.log('localStorage.preset was undefined, now set to: ' + $presetValue);
  $("input[name=presetRadio][value='" + $presetValue + "']").attr('checked', 'checked');
 }

 console.log('in loadOptions() $presetValue: ' + $presetValue);

} 

function getAndStoreConfigData() {
 console.log('presetRadio value: ' + $presetValue)

 var options = {
  preset: $presetValue
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.preset = $presetValue;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
