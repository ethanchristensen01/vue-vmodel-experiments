export class Task {
  static idCounter: number = 0
  id: number
  title: string
  completed: boolean
  description?: string
  subtasks?: Task[]
  parentId?: number
  
  constructor (title: string, subtasks?: Task[], options?: {completed?: boolean, description?: string}) {
    this.id = Task.idCounter++
    this.title = title
    this.completed = options?.completed ?? false
    this.description = options?.description
    this.subtasks = subtasks
    this.subtasks?.forEach(t => t.parentId = this.id)
  }
  
  isAllComplete (): boolean {
    return this.completed && (!this.subtasks || this.subtasks.every(t => t.isAllComplete()))
  }
  
  reset () {
    this.completed = false
    this.subtasks?.forEach(t => t.reset())
  }
}
