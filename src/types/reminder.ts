export interface Reminder {
  id: number
  title: string
  completed: boolean
  description?: string | null
  date?: string | null
  userid?: string
}
