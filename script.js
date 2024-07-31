document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll(".box");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let isGameOver = false;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (board[index] === "" && !isGameOver) {
                board[index] = currentPlayer;
                box.textContent = currentPlayer;
                box.style.animation = "fadeIn 0.5s ease forwards";

                if (checkWin(currentPlayer)) {
                    isGameOver = true;
                    highlightWinningBlocks();
                    Swal.fire({
                        title: currentPlayer + " wins!",
                        icon: "success",
                        confirmButtonText: "Play Again"
                    }).then(resetGame);
                } else if (board.every(cell => cell !== "")) {
                    isGameOver = true;
                    Swal.fire({
                        title: "It's a draw!",
                        icon: "info",
                        confirmButtonText: "Play Again"
                    }).then(resetGame);
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    });

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player;
            });
        });
    }

    function highlightWinningBlocks() {
        winningCombinations.forEach(combination => {
            if (combination.every(index => board[index] === currentPlayer)) {
                combination.forEach(index => {
                    boxes[index].classList.add("winning");
                });
            }
        });
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        boxes.forEach(box => {
            box.textContent = "";
            box.classList.remove("winning");
            box.style.animation = "none";
        });
        currentPlayer = "X";
        isGameOver = false;
    }

    document.getElementById("restartBtn").addEventListener("click", resetGame);
});
