var app = app || {};

app.userController = (function (){
    function UserController(viewbag, model){
        this.viewBag = viewbag;
        this.model = model;
    }

    UserController.prototype.login = function(data) {
        return this.model.login(data)
            .then(function(success) {
                localStorage['sessionId'] = success._kmd.authtoken;
                localStorage['username'] = success.username;
                localStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/welcome'});
                    noty({
                        theme: 'relax',
                        text:  'Login successfully !',
                        type: 'success',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                });
            },function(error){
                noty({
                theme: 'relax',
                text:  'Incorrect username or password !',
                type: 'error',
                timeout: 2000,
                closeWith: ['click']
                });
            });
    };

    UserController.prototype.register = function(data) {
        return this.model.register(data)
            .then(function(success) {
                localStorage['sessionId'] = success._kmd.authtoken;
                localStorage['username'] = success.username;
                localStorage['userId'] = success._id;
                noty({
                    theme: 'relax',
                    text: 'Register successfully !',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/welcome'});
                });
            },function(error){
                noty({
                    theme: 'relax',
                    text: 'This username is already taken !',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }).done();
    };

    UserController.prototype.logout = function() {
        this.model.logout()
            .then(function() {
                localStorage.clear();
                noty({
                    theme: 'relax',
                    text: 'Logout successfully !',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            })
    };
    
    return {
        load : function(viewBag, model){
            return new UserController(viewBag, model);
        }
    };
}());