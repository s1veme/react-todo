import {useRef, useState} from "react"
import {SortType, TaskType} from "./types"

import styles from './styles.module.scss'
import {UiInput} from "./components/shared/ui-input/UiInput.tsx"
import {UiButton} from "./components/shared"
import {TodoTask} from "./components/todo/task/TodoTask.tsx"
import {TodoFilter} from "./components/todo/sort/TodoSort.tsx"

export const App = () => {
	const [tasks, setTasks] = useState<TaskType[]>(JSON.parse(localStorage.getItem('tasks') ?? '[]'))
	const [title, setTitle] = useState('')
	const [localSort, setLocalSort] = useState<SortType>('alphaAsc')

	const allCompletedCount = tasks.filter(task => task.status === 'done').length
	const uncompletedCount = tasks.filter(task => task.status === 'todo').length
	const allCount = tasks.length

	const containerRef = useRef<HTMLDivElement>(null)

	const setLocalStorageTasks = (updatedTasks: TaskType[]) => {
		localStorage.setItem('tasks', JSON.stringify(updatedTasks))
	}

	const handleSort = (sort: SortType) => {
		setLocalSort(sort)

		switch (sort) {
			case 'alphaAsc':
				setTasks([...tasks.sort((a, b) => a.title.localeCompare(b.title))])
				break
			case 'alphaDesc':
				setTasks([...tasks.sort((a, b) => b.title.localeCompare(a.title))])
				break
			case 'newAsc':
				setTasks([...tasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())])
				break
			case 'newDesc':
				setTasks([...tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())])
				break
			default:
				break
		}
	}

	const handleTaskAdd = () => {
		const newTask: TaskType = {
			title: title,
			createdAt: new Date().toString(),
			uuid: window.crypto.randomUUID(),
			status: 'todo',
		}

		const updatedTasks: Array<TaskType> = [...tasks, newTask]
		setTasks(updatedTasks)
		setLocalStorageTasks(updatedTasks)
		setTitle('')
	}

	const handleTaskComplete = (task: TaskType) => {
		const updatedTasks: Array<TaskType> = tasks.map((_task) => {
			if (_task.uuid === task.uuid) {
				return {
					..._task,
					status: _task.status === 'todo' ? 'done' : 'todo',
				}
			}
			return _task
		})

		setTasks(updatedTasks)
		setLocalStorageTasks(updatedTasks)
	}

	const handleTaskRemove = (task: TaskType) => {
		const updatedTasks = tasks.filter((_task) => _task.uuid !== task.uuid)

		setTasks(updatedTasks)
		setLocalStorageTasks(updatedTasks)
	}

	const handleTasksClear = () => {
		setTasks([])

		setLocalStorageTasks([])
	}

	return (
		<div className={styles.app}>
			<div className={styles.container} ref={containerRef}>
				<header className={styles.app__header}>
					<h1>Список дел</h1>
				</header>

				<div className={styles['app__content']}>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className={styles['app__content-top']}>
							<UiInput value={title} onChange={(e) => setTitle(e.target.value)} />

							<UiButton onClick={handleTaskAdd} disabled={!title}>
								Создать
							</UiButton>

							<UiButton appearance="secondary" disabled={!tasks.length} onClick={handleTasksClear}>
								Отчистить
							</UiButton>
						</div>

						<div className={styles['tasks-container']}>
							<div className={styles['app__content-tasks']}>
								{tasks.map((task) => (
									<TodoTask
										key={task.uuid}
										task={task}
										onRemove={handleTaskRemove}
										onComplete={handleTaskComplete}
									/>
								))}
							</div>

							<hr />

							<div className={styles['app__content-summary']}>
								<div>
									Сделано ({allCompletedCount})
								</div>

								<div>
									Не сделано ({uncompletedCount})
								</div>

								<div>
									<TodoFilter sort={localSort} onSort={handleSort}>
										Все ({allCount})

										<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M16 18L16 6M16 6L20 10.125M16 6L12 10.125" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M8 6L8 18M8 18L12 13.875M8 18L4 13.875" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</TodoFilter>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}