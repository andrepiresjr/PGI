/* =========================
   COLOR HUNT
   JOGO DE PERCEPÇÃO DE CORES
========================= */


// =========================
// ELEMENTOS DO HTML
// =========================

const startScreen = document.getElementById("startScreen");

const gameScreen = document.getElementById("gameScreen");

const endScreen = document.getElementById("endScreen");

const startButton = document.getElementById("startButton");

const restartButton = document.getElementById("restartButton");

const grid = document.getElementById("grid");

const feedback = document.getElementById("feedback");

const scoreElement = document.getElementById("score");

const roundElement = document.getElementById("round");

const livesElement = document.getElementById("lives");

const endIcon = document.getElementById("endIcon");

const endTitle = document.getElementById("endTitle");

const endText = document.getElementById("endText");


// =========================
// VARIÁVEIS DO JOGO
// =========================

let score = 0;

let round = 1;

let lives = 3;

let correctPosition = 0;

let locked = false;


// =========================
// CORES DO JOGO
// =========================

// Cada conjunto possui:
// [cor normal, cor diferente]

const colors = [

    ["#6C63FF", "#847DFF"],

    ["#FF5C7A", "#FF788F"],

    ["#2DD4BF", "#54DDCF"],

    ["#F59E0B", "#F8B83D"],

    ["#3B82F6", "#6099F8"],

    ["#A855F7", "#BD78F9"],

    ["#22C55E", "#55D878"],

    ["#F43F5E", "#F66B82"],

    ["#06B6D4", "#43C7DA"],

    ["#E879F9", "#ED9BFA"]

];


// =========================
// ATUALIZAR INFORMAÇÕES
// =========================

function updateStatus() {

    scoreElement.textContent = score;

    roundElement.textContent = round + "/10";

    livesElement.textContent =
        "❤️".repeat(lives) +
        "🖤".repeat(3 - lives);

}


// =========================
// INICIAR JOGO
// =========================

function startGame() {

    score = 0;

    round = 1;

    lives = 3;

    startScreen.style.display = "none";

    endScreen.style.display = "none";

    gameScreen.style.display = "block";

    updateStatus();

    createRound();

}


// =========================
// CRIAR UMA RODADA
// =========================

function createRound() {

    locked = false;

    feedback.textContent = "";

    feedback.className = "feedback";

    grid.innerHTML = "";


    // Escolhe aleatoriamente
    // qual dos 9 será diferente

    correctPosition =
        Math.floor(Math.random() * 9);


    // Escolhe um conjunto de cores

    const selectedColors =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];


    const normalColor = selectedColors[0];

    const differentColor = selectedColors[1];


    // Cria os 9 quadrados

    for (let i = 0; i < 9; i++) {

        const box = document.createElement("button");

        box.type = "button";

        box.classList.add("color-box");


        // Um quadrado recebe
        // a cor diferente

        if (i === correctPosition) {

            box.style.backgroundColor =
                differentColor;

        } else {

            box.style.backgroundColor =
                normalColor;

        }


        box.setAttribute(
            "aria-label",
            "Quadrado " + (i + 1)
        );


        // Quando clicar

        box.addEventListener(
            "click",
            function () {

                checkAnswer(i);

            }
        );


        grid.appendChild(box);

    }

}


// =========================
// VERIFICAR RESPOSTA
// =========================

function checkAnswer(position) {

    // Impede vários cliques
    // durante a animação

    if (locked) {

        return;

    }

    locked = true;


    // =========================
    // RESPOSTA CORRETA
    // =========================

    if (position === correctPosition) {

        const points =
            100 + (round * 10);

        score += points;


        feedback.textContent =
            "✓ Acertou! +" +
            points +
            " pontos";

        feedback.className =
            "feedback correct";


        updateStatus();


        setTimeout(function () {

            // Se terminou as 10 fases

            if (round >= 10) {

                finishGame(true);

            } else {

                round++;

                updateStatus();

                createRound();

            }

        }, 650);

    }


    // =========================
    // RESPOSTA ERRADA
    // =========================

    else {

        lives--;


        feedback.textContent =
            "✕ Ops! Tente novamente.";

        feedback.className =
            "feedback wrong";


        updateStatus();


        // Mostra qual era a resposta

        const correctBox =
            grid.children[correctPosition];


        correctBox.style.borderColor =
            "white";


        setTimeout(function () {

            // Se ficou sem vidas

            if (lives <= 0) {

                finishGame(false);

            } else {

                createRound();

            }

        }, 850);

    }

}


// =========================
// FINAL DO JOGO
// =========================

function finishGame(won) {

    gameScreen.style.display = "none";

    endScreen.style.display = "block";


    if (won) {

        endIcon.textContent = "🏆";

        endTitle.textContent =
            "Você venceu!";

        endText.textContent =
            "Você encontrou todas as cores diferentes e fez " +
            score +
            " pontos!";

    } else {

        endIcon.textContent = "💥";

        endTitle.textContent =
            "Fim de jogo";

        endText.textContent =
            "Você ficou sem vidas. Sua pontuação foi " +
            score +
            " pontos. Tente novamente!";

    }

}


// =========================
// BOTÕES
// =========================

startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);


// =========================
// INICIALIZAÇÃO
// =========================

updateStatus();