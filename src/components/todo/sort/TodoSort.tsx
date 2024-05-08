import {SortType} from "../../../types"
import {PropsWithChildren, useEffect, useRef, useState} from "react"
import cb from "classnames/bind";
import styles from "./styles.module.scss";

interface TodoFilterProps {
	sort: SortType
	onSort: (sort: SortType) => void
}

const classBind = cb.bind(styles)

const sortOptions: Array<{ value: SortType, label: string }> = [
	{ value: 'newAsc', label: 'Сначала новые' },
	{ value: 'newDesc', label: 'Сначала старые' },
	{ value: 'alphaAsc', label: 'А-я' },
	{ value: 'alphaDesc', label: 'Я-а' }
];

export const TodoFilter = ({ sort, onSort, children }: PropsWithChildren<TodoFilterProps>) => {
	const [isVisible, setIsVisible] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const handleVisibleToggle = () => {
		setIsVisible(!isVisible)
	}

	const handleSort = (sortValue: SortType) => {
		onSort(sortValue)

		setIsVisible(false)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsVisible(false)
			}
		}

		document.addEventListener('click', handleClickOutside, { capture: true })

		return () => {
			document.removeEventListener('click', handleClickOutside, { capture: true })
		}
	}, [])

	return (
		<div className={styles['todo-filter']} ref={containerRef}>
			<button type="button" className={styles['todo-filter__trigger']} onClick={handleVisibleToggle}>
				{children}
			</button>

			{isVisible && (
				<div className={styles['todo-filter__content']}>
					<ul>
						{sortOptions.map(option => (
							<li
								key={option.value}
								onClick={() => handleSort(option.value)}
								className={classBind('todo-filter__sort', {active: sort === option.value})}
							>
								{option.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}