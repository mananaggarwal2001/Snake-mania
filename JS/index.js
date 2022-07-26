let inputDir = { x: 0, y: 0 } // snake is not moving in intial
const foodSound = new Audio('../music/food.mp3');
const gameoverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicsound = new Audio('../music/music.mp3');
let lastPainttime = 0;
let scoreUpadate = document.getElementById('updateScore');
let highScoreUpdate = document.getElementById('updateHighScore');
let board = document.getElementById('board')
let speed = 10;
let score = 0;
let snakeArray = [
    { x: 13, y: 15 } // intial position of the snake when the game has started.
]
let food = { x: 11, y: 12 }

// Function main
function main(ctime) {
    window.requestAnimationFrame(main) // recursion approach is used for calling the animation effect.
    // To control the FPS of the game the we have to perform the action
    // ctime is the current Time
    // LastPaintTime is the time when the screen is last rendered on our HardWare System.
    // ctime is in milliseconds so we have to divide by the 1000.
    if ((ctime - lastPainttime) / 1000 < 1 / speed) {
        return; // this means that we do not want the screen to being painted.
    }
    // if the condition is false then the lastPainttime is updated etc.
    lastPainttime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // if you bump into yourself
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    // if the snake will bump into the border of the grid anywhere what we have to do.
    if (snakeArray[0].x >= 25 || snakeArray[0].x <= 0 || snakeArray[0].y >= 25 || snakeArray[0].y <= 0) {
        return true;
    }
}
function gameEngine() {
    // Part 1 :- Update the Snake Array and the food.
    if (isCollide(snakeArray)) {
        musicsound.pause();
        gameoverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over Press Any key to Play again");
        snakeArray = [{ x: 13, y: 15 }];
        let highScore = JSON.parse(localStorage.getItem('hiScore'));
        let highScoreVal = 0;
        if (highScore === null) {
            localStorage.setItem('hiScore', JSON.stringify(highScoreVal));
            highScoreVal = score;
            highScoreUpdate.innerHTML = highScoreVal;
        } else {
            if (score > highScore) {
                highScoreVal = score;
                localStorage.setItem('hiScore', JSON.stringify(highScoreVal));
                highScoreUpdate.innerHTML = highScoreVal;
            }
        }
        musicsound.play();
        score = 0;
        scoreUpadate.innerHTML = score;

    }

    // if you have eaten the food then change the direction of the food and increament  the score.

    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        foodSound.play();
        score += 5;
        scoreUpadate.innerHTML = score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y }); // unshift function help to append the array.
        // For generating the food at the ranadom places we have the random function which will help me doing this task.
        let a = 2;
        let b = 21;
        // Math.random generates the number between 0 and 1.
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // Moving the Snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }; // doing the derefrencing of the object and pointing the object to the new object continuesly.
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;
    musicsound.play();

    // Part 2:- Display the Snake
    board.innerHTML = '';
    snakeArray.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {

            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.append(snakeElement);
    });

    // Part 3:- Display the Food on the Screen.
    let foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.append(foodelement);

}



// It is used for making the game loop that the screen is rendered repeatedly after every movement and is better than the setInterval.
window.requestAnimationFrame(main)

highScoreUpdate.innerHTML = JSON.parse(localStorage.getItem('hiScore')); // For retaining the value of the HighScore From the local Storage.
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 }; // Start the game.
    moveSound.play();
    console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})