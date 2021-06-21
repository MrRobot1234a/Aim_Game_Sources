const startBtn = document.querySelector(`#start`),
      screens = document.querySelectorAll(`.screen`),
      timeList = document.querySelector(`#time-list`),
      timeEl = document.querySelector(`#time`),
      board = document.querySelector(`#board`);

let time = 0;
let score = 0;
//Homework
const colors = [`#e74c3c`, `#8e44ad`, `#3498db`,`#e67e22`, `#2ecc71`, `#7FFFD4`, `#8A2BE2`, `#E6E6FA`, `#4B0082`, `#6A5ACD`, `#2F4F4F`, `#696969`, `#808080`];

function startGame() {
    setTime(time);
    createRandomCircle();
    const id = setInterval(() => {

        if (time === 0) {

            finishGame();
            clearInterval(id);
        } else {
            let current = --time;

            if (current < 10) {
                current = `0${current}`;
            }
    
            setTime(current);
        }

        
    }, 1000);
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {

    board.innerHTML = `<h1>Счёт: <span class = 'primary'>${score}</span></h1>`;
    timeEl.parentNode.classList.add(`hide`);
}

function createRandomCircle() {
    const circle = document.createElement(`div`);

    const size = getRandomNumber(10,  60);

    const {width, height} = board.getBoundingClientRect();
    const color = getColor();

    console.log(color);

    const x = getRandomNumber(0, width - size),
          y = getRandomNumber(0, height - size);

    circle.classList.add(`circle`);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Homework
function getColor() {
    const idxColor = Math.floor(Math.random() * colors.length);
    return colors[idxColor];

}



startBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    screens[0].classList.add(`up`);
});

timeList.addEventListener(`click`, (e) => {
    const target = e.target;
    if (target.classList.contains(`time-btn`)) {
        time = +target.getAttribute(`data-time`);
        screens[1].classList.add(`up`);

        startGame();
    }
});

board.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`circle`)) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
});

