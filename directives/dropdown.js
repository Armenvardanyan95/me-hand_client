(function () {
    angular.module('app.directives')
        .directive('dropdown', dropdown);



    function dropdown() {
        return {
            restrict: 'A',
            link: link
        };
    }

    function link(element) {
        $(element).dropdown();
    }
})();