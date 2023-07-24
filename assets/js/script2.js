let diet = document.getElementById("diet");
let numOfRecipes = 30;
let firstName = document.getElementById("first-name");
let lasttName = document.getElementById("last-name");
let submitBtn = document.getElementById("submitBtn");
let submitSec = document.querySelector("#submitSection");
let checkBox = document.getElementById("weather");
var cityInput = document.getElementById("city");

document.addEventListener("DOMContentLoaded", function() {
    let selectedDiet;
    diet.addEventListener("change", function() {
        selectedDiet = this.value;
    });
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        submitSec.setAttribute("class", "hide");
        let cityName = cityInput.value || "Atlanta";

        fetch(`https://api.positionstack.com/v1/forward?access_key=e0982359ac7c9fae34b81113f22add45&query=${cityName}`)
            .then(response => response.json())
            .then(geoData => {
                const latitude = geoData.data[0].latitude;
                const longitude = geoData.data[0].longitude;
                console.log(geoData);

                // Now fetch the Storm Glass API using obtained longitude and latitute
                fetch(`https://api.stormglass.io/v2/weather/point?lat=${latitude}&lng=${longitude}&params=airTemperature`, {
                        headers: {
                         'Authorization': 'ea939a76-25ce-11ee-a654-0242ac130002-ea939b2a-25ce-11ee-a654-0242ac130002'
                        }
                    })
                    .then(weatherResponse => weatherResponse.json())
                    .then(weatherData => {
                        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0821799963dc4a95ab208456cf22646c&diet=${selectedDiet}&number=${numOfRecipes}`)
                            .then((response) => response.json())
                            .then((data) => {
                                // Create events for recipes and weather
                                const events = [];

                                const currentDate = new Date();
                                const currentDayOfMonth = currentDate.getDate();

                                data.results.forEach((recipe, index) => {
                                    // Add recipe event to the calendar
                                    events.push({
                                        title: recipe.title,
                                        start: new Date(
                                                new Date().getFullYear(),
                                                new Date().getMonth(),
                                                index + 1
                                            )
                                            .toISOString()
                                            .split("T")[0],
                                    });

                                    // Add weather event only for the first 7 days
                                    if (checkBox.checked) {
                                        if (index < 1) {
                                            const currentHour = new Date().getHours();
                                            const dayWeather = weatherData.hours[currentHour]; // Assuming weatherData.hours[currentHour] holds the forecast for the current hour
                                            console.log(dayWeather);
                                            if (dayWeather && dayWeather.airTemperature && dayWeather.airTemperature.sg) {
                                                let temperatureInCelsius = dayWeather.airTemperature.sg;
                                                let temperatureInFahrenheit = temperatureInCelsius * 9 / 5 + 32;
                                                events.push({
                                                    title: 'Temperature in ' + cityName + ' : ' + temperatureInFahrenheit.toFixed(1) + ' °F',
                                                    start: new Date(
                                                            currentDate.getFullYear(),
                                                            currentDate.getMonth(),
                                                            currentDayOfMonth + index
                                                        )
                                                        .toISOString()
                                                        .split("T")[0],
                                                });
                                            } else {
                                                console.error('Could not find airTemperature for index', index);
                                            }
                                        }
                                    }
                                });

                                var calendarEl = document.getElementById("calendar");

                                var calendar = new FullCalendar.Calendar(calendarEl, {
                                    initialView: "dayGridMonth",
                                    headerToolbar: {
                                        start: "",
                                        center: "title",
                                        end: "",
                                    },
                                    events: events,
                                });

                                calendar.render();
                            })
                            .catch((error) => console.error("Error:", error));
                    })
                    .catch(error => {
                        console.error('There has been a problem with your fetch operation:', error);
                    });
            })
            .catch(error => {
                console.error('There has been a problem with your geocoding fetch operation:', error);
            });
    });
});

var workout = document.getElementById("workout")
var workoutTime = document.getElementById("time")
var workoutMuscle = document.getElementById("muscle")
var workoutLocation = document.getElementById("location")
var workoutEquipment = document.getElementById("equipment")



fetch(`https://workout-planner1.p.rapidapi.com/?time=${workoutTime}&muscle=${workoutMuscle}&location=${workoutLocation}&equipment=${workoutEquipment}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': 'b256a37573msh02df707d15e1ef6p128ab3jsn991aea61d01d',
    'X-RapidAPI-Host': 'workout-planner1.p.rapidapi.com'
  }
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    // console.log(data.Exercises[0].Exercise)
    for (var i = 0; i < data.Exercises.length; i++){
      //create workout div element
     var workOutEl = document.createElement("p");
     //Seting the text of the div element
     console.log(data.Exercises[i].Exercise);
     //Appending the dynamically generated html to the div associated with the workout
     workout.append(workOutEl);
     workOutEl.textContent = data.Exercises[i].Exercise;
    }
    ;
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });