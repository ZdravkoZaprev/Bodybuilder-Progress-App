var app = app || {};

app.achievementsModel = (function (){
    function AchievementsModel(requester){
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/achievements/';
    }

    AchievementsModel.prototype.getAllAchievements = function(){
        return this.requester.get(this.serviceUrl, true);
    };


    return {
        load : function(requester){
            return new AchievementsModel(requester);
        }
    }
}());