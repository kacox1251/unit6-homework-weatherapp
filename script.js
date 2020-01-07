var cities = [];
var tempEl = $("#city-temp");
var humidEl = $("#city-humidity");
var windEl = $("#city-wind");
var uvEl = $("#city-uv");
var cityNameEl = $(".current-city-name");
var currentDateEl = $(".current-date");
var weatherIconEl = $(".weather-icon");

var currentCity = "";

var currentDate = moment().format("MM/DD/YY");

var apiKey = "b3577882b000eb4ebfad4ae9dac218a2";

// currentCityWeather();

$(".city-search").on("click", function(event){
    event.preventDefault();
    $(".list-group").empty();
    
    var cityName = $(".city-name").val().trim();
    cities.push(cityName);
    $(".city-name").val("");

    for (var i = 0; i < cities.length; i++) {
        var button = $("<buttons>");
        button.addClass("btn btn-primary animal mr-2 city-button");
        button.text(cities[i]);
        button.attr("data-city", cities[i]);
        $(".list-group").prepend(button);
    }

    var cityBtn = $(".city-button");
    var cityBtnText = $(".city-button").attr("data-city");
    var cityString = JSON.stringify(cityBtnText);
    // localStorage.setItem(response.name, JSON.stringify($("#all-container").html()))

    cityBtn.on("click", function(event) {
        event.preventDefault();
        currentDateEl.text(currentDate);
        var clickedCity = $(this).attr("data-city");
        cityNameEl.text(clickedCity);
        var city = cityNameEl.text();
        console.log(city)
        
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=" + apiKey;

        $.ajax({
            url: weatherQueryURL,
            method: "GET"  
        }).then(function(response) {
            tempEl.text("Tempurature: " + response.main.temp + "°F");
            humidEl.text("Humidity: " + response.main.humidity);
            windEl.text("Wind Speed: " + response.wind.speed + "mph");
            var iconCode = response.weather[0].icon
            var icon = "http://openweathermap.org/img/w/" + iconCode + ".png";
            weatherIconEl.attr("src", icon);
        });
        
        $.ajax({
            url: forecastQueryURL,
            method: "GET"  
        }).then(function(response) {
            $(".card-row").empty();
            console.log(response)
            for (var i = 1; i < 6; i++) {
                var fiveDayCard = $("<div>");
                fiveDayCard.addClass("card text-white bg-primary mb-3 five-day");
                fiveDayCard.attr("style", "max-width: 18rem;");
                
                var date = $("<div>")
                date.addClass("card-header date");
                var fiveDay = moment().add(i, "days").format('l')
                date.text(fiveDay);
                fiveDayCard.append(date);
                
                var fiveDayInfo = $("<div>");
                fiveDayInfo.addClass("card-body")
                fiveDayCard.append(fiveDayInfo);
                
                var fiveDayIcon = $("<img>");
                fiveDayIcon.addClass("five-day-icon")
                fiveDayInfo.append(fiveDayIcon)
                
                var fiveDayTemp = $("<p>");
                fiveDayTemp.addClass("five-day-temp")
                fiveDayInfo.append(fiveDayTemp);
                
                var fiveDayHumid = $("<p>");
                fiveDayHumid.addClass("five-day-humid")
                fiveDayInfo.append(fiveDayHumid);

                fiveDayCard.append(date);
                fiveDayCard.append(fiveDayInfo);
                $(".card-row").append(fiveDayCard);
            };

            $(".five-day-icon").eq(0).attr("src", `http://openweathermap.org/img/w/${response.list[4].weather[0].icon}.png`);
            $(".five-day-icon").eq(1).attr("src", `http://openweathermap.org/img/w/${response.list[12].weather[0].icon}.png`);
            $(".five-day-icon").eq(2).attr("src", `http://openweathermap.org/img/w/${response.list[20].weather[0].icon}.png`);
            $(".five-day-icon").eq(3).attr("src", `http://openweathermap.org/img/w/${response.list[28].weather[0].icon}.png`);
            $(".five-day-icon").eq(4).attr("src", `http://openweathermap.org/img/w/${response.list[36].weather[0].icon}.png`);

            $(".five-day-temp").eq(0).text(`Temperature: ${((response.list[4].main.temp - 273.15) * 1.80 + 32).toFixed(2)}°F`);
            $(".five-day-temp").eq(1).text(`Temperature: ${((response.list[12].main.temp - 273.15) * 1.80 + 32).toFixed(2)}°F`);
            $(".five-day-temp").eq(2).text(`Temperature: ${((response.list[20].main.temp - 273.15) * 1.80 + 32).toFixed(2)}°F`);
            $(".five-day-temp").eq(3).text(`Temperature: ${((response.list[28].main.temp - 273.15) * 1.80 + 32).toFixed(2)}°F`);
            $(".five-day-temp").eq(4).text(`Temperature: ${((response.list[36].main.temp - 273.15) * 1.80 + 32).toFixed(2)}°F`);

            $(".five-day-humid").eq(0).text(`Humidity: ${response.list[4].main.humidity}`);
            $(".five-day-humid").eq(1).text(`Humidity: ${response.list[12].main.humidity}`);
            $(".five-day-humid").eq(2).text(`Humidity: ${response.list[20].main.humidity}`);
            $(".five-day-humid").eq(3).text(`Humidity: ${response.list[28].main.humidity}`);
            $(".five-day-humid").eq(4).text(`Humidity: ${response.list[36].main.humidity}`);
        });
        
        $.ajax({
            url: uvQueryURL,
            method: "GET"  
        }).then(function(response) {
            uvEl.text("UV Index: " + response.value)
        });
    });
});

// function currentCityWeather() {
//     var apiKey = "166a433c57516f51dfab1f7edaed8413";
//     var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
//     var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
//     var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=" + apiKey;

//     $.ajax({
//         url: weatherQueryURL,
//         method: "GET"  
//     }).then(function(response) {
//         console.log(response);
//         tempEl.text("Tempurature: " + response.main.temp);
//         humidEl.text("Humidity: " + response.main.humidity);
//         windEl.text("Wind Speed: " + response.wind.speed);
//         weatherIconEl.html()
//     });
    
//     $.ajax({
//         url: forecastQueryURL,
//         method: "GET"  
//     }).then(function(response) {
//         console.log(response);
//     });
    
//     $.ajax({
//         url: uvQueryURL,
//         method: "GET"  
//     }).then(function(response) {
//         console.log(response);
//         uvEl.text("UV Index: " + response.value)
//     });
// }