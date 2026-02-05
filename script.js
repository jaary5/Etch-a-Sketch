const container = document.querySelector('#container')
const resize = document.querySelector('#resize')

function createGrid(squarePerSide) {
    // clear existing grid
    container.innerHTML = "";

    //const CONTAINER_SIZE = container.clientWidth;
    //const squareSize = CONTAINER_SIZE / squarePerSide;
    container.style.gridTemplateColumns = `repeat(${squarePerSide}, 1fr)`
    container.style.gridTemplateRows = `repeat(${squarePerSide}, 1fr)`

    for (let i = 0; i < squarePerSide * squarePerSide; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        //square.style.width = `${squareSize}px`
        //square.style.height = `${squareSize}px`

        // track darkness level [0 - 10]
        square.dataset.darkness =  0;

        // hover effect
        square.addEventListener('mouseover', () => {
            let darkness = Number(square.dataset.darkness)

            // 1st hover
            if (darkness === 0) {
                const {r, g, b} = getRandomColor();
                square.dataset.r = r;
                square.dataset.g = g;
                square.dataset.b = b;
            }

            if (darkness < 10) {
                darkness++;
                square.dataset.darkness = darkness;

                const r = square.dataset.r;
                const g = square.dataset.g;
                const b = square.dataset.b;

                const shade = 1 - (darkness * 0.1)
                square.style.backgroundColor = `rgb(${r * shade}, ${g * shade}, ${b * shade})`;
                
            }
        });

        container.appendChild(square);
    }
}

// initial 16*16
createGrid(16);

// button listener
resize.addEventListener('click', () => {
    let userInput = prompt('squares per side(max 100): ')
    userInput = Number(userInput)

    if (isNaN(userInput) || userInput < 1) {
        alert('Please enter a valid number!')
        return;
    }

    if (userInput > 100) {
        alert('Max allowed is 100. Setting to 100')
        userInput = 100;
    }

    createGrid(userInput);
})

function getRandomColor () {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return {r, g, b};
}