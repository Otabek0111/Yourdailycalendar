

let apiUrl ="https://api.spoonacular.com/recipes/complexSearch"
let apiKey ="0821799963dc4a95ab208456cf22646c"
let diet = document.getElementById("diet")
let numOfRecipes =30
let firstName = document.getElementById("first-name")
let lasttName = document.getElementById("last-name")
let submitBtn = document.getElementById("submitBtn")
var submitSec = document.querySelector("#submitSection")

let selectedDiet
diet.addEventListener("change", function() {
  selectedDiet = this.value
})
submitBtn.addEventListener("click", function(event) {
  console.log(event.target);
  event.preventDefault();
  submitSec.setAttribute()


  fetch(apiUrl + "?apiKey=" + apiKey + "&diet=" + selectedDiet + "&number="+ numOfRecipes)
  .then(response => response.json())
  .then(data => {
    const events = data.results.map((recipe, index) => {
      return {
        title: recipe.title,
        // start date is set to the current month and the day is index+1
        // this will distribute the recipes throughout the month
        start: new Date(new Date().getFullYear(), new Date().getMonth(), index + 1).toISOString().split('T')[0]
      };
    });

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        // this is to remove the arrows that change the month
        headerToolbar: {
          start: '',
          center: 'title',
          end: ''
      },
        events: events
    });

    calendar.render();
  })
  .catch(error => console.error('Error:', error));

})
