import * as functions from 'firebase-functions'
import { CodeGenerator } from './code-generator'

export const onStairCreated = functions.firestore.document('stairs/{stairId}').onUpdate(change => {
  const data = change.after.data() as { code: string } | undefined
  console.log({ data })

  if (data?.code !== undefined) {
    return null
  }

  const codeGenerator = new CodeGenerator({
    provide(): number {
      return Math.random()
    }
  })

  const code = codeGenerator.generate()
  console.log({ code })
  return change.after.ref.set(
    {
      code
    },
    { merge: true }
  )
})
