'use strict';

angular.module('blogApp')
    .constant("baseURL", "http://localhost/blogAngular/api/index.php/")

    .service('articleFactory', ['$http', 'baseURL',
        function ($http, baseURL) {

            this.getArticles = function () {
                return $http.get(baseURL + "articles");
            };

            this.getArticle = function(index){
                return $http.get(baseURL + "articles/" + index);
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

            this.getComments = function(id){
                return $http.get(baseURL + "comments/"+id);
            };

            this.addComment = function(comment){
                return $http.post(baseURL+ "comments", comment);
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

            this.getStuff = function(){
                return $http.get(baseURL + "stuff");
            };

            this.addStuff = function(stuff){
                return $http.post(baseURL + "stuff", stuff);
            };

            this.deleteStuff = function(id){
                return $http.delete(baseURL + "stuff/"+id);
            };

            this.userLogged = {
                code: "",
                email:""
            };

            this.setUnicode = function(code, email){
                this.userLogged.code = code;
                this.userLogged.email = email;
            };

            this.getUnicode = function(){
                return this.userLogged.code;
            };

            this.getlogEmail = function(){
                return this.userLogged.email;
            };

            this.checkUnicode = function(){
                return $http.post(baseURL + "users/login/check", this.userLogged);
            };

            this.updateStuff = function(stuff){
                return $http.put(baseURL + "stuff", stuff);
            };

            //this.getArticles = function () {
            //    return $resource(baseURL + "articles/:id", null, {'update':{method:'PUT'}});
            //};

        }])
;
