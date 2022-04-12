import React, { useEffect, useState } from 'react'
import "./App.css"
import Die from './Die'
import {nanoid} from "nanoid"



export default function App() { 
    const [dice, setDice] = useState(createNumbers())
    const [tenzies, setTenzies] = useState(false)

    useEffect(()=>{
        const allHeld = dice.every(die=> die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die=> die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true) 
        }
    }, [dice])
    

    function generateNewDie(){
        return{
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function createNumbers(){ 
        const newArray = []
        for(var i=0; i<10; i++){
            newArray.push(generateNewDie())
        }
        return newArray
    }

    

    function hold(id){
        setDice(oldDice=> oldDice.map(die=>{
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }
   
    const diceNumbers = dice.map(die=> 
            <Die key={die.id} value={die.value} isHeld={die.isHeld} holdFunction={()=>hold(die.id)}/>
        )
  
    function newDice(){
        if(!tenzies){
            setDice(oldDice=> oldDice.map(die=>{
                return die.isHeld ?
                 die :
                 generateNewDie()
            }))
        } else{
            setTenzies(false)
            setDice(createNumbers())
        }
         
    }

  return (
    <div className="container">  
        <main>
            <div className='dieContainer'> 
                {diceNumbers}
            </div>
            <button onClick={newDice}>{tenzies? "New Game" : "Roll"}</button>
        </main> 
    </div>
  )
}
