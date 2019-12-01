var APIKey = "166a433c57516f51dfab1f7edaed8413";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Denver&units=imperial&appid=" + APIKey;


$(".city-search").on("click", function(){
    var cityName = $(".city-name").val();
    $(".list-group").html(`<button type="button" class="list-group-item list-group-item-action city"></button>`);
    $(".city").text(cityName);
    console.log(cityName);
})


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(queryURL);
    console.log(response);
    $(".current-city-name").text(response.name);
    $(".current-date").text("today's date");
    $(".weather-icon").text(response.weather.icon);
    $(".city-temp").text("Temperature: " + response.main.temp);
    $(".city-humidity").text("Humidity: " + response.main.humidity);
    $(".city-wind").text("Wind Speed: " + response.wind.speed);
    $(".city-uv").text("UV Index: ");
});

if (navigator.geolocation) {
    console.log("yay")
}
else {
    console.log("uh oh")
}

//                    <button type="button" class="list-group-item list-group-item-action"></button>