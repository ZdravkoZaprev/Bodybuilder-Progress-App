var app = app || {};

(function (){
    var router = Sammy(function(){

        var nav = $("#navBar");
        var selector = $("#container");

        var requester = app.requester.load("kid_-kqrwlHBZZ", "38d35d332cb84c53863a02d09b073298", "https://baas.kinvey.com/");

        var homeViewBag = app.homeViewBag.load();
        var achievementsViewBag = app.achievementsViewBag.load();

        var userModel = app.userModel.load(requester);
        var achievementsModel = app.achievementsModel.load(requester);

        var homeController = app.homeController.load(homeViewBag);
        var userController = app.userController.load(null, userModel);
        var achievementsController = app.achievementsController.load(achievementsViewBag, achievementsModel);


        this.before(function() {
            if(!localStorage['sessionId']){
                nav.hide();
                this.redirect("#/");
            } else {
                nav.show();
                var arrow = "&#9660;";
                $("#username").html(localStorage['username'] + 	" " + arrow);
            }
        });

        this.get("#/", function(){
            homeController.loadHomePage(selector);
        });

        this.get("#/welcome", function(){
            homeController.loadWelcomePage(selector);
        });

        this.get("#/logout", function(){
            userController.logout();
        });

        this.get("#/myProgress", function(){
            achievementsController.loadAllAchievements(selector);
        });
        
        
        this.bind("redirectUrl", function(e, data){
            this.redirect(data.url);
        });
        
        this.bind("loginUser", function(e, data){
            userController.login(data);
        });

        this.bind("registerUser", function(e, data){
            userController.register(data);
        });
    });

    router.run("#/");
}());