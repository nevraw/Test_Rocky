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

var $presetValue=0;

$("input[name=presetRadio]").change(function () {
 $presetValue = parseInt(this.value);
});


/*
		function getCheckedValue(radioObj) {
			console.log('in getCheckedValue() (HTML)');
			if(!radioObj)
				return "";
			var radioLength = radioObj.length;
			if(radioLength == undefined)
				if(radioObj.checked)
					return radioObj.value;
				else
					return "";
			for(var i = 0; i < radioLength; i++) {
				if(radioObj[i].checked) {
					return radioObj[i].value;
				}
			}
			return "";
		}
*/



function loadOptions() {
 var $hourColorPicker = $('#hourColorPicker');
 var $min5ColorPicker = $('#min5ColorPicker');
 var $minColorPicker = $('#minColorPicker');
// var $preset = localStorage.preset;
 $presetValue=2;
 
 console.log('localStorage.preset: ' + $presetValue);

 // setting radio' value
 $("input[name=presetRadio][value='" + $presetValue + "']").attr('checked', 'checked');

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
// var $presetRadio = $('#presetRadio');
// var $presetValue = 0;

 console.log('presetRadio value' + $presetValue)
 /*
 if ($presetValue == 0) {
  console.log('presetRadio 0 checked');
 }
 
 if ($presetRadio[1].checked) {
  console.log('presetRadio 1 checked');
  $presetValue = 1;
 } else if ($presetRadio[2].checked) {
  console.log('presetRadio 2 checked');
  $presetValue = 2;
 }
*/

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
 localStorage.preset = options.presetValue;

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
