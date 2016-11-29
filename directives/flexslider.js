(function () {
    angular.module('app.directives')
        .directive('flexslider', flexslider);



    function flexslider() {
        return {
            restrict: 'A',
            link: link
        };
    }

    function link(element) {
        $(document).ready(function () {

            $('#carousel').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 210,
                itemMargin: 5,
                asNavFor: '#slider'
            });

            $('#slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: "#carousel"
            });
            
        });
    }
})();