//API-------------------------------------------------------------->

var key ="eed97b4b9a9c442d875a2a95b61fe3e2";


function getTopicGifs() {
	var topicURL = $(this).attr("data-name");
	var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + topicURL + "&api_key=" + key + "&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		var results = response.data;

		$("#displayTopics").empty();
		for(var i = 0; i < results.length; i++) {
			var gifDiv = $("<div>");
			gifDiv.addClass("topicGif");
			
			var rating = results[i].rating;
			
			var p = $("<p>").text("Rating: " + rating);

			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height.url);
			gifImage.attr("data-still", results[i].images.fixed_height_still.url);
			gifImage.attr("data-animate", results[i].images.fixed_height.url);
			gifImage.attr("data-state", "still");
			gifDiv.append(gifImage);

			gifDiv.prepend(p);
			gifDiv.prepend(gifImage);

			$("#displayTopics").prepend(gifDiv);


		}
	})
};

//----------------------------------------------------------------->
//Animate gifs
function gifAnimation() {
	var state = $(this).find("img").attr("data-state");

	if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
	}
	}

//


//Add Buttons to HTML---------------------------------------------->

var topics = ["Spock", "Kirk", "Uhura", "Sisko"];

function renderButtons() {

	$("#topics-buttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic-button");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#topics-buttons").append(a);
	}

};

$("#addTopic").on("click", function(event) {
	event.preventDefault();
	var topic = $("#topics-input").val().trim();
	topics.push(topic);

	renderButtons();
});

//------------------------------------------------------------------>















$(document).ready(function(){
	renderButtons();
	gifAnimation();
});

$(document).on("click", ".topic-button", getTopicGifs);
$(document).on("click", ".topicGif", gifAnimation);






