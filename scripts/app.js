const elements = {
  cardContainer: document.querySelector("#C-container"),
  restartButton: document.querySelector("#RestartButton"),
  nextDifficultyButton: document.querySelector("#NextDifficulty"),
  timerDisplay: document.querySelector("#Timer"),
  messageDisplay: document.querySelector("#Message"),
};

const game = {
  level: 0,
  flippedCards: [],
  matchedCards: [],
  timer: null,
  timeLeft: 0,
  cardImages: [],
};

const allImages = [
  "668", "alabraaj", "bacon", "baskinrobbins", "cinecafe", "cinnabon",
  "dose", "haji", "hcr", "jan", "jasmislogo", "lilou", "samona",
  "shay", "trentren", "vapiano", "villamamas", "zaytzaytoon"
];

const levelTimes = [10, 30, 70];

function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  clearInterval(game.timer);
  game.timeLeft = levelTimes[game.level];
  updateTimer();
  clearMessage();

  game.timer = setInterval(() => {
    game.timeLeft--;
    updateTimer();

    if (game.timeLeft <= 0) {
      clearInterval(game.timer);
      showMessage(" Time's up");
      disableAllCards();
    }
  }, 1000);
}

function updateTimer() {
  elements.timerDisplay.textContent = `Time: ${game.timeLeft}s`;
}

function showMessage(msg) {
  elements.messageDisplay.textContent = msg;
}

function clearMessage() {
  elements.messageDisplay.textContent = "";
}

function getGridSize() {
  return [2, 4, 6][game.level];
}

function createCards() {
  elements.cardContainer.innerHTML = "";
  game.flippedCards = [];
  game.matchedCards = [];
  clearMessage();

  const size = getGridSize();
  const totalCards = size * size;
  const pairs = totalCards / 2;

  const shuffledImages = shuffle([...allImages]).slice(0, pairs);

  game.cardImages = shuffle([...shuffledImages, ...shuffledImages]);

  elements.cardContainer.style.gridTemplateColumns = `repeat(${size}, 100px)`;

  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = game.cardImages[i];
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">
          <img src="assets/${game.cardImages[i]}.png" alt="${game.cardImages[i]}" />
        </div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card));
    elements.cardContainer.appendChild(card);
  }

  startTimer();
}

function flipCard(card) {
  if (
    game.flippedCards.length < 2 &&
    !card.classList.contains("flipped") &&
    !game.matchedCards.includes(card)
  ) {
    card.classList.add("flipped");
    game.flippedCards.push(card);

    if (game.flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = game.flippedCards;
  const val1 = card1.dataset.value;
  const val2 = card2.dataset.value;

  if (val1 === val2) {
    game.matchedCards.push(card1, card2);
    game.flippedCards = [];

    if (game.matchedCards.length === getGridSize() ** 2) {
      clearInterval(game.timer);
      showMessage("CONGRATULATIONS YOU WON !!!!!!!!");
      disableAllCards();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      game.flippedCards = [];
    }, 800);
  }
}

function disableAllCards() {
  document.querySelectorAll(".card").forEach(card => {
    card.style.pointerEvents = "none";
  });
}

elements.restartButton.addEventListener("click", () => {
  createCards();
});

elements.nextDifficultyButton.addEventListener("click", () => {
  if (game.level < 2) {
    game.level++;
    createCards();
  } else {
    showMessage("Completed all difficulty levels!");
  }
});

window.addEventListener("DOMContentLoaded", createCards);

if( windows.location .event ){

  
}