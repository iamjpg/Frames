this["JST"] = this["JST"] || {};

this["JST"]["src/views/weather.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n  <div style="padding: 10px; border: 1px solid #dcdcdc; background: #f5f5f5;">\n    The weather in ' +
((__t = ( name )) == null ? '' : __t) +
' is currently ' +
((__t = ( parseInt(main.temp) )) == null ? '' : __t) +
' degrees.\n  </div>\n';

}
return __p
};

this["JST"]["src/views/welcome.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n  <p>Frames is a fun little Javascript MVC Framework. I Promise, it is!</p>\n  <p>Click on a link above to interact with <a href="http://openweathermap.org">openweathermap.org</a></p>\n';

}
return __p
};