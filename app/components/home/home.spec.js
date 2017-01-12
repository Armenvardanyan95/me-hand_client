describe('HomeController', function () {
    var HomeController;
    var popularItems = [{}, {}];
    var promotedItems = [{}, {}];

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($controller){
        HomeController = $controller('HomeController', {promotedItems: promotedItems, popularItems: popularItems});
    }));

    it('Should have popular items and promoted items', function () {
        expect(HomeController.popularItems).toBeDefined();
        expect(HomeController.promotedItems).toBeDefined();
    })

});