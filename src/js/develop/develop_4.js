function mainSlider(){
    if( $('.goods-items width-slider').length ){
        $('.goods-items width-slider').each(function(index, el) {
            $(window).resize(function(event) {
                setTimeout(function(){
                    if( !$(el).hasClass('slick-slider') && $(window).width() <= 666){
                      sliker();
                    }else if( $(el).hasClass('slick-slider') ){
                      $(el).slick("unslick");
                    }
                },500)

            });
              function sliker(){
                $(el).slick({
                  infinite: true,
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  swipeToSlide:true,
                  adaptiveHeight:true,
                  arrows: true,
                  draggable:true,
                  focusOnSelect:false,
                  prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
                  nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
                  responsive: [
                      {
                        breakpoint: 478,
                        settings: {
                          slidesToShow: 1
                        }
                      }
                    ]
                });
              }
              if( $(window).width() <= 666){
                sliker();
              }
        });
    }
}

function sliderBends(){
    if( $('.brends-slider-wrap').length ){
        $('.brends-slider-wrap').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          swipeToSlide:true,
          adaptiveHeight:true,
          arrows: true,
          draggable:true,
          focusOnSelect:false,
          prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
          nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
          responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 478,
                settings: {
                  slidesToShow: 1
                }
              },
              {
                breakpoint: 666,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 320,
                settings: {
                  slidesToShow: 1
                }
              }

            ]
        });
    }

}
function ratingScript(){
    $(document).on('mouseenter', '.rating label', function(){
        var parent=$(this).parent();
        parent.find('.form-input').removeClass('hovered');
        var index=$(this).index();
        for(var i=0;i<=index;i++){
            parent.find('label').eq(i).find('.form-input').addClass('hovered');
        }
    });
    $(document).on('mouseleave', '.rating:not(.static) label', function(){
        var parent=$(this).parent();
        parent.find('.form-input').removeClass('hovered');
    });

    $(document).on('change','.rating input', function(){
        var parent=$(this).parents('.rating');
        parent.find('.form-input').removeClass('active');
        var index=$(this).parents('label').index();

        for(var i=0;i<=index;i++){
            parent.find('label').eq(i).find('.form-input').addClass('active');
        }

        $.ajax({
          url: footerStarRating,
          type: 'POST',
          data: parseFloat(index+1)
        })
        .done(function(data) {
          console.log("rating "+ parseFloat(index+1) );
        });
    });
}

function showMoreCatalog(){
  $(document).on('click', '.catalog-goods .show-more-wrap', function(event) {
    event.preventDefault();
    var button = $(this).parent();
    var id = button.data('id');

    $.ajax({
      url: showMoreCat,
      type: 'POST',
      data: id
    })
    .done(function(data) {
      button.remove();
      $('.catalog-goods .goods-items').append(data);
    })
    .fail(function() {
      console.log("error");
      alert('Ошибка загрузки');
    });

  });
}

function goodsBigSlider(){
  $('.goods-big-slider .slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    focusOnSelect: false,
    draggable:false,
    asNavFor: '.slider-nav',
    responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
            nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
            fade: false
          }
        }
      ]
  });
  $('.goods-big-slider .slider-nav').slick({
    slidesToShow: 5,
    centerPadding: '0px',
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
    nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
    responsive: [
      {
        breakpoint: 666,
        settings: 'unslick'
      }
    ]
  });

  $(window).resize(function(event) {
      setTimeout(function(){
          if( !$('.goods-big-slider .slider-nav').hasClass('slick-slider') && $(window).width() > 666){
            $('.goods-big-slider .slider-nav').slick({
                slidesToShow: 5,
                centerPadding: '0px',
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                centerMode: true,
                focusOnSelect: true,
                prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
                nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
                responsive: [
                {
                  breakpoint: 666,
                  settings: 'unslick'
                }
              ]
              });
          }
      },700)
  });

}

