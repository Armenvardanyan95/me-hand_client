(function () {
    angular.module('app.directives')
        .directive('fixToBottom', fixToBottom);



    function fixToBottom() {
        return {
            restrict: 'A',
            link: link
        };
    }

    function link(scope, element, attrs) {
        if ($(document).height() <= $(window).height()) {
            $(element).css({
                'position': 'fixed',
                'bottom': '0px',
                'width': '100%'
            });
        }
    }
})();