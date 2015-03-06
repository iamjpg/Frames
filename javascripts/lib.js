$('.menu-link').bigSlide({
  easyClose: true
});
$('#menu').css('display', 'block');
$('#menu ul li a').on('click', function() {
  $('.menu-link').bigSlide('close')
});
