export type TaskType = {
  createdAt: string
  uuid: string
  title: string
  status: 'done' | 'todo' | 'inProgress'
}

export type SortType = 'newAsc' | 'newDesc' | 'alphaAsc' | 'alphaDesc'
