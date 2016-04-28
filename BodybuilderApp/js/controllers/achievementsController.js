var app = app || {};

app.achievementsController = (function (){
    function AchievementsController(viewBag, model){
        this.viewBag = viewBag;
        this.model = model;
    }
    
    AchievementsController.prototype.loadAllAchievements = function(selector){
        _this = this;
        this.model.getAllAchievements()
            .then(function(response){
                var data = {
                    items : [],
                    keys : []
                };
                for (var i = 0; i < response.length; i++) {
                    var keysArray = Object.keys(response[i]);
                    var filteredArray = keysArray.filter(function (a) {
                        return a != "_id" & a != "_acl" & a != "_kmd" & a != undefined;
                    });

                    data.keys.push({'val' : filteredArray[i - 1]});

                    for (var j = 0; j < filteredArray.length; j++) {
                        var keyName = filteredArray[j];
                        data.items.push({'key': filteredArray[j], 'value': response[i][keyName]})
                    }
                }
                
                var achievementObj = [];

                for (var k = 0; k < data.items.length; k++) {
                    var currentKey = data.items[k].key;
                    var currentKeyValue = data.items[k].value;

                    if (achievementObj[currentKey] === undefined) {
                        achievementObj[currentKey] = [];
                    }
                    achievementObj[currentKey].push({'val': currentKeyValue});
                }
                data.items = achievementObj;

                _this.viewBag.showAchievementsPage(selector, achievementObj);
            });
    };
    
    return {
        load : function(viewBag, model){
            return new AchievementsController(viewBag, model);
        }
    }
}());