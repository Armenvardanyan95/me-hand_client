(function () {
    angular
        .module('app.router', ['ui.router']);

    angular.module('app.router').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../components/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                    popularItems: function (models) {
                        return models.Item.query().$promise;
                    },
                    promotedItems: function (models) {
                        return models.Item.query({promoted: 2}).$promise;
                    }
                }
            })
            .state('item', {
                url: '/item/:itemId',
                templateUrl: '../components/item/item.html',
                controller: 'ItemController',
                controllerAs: 'vm',
                resolve: {
                    item: function ($stateParams, models) {
                        return models.Item.get({id: $stateParams.itemId}).$promise;
                    }
                }
            })
            .state('cart', {
                url: '/cart',
                templateUrl: '../components/cart/cart.html',
                controller: 'CartController',
                controllerAs: 'vm'
            })
            .state('menu', {
                url: '/menu/:typeId',
                templateUrl: '../components/menu/menu.html',
                controller: 'MenuController',
                controllerAs: 'vm',
                resolve: {
                    items: function ($stateParams, models) {
                        return models.Item.query({item_type: $stateParams.typeId});
                    }
                }
            })
            .state('search', {
                url: '/search?query',
                templateUrl: '../components/menu/menu.html',
                controller: 'MenuController',
                controllerAs: 'vm',
                resolve: {
                    items: function (models, $stateParams) {
                        return models.Item.query({search: $stateParams.query});
                    }
                }
            })
            .state('discounts', {
                url: '/discounts',
                templateUrl: '../components/menu/menu.html',
                controller: 'MenuController',
                controllerAs: 'vm',
                resolve: {
                    items: function (models) {
                        return models.Item.query({discount: true});
                    }
                }
            });
    }
})();


    