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

function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.username === username);

    if (user) {
      alert("El usuario ya existe.");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario registrado exitosamente.");
    showLogin();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al registrar el usuario.");
  }
}

function showLogin() {
  document.getElementById("login").classList.remove("hidden");
  document.getElementById("welcome-screen").classList.add("hidden");
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username);

  if (user) {
    if (user.password === password) {
      document.getElementById("login").classList.add("hidden");
      startGame();
    } else {
      alert("Contraseña incorrecta.");
    }
  }
}

function showHistory() {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  console.log(scores);
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";

  if (scores.length === 0) {
    historyList.innerHTML = "<li>No hay resultados registrados.</li>";
  } else {
    scores.slice(0, 10).forEach((entry, index) => {
      const listItem = document.createElement("li");
      const nameSpan = document.createElement("span");
      nameSpan.textContent = `${index + 1}. ${entry.name}`;

      const scoreSpan = document.createElement("span");
      scoreSpan.textContent = `${entry.score} puntos`;

      listItem.appendChild(nameSpan);
      listItem.appendChild(scoreSpan);
      historyList.appendChild(listItem);
    });
  }

  document.getElementById("history-screen").classList.remove("hidden");
}

function closeHistory() {
  document.getElementById("history-screen").classList.add("hidden");
}

function startGame() {
  playerName = document.getElementById("login-username").value;
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

function saveScore() {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  const existingPlayer = scores.find((entry) => entry.name === playerName);

  if (existingPlayer) {
    if (score > existingPlayer.score) {
      existingPlayer.score = score;
    }
  } else {
    scores.push({ name: playerName, score });
  }

  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(scores));
}

function endGame() {
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("game-over-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = score;

  saveScore();
}

function winGame() {}

function resetGame() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("welcome-screen").classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";

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
