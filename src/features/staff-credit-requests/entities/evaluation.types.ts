export type Evaluation = {
  id: string
  clientId: string
  score?: number
  approved?: boolean
  factors?: Record<string, unknown>
  evaluatedAt?: string
  evaluationOutcome?: number
}

