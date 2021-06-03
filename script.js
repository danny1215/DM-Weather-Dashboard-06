// var button = document.getElementById('#searchBtn');

// console.log("am i linked");


// // using moment js to get the date for current date and the next 5 days.


// var dayOne = moment().add(1, "days").format("M/D/YYYY"); 
// var dayTwo = moment().add(2, "days").format("M/D/YYYY");   
// var dayThree = moment().add(3, "days").format("M/D/YYYY");   
// var dayFour = moment().add(4, "days").format("M/D/YYYY");
// var dayFive = moment().add(5, "days").format("M/D/YYYY");     
// // $("#currentDate").append(toDay);
// $("#secondDate").append(dayOne);
// $("#thirdDate").append(dayTwo);
// $("#fourthDate").append(dayThree);
// $("#fifthDate").append(dayFour);
// $("#sixDate").append(dayFive);




// // function for search button
//   $('#searchBtn').click(function (e) { 
//     e.preventDefault();
    
    
//     var city = $("#userText").val();
//     if(city !=''){
      
      
// // query url for open weather api
//       var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=1d2da0608b16fe23a0cfaff526bcd4fb";
      
//       // ajax call
//       $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(data) {

//         var thisDay = show(data);
//       $("#currentDate").append(currentDate);
//         $("#toDay").html(thisDay);
//         UVIndex(response.coord.lon,response.coord.lat);
        
//         $("#userText").val('');

//       })
      
//     }else{
//       $("#error").html('field cannot be empty!');
//     }
//   });
  
//   // function for current day weather
// function show(data){
  
  
//   return  "<p > "+ data.name  + moment().format('MM/DD/YYYY') +
//           " <img src='http://openweathermap.org/img/w/"+ data.weather[0].icon+".png'>" +"</p>" +
//           "<p>temperature: "+ data.main.temp + "&deg;F</p>" +
//           "<p>humidity: "+ data.main.humidity +"%</p>" +
//           "<p>wind: "+ data.wind.speed + "m/s</p>" ;  
         

          
          

// };

var date = $("#currentDay");
var search = document.getElementById("search");


var city;
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var today = moment().format("(" + 'L' + ")");

cityHistory(searchHistory);
getForcast(searchHistory[searchHistory.length - 1]);
getCurrentWeather(searchHistory[searchHistory.length - 1]);

if(searchHistory.length===0){
    weather.style.display = "none";
}else{
     weather.style.display = "block";
}

$("#submit").on("click", function (event) {
    event.preventDefault();
    city = search.value.trim();
    console.log(city);
    weather.style.display = "block";
    getForcast(city);
    checkHistory(city);
    getCurrentWeather(city);

});

$("body").on("click", ".list-group-item", function (event) {
    event.preventDefault();
    city = $(this).text();
    console.log(city);
    weather.style.display = "block";
    getCurrentWeather(city);
    getForcast(city);
    checkHistory(city);
});

function getCurrentWeather(city) {
    var key = "ee832b09a8728a9c7e626c00b6d86173";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            var temperature = JSON.stringify(response.main.temp);
            $("#temp").text("Temperature: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.main.humidity);
            $("#humid").text("Humidity: " + humidity + "%");
            var wind = JSON.stringify(response.wind.speed);
            $("#wind").text("Wind Speed: " + wind + " MPH");

            var icon = response.weather[0].icon;
            console.log(icon);

            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(iconURL);

            $("#currentDay").text(city + " " + today)
            $("#icon").attr("src", iconURL);

            var lon = response.coord.lon;
            var lat = response.coord.lat;
            console.log(lon + " " + lat);

            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key;
            $.ajax({
                url: uvUrl,
                method: "GET"
            })
                // After data comes back from the request
                .then(function (response) {
                    var uv = response.value;
                    console.log(uv);
                    $("#uv").text(uv);

                    if (uv >= 0 && uv < 3) {
                        $("span").css("background", "green");
                    } else if (uv >= 3 && uv < 6) {
                        $("span").css("background", "yellow");
                    } else if (uv >= 6 && uv <= 8) {
                        $("span").css("background", "orange");
                    } else if (uv >= 8 && uv < 11) {
                        $("span").css("background", "orange");
                    } else if (uv >= 11) {
                        $("span").css("background", "violet");
                    }

                });

        });

}

function getForcast(city) {
    var key = "ee832b09a8728a9c7e626c00b6d86173";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            var temperature = JSON.stringify(response.list[0].main.temp);
            $("#temp1").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[0].main.humidity);
            $("#humid1").text("Humidity: " + humidity + "%");
            var icon = response.list[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon1").attr("src", iconURL);

            var temperature = JSON.stringify(response.list[8].main.temp);
            $("#temp2").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[8].main.humidity);
            $("#humid2").text("Humidity: " + humidity + "%");
            var icon = response.list[8].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon2").attr("src", iconURL);

            var temperature = JSON.stringify(response.list[16].main.temp);
            $("#temp3").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[16].main.humidity);
            $("#humid3").text("Humidity: " + humidity + "%");
            var icon = response.list[16].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon3").attr("src", iconURL);

            var temperature = JSON.stringify(response.list[24].main.temp);
            $("#temp4").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[24].main.humidity);
            $("#humid4").text("Humidity: " + humidity + "%");
            var icon = response.list[16].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon4").attr("src", iconURL);

            var temperature = JSON.stringify(response.list[32].main.temp);
            $("#temp5").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[32].main.humidity);
            $("#humid5").text("Humidity: " + humidity + "%");
            var icon = response.list[16].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon5").attr("src", iconURL);

            for (var i = 1; i < 6; i++) {
                var day = moment().add(i, 'days').format('L');
                $("#day" + i).text(day);
                console.log(day);
            }

        });

}

// storage
function cityHistory(searchHistory) {
    $("#history").empty();
    console.log(searchHistory);
    for (var i = 0; i < searchHistory.length; i++) {
        var item = $("<li>");
        item.addClass("list-group-item");
        item.text(searchHistory[i]);
        $("#history").append(item);
    }

}

function checkHistory(city) {
    if (city) {
        for (var i = 0; i < searchHistory.length; i++) {
            if (searchHistory[i].toLowerCase() === city.toLowerCase()) {
                searchHistory.splice(i, 1);
            }
        }

        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        cityHistory(searchHistory);
    }
}