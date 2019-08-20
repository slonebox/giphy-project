var searchTerm = "";

var topics = ["BEAR ATTACK", "EXPLOSION", "FIRE", "HURRICANE", "MOB", "PARTY", "SANDSTORM", "TORNADO", "WAR"]

for (var i = 0; i < topics.length; i++) {
    newButton = $("<div>").text(topics[i]).addClass("btn btn-light m-1 chaos-button");
    $("#buttons-container").append(newButton);
}

$(".chaos-button").on("click", function () {
    searchTerm = this.textContent;

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=LFrOQgSuDNumrxqhkVO0vN7rG16fhxa6&limit=10";

    console.log(searchTerm);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        console.log(results);
    });

});