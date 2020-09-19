import * as functions from 'firebase-functions'
import { CodeGenerator } from './code-generator'

export const onStairCreated = functions.firestore.document('stairs/{stairId}').onCreate(change => {
  const codeGenerator = new CodeGenerator({
    provide(): number {
      return Math.random()
    }
  })

  const code = codeGenerator.generate()
  return change.ref.set(
    {
      code: code.toString()
    },
    { merge: true }
  )
})
