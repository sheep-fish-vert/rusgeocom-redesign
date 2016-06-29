
/* header town styler */

    function townStyler(){

        $('.header-town select').styler();

    };

/* /header town styler */

/* header catalog adaptation */

    function headerCatalogAdaptation(){

        var showMoreWidth = $('.header-nav-more').width();
        var townSelectWidth = $('.header-town').width();
        var heightMenuPoint = 15; // catalog menu height
        var timer = null;

        /* adding elements size like their data-attr */
        $('.header-top-nav ul li').each(function(){
            $(this).attr('data-width', ($(this).width() + parseInt($(this).css('margin-right'))));
        });
        /* /adding elements size like their data-attr */

        function showMagic(){

            clearTimeout(timer);

            if($(window).width() > (666-$.scrollbarWidth())){

                timer = setTimeout(function(){
                    /* if catalog list to big */
                        if($('.header-top-nav').height() > heightMenuPoint){
                            do{

                                var catalogItem = $('.header-top-nav nav li').eq($('.header-top-nav nav li').length-1).remove();
                                $('.header-nav-more ul').prepend(catalogItem);
                                if($('.header-nav-more li').length != 0){
                                    $('.header-nav-more').addClass('show');
                                }

                            }
                            while($('.header-top-nav').height() > heightMenuPoint);
                        }
                    /* /if catalog list to big */

                    /* let see is there free space for catalog items */
                        else if($('.header-nav-more').is('.show')){

                            /* free space size */
                                var freeSpaceForCatalogList = $('.header-top-wrap').width() - $('.header-top-nav nav').width()- townSelectWidth;
                            /* /free space size */

                            /* if in more list only one item */
                                if($('.header-nav-more li').length > 1){

                                    freeSpaceForCatalogList = freeSpaceForCatalogList - showMoreWidth;

                                }
                            /* /if in more list only one item */

                            /* width of last item in more list */
                                var headerNavMoreItemWidth = $('.header-nav-more li').eq($('.header-nav-more li').length-1).data('width');
                            /* /width of last item in more list */

                            /* just magic (while work incorect) */
                                for(var i = 1;i>0;){
                                    if((freeSpaceForCatalogList - headerNavMoreItemWidth) >=0){
                                        freeSpaceForCatalogList = freeSpaceForCatalogList - headerNavMoreItemWidth;
                                        var moreItem = $('.header-nav-more li').eq($('.header-nav-more li').length - 1).remove();
                                        $('.header-top-nav nav ul').append(moreItem);
                                        if($('.header-nav-more li').length == 0){
                                            $('.header-nav-more').removeClass('show');
                                            i=-1;
                                        }else if($('.header-nav-more li').length == 1){
                                            freeSpaceForCatalogList = freeSpaceForCatalogList + showMoreWidth;
                                            headerNavMoreItemWidth = $('.header-nav-more li').eq($('.header-nav-more li').length-1).data('width');
                                        }else{
                                           headerNavMoreItemWidth = $('.header-nav-more li').eq($('.header-nav-more li').length-1).data('width');
                                        }
                                    }else{
                                        i=-1;
                                    }
                                }
                                /* /just magic (while work incorect) */

                        }
                    /* /let see is there free space for catalog items */
                },300);
            }else{
                /* adaprtation for mobile */
                    if($('.header-nav-more').is('.show')){
                        $('.header-nav-more').removeClass('show');
                        var replaceItems = $('.header-nav-more li').remove();
                        $('.header-top-nav nav ul').append(replaceItems);
                    }
                /* /adaprtation for mobile */
            }

        }

        showMagic();

        $(window).resize(function(){

            showMagic();

        });

        $(document).on('mouseenter', '.header-nav-more.show', function(){

            $('.header-nav-more-list').slideDown(300);

        });

        $(document).on('mouseleave', '.header-nav-more.show', function(){

            $('.header-nav-more-list').slideUp(300);

        });


    }

/* /header catalog adaptation */

/* login form show & user logined options show */

    function loginizationEvents(){

        $(document).on('click', '.sliding-button', function(){
            if($(this).is('.active')){
                $(this).removeClass('active');
                $('.sliding-block').removeClass('active').stop().slideUp(300);
            }else{
                $(this).addClass('active');
                $(this).parents('.sliding-wrap').find('.sliding-block').addClass('active').stop().slideDown(300);
            }
        });

    }

/* /login form show & user logined options show */

