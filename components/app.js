angular.module('app', [
    'ui.router',
    'ngStorage',
    'validation',
    'pascalprecht.translate',
    'angular-loading-bar',
    'app.services',
    'ngMaterial',
    'app.directives'
]);

angular.module('app').config(config);

angular.module('app').run(run);





config.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider', '$validationProvider'];

function config($stateProvider, $urlRouterProvider, $translateProvider, $validationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../components/home/home.html',
            controller: 'HomeController'
        })
        .state('item', {
            url: '/item/:itemId',
            templateUrl: '../components/item/item.html',
            controller: 'ItemController',
            resolve: {
                item: function ($stateParams, Item) {
                    return Item.get({id: $stateParams.itemId});
                }
            }
        })
        .state('cart', {
            url: '/cart',
            templateUrl: '../components/cart/cart.html',
            controller: 'CartController'
        })
        .state('menu', {
            url: '/menu/:typeId',
            templateUrl: '../components/menu/menu.html',
            controller: 'MenuController',
            resolve: {
                items: function ($stateParams, Item) {
                    return Item.query({item_type: $stateParams.typeId});
                }
            }
        })
        .state('search', {
            url: '/search?query',
            templateUrl: '../components/menu/menu.html',
            controller: 'SearchController',
            resolve: {
                items: function (Item, $stateParams) {
                    return Item.query({search: $stateParams.query});
                }
            }
        });

    var lang = localStorage.getItem('ngStorage-lang') || 'en';
    lang = lang.replace(/"/g,"");

    var expression = {
        required: /[\s\S]*\S[\s\S]*/,
        phone: /^[0-9+]{5,20}$/,
    };

    var validMsg = {
        en: {
            required: {
                error: 'This field is required'
            },
            phone: {
                error: 'Should be a valid phone number'
            }
        }
    };

    $validationProvider.setExpression(expression).setDefaultMsg(validMsg[lang]);

    $validationProvider.setSuccessHTML(function (msg, element, attrs) {
        return '<p class="redTxt">' + msg + '</p>';
    });


    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage(lang);

    
}

run.$inject = ['$rootScope', '$localStorage'];

function run($rootScope, $localStorage) {
    $rootScope.lang = $localStorage.lang || 'en';


    if(typeof $localStorage.cart == "undefined"){
        $localStorage.cart = [];
    }
    
    $rootScope.isInCart = isInCart;
    $rootScope.addToCart = addToCart;
    $rootScope.removeFromCart = removeFromCart;
    
    function isInCart(item) {
        var cart = $localStorage.cart;
        var isIn = false;
        angular.forEach(cart, function (value, key) {
            if(value.id == item.id) isIn = true;
        });
        return isIn;
    }
    
    function addToCart(item){
        if(isInCart(item)) return false;
        var cart = $localStorage.cart;
        cart.push(item);
    }
    
    function removeFromCart(item) {
        var index = 0;
        var cart = $localStorage.cart;
        
        angular.forEach(cart, function (value, key) {
            if(value.id == item.id) index = key;
        });
        
        cart.splice(index, 1);
    }
}