export class Tree<T> {
  content: T
  children?: Tree<T>[]
  
  constructor (content: T, children?: Tree<T>[]) {
    this.content = content
    this.children = children ?? []
  }
}

export class Task {
  static idCounter: number = 0
  id: number
  title: string
  completed: boolean
  description?: string
  
  constructor (title: string, description?: string, completed?: boolean) {
    this.id = Task.idCounter++
    this.title = title
    this.completed = completed ?? false
    this.description = description
  }
}