/* busket skripts */

    function busketScripts(){

        var itemsLength = $('.header-busket-list-wrap li').length;

        $('.busket-subtitle span, .header-busket-value span').text(itemsLength);


        /* busket change items value */

            function busketItemValue(item, callback){

                var itemCount = item.find('.busket-list-input input').val();
                var itemPrice = item.find('.busket-list-count-main').data('price');

                var itemId = item.data('item-id');
                var itemSum = itemCount * itemPrice;
                var itemSumReg = numberWithSpaces(itemSum);

                item.find('.busket-list-price span').attr('data-item-sum', itemSum).text(itemSumReg);

                $.ajax({
                    url:someUrl,
                    data:{'action':'changeItemValue','itemId':itemId, 'count':itemCount},
                    method:'POST'
                });

                if(typeof callback == 'function'){
                    callback();
                }

            }

        /* /busket change items value */

        /* busket all items sum */

            function busketAllItemsSum(){

                var allSum = 0;

                $('.header-busket-list-wrap li').each(function(){

                    allSum = allSum + parseInt($(this).find('.busket-list-price span').attr('data-item-sum'));

                });

                $('.all-sum-value span').text(numberWithSpaces(allSum));

            }

        /* /busket all items sum */

        /* calcing sum by page loading */

            $('.header-busket-list-wrap li').each(function(index){

                if(parseInt($(this).find('input').val()) == 1){
                    $(this).find('.minus').addClass('disabled');
                }

                busketItemValue($(this));

                if((itemsLength-1) == index){
                    busketAllItemsSum();
                }

            });

        /* /calcing sum by page loading */

        /* change item count */

            function changeItemCount(){

                /* change count by button */

                    $(document).on('click','.busket-list-count-change', function(){

                        var item = $(this).parents('li');
                        var itemCount = parseInt(item.find('.busket-list-input input').val());

                        if($(this).is('.plus')){

                            itemCount = itemCount + 1;
                            if(itemCount > 1){
                                $('.busket-list-count-change.minus').removeClass('disabled');
                            }
                            item.find('.busket-list-text span').text(itemCount);
                            item.find('.busket-list-input input').val(itemCount);

                            busketItemValue(item, busketAllItemsSum);

                        }else if($(this).is('.minus') && itemCount != 1){

                            itemCount = itemCount - 1;
                            if(itemCount == 1){
                                $(this).addClass('disabled');
                            }
                            item.find('.busket-list-text span').text(itemCount);
                            item.find('.busket-list-input input').val(itemCount);

                            busketItemValue(item, busketAllItemsSum);

                        }

                    });

                /* /change count by button */

                /* change count by input */

                    var pattern = /^[0-9]\d*$/;
                    var lastValue = 1;

                    $(document).on('keydown', '.busket-list-input input', function(){
                        if(pattern.test($(this).val())){
                            lastValue = $(this).val();
                        }

                    });

                    $(document).on('keyup', '.busket-list-input input', function(){

                        var parent = $(this).parents('li');
                        var thisValue = $(this).val();

                        if(!pattern.test(thisValue)){
                            $(this).val(lastValue);
                        }
                        else{

                            if(parseInt($(this).val())>1){
                                parent.find('.minus').removeClass('disable');
                            }
                            else{
                                parent.find('.minus').addClass('disable');
                            }

                            parent.find('.busket-list-text span').text(parseInt($(this).val()));
                            busketItemValue(parent, busketAllItemsSum);
                        }

                    });

                /* /change count by input */

            };

            changeItemCount();

        /* /change item count */

        /* open busket fancybox */

            $('.fancybox-popup').fancybox({
                padding:0,
                fitToView:true,
                autoSize:true,
                wrapCSS:'busket-popup-main',
                beforeLoad:function(){

                    $('.header-busket-list-main').slideUp(300);

                }
            });

        /* /open busket fancybox */

        /* remove item from fancy busket */

            function removeItemFromBusket(){

                $(document).on('click','.remove-item', function(){

                    var removedId = $(this).attr('data-item-id');
                    $(this).parents('li').remove();

                    itemsLength = $('.header-busket-list-wrap li').length;

                    $('.busket-subtitle span, .header-busket-value span').text(itemsLength);

                    $.ajax({
                        url:someUrl,
                        data:{'action':'removeItemFromBusked','removedId':removedId},
                        method:'POST'
                    });

                    if(itemsLength == 0){
                        $.fancybox.close();
                        $('.header-busket-wrap').removeClass('has-items');
                    }

                    busketAllItemsSum();

                });

            }

            removeItemFromBusket();

        /* /remove item from fancy busket */

        /* hover effects on busket icon */

            $(document).on('mouseenter','.header-busket',function(){

                if($(this).find('.header-busket-wrap').is('.has-items')){
                    $('.header-busket-list-main').stop().slideDown(300);
                }

            });

            $(document).on('mouseleave','.header-busket',function(){

                $('.header-busket-list-main').stop().slideUp(300);

            });

        /* /hover effects on busket icon */

        /* continue shoping */

            $(document).on('click', '.continue-buing a', function(){

                $.fancybox.close();

            });

        /* /continue shoping */

    };

