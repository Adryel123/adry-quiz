import { useRouter } from 'next/router'
import { useState } from 'react'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'


export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    router.push(`/quiz?name=${name}`)
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            {db.description}
            <br />
            <br />
            <form onSubmit={handleSubmit} >
              <Input
                name="nomeDoUsuario"
                placeholder="Diz aí teu nome"
                onChange={e => setName(e.target.value)}
                value={name}
              />

              <Button
                type="submit"
                disabled={name.length === 0}
              >
                Jogar
              </Button>

            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Adryel123/adry-quiz" />
    </QuizBackground>
  )
}