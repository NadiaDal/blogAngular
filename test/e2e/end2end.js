'use strict';

describe("End to end testing", function () {

    it('automaticly redirect to / ',
        function () {
            browser.get('index.html');
            expect(browser.getLocationAbsUrl()).toMatch("/");
        })
});


//
describe('article 0 item', function () {
    beforeEach(function () {
        browser.get('index.html#/articles/9')
    });
//
    it('should have a name',
        function () {
            var name = element(by.binding('article.title'));
            expect(name.getText()).toEqual('Suspendisse id nulla non leo vehicula');
        });
//
    it('should have a number', function(){
        expect(element.all(by.repeater('comment in articleDetCtrl.comments'))
            .count()).toEqual(2);
    });
//
    it('first comment author as',
        function () {
            browser.get('index.html');
            element(by.model('orderText')).sendKeys('author');
            expect(element.all(by.repeater('comment in articleDetCtrl.comments'))
                .first().element(by.binding('comment.author')));
            expect(author.getText()).toContain('Nadia');
        })
});
