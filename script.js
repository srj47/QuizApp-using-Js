const questions = [
	{
		question: "which is larges animal in the world?",
		answers: [
			{ text: "shark", correct: false },
			{ text: "blue whale", correct: true },
			{ text: "Elephant", correct: false },
			{ text: "Giraffe", correct: false },
		],
	},
	{
		question: "the shape of football is?",
		answers: [
			{ text: "sqare", correct: false },
			{ text: "triangle", correct: false },
			{ text: "circle", correct: true },
			{ text: "rectangle", correct: false },
		],
	},
	{
		question: "Prime minister name ?",
		answers: [
			{ text: "Aakash", correct: false },
			{ text: "Vibhav", correct: false },
			{ text: "Ram", correct: false },
			{ text: "Namo", correct: true },
		],
	},
	{
		question: "Pubg is ____ player game?",
		answers: [
			{ text: "single", correct: false },
			{ text: "offline", correct: false },
			{ text: "multiplayer", correct: true },
			{ text: "none", correct: false },
		],
	},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion() {
	resetState();
	let curreQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + curreQuestion.question;

	curreQuestion.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function resetState() {
	nextButton.style.display = "none";
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e) {
	const selectBtn = e.target;
	const isCorrect = selectBtn.dataset.correct === "true";
	if (isCorrect) {
		selectBtn.classList.add("correct");
		score++;

	} else {
		selectBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => { 
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";

}


function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
	
}

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}

}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < questions.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
	
});

startQuiz();
