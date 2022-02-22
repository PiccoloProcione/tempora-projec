function isIE() {
  var ua = window.navigator.userAgent; // Check the userAgent property of the window.navigator object
  var msie = ua.indexOf('MSIE '); // IE 10 or older
  var trident = ua.indexOf('Trident/'); //IE 11
  return (msie > -1 || trident > -1);
}

if (isIE()) {
  alert('Internet Explorer is not a supported browser, consider a newer one.\n');
}
