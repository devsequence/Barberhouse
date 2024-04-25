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
$('.registration-step .team-item').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    const $thsTitle = $ths.find('.team-item-title').text();
    $('.registration-step .team-item').removeClass('active');
    $ths.addClass('active');
    $(".registration-nav").find("[data-name='master']").removeClass('disabled').html($thsTitle);
    $("[name='master']").val($thsTitle);
    $('.next').removeClass('disabled');
});
$('.registration-step .service-item').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    const $thsTitle = $ths.find('.service-item-title').text();
    const $thsPrice = $ths.find('.service-item-price').text();
    $(".registration-nav").find("[data-name='service']").removeClass('disabled').html($thsTitle);
    $('.subtotal').text($thsPrice);
    $("[name='service']").val($thsTitle);
});
$('.prev').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    if($ths.hasClass('disabled')){}else{
        const currentActive = $('.registration-step.active'); // get current active
        currentActive.removeClass('active'); // remove class active
        if (currentActive.is(':first-child')) {
            $('.registration-step').first().addClass('active'); // add class to first li if last child
        } else {
            currentActive.prev('.registration-step').addClass('active'); // otherwise add active to next li
        }
    }
});
$('.next').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    if($ths.hasClass('disabled')){}else{
        $('.prev').removeClass('disabled');
        const currentActive = $('.registration-step.active'); // get current active
        currentActive.removeClass('active'); // remove class active
        if (currentActive.is(':last-child')) {
            $('.registration-step').last().addClass('active'); // add class to first li if last child
        } else {
            currentActive.next('.registration-step').addClass('active'); // otherwise add active to next li
        }
    }
});