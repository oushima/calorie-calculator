const calculatorContainer = document.getElementById('cal-calc-container');
const inputs = document.querySelectorAll("input[type=number]");
const optionMale = document.querySelector('#option-male');
const optionFemale = document.querySelector('#option-female');

data = [
	{
		"title": "Mifflin St. Jeor",
		"male_equation": () => (10 * inputs[0].value) + (6.25 * inputs[1].value) - (5 * inputs[2].value) + 5,
		"female_equation": () => (10 * inputs[0].value) + (6.25 * inputs[1].value) - (5 * inputs[2].value) - 161
	},
	{
		"title": "Revised Harris–Benedict",
		"male_equation": () => (13.397 * inputs[0].value) + (4.799 * inputs[1].value) - (5.677 * inputs[2].value) + 88.362,
		"female_equation": () => (9.247 * inputs[0].value) + (3.098 * inputs[1].value) - (4.330 * inputs[2].value) + 447.362
	},
	{
		"title": "Original Harris–Benedict",
		"male_equation": () => (13.7516 * inputs[0].value) + (5.0033 * inputs[1].value) - (6.7550 * inputs[2].value) + 66.593,
		"female_equation": () => (9.5634 * inputs[0].value) + (1.8496 * inputs[1].value) - (4.6756 * inputs[2].value) + 655.0955
	}
]

function validateInputs () {
	let flag = true
	for (let i = 0; i < inputs.length; i++) {
		if (!inputs[i].value) {
			console.warn('Fill in all input fields.');
			flag = false;
		}
		if (!inputs[i].value.match(/[0-9]+/)) {
			console.warn('Only integers allowed.');
			flag = false;
		}
	}
	return flag;
}

function calc (gender, ele) {
	const validation = validateInputs();
	if (!validation) return validation;

	// Get BMR output card.
	bmrOutputContainer = document.getElementById('bmr-output-container');
	if (bmrOutputContainer.children.length > 1) {
		for (let i = 0; i < bmrOutputContainer.children.length; i++) {
			bmrOutputContainer.children[i].remove();
		}
	}
	bmrOutputContainer.classList.remove('hidden');
	let card = bmrOutputContainer.firstElementChild;
	const cards = [];
	for(let i = 0; i < data.length; i++) {
		card = card.cloneNode(true);
		card.getElementsByTagName('h5')[0].innerText = `${data[i]['title']}`;
		card.getElementsByTagName('li')[0].innerText = `BMR: ${Math.round(data[i][`${gender}_equation`]())}`;
		cards.push(card);
		// bmrOutputContainer.appendChild(card);
	}

	// Animate.
	function animateResult () {
		
		// Base case.
		if (cards.length < 1) return;

		// Remove the first element from the array.
		const item = cards.shift();

		// Set timeout.
		setTimeout(() => {
			bmrOutputContainer.appendChild(item);
			animateResult();
		}, 100);
	}
	animateResult();
	bmrOutputContainer.firstElementChild.remove();
}

// Event listeners.
optionFemale.addEventListener('click', () => calc("female", optionFemale));
optionMale.addEventListener('click', () => calc("male", optionMale));