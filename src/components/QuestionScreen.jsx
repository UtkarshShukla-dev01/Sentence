import { useState, useEffect } from 'react'

function QuestionScreen({ 
  question,
  questions,
  currentQuestion,
  setCurrentQuestion, 
  userAnswers, 
  setUserAnswers, 
  setIsGameComplete,
  setScore,
  totalQuestions 
}) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [selectedWords, setSelectedWords] = useState([])
  const [blanks, setBlanks] = useState([])

  useEffect(() => {
    if (!question) return
    setBlanks(new Array(question.correctAnswer.length).fill(''))
    setSelectedWords([])
    setTimeLeft(30)
  }, [question])

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleWordClick = (word, index) => {
    const emptyBlankIndex = blanks.findIndex(blank => blank === '')
    if (emptyBlankIndex !== -1) {
      const newBlanks = [...blanks]
      newBlanks[emptyBlankIndex] = word
      setBlanks(newBlanks)
      setSelectedWords([...selectedWords, index])
    }
  }

  const handleBlankClick = (index) => {
    if (blanks[index] !== '') {
      const wordIndex = selectedWords[index]
      const newSelectedWords = selectedWords.filter((_, i) => i !== index)
      const newBlanks = [...blanks]
      newBlanks[index] = ''
      setBlanks(newBlanks)
      setSelectedWords(newSelectedWords)
    }
  }

  const handleNext = () => {
    // Save current answers even if incomplete
    const currentAnswers = [...userAnswers]
    currentAnswers[currentQuestion] = blanks
    setUserAnswers(currentAnswers)

    if (currentQuestion + 1 === totalQuestions) {
      handleSubmit()
    } else {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      // Save current answers before going back
      const currentAnswers = [...userAnswers]
      currentAnswers[currentQuestion] = blanks
      setUserAnswers(currentAnswers)
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Save final answers
    const finalAnswers = [...userAnswers]
    finalAnswers[currentQuestion] = blanks
    setUserAnswers(finalAnswers)

    // Calculate score
    let correctCount = 0
    finalAnswers.forEach((answer, index) => {
      if (answer && answer.length > 0) {
        const isCorrect = JSON.stringify(answer) === JSON.stringify(questions[index].correctAnswer)
        if (isCorrect) correctCount++
      }
    })
    
    setScore(correctCount)
    setIsGameComplete(true)
  }

  if (!question) return <div>Loading...</div>

  return (
    <div className="question-container">
      <div className="question-header">
        <div className="timer">Time left: {timeLeft}s</div>
        <div className="question-counter">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>
      <div className="sentence">
        {question.question.split('_____________').map((part, index) => (
          <span key={index}>
            {part}
            {index < blanks.length && (
              <span 
                className={`blank ${blanks[index] ? 'filled' : ''}`}
                onClick={() => handleBlankClick(index)}
              >
                {blanks[index] || '____'}
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="word-options">
        {question.options.map((word, index) => (
          <button
            key={index}
            className={`word ${selectedWords.includes(index) ? 'selected' : ''}`}
            onClick={() => handleWordClick(word, index)}
            disabled={selectedWords.includes(index)}
          >
            {word}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
        {!blanks.includes('') && (
          currentQuestion + 1 === totalQuestions ? (
            <button 
              className="submit-button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button 
              className="nav-button"
              onClick={handleNext}
            >
              Next
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default QuestionScreen