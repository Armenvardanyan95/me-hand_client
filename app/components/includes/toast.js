(function () {
    'use strict';

    angular.module('app')
        .controller('ToastController', ToastController);

    ToastController.$inject = ['$scope', '$mdDialog'];

    function ToastController($scope, $mdDialog) {

        $scope.closeDialog = closeDialog;
        
        function closeDialog() {
            $mdDialog.hide();
        }

    }

})();