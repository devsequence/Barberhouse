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
    $('.registration-step .service-item').removeClass('active');
    $ths.addClass('active');
    $(".registration-nav").find("[data-name='service']").removeClass('disabled').html($thsTitle);
    $('.subtotal').text($thsPrice);
    $("[name='service']").val($thsTitle);
});

function updateNavDate(){
    const $thsDay = $('.date-list-title').text();
    const $thsMonths = $('#months .active').data('month');
    const $thsTime = $('.time li.active');
    $('.date-list-title').text($('#days li.active').text());
    $(".registration-nav").find("[data-name='date']").removeClass('disabled').html($thsDay +' '+ $thsMonths +', '+ $thsTime.text());
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
        $ths.parent().prev().text($ths.text());
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
        $ths.parent().prev().text($ths.text());

        monthsUpdate();
        updateNavDate();
    }
});
$('.date-list-title, .months-list-title').on('click', function (e) {
    e.preventDefault();
    const $ths = $(this);
    $('.date-list ul, .months-list ul').removeClass('active');
    $ths.next().toggleClass('active');
});

$(document).ready(function() {
    var currentDate = new Date();
    var currentDay = currentDate.getDay(); // Получаем день недели (0 - воскресенье, 1 - понедельник, и т.д.)
    $(".day").each(function() {
        var dayNumber = parseInt($(this).text());
        if (dayNumber === currentDay) {
            $(this).addClass("active");
        } else if (dayNumber < currentDay) {
            $(this).addClass("disabled");
        }
    });
    $('.week-list-title').text(currentDay);
});

$(document).ready(function() {
    var currentDate = new Date();
    var currentDay = currentDate.getDay(); // Получаем день недели (0 - воскресенье, 1 - понедельник, и т.д.)
    var startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay); // Получаем начало текущей недели
    $(".day").each(function() {
        var day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + $(this).index()); // Получаем дату текущего дня недели
        // $(this).text(day.getDate()); // Выводим номер дня месяца

        if (day.getDate() === currentDate.getDate()) {
            $(this).addClass("active");
        } else if (day < currentDate) {
            $(this).addClass("disabled");
        }
    });
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
//
// var dayOfMonth = 4;
// var date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, dayOfMonth);
// console.log(date);
// var dayOfWeek = date.toLocaleDateString('ru-UA', { weekday: 'short' });
// $('#result').text(dayOfWeek);