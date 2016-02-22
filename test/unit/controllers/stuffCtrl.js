describe('Controller : stuffController',
    function () {
        beforeEach(module('blogApp'));

        var stuffController, $httpBackend;

        beforeEach(inject(function ($controller, _$httpBackend_,
                                    stuffFactory) {
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET("http://localhost/blogAngular/api/index.php/stuff")
                .respond([{
                        "id": "18",
                        "name": "Lodówka SAMSUNG RS7528THCSP",
                        "num": "1",
                        "price": "3449",
                        "room": "kitchen",
                        "link": "https:\/\/saturn.pl\/agd\/lodowka-samsung-rs7528thcsp",
                        "image": "https:\/\/stat-s8.ms-online.pl\/\/media\/cache\/gallery_1090_800\/rc\/PKvQrgMu\/images\/11\/1103793\/9cb08669c5f5301c4875e473779b6a26.jpg",
                        "currency": "PLN",
                        "weight": "120"
                    }, {
                        "id": "36",
                        "name": "BRIMNES bed from Ikea",
                        "num": "1",
                        "price": "898",
                        "room": "bedroom",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/S59099136\/",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/brimnes-rama-ozka-z-pojem-i-zag-bia-y__0351322_PE540627_S4.JPG",
                        "currency": "PLN",
                        "weight": "0"
                    }, {
                        "id": "39",
                        "name": "Pralka BOSCH WOT20255PL",
                        "num": "1",
                        "price": "1449",
                        "room": "bathroom",
                        "link": "https:\/\/saturn.pl\/agd\/pralka-bosch-wot20255pl",
                        "image": "https:\/\/stat-s1.ms-online.pl\/\/media\/cache\/gallery_1090_800\/rc\/OG17k2IB\/images\/95\/958726\/b89bbab7a3426a4e9cdc918f671a2f9a.jpg",
                        "currency": "PLN",
                        "weight": "60"
                    }, {
                        "id": "40",
                        "name": "Suszarka BOSCH WTB 86200PL",
                        "num": "1",
                        "price": "1639",
                        "room": "bathroom",
                        "link": "https:\/\/saturn.pl\/agd\/suszarka-bosch-wtb-86200pl",
                        "image": "https:\/\/stat-s2.ms-online.pl\/\/media\/cache\/gallery_1090_800\/rc\/ZzQ2WmAO\/bdk\/74\/741966_0.jpg",
                        "currency": "PLN",
                        "weight": "41"
                    }, {
                        "id": "41",
                        "name": "Krzesło bujane",
                        "num": "1",
                        "price": "399",
                        "room": "bedroom",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/S69090475\/#\/S69129067",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/poang-krzes-o-bujane-zielony__0325658_PE517718_S4.JPG",
                        "currency": "PLN",
                        "weight": "13"
                    }, {
                        "id": "42",
                        "name": "Komoda, 8 szuflad, biały",
                        "num": "1",
                        "price": "699",
                        "room": "children",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/S19021267\/",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/nordli-komoda-szuflad-bia-y__0251368_PE389893_S4.JPG",
                        "currency": "PLN",
                        "weight": "0"
                    }, {
                        "id": "43",
                        "name": "Łóżko dziecięce, biały",
                        "num": "1",
                        "price": "299",
                        "room": "children",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/10248519\/",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/gulliver-ozko-dzieciece-bia-y__70462_PE185759_S4.JPG",
                        "currency": "PLN",
                        "weight": "0"
                    }, {
                        "id": "44",
                        "name": "Stolik nocny, biały",
                        "num": "1",
                        "price": "229",
                        "room": "bedroom",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/40219285\/",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/nordli-stolik-nocny-bia-y__0144032_PE304721_S4.JPG",
                        "currency": "PLN",
                        "weight": "0"
                    }, {
                        "id": "45",
                        "name": "Komoda, 2 szuflady, biały",
                        "num": "1",
                        "price": "249",
                        "room": "bedroom",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/40290663\/",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/brimnes-komoda-szuflady-bia-y__0323544_PE516766_S4.JPG",
                        "currency": "PLN",
                        "weight": "0"
                    }, {
                        "id": "46",
                        "name": "Fotel, Byvik wielobarwny",
                        "num": "1",
                        "price": "549",
                        "room": "bedroom",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/S99047334\/#\/S39897912",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/ektorp-jennylund-fotel-rozne-kolory__0136147_PE293397_S4.JPG",
                        "currency": "PLN",
                        "weight": "23"
                    }, {
                        "id": "47",
                        "name": "Stół rozkładany, biały",
                        "num": "1",
                        "price": "499",
                        "room": "kitchen",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/40204745\/",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/bjursta-sto-rozk-adany-bia-y__0125469_PE283054_S4.JPG",
                        "currency": "PLN",
                        "weight": "40"
                    }, {
                        "id": "49",
                        "name": "Krzesło, biały",
                        "num": "4",
                        "price": "199",
                        "room": "kitchen",
                        "link": "http:\/\/www.ikea.com\/pl\/pl\/catalog\/products\/70103250\/",
                        "image": "http:\/\/www.ikea.com\/pl\/pl\/images\/products\/ingolf-krzes-o-bia-y__58982_PE164584_S4.JPG",
                        "currency": "PLN",
                        "weight": "8"
                    }]
                );



            stuffController = $controller('stuffController',
                {
                    stuffFactory: stuffFactory
                });
            $httpBackend.flush();
        }));

        it('should ', function () {
            expect(stuffController.stuff.length).toBe(12);
            //expect(scope.showArticles).toBeTruthy();
            //expect(scope.articles).toBeDefined();
            //expect(scope.articles.length).toBe(7);
            //expect(scope.filteredArticles.length).toBe(3);
        });

        it("setBorderTax should return item with new properties if price > limit",
            function(){
                var item ={"price": "3449","weight": "120"};
                var nItem = stuffController.setBorderTax(item);
                expect(nItem.borderTax).toBe(810);
                expect(nItem.showTax).toBeTruthy();
                expect(nItem.price).toBe("3449");
                expect(nItem.weight).toBe("120");
            }
        );

        it("setBorderTax should return item with new properties if weight > limit",
            function(){
                var item ={"price": "1449","weight": "60"};
                var nItem = stuffController.setBorderTax(item);
                expect(nItem.borderTax).toBe(314);
                expect(nItem.showTax).toBeTruthy();
                expect(nItem.price).toBe("1449");
                expect(nItem.weight).toBe("60");
            }
        );

        it("deleteStuff should return new collection without deleted item",
            function(){
                $httpBackend.expectDELETE("http://localhost/blogAngular/api/index.php/stuff/18");
                stuffController.deleteStuff(18);

            }
        );
    });