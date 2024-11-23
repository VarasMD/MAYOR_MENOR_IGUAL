let deck = [];
let currentCard;
let score = 0;
let playerName = "";

function createDeck() {
  const suits = ["Oro", "Basto", "Espada", "Copa"];
  deck = [];

  suits.forEach((suit) => {
    for (let i = 1; i <= 12; i++) {
      deck.push({ suit, value: i });
    }
  });

  shuffleDeck();
}

function shuffleDeck() {
  deck.sort(() => Math.random() - 0.5);
}

function startGame() {
  playerName = document.getElementById("player-name").value;
  if (playerName.trim() === "") {
    alert("Por favor, ingresa un nombre.");
    return;
  }

  score = 0;
  document.getElementById("score").textContent = score;
  document.getElementById(
    "player-display"
  ).textContent = `Jugador: ${playerName}`;

  createDeck();
  currentCard = deck.pop();
  mostrarCarta(currentCard);

  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
}

function guess(option) {
  if (deck.length === 0) {
    winGame();
    return;
  }

  const nextCard = deck.pop();
  const result = compareCards(currentCard, nextCard);

  if (result === option) {
    score++;
    document.getElementById("score").textContent = score;
    currentCard = nextCard;
    mostrarCarta(currentCard);
  } else {
    const lastCard = currentCard;
    mostrarCartaAnterior(lastCard);
    currentCard = nextCard;
    mostrarCartaSiguiente(currentCard);
    endGame();
  }
}

function compareCards(card1, card2) {
  if (card2.value > card1.value) {
    return "mayor";
  } else if (card2.value < card1.value) {
    return "menor";
  } else {
    return "igual";
  }
}

function endGame() {
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("game-over-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = score;
}

function winGame() {}

function resetGame() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("welcome-screen").classList.remove("hidden");
  document.getElementById("player-name").value = "";

  const cardNextSuitEspada = document.querySelector(".card-next .Espada");
  const cardNextSuitOro = document.querySelector(".card-next .Oro");
  const cardNextSuitBasto = document.querySelector(".card-next .Basto");
  const cardNextSuitCopa = document.querySelector(".card-next .Copa");

  if (
    cardNextSuitEspada ||
    cardNextSuitBasto ||
    cardNextSuitOro ||
    cardNextSuitCopa
  ) {
    if (cardNextSuitEspada) cardNextSuitEspada.className = "card-next-suit";
    if (cardNextSuitBasto) cardNextSuitBasto.className = "card-next-suit";
    if (cardNextSuitOro) cardNextSuitOro.className = "card-next-suit";
    if (cardNextSuitCopa) cardNextSuitCopa.className = "card-next-suit";
  }
}

function playAgain() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("welcome-screen").classList.remove("hidden");
  startGame();
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const themeToggle = document.querySelector(".theme-toggle");

  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "🌞";
  }
}

function mostrarCarta(carta) {
  const card = document.querySelector(".card");
  const cardValue = card.querySelector(".card-value");
  const cardSuit = card.querySelector(".card-suit");
  const rotatedValue = card.querySelector(".card-value.rotated");

  cardValue.textContent = carta.value;
  rotatedValue.textContent = carta.value;
  cardSuit.textContent = obtenerSimbolo(carta.suit);
  cardSuit.className = `card-suit ${carta.suit}`;
}

function mostrarCartaAnterior(carta) {
  const card = document.querySelector(".card-last");
  const cardValue = card.querySelector(".card-last-value");
  const cardSuit = card.querySelector(".card-last-suit");
  const rotatedValue = card.querySelector(".card-last-value.rotated");

  cardValue.textContent = carta.value;
  rotatedValue.textContent = carta.value;
  cardSuit.textContent = obtenerSimbolo(carta.suit);
  cardSuit.className = `card-last-suit ${carta.suit}`;
}

function mostrarCartaSiguiente(carta) {
  const card = document.querySelector(".card-next");
  const cardValue = card.querySelector(".card-next-value");
  const cardSuit = card.querySelector(".card-next-suit");
  const rotatedValue = card.querySelector(".card-next-value.rotated");

  cardValue.textContent = carta.value;
  rotatedValue.textContent = carta.value;
  cardSuit.textContent = obtenerSimbolo(carta.suit);
  cardSuit.className = `card-next-suit ${carta.suit}`;
}

function obtenerSimbolo(suit) {
  switch (suit) {
    case "Oro":
      return "🟡";
    case "Espada":
      return "🗡️";
    case "Basto":
      return "🌿";
    case "Copa":
      return "🍷";
    default:
      return "";
  }
}
