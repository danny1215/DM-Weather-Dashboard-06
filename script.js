// var button = document.getElementById('#searchBtn');

console.log("am i linked");
// var inputValue = document.getElementById('#userText');
// var toDayIcon = document.getElementById('#weatherIcon');
// var toDayTemp = document.getElementById('#currentTemp');
// var toDayHum = document.getElementById('#currentHum');
// var toDayWind = document.getElementById('#currentWind');
// var toDayUv = document.getElementById('#currentUv');

// using moment js to get the date for current date and the next 5 days.

// var currentDate = moment().format('MM/DD/YYYY');
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





  $('#searchBtn').click(function (e) { 
    e.preventDefault();
    
    
    var city = $("#userText").val();
    if(city !=''){
      
      

      var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=1d2da0608b16fe23a0cfaff526bcd4fb";
      

      
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {
        
        var thisDay = show(data);


        $("#currentDate").append(currentDate);
        $("#toDay").html(thisDay);
        
        
        

        $("#userText").val('');

      })
      
    }else{
      $("#error").html('field cannot be empty!');
    }
  });
  

function show(data){
  return  "<h5> "+ data.name +"</h5>" +
          "<h5> "+ moment().format('MM/DD/YYYY') +"</h5>" +
        //  "<img>" + data.weather.iconId + "</img>"  +
          "<p>temperature: "+ data.main.temp +"<p>" +
          "<p>humidity: "+ data.main.humidity +"</p>" +
          "<h5>wind: "+ data.wind.speed +"</h5>" ;
          // <p id="currentUv"></p>
  

}



        
        
        

  














function forcast(data){
  return "<h5> "+ moment().add(1, "days").format('MM/D/YYYY') +"</h5>" ;
}