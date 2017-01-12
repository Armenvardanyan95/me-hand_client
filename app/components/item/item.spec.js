describe('Item controller', function () {
    var ItemController;
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
        'item_type': 'http://www.me-time.am/itemtype/6/'
    };

    beforeEach(angular.mock.module('app.services'));
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function ($controller) {
        ItemController = $controller('ItemController',
            {item: item});
    }));

    it('should be defined', function () {
        expect(ItemController).toBeDefined();
        expect(ItemController.similarItems).toBeDefined();
        expect(ItemController.daysLeft).toBeDefined();
        expect(ItemController.types).toBeDefined();
        expect(ItemController.item.quantity).toBe(1);
        expect(ItemController.item.length).toBe(0);
    });

    it('should have a sizeRange method', function () {
        expect(ItemController.sizeRange).toBeDefined();
        var testArr = [1, 2, 3, 4, 5];
        var arr = ItemController.sizeRange(1, 5, 1);
        expect(arr).toEqual(testArr);
    });

    it('should calculate number of days left', function () {
        var now = new Date();
        var future = new Date();
        var numberOfDaysToAdd = 6;
        future.setDate(now.getDate() + numberOfDaysToAdd);
        expect(ItemController.daysLeft(future, 'en')).toBe((numberOfDaysToAdd - 1) + ' days left');
        numberOfDaysToAdd = 1;
        future.setDate(now.getDate() + numberOfDaysToAdd);
        expect(ItemController.daysLeft(future, 'en')).toBe('23 hours left');
        future.setDate(now.getDate() - numberOfDaysToAdd);
        expect(ItemController.daysLeft(future, 'en')).toBe('');
    })
});