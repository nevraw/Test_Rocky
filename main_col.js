(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
  console.log('Submit');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
  console.log('Cancel');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

function loadOptions() {
 var $hourColorPicker = $('#hourColorPicker');
 var $min5ColorPicker = $('#min5ColorPicker');
 var $minColorPicker = $('#minColorPicker');
 var $preset1Checkbox = $('#preset1Checkbox');
 var $preset2Checkbox = $('#preset2Checkbox');

 console.log('localStorage.preset: ' + localStorage.preset);

 if (localStorage.preset) {
  if (localStorage.preset == 0) {
   $preset1Checkbox[0].checked = 'false';
   $preset2Checkbox[0].checked = 'false';
  } else if (localStorage.preset == 1) {
   $preset1Checkbox[0].checked = 'true';
   $preset2Checkbox[0].checked = 'false';
  } else if (localStorage.preset == 2) {
   $preset1Checkbox[0].checked = 'false';
   $preset2Checkbox[0].checked = 'true';
  }
 }

 if (localStorage.hourColor) {
  $hourColorPicker[0].value = localStorage.hourColor;
 }
 if (localStorage.min5Color) {
  $min5ColorPicker[0].value = localStorage.min5Color;
 }
 if (localStorage.minColor) {
  $minColorPicker[0].value = localStorage.minColor;
 }
} 

function getAndStoreConfigData() {
 var $hourColorPicker = $('#hourColorPicker');
 var $min5ColorPicker = $('#min5ColorPicker');
 var $minColorPicker = $('#minColorPicker');
 var $preset1Checkbox = $('#preset1Checkbox');
 var $preset2Checkbox = $('#preset2Checkbox');
 var $presetValue = 0;
 var $preset1Value = 0;
 var $preset2Value = 0;

 if (($preset1Checkbox[0].checked == 1) && ($preset2Checkbox[0].checked == 1)) {
  alert('Only one preset allowed');
  $preset1Value = 0;
  $preset2Value = 0;
//  return
 }

 if ($preset1Checkbox[0].checked == 1) {
  $preset1Value = 1;
 } else if ($preset2Checkbox[0].checked == 1) {
  $preset2Value = 1;
 }

 if ($preset1Value == 1) {
  $presetValue = 1;
 } else if ($preset2Value == 1) {
  $presetValue = 2;
 }

 var options = {
  hourColor: $hourColorPicker.val(),
  min5Color: $min5ColorPicker.val(),
  minColor: $minColorPicker.val(),
  preset: $presetValue
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.hourColor = options.hourColor;
 localStorage.min5Color = options.min5Color;
 localStorage.minColor = options.minColor;
 localStorage.preset = options.preset;

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