/* /busket skripts */

/* expresion for numbers with spaces */

    function numberWithSpaces(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

/* /expresion for numbers with spaces */

/* header bottom scripts */

    function headerBottom(){

        /* hover on catalog item on desktop */

            $('.header-mobile-catalog-wrap, .header-mobile-catalog-wrap li').hover(
                function(){

                    if($(window).width() > 666){
                        $(this).find('>ul').stop().slideDown(300);
                    }

                },
                function(){
                    if($(window).width() > 666){

                        if(!$(this).is('.header-mobile-catalog-wrap') && !$(this).is('.show')){
                            $(this).find('>ul').stop().slideUp(300);

                        }
                    }
                }
            );

        /* /hover on catalog item on desktop */

        /* click on catalog item on mobile */

            $('.mobile-catalog-button, .header-catalog p').click(function(){

                if($(window).width() <= 666){
                    if($(this).is('.active')){
                        $(this).removeClass('active');
                        $(this).parent().find('>ul').slideUp(300);
                    }else{
                        $(this).addClass('active');
                        $(this).parent().find('>ul').slideDown(300);
                    }
                }

            });

        /* /click on catalog item on mobile */

        /* header-search focus */

            function searchFiedSize(){

                if($(window).width() > 666){

                    var mboxWidth = $('.mbox').width();
                    var headerCatalogWidth = $('.header-catalog').width();

                    var widthDiference = mboxWidth - headerCatalogWidth;

                    $('.header-search').width(widthDiference);
                    $('.header-search input').attr('data-max-width', mboxWidth);
                    $('.header-search input').attr('data-diference', headerCatalogWidth);

                    $('.header-search input.hovered').css({'width':mboxWidth, 'margin-left':(-1)*headerCatalogWidth});

                }

            };

            searchFiedSize();

            $('.header-search input').focus(function(){
                if($(window).width() > 666){
                    $(this).addClass('hovered').css({'width':$(this).attr('data-max-width'), 'margin-left':(-1)*$(this).attr('data-diference')});
                }
            }).blur(function(){
                $(this).removeClass('hovered').css({'width':'100%','margin-left':'0'});
            });

        /* /header-search focus */

        /* clear attr's by window resize */

        $(window).resize(function(){
            if($(window).width() > 666){
                $('ul').removeAttr('style');
                $('.header-mobile-catalog-wrap .active').removeClass('active');
                searchFiedSize();
            }else{
               $('.header-search, .header-search input').removeAttr('style');
            }
        });

        /* /clear attr's by window resize */

    }

/* header bottom scripts */

/* right-column sizes */

    /* column-script - index-right-column, goods-right-column, catalog-right-column */

    function rightColumnSizes(){

        function rightSizeScript(){

            if($(window).width()+$.scrollbarWidth() > 666){

                if($('.column-script').is('.goods-right-column') && $(window).width() < 800){

                    $('.column-script').attr('style','width:100%; min-height:0;');
                    $('.header-catalog>ul>li').eq(0).removeClass('show');

                }else{
                    var mboxWidth = $('.mbox').width();
                    var columnWidth = $('.header-catalog>ul>li').eq(0).outerWidth();
                    var columnHeight = $('.header-catalog>ul>li').eq(0).find('>ul').height();
                    var rightBlockWidth = mboxWidth - columnWidth;

                    if(!$('.header-catalog>ul>li').eq(0).is('.no-show')){
                        $('.header-catalog>ul>li').eq(0).addClass('show');
                    }

                    $('.column-script').attr('style','width:' + rightBlockWidth + 'px; min-height:'+ columnHeight+'px;');

                }

            }else{
                $('.column-script').attr('style','width:100%; min-height:0;');
                $('.header-catalog>ul>li').eq(0).removeClass('show');
            }

        }

        rightSizeScript();

        $(window).resize(function(){

            rightSizeScript();

        });

    }

/* /right-column sizes */


$(document).ready(function(){

    townStyler();
    headerCatalogAdaptation();
    loginizationEvents();
    busketScripts();
    headerBottom();
    rightColumnSizes();

});

$(window).load(function(){

});

$(window).resize(function(){

});