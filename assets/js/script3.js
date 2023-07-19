let workOutApiUrl ='https://workout-planner1.p.rapidapi.com/?time=30&muscle=biceps&location=gym&equipment=dumbbells'

let workout = document.getElementById("workout")
console.log(workout)

fetch(workOutApiUrl, {
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
    console.log(data)
    for (var i = 0; i <data.length; i++){
      //create workout div element
     var workOutEl = document.createElement("div");
     //Seting the text of the div element
     workOutEl.textContent = data[i].Exercises.Exercises;
     //Appending the dynamically generated html to the div associated with the workout
     workout.append(workOutEl);
    }
    ;
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

issueTitle.textContent = data[i].title;


  // fetchButton.addEventListener('click', getApi);

// var time = document.getElementById("time")
// var muscle = document.getElementById("muscle")
// var location = document.getElementById("location")
// var equipment = document.getElementById("equipment")

// let selectedWorkOut;
// diet.addEventListener("change", function () {
//   selectedWorkOut = this.value;
// });


