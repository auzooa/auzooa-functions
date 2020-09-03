import { RandomProvider } from './random-provider'

export class CodeGenerator {
  constructor(private readonly randomProvider: RandomProvider) {}

  generate() {
    return Math.floor(
      this.randomProvider.provide() * 100_000 + this.randomProvider.provide() * 900_000
    )
  }
}
