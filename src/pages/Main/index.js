import './style.css';
import Cards from '../../cards.js';
import logo from '../../assets/Vector.svg';
import cardBack from '../../assets/card-back.png';
import { useState } from 'react';
import congrats from '../../assets/congrats.png';

function Main() {

  const [listCards, setListCards] = useState(Cards);

  function handleResetAll() {

    const localList = [];

    const cardList = [...Cards];

    cardList.forEach(function (card) {
      card.turned = false;
    })

    for (let cont = 0; cont < 12; cont++) {
      const sortedNumber = parseInt(Math.random() * cardList.length);
      const sortedCard = cardList.splice(sortedNumber, 1);
      localList.push(sortedCard[0]);
    }

    setListCards(localList);
  }

  function handleTurnCard(id) {

    let localList = [...listCards];

    const selectedCard = localList.find(function (card) {
      return card.id === id;
    })

    const turnedCard = localList.find(function (card) {
      return card.turned;
    })

    if (selectedCard.turned) {
      return;
    }

    selectedCard.turned = !selectedCard.turned;

    if (turnedCard) {
      if (turnedCard.slug === selectedCard.slug) {
        setTimeout(() => {

          localList = localList.filter(function (card) {
            return card.id !== selectedCard.id && card.id !== turnedCard.id;

          })

          setListCards(localList);
          return
        }, 2000);

      } else {
        setTimeout(() => {
          selectedCard.turned = false;
          turnedCard.turned = false;
          setListCards([...localList]);

        }, 2000)
        setListCards(localList);
      }

    }

    setListCards(localList);

  }


  return (
    <div className='container'>
      <div className='sideBar'>
        <img className='logo' src={logo} alt='Logo' />
        <h2 className='title'>CUBOS PUZZLE</h2>
        <button className='btn-reset' onClick={handleResetAll}>RESET</button>
      </div>
      <div className='cardsField'>

        {listCards.length === 0 ? <img src={congrats} alt='congratulation' /> :
          listCards.map((card) => (
            <img
              key={card.id}
              className='imgCards'
              src={card.turned ? card.image : cardBack}
              onClick={() => handleTurnCard(card.id)}
              alt='Card' />
          ))
        }

      </div>
    </div>
  );
}

export default Main;
