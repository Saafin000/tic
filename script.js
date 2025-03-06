let board = ["", "", "", "", "", "", "", "", ""];
const human = "X";
const ai = "O";

function checkWinner(b) {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8], 
        [0,4,8], [2,4,6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (b[a] && b[a] === b[b] && b[a] === b[c]) return b[a];
    }
    return b.includes("") ? null : "draw";
}

function minimax(newBoard, isMax) {
    let result = checkWinner(newBoard);
    if (result === human) return -1;
    if (result === ai) return 1;
    if (result === "draw") return 0;

    let bestScore = isMax ? -Infinity : Infinity;
    for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === "") {
            newBoard[i] = isMax ? ai : human;
            let score = minimax(newBoard, !isMax);
            newBoard[i] = "";
            bestScore = isMax ? Math.max(score, bestScore) : Math.min(score, bestScore);
        }
    }
    return bestScore;
}

function bestMove() {
    let bestScore = -Infinity, move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = ai;
            let score = minimax(board, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board[move] = ai;
    updateBoard();
}

function updateBoard() {
    document.getElementById("board").innerHTML = board
        .map((cell, i) => <div class="cell" onclick="makeMove(${i})">${cell}</div>)
        .join("");
    let result = checkWinner(board);
    if (result) document.getElementById("message").innerText = result === "draw" ? "It's a draw!" : ${result} wins!;
}

function makeMove(index) {
    if (board[index] === "" && !checkWinner(board)) {
        board[index] = human;
        updateBoard();
        if (!checkWinner(board)) setTimeout(bestMove, 500);
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("message").innerText = "";
    updateBoard();
}

updateBoard();
