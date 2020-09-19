import * as functions from 'firebase-functions'
import { CodeGenerator } from './code-generator'

export const onStairCreated = functions.firestore.document('stairs/{stairId}').onCreate(change => {
  console.log({ change })
  const codeGenerator = new CodeGenerator({
    provide(): number {
      return Math.random()
    }
  })

  const code = codeGenerator.generate()
  console.log({ code })
  return change.ref.set(
    {
      code
    },
    { merge: true }
  )
})
