import Question from 'src/components/Question'
import PATH from 'src/utils/path'
import { useRouter } from 'next/router'
import AppLayout from 'src/components/Layout/AppLayout'
export default function singleQuestionPage ({ questions }) {
  const router = useRouter()
  const { id } = router.query

  // find the question with the id in the url
  const quest = questions[id]
  return (
    <>
      <AppLayout>
        <Question
          key={quest.id}
          id={quest.id}
          title={quest.title}
          answers={quest.answers}
          solution={quest.solution}
          creator={quest.creator}
          createdAt={quest.createdAt}
          likes={quest.likes}
          incorrect={quest.incorrect}
        />
      </AppLayout>
    </>
  )
}

export async function getServerSideProps () {
  const res = await fetch(PATH.API.QUESTIONS)
  const questions = await res.json()
  return { props: { questions } }
}
