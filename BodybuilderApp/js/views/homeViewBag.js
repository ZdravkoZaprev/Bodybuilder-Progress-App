var app = app || {};

app.homeViewBag = (function (){
    function showHomePage(selector){
        $.get("templates/loginAndRegister.html", function(templ){
            selector.html(templ);
            $("#loginButton").on("click", function(){
                var username = $("#inputUsername").val();
                var password = $("#inputPassword").val();

                var data = {
                    username : username,
                    password : password
                };
                Sammy(function(){
                    this.trigger("loginUser", data);
                });
            });

            $("#registerButton").on("click", function(){
                var regiserUsername = $("#registerUsername").val();
                var registerPassword = $("#registerPassword").val();
                var repeatRegisterPassword = $("#repeatRegisterPassword").val();
                if(registerPassword !== repeatRegisterPassword) {
                    noty({
                        theme: 'relax',
                        text:  'Passwords do not match !',
                        type: 'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                } else {
                    var data = {
                        username : regiserUsername,
                        password : registerPassword
                    };
                    Sammy(function(){
                        this.trigger("registerUser", data);
                    })
                }
            })
        });
    }

    function showWelcomePage(selector, data){
        selector.html("");
    }

    return {
        load: function(){
            return {
                showHomePage: showHomePage,
                showWelcomePage: showWelcomePage
            }
        }
    }
}());