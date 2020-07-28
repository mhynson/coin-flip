const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
  *  Logic for changing the game state
  */
const handleGameState = ( target ) => {
  // Grab the id for the next game state container
  const nextStepId = (target.dataset && target.dataset.nextStep) || false;
  if (nextStepId) {
    // Hide all game state containers
    $$('.game-state').forEach(el => {
      el.classList.add('invisible');
    });

    // Show the next game state container
    const nextStepEl = $(`#${nextStepId}`);
    nextStepEl.classList.remove('invisible');
  }
};

/**
  * Logic for game play
  */
const handleCoinSelection = ( target ) => {
  const chosenCoinSide = (target.dataset && target.dataset.coinSide) || false;
  if (chosenCoinSide) {
    
    // "Flip" the coin
    const coinResults = flipCoin(chosenCoinSide);

    // Display results to user
    $('#chosen-coin-side').innerText = chosenCoinSide;
    $('#coin-results').innerText = coinResults;

    const displayMsg = (coinResults === chosenCoinSide) ? 'You are a winner! Good choice!' : 'Sorry, but it went the other way.'
    $('#win-results').innerText = displayMsg;
  }
};

/**
 * Flip coin logic
 *  - "Flips" the coin and returns the result
 */
// 
function flipCoin( chosenSide ) {
  let coinResult = null;
  
  const randomNum = Math.random();
  if (randomNum < 0.5) {
    coinResult = "heads";
  } else {
    coinResult = "tails";
  }

  return coinResult;
}
  
/**
 * DOM Ready
 */
function DOMReady() {
  // Button logic
  const buttons = $$('.button');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      const target = e.target;
      const buttonText = target.innerText;

      // Handle the game state, if needed.
      handleGameState(target);

      // Handle the coin selection, if needed.
      handleCoinSelection(target);
      
    });
  });
}

document.addEventListener("DOMContentLoaded", DOMReady);