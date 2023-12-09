var cardIndex = 0;

const query = document.querySelectorAll.bind(document);;

const messageBtnSelector = '.entry-point';

const sortBtnSelector = '.mn-connections__actions-container button';

const sortOptionSelector = '.artdeco-dropdown__content-inner li';

const cardDropdownSelector = 'button.mn-connection-card__dropdown-trigger';

const cardDropdownItemSelector = '.mn-connection-card__dropdown-item button';

const documentModalBtnSelector = '.artdeco-modal__actionbar--confirm-dialog button.artdeco-button--primary';

const removeButtonSelector = '.remove-connection-btn';

const removeButtonStyle = 'remove-connection-btn artdeco-button artdeco-button--2 artdeco-button--primary ember-view';

function addSortListener() {
  query(sortBtnSelector)[0].addEventListener('click', function() {
    setTimeout(function(){

      query(sortOptionSelector).forEach(sortBtn => {
        sortBtn.addEventListener('click', function(){

          console.log('Sort clicked', sortBtn);
          cardIndex = 0;
          start();

        }, 1000);
      })


    }, 500);
  })
}

function remove(card) {
  console.log("Card", card);
  console.log("Triggering connection card dropdown");

  card.querySelectorAll(cardDropdownSelector)[0].click();

  const cardDropdownItemInterval = setInterval(function(){
    if (query(cardDropdownItemSelector).length > 0) {
      query(cardDropdownItemSelector)[0].click();
      console.log("Card dropdown item clicked");
      clearInterval(cardDropdownItemInterval);
    }
  }, 10);

  const documentModalBtnInterval = setInterval(function(){
    if (query(documentModalBtnSelector).length > 0) {
      query(documentModalBtnSelector)[0].click();
      console.log("Doc modal button clicked");
      clearInterval(documentModalBtnInterval);
      cardIndex--;
    }
  }, 10);
}

function addRemoveButton(card) {
  console.log("Adding remove button", card.querySelector(removeButtonSelector));
  if (card.querySelector(removeButtonSelector) != null) {
    return
  }
  const btn = document.createElement("button");
  btn.className = removeButtonStyle;
  btn.innerHTML = "Remove";
  card.querySelector(".mn-connection-card__action-container").appendChild(btn);
  console.log("Remove button added successfully");
}

function run() {
  const cards = query(".mn-connection-card")
  console.log("Total cards: ", cards.length)
  if (cards.length-1 <= cardIndex) {
    return
  }

  while(cardIndex < cards.length) {
    const c = cards[cardIndex]
    addRemoveButton(c)
    c.querySelectorAll(messageBtnSelector).forEach(e => {e.style.display='none'});
    c.querySelectorAll(cardDropdownSelector).forEach(e => {e.style.display='none'});
    c.querySelectorAll(removeButtonSelector).forEach(e => e.addEventListener('click', () => remove(c)));
    cardIndex++
  }
}


function start() {
  const interval = setInterval(function(){
    const connectionCards = query(".mn-connection-card")
    const actionContainer = query(".mn-connections__actions-container")
    if (connectionCards.length > 0 && actionContainer.length > 0) {
      console.log("Document loaded");
      clearInterval(interval);
      addSortListener();
      run();
    }
  }, 100);
}

// check new connection cards every 10 seconds
const cardsInterval = setInterval(function(){
  const connectionCards = query(".mn-connection-card")
  if (connectionCards.length-1 > cardIndex) {
    run()
  }
}, 10000);


start();
