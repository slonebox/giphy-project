var searchTerm = "";

var topics = ["AVALANCHE", "BEAR ATTACK", "EXPLOSION", "FIRE", "HURRICANE", "PARTY", "SANDSTORM", "TORNADO", "WAR"];

//Creates initial buttons when page loads
function makeButtons() {
    for (var i = 0; i < topics.length; i++) {
        newButton = $("<div>").text(topics[i]).addClass("btn btn-light m-1 chaos-button");
        $("#buttons-container").append(newButton);
    };
};
makeButtons();


//Function that displays GIFs corresponding to the button pressed
$(".chaos-button").on("click", function () {
    //Redefines the searchTerm variable with the button's text
    searchTerm = this.textContent;

    //Builds the API query URL; logs it to the console for reference
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=LFrOQgSuDNumrxqhkVO0vN7rG16fhxa6&limit=10";
    console.log(searchTerm);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //Stores the data in a variable; logs that data to the console for reference
        var results = response.data;
        console.log(results);

        //Empties the results container
        $("#results-container").empty();

        //Iterates through the results array; displays their images and ratings
        for (var i = 0; i < results.length; i++) {
            gifDiv = $("<div>").addClass("play-pause");
            gifStill = results[i].images.original_still.url;
            gifAnimate = results[i].images.original.url;
            gifImg = $("<img>").addClass("play-pause").attr("src", gifStill).attr("data-state", "still").attr("data-still", gifStill).attr("data-animate", gifAnimate);
            console.log(gifImg);
            console.log(gifImg.attr("data-animate"));
            gifRating = $("<p>").text("Rating: " + (results[i].rating).toUpperCase());
            gifDiv.append(gifImg, gifRating);
            $("#results-container").append(gifDiv);
        }
    });
});

//Function that changes state of GIFs
$(".play-pause").on("click", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "still");
    }
});

//Function that creates a new button and displays corresponding GIFTS
$("#make-chaos").on("click", function (event) {
    event.preventDefault();
    newButtonValue = $("#chaos-input").val().trim().toUpperCase();
    topics.push(newButtonValue);
    topics.sort();
    $("#buttons-container").empty();
    makeButtons();
    console.log(topics)
});