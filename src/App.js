import React, { useEffect, useState } from 'react';
import './App.css';
import './components/Button/button.css';
import SingleCard from './components/Card/card';

const cardImages = [
  { 'src':'/img/img1.png', matched: false },
  { 'src':'/img/img2.png', matched: false },
  { 'src':'/img/img3.png', matched: false },
  { 'src':'/img/img4.png', matched: false },
  { 'src':'/img/img5.png', matched: false },
  { 'src':'/img/img6.png', matched: false },
  { 'src':'/img/img7.png', matched: false },
  { 'src':'/img/img8.png', matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  // shuffle cards.
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  };

  // handle choice.
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  // compare two selected cards.
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)


  // reset choices and increase turn.
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically.
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <div className='box'>
        <h1>Memory Game</h1>
        <div><button className='button' onClick={shuffleCards}>START</button></div>
        <div><p className='turns-button'>TURNS: {turns}</p></div>
      </div>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;