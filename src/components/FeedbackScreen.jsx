function FeedbackScreen({ questions, userAnswers, score }) {
  return (
    <div className="feedback-container">
      <h2>Your Results</h2>
      <div className="score">Score: {score} out of {questions.length}</div>
      
      <div className="answers-review">
        {questions.map((question, index) => (
          <div key={index} className="question-review">
            <h3>Question {index + 1}</h3>
            <p className="question-text">{question.question}</p>
            <div className="answer-comparison">
              <div className="user-answer">
                <h4>Your Answer:</h4>
                <p>{userAnswers[index] ? userAnswers[index].join(', ') : 'Not attempted'}</p>
              </div>
              <div className="correct-answer">
                <h4>Correct Answer:</h4>
                <p>{question.correctAnswer.join(', ')}</p>
              </div>
            </div>
            <div className="status">
              {userAnswers[index] && 
                JSON.stringify(userAnswers[index]) === JSON.stringify(question.correctAnswer) 
                ? '✅ Correct' 
                : '❌ Incorrect'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedbackScreen