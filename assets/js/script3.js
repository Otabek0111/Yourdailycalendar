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