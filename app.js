// Part 1: Number Facts
const numberURL = 'http://numbersapi.com';

// 1.
async function getFavNumber() {
	let res = await axios.get(`${numberURL}/4?json`);
	console.log(res.data.text);
}

// 2.
async function numbersData() {
	fact1 = document.getElementById('fact1');
	fact2 = document.getElementById('fact2');
	fact3 = document.getElementById('fact3');

	let fact1Promise = axios.get(`${numberURL}/1`);
	let fact2Promise = axios.get(`${numberURL}/2`);
	let fact3Promise = axios.get(`${numberURL}/3`);

	let fact1data = await fact1Promise;
	let fact2data = await fact2Promise;
	let fact3data = await fact3Promise;

	fact1.innerHTML = fact1data.data;
	fact2.innerHTML = fact2data.data;
	fact3.innerHTML = fact3data.data;
}
numbersData();

// 3.

async function favNumberFacts() {
	favNumFactsList = document.getElementById('favNumFacts');
	const favNumFact1 = document.createElement('li');
	const favNumFact2 = document.createElement('li');
	const favNumFact3 = document.createElement('li');
	const favNumFact4 = document.createElement('li');

	let fact1Promise = axios.get(`${numberURL}/4`);
	let fact2Promise = axios.get(`${numberURL}/4`);
	let fact3Promise = axios.get(`${numberURL}/4`);
	let fact4Promise = axios.get(`${numberURL}/4`);

	let fact1data = await fact1Promise;
	let fact2data = await fact2Promise;
	let fact3data = await fact3Promise;
	let fact4data = await fact4Promise;

	favNumFact1.innerHTML = fact1data.data;
	favNumFact2.innerHTML = fact2data.data;
	favNumFact3.innerHTML = fact3data.data;
	favNumFact4.innerHTML = fact4data.data;

	favNumFactsList.append(favNumFact1, favNumFact2, favNumFact3, favNumFact4);
}
favNumberFacts();

// Part 2: Deck of Cards
const cardsAPI = 'https://deckofcardsapi.com/api/deck';

// 1.
async function requestCard() {
	let res = await axios.get(`${cardsAPI}/new/draw/?count=1`);
	let value = res.data.cards[0].value;
	let suit = res.data.cards[0].suit;
	console.log(`${value} of ${suit}`);
}
requestCard();

// 2.
async function requestFromSameDeck() {
	let firstCard = null;
	let res = await axios.get(`${cardsAPI}/new/draw/`);
	firstCard = res.data.cards[0];
	let deckId = res.data.deck_id;

	let res2 = await axios.get(`${cardsAPI}/${deckId}/draw/`);
	let secondCard = res2.data.cards[0];
	[ firstCard, secondCard ].forEach(function(card) {
		console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
	});
}
requestFromSameDeck();

// // 3.
let deckId = null;
const cardArea = document.getElementById('cards-area');
const drawBtn = document.getElementById('draw-a-card');
const msg = document.getElementById('msg');
drawBtn.style.display = 'block';

async function newDeck() {
	let res = await axios.get(`${cardsAPI}/new/shuffle/`);
	deckId = res.data.deck_id;
}
newDeck();

drawBtn.addEventListener('click', async function() {
	let res = await axios.get(`${cardsAPI}/${deckId}/draw/`);
	let cardsSrc = res.data.cards[0].image;
	let cardImg = document.createElement('img');
	cardImg.setAttribute('src', cardsSrc);
	cardArea.append(cardImg);

	if (res.data.remaining === 0) {
		drawBtn.style.display = 'none';
		msg.innerHTML = 'End of Deck. Refresh to draw again.';
	}
});
