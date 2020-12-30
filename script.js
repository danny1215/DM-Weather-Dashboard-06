var button = document.getElementById('#searchBtn');

console.log("am i linked");


// using moment js to get the date for current date and the next 5 days.


var dayOne = moment().add(1, "days").format("M/D/YYYY"); 
var dayTwo = moment().add(2, "days").format("M/D/YYYY");   
var dayThree = moment().add(3, "days").format("M/D/YYYY");   
var dayFour = moment().add(4, "days").format("M/D/YYYY");
var dayFive = moment().add(5, "days").format("M/D/YYYY");     
// $("#currentDate").append(toDay);
$("#secondDate").append(dayOne);
$("#thirdDate").append(dayTwo);
$("#fourthDate").append(dayThree);
$("#fifthDate").append(dayFour);
$("#sixDate").append(dayFive);




// function for search button
  $('#searchBtn').click(function (e) { 
    e.preventDefault();
    
    
    var city = $("#userText").val();
    if(city !=''){
      
      
// query url for open weather api
      var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=1d2da0608b16fe23a0cfaff526bcd4fb";
      
      // ajax call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {

        var thisDay = show(data);
      $("#currentDate").append(currentDate);
        $("#toDay").html(thisDay);
        UVIndex(response.coord.lon,response.coord.lat);
        
        $("#userText").val('');

      })
      
    }else{
      $("#error").html('field cannot be empty!');
    }
  });
  
  // function for current day weather
function show(data){
  
  
  return  "<p > "+ data.name  + moment().format('MM/DD/YYYY') +
          " <img src='http://openweathermap.org/img/w/"+ data.weather[0].icon+".png'>" +"</p>" +
          "<p>temperature: "+ data.main.temp + "&deg;F</p>" +
          "<p>humidity: "+ data.main.humidity +"%</p>" +
          "<p>wind: "+ data.wind.speed + "m/s</p>" ;  
         

          
          

};

