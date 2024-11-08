// Define the labyrinth as a 2D array (0: path, 1: wall, 2: treasure)
const labyrinth = [
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 2],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0]
];

// Set the adventurer's starting position
let adventurerPosition = { x: 0, y: 0 };
const pathHistory = [];

// Render the labyrinth
function renderLabyrinth() {
    const labyrinthDiv = document.getElementById("labyrinth");
    labyrinthDiv.innerHTML = ""; // Clear the grid
    
    for (let y = 0; y < labyrinth.length; y++) {
        for (let x = 0; x < labyrinth[y].length; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (x === adventurerPosition.x && y === adventurerPosition.y) {
                cell.classList.add("adventurer");
                cell.textContent = "A";
            } else if (labyrinth[y][x] === 1) {
                cell.classList.add("wall");
            } else if (labyrinth[y][x] === 2) {
                cell.classList.add("treasure");
                cell.textContent = "T";
            } else {
                cell.classList.add("path");
            }

            labyrinthDiv.appendChild(cell);
        }
    }
}

// Move the adventurer
function move(direction) {
    const { x, y } = adventurerPosition;
    let newX = x, newY = y;

    if (direction === "up") newY--;
    if (direction === "down") newY++;
    if (direction === "left") newX--;
    if (direction === "right") newX++;

    // Check bounds and walls
    if (
        newY >= 0 && newY < labyrinth.length &&
        newX >= 0 && newX < labyrinth[0].length &&
        labyrinth[newY][newX] !== 1
    ) {
        adventurerPosition = { x: newX, y: newY };
        pathHistory.push({ x: newX, y: newY });

        // Check if treasure found
        if (labyrinth[newY][newX] === 2) {
            alert("🎉 You've found the treasure! 🎉");
            pathHistory.push("Treasure found!");
        }

        renderLabyrinth();
    } else {
        alert("Can't move there!");
    }
}

// Initial render
renderLabyrinth();