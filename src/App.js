import React from 'react';
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'

export default function App() {
    
    const [dice, setDice] = React.useState(allNewDice);
    const [tenzies, setTenzies] = React.useState(false);
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if(allHeld && allSameValue){
            setTenzies(true)
            console.log("You won!")                
        }
        
    }, [dice]);
    
    function allNewDice(){
        const diceArray = []
        for(let i=0; i< 10;i++){
            diceArray.push({ id: nanoid(), value: Math.ceil(Math.random()*6), isHeld: false});
        }
        return diceArray;
    }
    
    function holdDice(id){
        setDice(oldDice => 
            oldDice.map(die => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : {...die}
            })
        )
    }
    
    const diceElements = dice.map(die => {
        return (
            <Die 
                key={die.id} 
                value={die.value} 
                isHeld={die.isHeld} 
                holdDice={() => holdDice(die.id)}  
            />
        )
    });
    
    function reRoll(){
        setDice(oldDice => (
            oldDice.map(die => {
                return !die.isHeld ? {...die, value:Math.ceil(Math.random()*6)} : {...die}
            })
        ))
    }
    
    function newGame(){
        setDice(allNewDice)
        setTenzies(false)
    }
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice">
                {diceElements}
            </div>
            <button className="rollBtn" onClick={tenzies? newGame:reRoll}>{tenzies? "New Game" : "Roll"}</button>
        </main>
    )
}