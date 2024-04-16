const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    let sequence = [];
    let userSequence = [];
    let level = 1;

    function generateRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    function showColorSequence() {
        sequence = [];
        hideColorOptions();
        hideMessage(); // Nascondi il messaggio "Gioco terminato!"

        for (let i = 0; i < level; i++) {
            const color = generateRandomColor();
            sequence.push(color);

            setTimeout(() => {
                const colorDisplay = document.getElementById('color-display');
                colorDisplay.style.backgroundColor = color;

                setTimeout(() => {
                    colorDisplay.style.backgroundColor = '#1b0718';
                    if (i === level - 1) {
                        setTimeout(() => {
                            showColorOptions();
                        }, 500);
                    }
                }, 1000);
            }, i * 1500);
        }
    }

    function hideColorOptions() {
        const colorOptionsContainer = document.getElementById('color-options');
        colorOptionsContainer.innerHTML = '';
    }

    function showColorOptions() {
        const colorOptionsContainer = document.getElementById('color-options');
        colorOptionsContainer.innerHTML = '';

        for (let i = 0; i < colors.length; i++) {
            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box');
            colorBox.style.backgroundColor = colors[i];

            colorBox.addEventListener('click', function () {
                handleColorClick(colors[i]);
            });

            colorOptionsContainer.appendChild(colorBox);
        }
    }

    function handleColorClick(selectedColor) {
        userSequence.push(selectedColor);

        if (userSequence.length === sequence.length) {
            if (arraysEqual(userSequence, sequence)) {
                level++;
                document.getElementById('level').textContent = `Livello: ${level}`;
                userSequence = [];
                setTimeout(() => {
                    showColorSequence();
                }, 1000);
            } else {
                endGame();
            }
        }
    }

    function arraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    function endGame() {
        const message = document.getElementById('message');
        message.textContent = `Gioco terminato! Punteggio finale: ${level - 1}`;
        showMessage(); // Mostra il messaggio "Gioco terminato!"
        resetGame();
    }

    function showMessage() {
        const message = document.getElementById('message');
        message.style.display = 'block';
    }

    function hideMessage() {
        const message = document.getElementById('message');
        message.style.display = 'none';
    }

    function resetGame() {
        level = 1;
        userSequence = [];
        document.getElementById('level').textContent = 'Livello: 1';
    }

    document.getElementById('start-button').addEventListener('click', function () {
        resetGame();
        showColorSequence();
    });