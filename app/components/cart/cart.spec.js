describe('Cart service', function () {
    var CartService;
    beforeEach(angular.mock.module('app.services'));
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function (_cart_) {
        CartService = _cart_;
    }));
    var item = {
        'url': 'http://www.me-time.am/items/36/',
        'id': 36,
        'hy': {
            'url': 'http://www.me-time.am/itemhy/45/',
            'id': 45,
            'title': 'Թևնոց \'Արտավազդ\'-Արծիվ',
            'description': 'ME Hand-ը ներկայացնում է արծիվ թևնոցը, պատրաստված լատունից: Կաշին արհեստական է:\r\nԹևնոցը պատրաստվում է 2 օրում:',
            'title_lowercase': 'թևնոց արտավազդ արծիվ',
            'price': 20000
        },
        'ru': {
            'url': 'http://www.me-time.am/itemru/39/',
            'id': 39,
            'title': 'Браслет \'Артавазд\'-Орел',
            'description': 'ME Hand представляет браслет с орлом, издотовленный из латуни.  Кожа искусственная.\r\nБраслет будет готов в течение двух дней после подтверждения заказа.',
            'title_lowercase': 'браслет артавазд орел',
            'price': 2500
        },
        'en': {
            'url': 'http://www.me-time.am/itemeng/38/',
            'id': 38,
            'title': 'Bracelet Artavazd Еagle',
            'description': 'ME Hand presents bracelet eagle made of brass. Artificial leather.\r\nThe bracelet will be ready within two days after your order.',
            'price': 42
        },
        'ge': {
            'url': 'http://www.me-time.am/itemgeo/39/',
            'id': 39,
            'title': 'Браслет Артавазд Орел',
            'description': 'ME Hand представляет браслет с орлом, издотовленный из латуни.  Кожа искусственная.\r\nБраслет будет готов в течение двух дней после подтверждения заказа.',
            'price': 110
        },
        'item_type_detail': {
            'ru': 'Артавазд',
            'hy': 'Արտավազդ',
            'ge': 'Артавазд',
            'item_class': 3,
            'en': 'Artavazd',
            'id': 6
        },
        'item_class_detail': {
            'ru': 'Браслет',
            'hy': 'Թևնոց',
            'step': 1,
            'min_size': 15,
            'ge': 'Bracelet',
            'en': 'Bracelet',
            'id': 3,
            'max_size': 23
        },
        'item_images': [],
        'views': 6,
        'main_pic': 'http://www.me-time.am/home/me-time/djangoproject/media/images/300.jpg',
        'thumbnail': 'http://www.me-time.am/home/me-time/djangoproject/media/images/300poqr.jpg',
        'collage_pic': null,
        'code': '300',
        'discount': 0,
        'discount_end': null,
        'promoted': false,
        'item_type': 'http://www.me-time.am/itemtype/6/',
        'quantity': 2
    };

    it('should be defined and have methods to add, remove items and check if item already is in the list',
        function () {
            expect(CartService).toBeDefined();
            expect(CartService.items).toBeDefined();
            expect(CartService.add).toBeDefined();
            expect(CartService.remove).toBeDefined();
            expect(CartService.contains).toBeDefined();
    });


    it('should have a method to add an item', function () {
        var length = CartService.items.length;
        CartService.add(item);
        expect(CartService.items.length - length).toBe(1);
    });

    it('should not allow to add an item if it\'s already present', function () {
        CartService.add(item);
        var length = CartService.items.length;
        expect(CartService.add(item)).toBe(false);
        expect(CartService.items.length).toBe(length);
    });

    it('should have a method to remove an item', function () {
        var length = CartService.items.length;
        CartService.add(item);
        CartService.remove(item);
        expect(CartService.items.length).toBe(length);
    });

    it('should have a method to check if an item is already in the list', function () {
        var contains = CartService.contains(item);
        expect(contains).toBe(false);
        CartService.add(item);
        contains = CartService.contains(item);
        expect(contains).toBe(true);
    });

    it('should have a method to calculate the total price', function () {
        CartService.add(item);
        expect(CartService.total('en')).toBe(84);
        CartService.remove(item);
        item.discount = 10;
        CartService.add(item);
        expect(CartService.total('en')).toBe(75);
    });
});

describe('Cart Controller', function () {
    var CartController;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($controller){
        CartController = $controller('CartController');
    }));

    it('should be defined', function () {
        expect(CartController).toBeDefined();
    });

    it('should open a popup', function () {
        expect(CartController.showOrderDialog).not.toThrow();
    })
});