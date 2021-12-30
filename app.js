// Part 1: Number Facts
const numberURL = 'http://numbersapi.com';
// 1.
axios.get(`${numberURL}/4?json`).then((favNum) => {
	console.log(favNum.data);
});

// 2.
fact1 = document.getElementById('fact1');
fact2 = document.getElementById('fact2');
fact3 = document.getElementById('fact3');

numFacts = axios
	.get(`${numberURL}/1`)
	.then((num1) => {
		fact1.innerHTML = num1.data;
		return axios.get(`${numberURL}/2`);
	})
	.then((num2) => {
		fact2.innerHTML = num2.data;
		return axios.get(`${numberURL}/3`);
	})
	.then((num3) => {
		fact3.innerHTML = num3.data;
	})
	.catch((err) => console.log(err));

// 3.
favNumFactsList = document.getElementById('favNumFacts');

axios
	.get(`${numberURL}/4`)
	.then((fact1) => {
		const favNumFact1 = document.createElement('li');
		console.log(fact1);
		favNumFact1.innerHTML = fact1.data;
		favNumFactsList.append(favNumFact1);
		return axios.get(`${numberURL}/4`);
	})
	.then((fact2) => {
		const favNumFact2 = document.createElement('li');
		console.log(fact2);
		favNumFact2.innerHTML = fact2.data;
		favNumFactsList.append(favNumFact2);
		return axios.get(`${numberURL}/4`);
	})
	.then((fact3) => {
		const favNumFact3 = document.createElement('li');
		console.log(fact3);
		favNumFact3.innerHTML = fact3.data;
		favNumFactsList.append(favNumFact3);
		return axios.get(`${numberURL}/4`);
	})
	.then((fact4) => {
		const favNumFact4 = document.createElement('li');
		console.log(fact4);
		favNumFact4.innerHTML = fact4.data;
		favNumFactsList.append(favNumFact4);
	})
	.catch((err) => console.log(err));

// Part 2: Deck of Cards

// 1.
cardsAPI = 'https://deckofcardsapi.com/api/deck';

axios
	.get(`${cardsAPI}/new/draw/?count=1`)
	.then((data) => {
		let { suit, value } = data.data.cards[0];
		console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
	})
	.catch((err) => console.log(err));

// 2.
let firstCard = null;
axios
	.get(`${cardsAPI}/new/draw/`)
	.then((data) => {
		console.log(data);
		firstCard = data.data.cards[0];
		let deckId = data.data.deck_id;
		return axios.get(`${cardsAPI}/${deckId}/draw/`);
	})
	.then((data) => {
		let secondCard = data.data.cards[0];
		[ firstCard, secondCard ].forEach(function(card) {
			console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
		});
	});

// // 3.

let deckId = null;
const drawBtn = document.getElementById('draw-a-card');
const cardArea = document.getElementById('cards-area');

axios.get(`${cardsAPI}/new/shuffle/`).then((data) => {
	deckId = data.data.deck_id;
	drawBtn.style.display = 'block';
});

drawBtn.addEventListener('click', function() {
	axios.get(`${cardsAPI}/${deckId}/draw/`).then((data) => {
		let cardsSrc = data.data.cards[0].image;
		let angle = Math.random() * 90 - 45;
		let randomX = Math.random() * 40 - 20;
		let randomY = Math.random() * 40 - 20;
		let cardImg = document.createElement('img');
		cardImg.setAttribute('src', cardsSrc);
		cardArea.append(cardImg);

		if (data.data.remaining === 0) {
			drawBtn.style.display = 'none';
		}
	});
});
