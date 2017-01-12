(function () {
    angular.module('app.directives')
        .directive('toTop', toTop);



    function toTop() {
        return {
            restrict: 'A',
            link: link
        };
    }

    function link(scope, element, attrs) {
        jQuery(document).ready(function($){
            // browser window scroll (in pixels) after which the "back to top" link is shown
            var offset = 300,
            //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
                offset_opacity = 1200,
            //duration of the top scrolling animation (in ms)
                scroll_top_duration = 700;
            //grab the "back to top" link

            //hide or show the "back to top" link
            $(window).scroll(function(){
                ( $(this).scrollTop() > offset ) ? $(element).addClass('cd-is-visible') : $(element).removeClass('cd-is-visible cd-fade-out');
                if( $(this).scrollTop() > offset_opacity ) {
                    $(element).addClass('cd-fade-out');
                }
            });

            //smooth scroll to top
            $(element).on('click', function(event){
                event.preventDefault();
                $('body,html').animate({
                        scrollTop: 0 
                    }, scroll_top_duration
                );
            });

        });
    }
})();



