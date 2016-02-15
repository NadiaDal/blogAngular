describe('Controller : articlesController',
    function () {
        beforeEach(modules('blogApp'));

        var ArticlesController, scope, $httpBackend;

        beforeEach(inject(function ($controller, _$httpBackend_,
                                    $rootScope, articleFactory) {
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET("http://localhost/blogAngular/api/index.php/articles")
                .respond([
                {
                    "id": "7",
                    "title": "Donec convallis et sem in tristique.",
                    "author": "",
                    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar nisi sit amet dolor vulputate, ac accumsan tortor ultricies. Proin vestibulum elit vel maximus facilisis. Nam tellus leo, posuere id molestie nec, fermentum in ipsum. Fusce porttitor auctor ligula, at volutpat sem venenatis consectetur. In hac habitasse platea dictumst. Aliquam ut lectus a orci vulputate dictum. Duis quis dictum ante, in scelerisque magna.\r\n\r\nNunc magna lectus, lacinia eu metus at, blandit facilisis lorem. Vivamus lacinia pretium ex a rutrum. Duis fringilla tortor sed quam finibus efficitur. Nunc semper turpis ut tortor aliquet porttitor eget a leo. Duis pellentesque in turpis eget tincidunt. Duis nec nunc nec justo tempor accumsan. Sed eu bibendum leo, non dictum massa. Nullam quis vehicula turpis. Phasellus id imperdiet elit, a sollicitudin urna. Suspendisse orci diam, mollis sit amet orci at, venenatis condimentum ligula. Praesent commodo mi id erat accumsan elementum. Quisque et dolor augue. Sed sagittis suscipit elementum. Ut non laoreet nisi. Nullam non nisl a massa faucibus rhoncus vitae sed libero.",
                    "date": "2015-12-10"
                }, {
                    "id": "9",
                    "title": "Suspendisse id nulla non leo vehicula",
                    "author": "",
                    "content": "Suspendisse id nulla non leo vehicula ullamcorper. Aenean sed erat urna. Duis in placerat nulla, scelerisque blandit lorem. Etiam ultrices facilisis diam a lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ut sodales sapien, ac rhoncus mi. Nunc at tempor ex. In et cursus quam. Nullam nec nisi sit amet velit tempus auctor ut sed est. Nullam pharetra tristique tempor. Donec varius orci sit amet odio luctus tempor.\r\n\r\nMaecenas auctor odio a tellus molestie, ut pretium diam tempor. Pellentesque viverra enim lorem, ac finibus neque imperdiet sit amet. Curabitur faucibus dui et magna semper sodales. Fusce ac pretium nisl. Maecenas bibendum aliquam sapien, nec fringilla ex tristique sit amet. Aliquam sagittis dolor id elit lacinia pharetra. In hac habitasse platea dictumst. Mauris eget ultrices risus. Nullam ut ligula eu lacus ultrices lobortis quis eget tellus. Curabitur commodo eu arcu a porttitor. Proin fringilla tellus id lectus dictum, ac congue leo semper. Proin convallis bibendum turpis non ornare. Nam scelerisque commodo dui, ut eleifend massa mattis vel. Maecenas vulputate sollicitudin justo, interdum dignissim arcu maximus vitae. Sed ligula ante, lobortis eget dapibus in, sollicitudin in magna. Morbi pellentesque finibus ante sed aliquet.",
                    "date": "2015-12-09"
                }, {
                    "id": "31",
                    "title": "Donec convallis et sem in tristique.",
                    "author": "Nadia",
                    "content": "",
                    "date": "2016-01-27"
                }, {
                    "id": "32",
                    "title": "Article_",
                    "author": "",
                    "content": "Content",
                    "date": "2016-02-07"
                }, {
                    "id": "34",
                    "title": "Donec convallis et sem in tristique.",
                    "author": "blog@blog.com",
                    "content": "Donec convallis et sem in tristique.",
                    "date": "2016-02-07"
                }, {
                    "id": "35",
                    "title": "Article",
                    "author": "blog@blog.com",
                    "content": "AngularJS provides filters to transform data:\n\ncurrency Format a number to a currency format.\ndate Format a date to a specified format.\nfilter Select a subset of items from an array.\njson Format an object to a JSON string.\nlimitTo Limits an array\/string, into a specified number of elements\/characters.\nlowercase Format a string to lower case.\nnumber Format a number to a string.\norderBy Orders an array by an expression.\nuppercase Format a string to upper case.",
                    "date": "2016-02-08"
                }, {
                    "id": "36",
                    "title": "Donec convallis et sem in tristique.",
                    "author": "blog@blog.com",
                    "content": "Donec convallis et sem in tristique.",
                    "date": "2016-02-08"
                }
                ]);
            scope = $rootScope.$new();
            ArticlesController = $controller('articlesController',
                {
                    $scope: scope,
                    articleFactory: articleFactory
                });
            $httpBackend.flush();
        }));

        it('should have showArticles as false', function(){
            expect(scope.showArticles).toBeFalsy();
        });

        it('should create articles witt 7 articles fetched from xhr', function(){
            expect(scope.showArticles).toBeTruthy();
            expect(scope.articles).toBeDefined();
            expect(scope.articles.length()).toBe(7);
        });
    });