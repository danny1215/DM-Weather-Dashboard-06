// var button = document.getElementById('#searchBtn');

console.log("am i linked");
// var tocity = document.getElementById('#city');
// var toDayIcon = document.getElementById('#weatherIcon');
// var toDayTemp = document.getElementById('#currentTemp');
// var toDayHum = document.getElementById('#currentHum');
// var toDayWind = document.getElementById('#currentWind');
// var toDayUv = document.getElementById('#currentUv');

// using moment js to get the date for current date and the next 5 days.

var toDay = moment().format('MM/DD/YYYY');
var dayOne = moment().add(1, "days").format("M/D/YYYY"); 
var dayTwo = moment().add(2, "days").format("M/D/YYYY");   
var dayThree = moment().add(3, "days").format("M/D/YYYY");   
var dayFour = moment().add(4, "days").format("M/D/YYYY");
var dayFive = moment().add(5, "days").format("M/D/YYYY");     
$("#currentDate").append(toDay);
$("#secondDate").append(dayOne);
$("#thirdDate").append(dayTwo);
$("#fourthDate").append(dayThree);
$("#fifthDate").append(dayFour);
$("#sixDate").append(dayFive);








$("#searchBtn").on("click", function(event) {

    event.preventDefault();
      var userInput = $("#userText").val();
    
      var APIKey = "1d2da0608b16fe23a0cfaff526bcd4fb";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=userInput+"&appid="+ APIKey;
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    // "q=London&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);
        
        // // Convert the temp to fahrenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // // add temp content to html
        // $(".temp").text("Temperature (K) " + response.main.temp);
        // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

      })
});