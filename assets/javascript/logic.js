var searchTerm = "";

var topics = ["AVALANCHE", "BEAR ATTACK", "BLACK FRIDAY", "CAR CRASH", "EXPLOSION", "FIRE", "HURRICANE", "LOCUSTS", "NFL FOOTBALL", "PARTY", "SANDSTORM", "STAMPEDE", "TORNADO", "TSUNAMI", "TRAIN WRECK", "WAR"];

//Creates initial buttons when page loads
function makeButtons() {
    for (var i = 0; i < topics.length; i++) {
        newButton = $("<div>").text(topics[i]).addClass("btn btn-dark m-1 chaos-button");
        $("#buttons-container").append(newButton);
    };
};
makeButtons();


//Function that displays GIFs corresponding to the button pressed
$(document).on("click", ".chaos-button", function () {
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
            gifDiv = $("<div>").addClass("play-pause align-top");
            gifStill = results[i].images.fixed_height_still.url;
            gifAnimate = results[i].images.fixed_height.url;
            gifImg = $("<img>").addClass("gif").attr("src", gifStill).attr("data-state", "still").attr("data-still", gifStill).attr("data-animate", gifAnimate);
            console.log(gifStill);
            console.log(gifAnimate);
            gifRating = $("<p>").addClass("rating-text").text("Rating: " + (results[i].rating).toUpperCase());
            gifDiv.append(gifImg, gifRating);
            $("#results-container").append(gifDiv);
            console.log(gifImg);
        };
    });
});

//Function that changes state of GIFs
$(document).on("click",".gif", function() {
    console.log("clicked");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
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
    $("#chaos-input").val("");
});