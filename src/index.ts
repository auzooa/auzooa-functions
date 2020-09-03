import * as functions from 'firebase-functions'
import { CodeGenerator } from './code-generator'

export const onGameStart = functions.firestore.document('stairs/{stairId}').onUpdate(change => {
  const data = change.after.data() as { code: string } | undefined
  const previousData = change.before.data() as { code: string } | undefined

  if (data?.code === undefined || previousData?.code !== undefined) {
    return null
  }

  const codeGenerator = new CodeGenerator({
    provide(): number {
      return Math.random()
    }
  })

  return change.after.ref.set(
    {
      code: codeGenerator.generate()
    },
    { merge: true }
  )
})
