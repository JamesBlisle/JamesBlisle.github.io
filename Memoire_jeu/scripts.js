const cards = document.querySelectorAll('.memory-card');
var compte = 0;
var comptEE= 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let verifshinra = document.getElementById("shinracomplet");
let verifgojo = document.getElementById("gojocomplet");
let verifjoker = document.getElementById("jokercomplet");
let verifbeni = document.getElementById("benimarucomplet");
let verifkaneki = document.getElementById("kanekicomplet");
let verifyuta = document.getElementById("yutacomplet");
var bravo = new Audio('nouv_img/adolla.mp3');
var felicitation = new Audio('origin_img/crimson.mp3');
var wow = new Audio('nouv_img/hollowpurple.mp3');
var waouh = new Audio('yutasound (1).mp3');
var jokerson = new Audio('nouv_img/jokesong.mp3');
var kansong = new Audio('kanekisong (1).mp3');
let mscore = document.getElementById("Score");
let essais = document.getElementById("EScore");

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
//Retourne la carte quand tu clique dessus grâce à la classe
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true; //S'il a retourné la carte, l'info de la première carte est assinée à la carte choisie
    firstCard = this;

    return;
  }

  // Après le deuxième clic
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; //Le framework, c'est l'image sur la carte. On l'utilise pour comparer les images.
  isMatch ? disableCards() : unflipCards(); //if (égale à l'autre), paralyse les cartes :(sinon), retourne les cartes pour voir leur dos
  if(isMatch == true) {
    compte++; //Si ce sont les mêmes cartes, le compte de paires est augmenté et on change le score pour ajouter le compte
    let paires = document.getElementById("h1p");
    paires.innerHTML = compte + " / 6";
    if (compte == 6) {
      let victoire = [{transform:"rotate(3600deg)"}];
      paires.animate(victoire, 5000);
      verifbeni.animate(victoire, 7000);
      verifshinra.animate(victoire, 5500);
      verifgojo.animate(victoire, 6000);
      verifjoker.animate(victoire, 6500);
      verifkaneki.animate(victoire, 7500);
      verifyuta.animate(victoire, 8000);
      
    }
    
  }
  else {
    comptEE++;
    let containessais = document.getElementById("scoreActuel");
    let essais = document.getElementById("h1e");
    essais.innerHTML = comptEE;
    let recommence = [{transform:"translateY(50px)"}];
    essais.animate(recommence, 750);
  }
}

function disableCards() {
  for (let i = 0; i < 6; i++) {
    if (firstCard.dataset.framework == verifbeni.dataset.framework) {
      verifbeni.classList.remove("cache");
      
      felicitation.play();
    }
    else if (firstCard.dataset.framework == verifgojo.dataset.framework) {
      verifgojo.classList.remove("cache");
      wow.play();
    }
    else if (firstCard.dataset.framework == verifkaneki.dataset.framework) {
      verifkaneki.classList.remove("cache");
      kansong.play();
    }
    else if (firstCard.dataset.framework == verifyuta.dataset.framework) {
      verifyuta.classList.remove("cache");
      waouh.play();
    }
    else if (firstCard.dataset.framework == verifshinra.dataset.framework) {
      verifshinra.classList.remove("cache");
      bravo.play();
    }
    else if (firstCard.dataset.framework == verifjoker.dataset.framework) {
      verifjoker.classList.remove("cache");
      jokerson.play();
    }
  }
  
  firstCard.removeEventListener('click', flipCard); //Met les cartes hors d'état de nuire, désactive la réponse au clic sur la carte.
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  
}

function unflipCards() {
  lockBoard = true;
//Active l'invincibilité des cartes, ce qui ne peux pas nous permettre de les retourner
  setTimeout(() => {
    firstCard.classList.remove('flip'); //Retire la classe qui permet de tourner les cartes
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500); //Chaque une seconde et demie
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;  //permet de mélanger les cartes au lieu de les placer en ordre
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));  //retourne la carte si tu clique dessus

