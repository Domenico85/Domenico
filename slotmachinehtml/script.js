const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};
const SYMBOLS_IMAGES = {
  A: "img/A.png",
  B: "img/B.png",
  C: "img/C.png",
  D: "img/D.png",
};
let balance = 0;

document.getElementById("deposit-btn").addEventListener("click", () => {
  const depositAmount = parseFloat(document.getElementById("deposit").value);
  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert("Invalid deposit amount, try again.");
  } else {
    balance += depositAmount;
    updateBalance();
    document.getElementById("deposit").value = "";
  }
});

document.getElementById("spin-btn").addEventListener("click", () => {
  const lines = parseInt(document.getElementById("lines").value);
  const bet = parseFloat(document.getElementById("bet").value);

  if (isNaN(lines) || lines <= 0 || lines > 3) {
    alert("Invalid number of lines, try again.");
    return;
  }

  if (isNaN(bet) || bet <= 0 || bet > balance / lines) {
    alert("Invalid bet, try again.");
    return;
  }

  balance -= bet * lines;
  updateBalance();

  document.querySelector(".slot-machine").classList.remove("hidden");

  const reels = spin();
  const rows = transpose(reels);
  displayReels(rows);

  const winnings = getWinnings(rows, bet, lines);
  balance += winnings;
  updateBalance();

  document.getElementById("message").innerText = `You won $${winnings}`;
});

const updateBalance = () => {
  document.getElementById("balance").innerText = balance.toFixed(2);
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const displayReels = (rows) => {
  for (let col = 0; col < COLS; col++) {
    const reel = document.getElementById(`reel${col + 1}`);
    const images = reel.getElementsByClassName("slot-img");
    for (let row = 0; row < ROWS; row++) {
      images[row].src = SYMBOLS_IMAGES[rows[row][col]];
      images[row].alt = rows[row][col];
    }
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};
