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
    const $thsId = $ths.attr('id');

    $('.registration-step .team-item').removeClass('active');
    $ths.addClass('active');
    $(".registration-nav").find("[data-name='master']").removeClass('disabled').html($thsTitle);
    $("[name='master']").val($thsId);
    $ths.parents('.registration-step').removeClass('active').next().addClass('active');
    $('.service-slider').get(0).slick.setPosition();
});

$('.registration-step .service-item').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    const $thsId = $ths.attr('id');
    const $thsTitle = $ths.find('.service-item-title').text();
    const $thsPrice = $ths.find('.service-item-price').text();
    $('.registration-step .service-item').removeClass('active');
    $ths.addClass('active');
    $(".registration-nav").find("[data-name='service']").removeClass('disabled').html($thsTitle);
    $('.subtotal').text($thsPrice);
    $("[name='service']").val($thsId);
    $ths.parents('.registration-step').removeClass('active').next().addClass('active')
});
function updateNavDate(){
    const $thsDay = $('.date-list-title').text();
    const $thsMonths = $('#months .active').data('month');
    const $thsTime = $('.time li.active');
    $('.date-list-title').text($('#days li.active').text());
    $(".registration-nav").find("[data-name='date']").removeClass('disabled').html($thsDay +' '+ $thsMonths +', '+ $thsTime.text());
    $("[name='time']").val($("[data-name='date']").text());
    var dayOfMonth = $('#days li.active').text();
    var dOfMonth = $('#months .active').data('month-number') + 1;
    var date = new Date(new Date().getFullYear(), new Date().getMonth() - 4 + dOfMonth, dayOfMonth);
    var dayOfWeek = date.toLocaleDateString('ru-UA', { weekday: 'short' });
    $('.week-list-title').text(dayOfWeek);
    $('.btn-confirm').removeClass('disabled');
}

$('.registration-step .time li').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    const $thsDay = $('.date-list-title').text();
    const $thsMonths = $('#months .active').data('month');
    if($ths.hasClass('disabled')){}else{
        $('.registration-step .time li').removeClass('active');
        $ths.addClass('active');
        $(".registration-nav").find("[data-name='date']").removeClass('disabled').html($thsDay +' '+ $thsMonths +', '+ $ths.text());
        $("[name='time']").val($("[data-name='date']").text());
        updateNavDate();
    }
});
function daysUpdate() {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var months = [
        "Январь", "Февраль", "Март", "Апрель",
        "Май", "Июнь", "Июль", "Август",
        "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    var monthsDate = [
        "Января", "Февраля", "Марта", "Апреля",
        "Мая", "Июня", "Июля", "Августа",
        "Сентября", "Октября", "Ноября", "Декабря"
    ];
    for (var i = 0; i < months.length; i++) {
        var $month = $("<li data-month-number="+[i]+" data-month="+ monthsDate[i] + ">" + months[i] + "</li>");
        if (i === currentMonth) {
            $month.addClass("active");
        } else if (i < currentMonth) {
            $month.addClass("disabled");
        } else if (i > currentMonth + 1) {
            $month.addClass("disabled");
        }
        $("#months").append($month);
    }
    $('.months-list-title').text(months[currentMonth]);
}
daysUpdate();
function monthsUpdate() {
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    var selectedMonth = $("#months li.active").data('month-number') + 1;
    var daysInMonthSelected = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
    $("#days").empty();
    for (var i = 1; i <= daysInMonthSelected; i++) {
        var $day = $("<li>" + i + "</li>");
        if(currentMonth+1 === selectedMonth){
            if (i === currentDay) {
                $day.addClass("active");
            } else if (i < currentDay) {
                $day.addClass("disabled");
            }
        }else{
            $("#days li:first-child").addClass('active');
        }
        $("#days").append($day);
    }
}
monthsUpdate();
$(document).on('click', '#days li', function (e) {
    e.preventDefault();
    const $ths = $(this);
    if($ths.hasClass('disabled')){}else {
        $('#days li').removeClass('active');
        $ths.addClass('active');
        $ths.parent().removeClass('active');
        $ths.parent().prev().text($ths.text()).removeClass('active');
        updateNavDate();
    }
});
$(document).on('click', '#months li', function (e) {
    e.preventDefault();
    const $ths = $(this);
    if($ths.hasClass('disabled')){}else {
        $('#months li').removeClass('active');
        $ths.addClass('active');
        $ths.parent().removeClass('active');
        $ths.parent().prev().text($ths.text()).removeClass('active');
        monthsUpdate();
        updateNavDate();
    }
});
$('.date-list-title').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    $ths.toggleClass('active');
    $ths.next().toggleClass('active');
    $('.months-list-title, .months-list ul').removeClass('active');
});
$('.months-list-title').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    $ths.toggleClass('active');
    $ths.next().toggleClass('active');
    $('.date-list-title, .date-list ul').removeClass('active');
});
$(document).ready(function() {
    var currentDate = new Date();
    var currentDay = currentDate.getDay();
    $(".day").each(function() {
        var dayNumber = parseInt($(this).text());
        if (dayNumber === currentDay) {
            $(this).addClass("active");
        } else if (dayNumber < currentDay) {
            $(this).addClass("disabled");
        }
    });
});
$(document).ready(function() {
    var currentDate = new Date();
    var currentDay = currentDate.getDay();
    var startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay);
    $(".day").each(function() {
        var day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + $(this).index())
        if (day.getDate() === currentDate.getDate()) {
            $(this).addClass("active");
        } else if (day < currentDate) {
            $(this).addClass("disabled");
        }
    });
});
// $('.prev').on('click', function (e) {
//     e.preventDefault();
//     const $ths = $(this);
//     if($ths.hasClass('disabled')){}else{
//         const currentActive = $('.registration-step.active');
//         currentActive.removeClass('active');
//         if (currentActive.is(':first-child')) {
//             $('.registration-step').first().addClass('active');
//         } else {
//             currentActive.prev('.registration-step').addClass('active');
//         }
//     }
// });
$('.btn-confirm').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    if($ths.hasClass('disabled')){}else{
        $('.prev').removeClass('disabled');
        const currentActive = $('.registration-step.active');
        currentActive.removeClass('active');
        if (currentActive.is(':last-child')) {
            $('.registration-step').last().addClass('active');
        } else {
            currentActive.next('.registration-step').addClass('active');
        }
    }
    $('.btn-confirm').addClass('disabled');
});
$('.team-slider').each(function (e) {
    console.log();
    if($('.team-slider .slide').length > 6){
        $('.team-slider').slick({
            rows: 3,
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
            loop:true,
            nextArrow: '.team-button .next',
            prevArrow: '.team-button .prev'
        });
    }else{
        $('.team-button').hide();
    }
});


$('.service-slider').slick({
    rows: 3,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop:true,

    nextArrow: '.service-button .next',
    prevArrow: '.service-button .prev'
});