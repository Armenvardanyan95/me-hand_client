(function () {
    angular.module('app.directives')
        .directive('imagePopup', imagePopup);



    function imagePopup() {
        return {
            restrict: 'A',
            link: link
        };
    }

    function link(scope, element, attrs) {
        $(element).magnificPopup({
            type: 'image'
        });
    }
})();