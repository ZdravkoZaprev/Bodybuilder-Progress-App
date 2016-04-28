var app = app || {};

app.homeController = (function (){
    function HomeController(viewBag, model){
        this.viewBag = viewBag;
        this.model = model;
    }

    HomeController.prototype.loadHomePage = function(selector){
        this.viewBag.showHomePage(selector);
    };

    HomeController.prototype.loadWelcomePage = function(selector){
        this.viewBag.showWelcomePage(selector);
    };

    return {
        load : function(viewBag, model){
            return new HomeController(viewBag, model);
        }
    }
}());