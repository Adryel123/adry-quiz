/* eslint-disable react/prop-types */
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button'
import { useState } from 'react'

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  handleSubmit
}) {
  const questionId = `question__${questionIndex}`

  const [selected, setSelected] = useState(-1)

  return (
    <Widget>
      <Widget.Header>
        <h3>
          Pergunta
          {` ${questionIndex + 1} `}
          de
          {` ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        src={question.image}
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>{question.description}</p>

        <form onSubmit={e => {
          e.preventDefault()
          handleSubmit(selected)
        }}>

          {question.alternatives.map((alt, index) => {
            const alternativeID = `alternative__${questionId}${index}`
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeID}
                key={alternativeID}
              >
                <input
                  id={alternativeID}
                  type="radio"
                  name={questionId}
                  onChange={() => setSelected(index)}
                />
                {alt}
              </Widget.Topic>
            )
          })}

          <Button type="submit">Confirmar</Button>

        </form>

      </Widget.Content>
    </Widget>
  )
}

function ResultWidget({ pontuation, totalQuestions }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        Você acertou {pontuation} de {totalQuestions} questões!
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

export default function QuizPage() {
  const totalQuestions = db.questions.length

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [screenState, setScreenState] = useState(screenStates.QUIZ)

  const questionIndex = currentQuestion
  const question = db.questions[questionIndex]



  const [pontuation, setPontuation] = useState(0)

  function handleSubmit(userAnswer) {

    if (userAnswer === question.answer) {
      setPontuation(pontuation + 1)
    }

    const nextQuestion = questionIndex + 1

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>

        {screenState === screenStates.LOADING && (
          <LoadingWidget />
        )}


        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            handleSubmit={handleSubmit}
          />
        )}

        {screenState === screenStates.RESULT && (
          <ResultWidget
            pontuation={pontuation}
            totalQuestions={totalQuestions}
          />
        )}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Adryel123/adry-quiz" />
    </QuizBackground>
  )
}