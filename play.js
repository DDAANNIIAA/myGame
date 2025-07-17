window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const character = urlParams.get("character");
  const player = document.getElementById("player");
  const obstacle = document.getElementById("obstacle");
  const gameOverBox = document.getElementById("game-over-box");
  const jumpSound = new Audio("jump.wav");
  const gameOverSound = new Audio("gameover.mp3");

  function showGameOver() {
    gameOverBox.style.display = "flex";
    gameOverSound.currentTime = 0;
    gameOverSound.play();
  }
  
 const bgMusic = document.getElementById("bg-music");
    window.addEventListener("click", () => {
        bgMusic.play();
    }, { once: true });

  function hideGameOver() {
    gameOverBox.style.display = "none";
  }

  hideGameOver();

  let frames = [];

  if (character === "gray") {
    frames = ["gray_run1.png", "gray_run2.png", "gray_run3.png"];
  } else if (character === "orange") {
    frames = ["orange_run1.png", "orange_run2.png", "orange_run3.png"];
  } else {
    alert("No character selected!");
    window.location.href = "choose.html";
    return;
  }

  player.src = frames[0];
  let currentFrame = 0;
  setInterval(() => {
    currentFrame = (currentFrame + 1) % frames.length;
    player.src = frames[currentFrame];
  }, 150);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
    }
    if (e.code === "ArrowUp" || e.code === "Space") {
      jump();
    }
  });

  function jump() {
    if (player.classList.contains("jumping")) return;
    player.classList.add("jumping");
    player.style.bottom = "250px";

    jumpSound.currentTime = 0;
    jumpSound.play();

    setTimeout(() => {
      player.style.bottom = "190px";
      player.classList.remove("jumping");
    }, 500);
  }

  let gameOver = false;
  let gameStarted = true;

  let obstacleX = window.innerWidth;
  obstacle.style.left = `${obstacleX}px`;
  moveObstacle();

  function moveObstacle() {
    if (!gameStarted || gameOver) return;
    obstacleX -= 5;
    obstacle.style.left = `${obstacleX}px`;

    if (obstacleX < -50) {
      obstacleX = window.innerWidth;
    }

    if (checkCollision()) {
      console.log("COLLISION DETECTED 🚨");
      gameOver = true;
      showGameOver();
      return;
    }

    requestAnimationFrame(moveObstacle);
  }

  function checkCollision() {
    const p = player.getBoundingClientRect();
    const o = obstacle.getBoundingClientRect();
    return (
      p.right - 40 > o.left + 30 &&
      p.left + 40 < o.right - 30 &&
      p.bottom - 30 > o.top + 20 &&
      p.top + 30 < o.bottom - 20
    );
  }

  window.retryGame = function () {
    location.reload();
  };

  window.goHome = function () {
    window.location.href = "home.html";
  };
};
