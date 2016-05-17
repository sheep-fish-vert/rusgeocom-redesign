
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

        /* adding elements size like their data-attr */
        $('.header-top-nav ul li').each(function(){
            $(this).attr('data-width', ($(this).width() + parseInt($(this).css('margin-right'))));
        });
        /* /adding elements size like their data-attr */

        function showMagic(){

            if($(window).width() > 666){

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


$(document).ready(function(){

    townStyler();
    headerCatalogAdaptation();

});

$(window).load(function(){

});

$(window).resize(function(){

});