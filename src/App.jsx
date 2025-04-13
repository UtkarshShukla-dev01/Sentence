import { useState } from 'react'
import QuestionScreen from './components/QuestionScreen'
import FeedbackScreen from './components/FeedbackScreen'
import HomeScreen from './components/HomeScreen'
import questionsData from './data/questions.json'
import './App.css'
import Footer from './components/Footer';

function App() {
  const [questions] = useState(questionsData.data.questions)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [showQuitDialog, setShowQuitDialog] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = () => {
    setGameStarted(true)
  }

  const handleQuit = () => {
    setShowQuitDialog(true)
  }

  const confirmQuit = () => {
    setIsGameComplete(true)
    setShowQuitDialog(false)
  }

  const cancelQuit = () => {
    setShowQuitDialog(false)
  }

  const returnToHome = () => {
    setGameStarted(false);
    setIsGameComplete(false);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <HomeScreen onStart={startGame} />
      ) : (
        <>
          {!isGameComplete && (
            <button className="quit-button" onClick={handleQuit}>
              Quit Quiz
            </button>
          )}
          
          {showQuitDialog && (
            <div className="dialog-overlay">
              <div className="quit-dialog">
                <h3>Are you sure you want to quit?</h3>
                <p>Your progress will be saved and scored.</p>
                <div className="dialog-buttons">
                  <button className="cancel-button" onClick={cancelQuit}>
                    Continue Quiz
                  </button>
                  <button className="confirm-button" onClick={confirmQuit}>
                    Quit & See Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isGameComplete ? (
            <QuestionScreen 
              question={questions[currentQuestion]}
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              setIsGameComplete={setIsGameComplete}
              setScore={setScore}
              totalQuestions={questions.length}
            />
          ) : (
            <>
              <button className="home-button" onClick={returnToHome}>
                Home
              </button>
              <FeedbackScreen 
                questions={questions}
                userAnswers={userAnswers}
                score={score}
              />
            </>
          )}
        </>
      )}
      <Footer />
    </div>
  )
}

export default App
