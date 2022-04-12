import React from 'react'
import "./App.css"

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
}
  return (
    <div className='die' style={styles} onClick={props.holdFunction}>
      <h1 className="dieNumber">{props.value}</h1>
    </div>
  )
}
