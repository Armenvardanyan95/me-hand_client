(function () {
        angular.module('app', [
            'ngStorage',
            'validation',
            'pascalprecht.translate',
            'angular-loading-bar',
            'app.services',
            'ngMaterial',
            'app.directives',
            'app.router',
            'truncate',
            'ngSanitize'
        ]);
    
        angular.module('app').config(config);
    
        angular.module('app').run(run);
    
        angular.module('app').constant('moment', moment);
    
    
    
    
    
        config.$inject = ['$translateProvider', '$validationProvider', '$locationProvider'];
    
        function config($translateProvider, $validationProvider, $locationProvider) {

            $locationProvider.html5Mode({
                enabled: true
            });
    
            var lang = localStorage.getItem('ngStorage-lang') || 'en';
            lang = lang.replace(/"/g,"");
    
            var expression = {
                required: /[\s\S]*\S[\s\S]*/,
                phone: /^[0-9+]{5,20}$/,
            };
    
            var validMsg = {
                required: {
                    error: 'This field is required'
                },
                phone: {
                    error: 'Should be a valid phone number'
                }
            };
    
            $validationProvider.setExpression(expression).setDefaultMsg(validMsg);
    
            $validationProvider.setSuccessHTML(function (msg, element, attrs) {
                return '<p class="redTxt">' + msg + '</p>';
            });
    
    
            $translateProvider.useStaticFilesLoader({
                prefix: 'languages/locale-',
                suffix: '.json'
            });
    
            $translateProvider.preferredLanguage(lang).fallbackLanguage('ru');

        }
    
        run.$inject = ['$rootScope', '$localStorage'];
    
        function run($rootScope, $localStorage) {
            $rootScope.lang = $localStorage.lang || 'en';
        }
})();

