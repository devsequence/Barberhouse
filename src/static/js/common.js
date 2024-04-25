if ($('.hero').length > 0) {
    $('.header').addClass('header-main');
} else {
    $(window).on('scroll', function() {
        var $this = $(this),
            $headerH = $('.header').height();
        if ($this.scrollTop() > 100) {
            $('.header').css('top','-150px');
        }else{
            $('.header').css('top','0');
        }
        if ($this.scrollTop() > ($headerH + 250)) {
            $('.header').addClass('scroll-nav').css('top','0');
        }
        else{
            $('.header').removeClass('scroll-nav');
        }
    });
}
$('.header-btn').on('click', function (e) {
    e.preventDefault();
   const $ths = $(this);
    $ths.toggleClass('active');
    $('.header').toggleClass('is-open');
    $('body').toggleClass('is-scroll');
});
$('.header-overlay').on('click', function (e) {
    e.preventDefault();
    $('.header-btn').removeClass('active');
    $('.header').removeClass('is-open');
    $('body').removeClass('is-scroll');
});