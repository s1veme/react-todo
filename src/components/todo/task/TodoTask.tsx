import cb from 'classnames/bind'
import {TaskType} from "../../../types"
import {UiButton} from "../../shared"
import styles from './styles.module.scss'

interface TodoTaskProps {
	task: TaskType
	onRemove: (task: TaskType) => void
	onComplete: (task: TaskType) => void
}

const classBind = cb.bind(styles)

export const TodoTask  = ({ task, onRemove, onComplete }: TodoTaskProps) => {
	const classes = classBind('todo-task', `todo-task--${task.status}`)

	const formattedDate = new Date(task.createdAt).toISOString().slice(0, 10)

	const handleRemove = () => {
		onRemove(task)
	}

	const handleComplete = () => {
		onComplete(task)
	}

	return (
		<div className={classes}>
			<div className={styles['todo-task__left']} onClick={handleComplete}>
				<UiButton appearance="text" className={styles['todo-task__complete-icon']}>
					<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</UiButton>

				<div>
					<p className={styles['todo-task__title']}>{ task.title }</p>
					<p className={styles['todo-task__date']}>от { formattedDate }</p>
				</div>
			</div>

			<UiButton appearance="text" onClick={handleRemove}>
				<svg width="1em" height="1em" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3 21.32L21 3.32001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M3 3.32001L21 21.32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</UiButton>
		</div>
	)
}