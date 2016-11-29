angular.module('app', [
    'ui.router',
    'ngStorage',
    'pascalprecht.translate',
    'angular-loading-bar',
    'app.services',
    'app.directives'
]);

angular.module('app').config(config);

angular.module('app').run(run);





config.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];

function config($stateProvider, $urlRouterProvider, $translateProvider) {
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
        });

    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/locale-',
        suffix: '.json'
    }).fallbackLanguage('en');

    $translateProvider.preferredLanguage('en');
}

run.$inject = ['$rootScope', '$localStorage'];

function run($rootScope, $localStorage) {
    $rootScope.lang = 'en';
    
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