let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newGamebtn = document.querySelector(".new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0; // Added this to track the number of turns.

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]; 

const resetGame = () => {
    turnO = true;
    count = 0; // Reset the count to 0.
    enableBoxes();
    msgContainer.classList.add("hide");
    document.querySelector(".container").classList.remove("blur"); // Remove blur from the background
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // Player O's turn
            box.innerText = "O";
            turnO = false;
        } else { // Player X's turn
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // Disable the box after a click
        count++; // Increment the move count
        checkWinner(); // Check for a winner after every move
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true); // Disable all boxes
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false; // Enable the boxes
        box.innerText = ""; // Clear the box text
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner} !`;
    msgContainer.classList.remove("hide");
    document.querySelector(".container").classList.add("blur"); // Add blur to the background
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;   
        
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val); // Identifying winner
                showWinner(pos1val);
                return;
            }
        }
    }
    
    // Check for a tie
    if (count === 9) {
        msg.innerText = "It's a Tie!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGamebtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
