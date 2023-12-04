const cards = document.querySelectorAll('.memory-card');
var compte = 0;
var comptEE= 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


let mscore = document.getElementById("Score");
let essais = document.getElementById("EScore")

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
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards(); //if (égale à l'autre), paralyse les cartes :(sinon), retourne les cartes pour voir leur dos
  if(isMatch == true) {
    compte++; //Si ce sont les mêmes cartes, le compte de paires est augmenté et on change le score pour ajouter le compte
    let containscore = document.getElementById("meilleurScore");
    let paires = document.getElementById("h1p");
    paires.innerHTML = compte + " / 6";
    if (compte == 6) {
      let rotation = [{transform:"rotate(3600deg)"}];
      paires.animate(rotation, 5000);
    }
  }
  else {
    comptEE++;
    let containessais = document.getElementById("scoreActuel");
    let essais = document.getElementById("h1e");
    essais.innerHTML = comptEE;
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard); //Met les cartes hors d'état de nuire, les désactive.
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

