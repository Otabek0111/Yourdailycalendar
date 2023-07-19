let workOutApiUrl ="https://workout-planner1.p.rapidapi.com/customized?"
let workOutApiKey ="b256a37573msh02df707d15e1ef6p128ab3jsn991aea61d01d"

let workout = document.getElementById("workout")
let numOfRecipes =30
let firstName = document.getElementById("first-name");
let lasttName = document.getElementById("last-name");
let submitBtn = document.getElementById("submitBtnWorkOut");
var submitSec = document.querySelector("#submitSectionWOrkOut");

var time = document.getElementById("time")
var muscle = document.getElementById("muscle")
var location = document.getElementById("location")
var equipment = document.getElementById("equipment")


const url = 'https://workout-planner1.p.rapidapi.com/customized?time=30&equipment=dumbbells&muscle=biceps&fitness_level=beginner&fitness_goals=strength';
// const url = 'https://workout-planner1.p.rapidapi.com/customized?time=30&equipment=dumbbells&muscle=biceps&fitness_level=beginner&fitness_goals=strength';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b256a37573msh02df707d15e1ef6p128ab3jsn991aea61d01d',
		'X-RapidAPI-Host': 'workout-planner1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}