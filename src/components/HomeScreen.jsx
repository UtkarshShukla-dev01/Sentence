import React from 'react'

const HomeScreen = ({ onStart }) => {
  return (
    <div className="home-screen">
      <div className="game-title">
        <h1>SentenceCraft</h1>
        <p className="subtitle">Master Language Through Interactive Challenges</p>
      </div>
      
      <div className="game-description">
        <p>Fill in the blanks, enhance your vocabulary, and improve your language skills!</p>
      </div>

      <button className="start-button" onClick={onStart}>
        Start Game
      </button>
    </div>
  )
}

export default HomeScreen