function cardPopup(){
    $('.button-serial').fancybox({
        wrapCSS:'serial-fancy-wrap',
        padding:0,
        fitToView:true,
        autoSize:true,
        helpers:  {
            overlay : {
                css:{
                    'background-image':'none'
                }
            }
        }
    });

    $('.serial-popup-rows-wrap .serial-form-row').eq(0).find('.serial-form-acrodion-top label input').
    prop('checked',true);
    $('.serial-popup-rows-wrap .serial-form-row').eq(0).find('.serial-form-acrodion-top').addClass('active');
    $('.serial-popup-rows-wrap .serial-form-row').eq(0).find('.serial-form-acordion-bottom').slideDown(300);
    $('.serial-popup-rows-wrap .serial-form-row').eq(0).find('.serial-form-acrodion-top label').addClass('active').parents('.serial-form-row').addClass('active');
    sumSerial();

    function sumSerial(){
        var sum = 0;
        $('.serial-label.active').each(function(){
            var val = $(this).find('.input-price').data('price');
            sum=sum+val;
        });
        var str = $('<span></span>');
        var sum = sum.toString();
        for(m=1;m<=sum.length;m++){
            str.prepend(sum.charAt(sum.length-m));
            if((m%3==0)&&(m!=sum.length)){
                str.prepend('&nbsp;');
            }
        }
        var allSum=str.text()+' .-';
        $('.serial-sum-val').text(allSum);
    };

    $(document).on('change','.serial-label input',function(){
        var parent = $(this).parents('.serial-label');
        console.log(parent.attr('class'));
        if(parent.is('.active')){
            parent.removeClass('active');
        }
        else{
            parent.addClass('active');
        }
        sumSerial();
    });

    $(document).on('change','.serial-form-acrodion-top input', function(){

        $('.serial-form-acrodion-top').removeClass('.active');
        $('.serial-form-acrodion-top .serial-label').removeClass('active').parents('.serial-form-row').removeClass('active');
        $('.serial-form-acordion-bottom input').prop('checked',false);
        $('.serial-form-acordion-bottom .serial-label').removeClass('active');
        $('.serial-form-acordion-bottom').slideUp(300);

        $(this).parents('.serial-form-acrodion-top').find('.serial-label').addClass('active').parents('.serial-form-row').addClass('active');;

        if($(this).parents('.serial-form-acordion-wrap').is('.has-bottom')){
            $(this).parents('.serial-form-acrodion-top').addClass('active');
            $(this).parents('.serial-form-acordion-wrap').find('.serial-form-acordion-bottom').slideDown(300);
        }
        sumSerial();
    });

};

function swithTub(){

  $('.hav-tab .wrapper').each(function(index, el) {

    var tab = $(el).find('>.tabs>.tab');
    var tabIndex = tab.index();
    var tabItem = $(el).find('>.tabContent>.tabItem');
    tabItem.not(':first').addClass('hide');

    tab.click(function(event) {
      tabIndex = $(this).index();
      tab.removeClass('active').eq(tabIndex).addClass('active');
      tabItem.addClass('hide').eq(tabIndex).removeClass('hide');
    }).eq(0).addClass('active');
  });


  function tabToSelect(){
    if( $(window).width() < 666 ){
      $('.wrapper .tabs').each(function(index, el) {
        var elem = $(el);

        elem.wrap('<div class="tab-select"></div>');
        elem.parent().prepend('<div class="tab-select-title"></div>');

        var tabActive = elem.find('.tab.active').text();
        elem.siblings('.tab-select-title').text(tabActive);
      });

      $(document).on('click', '.wrapper .tab-select-title',function(event) {
        var that = $(this);
        that.siblings('.tabs').stop().slideToggle().toggleClass('active');
      });

      $(document).on('click', '.wrapper .tab-select .tabs .tab',function(event) {
        var text = $(this).text();
        $(this).parents('.tab-select').find('.tab-select-title').text(text);
        $(this).parent().removeClass('active').slideUp();
      });
    }else{
      $('.tab-select-title').unwrap().remove();
    }
  }
  tabToSelect();

  $(window).resize(function(event) {
    tabToSelect();
  });
}








$(document).ready(function(){
  swithTub();
  cardPopup();
  goodsBigSlider();
  showMoreCatalog();
  mainSlider();
  sliderBends();
  ratingScript();
});

$(window).load(function(){

});

$(window).resize(function(){

});
