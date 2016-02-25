'use strict';

angular.module('blogApp')
    //.constant("baseURL", "http://localhost/blogAngular/api/index.php/")
  .constant("baseURL", "http://my-homesweethome.rhcloud.com/api/index.php/")



    .service('articleFactory', ['$http', 'baseURL',
        function ($http, baseURL) {

            this.getArticles = function () {
                return $http.get(baseURL + "articles");
            };

            this.getArticle = function(index){
                return $http.get(baseURL + "articles/" + index);
            };
            this.getArticlesByAuthor = function(author){
                return $http.post(baseURL + "articles/author", author);
            };

            this.addArticle = function(article){
                return $http.post(baseURL + "articles", article);
            };

            this.deleteArticle = function(id){
                return $http.delete(baseURL + "articles/"+id);
            };

            this.updateArticle = function(article){
                return $http.put(baseURL + "articles", article);
            };
        }])

    .service('plansFactory', [
        function(){
            this.plans =[
                {
                id : 0,
                image : "http://www.sweethome3d.com/images/gallery2015/SylvainThomazo.jpg"
            },
                {
                    id : 0,
                    image : "http://www.sweethome3d.com/images/gallery2015/GurkanIlgin.jpg"
                },
                {
                    id : 0,
                    image : "http://www.sweethome3d.com/images/gallery2015/MaxHan.jpg"
                },
                {
                    id : 0,
                    image : "http://www.sweethome3d.com/images/gallery2015/SylvainThomazo.jpg"
                },
                {
                    id : 0,
                    image : "http://www.sweethome3d.com/images/gallery2015/GurkanIlgin.jpg"
                },
                {
                    id : 0,
                    image : "http://www.sweethome3d.com/images/gallery2015/MaxHan.jpg"
                },
                {
                    id : 0,
                    image : "http://www.sweethome3d.com/images/gallery2015/SylvainThomazo.jpg"
                },
                {
                    id : 0,
                    image : "http://www.sweethome3d.com/images/gallery2015/GurkanIlgin.jpg"
                },
                {
                    id : 0,
                    image : "http://www.sweethome3d.com/images/gallery2015/MaxHan.jpg"
                }
                ];
            this.parameters = [
                {name: "square", num: 90, unit: "m.sq"},
                {name: "ceiling heigth", num: 2.75, unit: "m"},
                {name: "wall length", num: 100, unit: "m"},
                {name: "square bathroom", num: 7.31, unit: "m.sq"}
            ];
            this.getPlans = function(){
                return this.plans;
            };
            this.getParameters = function(){
                return this.parameters;
            };
        }
    ])
    

    .service('ideasFactory',[
        function(){
            this.ideas =[
                    {id:0, title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20152/dining/20152_codi09a/20152_codi09a_01_PH121614.jpg",
                        description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                    {id:1,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20161/dining/20161_codi05a/20161_codi05a_01_PH127998.jpg",
                        description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                    {id:2,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20143/sleeping/20143_cosl15a/20143_cosl15a_01_PH006677.jpg",
                        description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta," },
                    {id:3,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20154/seating/20154_cols24a/20154_cols24a_01_PH125071.jpg",
                        description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //    {id:4,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20151/media/20151_colm04a/20151_colm04a_01_PH121191.jpg",
                //        description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //       {id:5,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20152/dining/20152_codi09a/20152_codi09a_01_PH121614.jpg",
                //        description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, ."},
                //{id:0, title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20152/dining/20152_codi09a/20152_codi09a_01_PH121614.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //{id:1,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20161/dining/20161_codi05a/20161_codi05a_01_PH127998.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //{id:2,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20143/sleeping/20143_cosl15a/20143_cosl15a_01_PH006677.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta," },
                //{id:3,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20154/seating/20154_cols24a/20154_cols24a_01_PH125071.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //{id:4,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20151/media/20151_colm04a/20151_colm04a_01_PH121191.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //{id:5,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20152/dining/20152_codi09a/20152_codi09a_01_PH121614.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, ."},
                //{id:0, title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20152/dining/20152_codi09a/20152_codi09a_01_PH121614.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //{id:1,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20161/dining/20161_codi05a/20161_codi05a_01_PH127998.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //{id:2,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20143/sleeping/20143_cosl15a/20143_cosl15a_01_PH006677.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta," },
                //{id:3,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20154/seating/20154_cols24a/20154_cols24a_01_PH125071.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //{id:4,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20151/media/20151_colm04a/20151_colm04a_01_PH121191.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, "},
                //{id:5,title: "Lorem ipsum",image : "http://www.ikea.com/ms/media/cho_room/20152/dining/20152_codi09a/20152_codi09a_01_PH121614.jpg",
                //    description : "Curabitur eget elementum quam, id viverra neque. Fusce commodo est tortor, et tincidunt odio bibendum sit amet. Ut sit amet eros nec ipsum scelerisque malesuada id non dolor. Aliquam ac vehicula sem, vel eleifend mi. Pellentesque iaculis elit ipsum, ut tristique purus tempus quis. Proin tortor dolor, ornare eget egestas quis, pellentesque placerat nibh. Mauris congue, sem a fermentum porta, ."}
                ];
            this.getIdeas = function(){
                return this.ideas;
            };
            
            this.getIdea = function(id){
                return this.ideas[id];
            };

            this.saveIdea=function(item){
                console.log('saved');
                this.ideas.push(item);
            }
        }
        
        
    ])

    .service('commentFactory', ['$http', 'baseURL',
        function ($http, baseURL) {
            this.getComments = function(id){
                return $http.get(baseURL + "comments/"+id);
            };

            this.addComment = function(comment){
                return $http.post(baseURL+ "comments", comment);
            };
        }])

    .service('stuffFactory', ['$http', 'baseURL',
        function ($http, baseURL) {
            this.getStuff = function(){
                return $http.get(baseURL + "stuff");
            };

            this.addStuff = function(stuff){
                return $http.post(baseURL + "stuff", stuff);
            };

            this.deleteStuff = function(id){
                return $http.delete(baseURL + "stuff/"+id);
            };

            this.updateStuff = function(stuff){
                return $http.put(baseURL + "stuff", stuff);
            };
        }])

    .service('loginFactory', ['$http', 'baseURL',
        function ($http, baseURL) {

            this.userLogged = {
                code: "",
                email:""
            };

            this.checkUnicode = function(){
                // console.log(this.userLogged);
//                 $http.post(baseURL + "users/login/check", this.userLogged);
                return $http.post(baseURL + "users/login/check", this.userLogged);
            };

            this.signUp = function(user){
                return $http.post(baseURL + "users", user);
            };

            this.logIn = function(user){
                return $http.post(baseURL + "users/login", user);
            };

            this.checkEmail = function(user){
                return $http.post(baseURL + "users/login/email", user);
            };


            this.setUnicode = function(code, email){
                this.userLogged.code = code.trim();
                this.userLogged.email = email;
            };

            this.getUnicode = function(){
                return this.userLogged.code;
            };

            this.getEmail = function(){
                return this.userLogged.email;
            };


        }])
;
