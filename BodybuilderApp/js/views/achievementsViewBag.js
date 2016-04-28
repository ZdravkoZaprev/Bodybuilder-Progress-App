var app = app || {};

app.achievementsViewBag = (function (){
    function showAchievementsPage(selector, data){
        var article = $("<article></article>");
        for (var k in data){
            var divHeader = $("<div><p>"+ k +"</p></div>");
            divHeader.appendTo(article);

            for (var i = 0; i < data[k].length; i++) {
                var valueOfElement = data[k][i].val;
                var divValue = $("<div>" + valueOfElement + "</div>")
                divValue.appendTo(divHeader)
            }
        }

        var sort = $("<div><p class='headers'>Sort</p><div id='myDropdown' class='dropdown-content'><p>By date</p><p>Highest results</p></div></div>");
        sort.appendTo(article);
        selector.html(article);

        $(".headers").on("click", function(){
            document.getElementById("myDropdown").classList.toggle("show");
        })
    }

    return {
        load : function(){
            return {
                showAchievementsPage: showAchievementsPage
            }
        }
    }
}());