var searchTerm = "";

var topics = ["BEAR ATTACK", "EXPLOSION", "FIRE", "HURRICANE", "MOB", "PARTY", "SANDSTORM", "TORNADO", "WAR"]

var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=LFrOQgSuDNumrxqhkVO0vN7rG16fhxa6&q=" + searchTerm + "&limit=10&lang=en&rating=g"

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response){

});