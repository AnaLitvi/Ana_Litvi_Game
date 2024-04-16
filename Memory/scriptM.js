const arrayAnimali  = ['&#x1f431;', '&#x1f989;', '&#x1f43e;', 
                     '&#x1f984;', '&#x1f98b;', '&#x1f41b;', 
                     '&#x1f41d;', '&#x1f42c;', '&#x1f431;',
                     '&#x1f989;', '&#x1f43e;', '&#x1f984;', 
                     '&#x1f98b;', '&#x1f41b;', '&#x1f41d;','&#x1f42c;'];

////////////////-------da cambiare le icone----///////////////////
function shuffle(a) {
let currentIndex = a.length;
let temporaryValue, randomIndex;

while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = a[currentIndex];
    a[currentIndex] = a[randomIndex];
    a[randomIndex] = temporaryValue;
}
return a;
}


/////////////////////////

let interval;
/*creiamo la variabile globale interval 
per poterla poi ripulire ogni volta che si inizia il gioco.*/

function startTimer() {
  let seconds = 0;
  let minutes = 0;

  interval = setInterval(() => {
    timer.innerHTML = `Tempo: ${minutes} min ${seconds} sec`;
    seconds++;

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }

    if (minutes === 60) {
      minutes = 0;
    }
  }, 1000);
}

//////////////////

function startGame() {
    clearInterval(interval);
    arrayComparison.length = 0;

    const arrayShuffle = shuffle(arrayAnimali);

    const lista = document.getElementById('griglia');
    while (lista.hasChildNodes()) {
      lista.removeChild(lista.firstChild);
    }

    for (let i = 0; i < 16; i++) {
      const box = document.createElement('div');
      const element = document.createElement('div');
      element.className = 'icon';
      document.getElementById('griglia').appendChild(box).appendChild(element);
      element.innerHTML = arrayShuffle[i];
    }

    startTimer();

    const icon = document.getElementsByClassName("icon");
    const icons = [...icon];

    for (let i = 0; i < icons.length; i++) {
      icons[i].addEventListener("click", displayIcon);
      icons[i].addEventListener("click", openModal);
    }
  }


  document.body.onload = startGame();



  ////////////////////

  function displayIcon() {
    const icon = document.getElementsByClassName("icon");
    const icons = [...icon];

    this.classList.toggle("show");
    arrayComparison.push(this);

    const len = arrayComparison.length;
    if (len === 2) {
      if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
        arrayComparison[0].classList.add("find", "disabled");
        arrayComparison[1].classList.add("find", "disabled");
        arrayComparison.length = 0;
      } else {
        icons.forEach(function (item) {
          item.classList.add('disabled');
        });
        setTimeout(function () {
          arrayComparison[0].classList.remove("show");
          arrayComparison[1].classList.remove("show");
          icons.forEach(function (item) {
            item.classList.remove('disabled');
            for (let i = 0; i < iconsFind.length; i++) {
              iconsFind[i].classList.add("disabled");
            }
          });
          arrayComparison.length = 0;
        }, 700);
      }
    }
  }

  ////////////////


  const modal = document.getElementById("modal");
const timer = document.querySelector(".timer");

function openModal() {
    if (iconsFind.length === 16) {
      clearInterval(interval);
      modal.classList.add("active");
      document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
      closeModal();
    }
  }

 function closeModal() {
    closeicon.addEventListener("click", function (e) {
      modal.classList.remove("active");
      startGame();
    });
  }


  function playAgain(){
    modal.classList.remove("active");
    startGame();
  }
  



