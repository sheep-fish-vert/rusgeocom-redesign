function mainSlider(){
    if( $('.goods-items.width-slider').length ){
        $('.goods-items.width-slider').each(function(index, el) {
            $(window).resize(function(event) {
                setTimeout(function(){
                    if( !$(el).hasClass('slick-slider') && $(window).width() <= 666){
                      sliker();
                    } //else if( $(el).hasClass('slick-slider') ){
                    //   $(el).slick("unslick");
                    // }
                    if( $(window).width()> 666 && $('.goods-items.width-slider').is('.slick-initialized') ){
                      $('.goods-items.width-slider').slick("unslick");
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
    if( !$('.wrapper>.tab-select').length ){
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
    }
  }

  if( $(window).width() < 666 ){
    tabToSelect()
  }

  $(window).resize(function(event) {
    if( $(window).width() < 666 ){
      tabToSelect()
    }else if( $(window).width() > 666 ){
      $('.tab-select-title').unwrap().remove();
      $('.wrapper .tabs').removeAttr('style');
    }
  });
}

function goodsSliders(){
  $('.goods-slider .goods-items').each(function(index, el) {

    function slideGoods(){
      $(el).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: true,
        prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
        nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
        responsive: [
        {
          breakpoint: 667,
          settings: 'unslick'
        }
      ]
      });
    }

    if ( $(el).children().length > 4 ){
      slideGoods();
    }

    $(window).resize(function(event) {
      if( $(window).width()<=666 ){
        setTimeout(function(){
            if( !$(el).hasClass('slick-slider') ) {
              sliker();
            }
        },500)
      }else if( $(window).width() >= 668) {
        setTimeout(function(){
          $(el).slick("unslick");
            if( $(el).children().length > 4  ){
              slideGoods();
            }
        },700)

      }
    });

    function sliker(){
      $(el).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: true,
        prevArrow:'<button type="button" class="slick-prev border-spec-hover"></button>',
        nextArrow:'<button type="button" class="slick-next border-spec-hover"></button>',
      });
    }

    if( $(window).width()<=666 ){
      sliker();
    }

  });
}

function filterColumn(){
  $(document).on('click', '.filter-item-title', function(event) {
    $(this).parent().toggleClass('active');
    $(this).siblings('.filter-item-container').stop().slideToggle();
  });

  $(document).on('click', '.filter-show-more', function(event) {
      $(this).addClass('active');
  });


  // jquery slider on price
  function jquerySliderPrice(){
    var minVal = parseFloat($( "#slider-price-amount" ).data('min'));
    var maxVal = parseFloat($( "#slider-price-amount" ).data('max'));

    var firstVal = parseFloat($( "#slider-price-amount" ).data('first'));
    var lastVal = parseFloat($( "#slider-price-amount" ).data('last'));

    $( ".slider-price-range" ).slider({
      range: true,
      min: minVal,
      max: maxVal,
      values: [ firstVal, lastVal ],
      slide: function( event, ui ) {
        $( ".slider-price-amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        $( ".slider-price-range span").first().html('<b>'+ui.values[ 0 ]+'</b>');
        $( ".slider-price-range span").last().html('<b>'+ui.values[ 1 ]+'</b>');
      }
    });
    $( ".slider-price-amount" ).val($( "#slider-price-range" ).slider( "values", 0 ) +
      " " + $( "#slider-price-range" ).slider( "values", 1 ) );

    $( ".slider-price-range span").first().html( "<b>"+$( ".slider-price-range" ).slider( "values", 0 )+"</b>");
    $( ".slider-price-range span").last().html( "<b>"+$( ".slider-price-range" ).slider( "values", 1 )+"</b>");
  }

  jquerySliderPrice();


  function cloneFilterOnMobile(){

    // clone filter in mobile
    function clonePasteMobile(){
      $( ".slider-price-range" ).slider( "destroy" );
      var filter = $('.filter-form').clone(true, true);
      $('.filter-form').remove();
      filter.appendTo( $('.mobile-show.filter-show' ) );
      $('.mobile-show.filter-show' ).addClass('active');
      $('.filter-holder').removeClass('active');
      setTimeout(function(){
        jquerySliderPrice();
      },500)
    }
    // remove action skin on filter
    function remuveOpenTabs(){
      $('.mobile-show.filter-show .filter-item:not(:last)').each(function(index, el) {
        $(el).removeClass('active');
        $(el).find('.filter-item-container').stop().slideUp();
      });
    }
    // add action skin on filter
    function addOpenTabs(){
      $('.mobile-show.filter-show .filter-item:not(:last)').each(function(index, el) {
        $(el).addClass('active');
        $(el).find('.filter-item-container').stop().slideDown();
      });
    }

    // on resize clone/paste width a magic
    $(window).resize(function(event) {
      if ( $(window).width()>666  && !$('.filter-holder').is('.active') ){
        $('.filter-holder').addClass('active');
        $('.mobile-show.filter-show' ).removeClass('active');

        $( ".slider-price-range" ).slider( "destroy" );
        var filter = $('.filter-form').clone(true, true);
        $('.filter-form').remove();
        filter.appendTo('.filter-holder');

        setTimeout(function(){
          jquerySliderPrice();
        },500);

      }else if ( $(window).width()<=666 && !$('.mobile-show.filter-show' ).is('.active')){
        clonePasteMobile();
        remuveOpenTabs();
      }
    });

    // mobile
    if( $(window).width()<=666 ){
      clonePasteMobile();
      remuveOpenTabs();
    }

  }
  cloneFilterOnMobile();


}





$(document).ready(function(){
  filterColumn();
  goodsSliders();
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
