describe('Header controller', function () {
    var HeaderController, $scope, $rootScope, $state, $httpBackend;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('app.services'));
    beforeEach(inject(function($controller, _$rootScope_, _$state_, _$httpBackend_){
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $state = _$state_;
        HeaderController = $controller('HeaderController', {$scope: $scope});
    }));
    
    it('Should be defined', function () {
        expect(HeaderController).toBeDefined();
    });
    //
    // it('Should have a change language method', function () {
    //     expect(HeaderController.changeLanguage).toBeDefined();
    //     HeaderController.changeLanguage('ru');
    //     expect($rootScope.lang).toBe('ru');
    // });

    it('Should have a class change method', function () {
        expect(HeaderController.changeClass).toBeDefined();
        expect(HeaderController.currentClass.url).toBeDefined();
        HeaderController.changeClass({url: 'class'});
        expect(HeaderController.currentClass.url).toBe('class');
    });

    it('Should have a search method', function () {
        expect(HeaderController.search).toBeDefined();
        // HeaderController.search('belt');
        // expect($state.current.name).toBe('search');
        // $httpBackend.when('GET', '../components/menu/menu.html').respond(200);
        // $httpBackend.when('GET', 'http://www.me-time.am/itemclass/').respond(200);
        // $httpBackend.when('GET', 'http://www.me-time.am/itemtype/').respond(200);
        // $httpBackend.when('GET', 'http://www.me-time.am/items/?search=belt').respond(200);
        // $httpBackend.flush();
        // expect($state.current.url).toBe('/search?query=belt');
    })
});