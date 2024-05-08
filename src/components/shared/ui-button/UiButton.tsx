import {ButtonHTMLAttributes} from 'react';
import cb from 'classnames/bind'
import styles from './styles.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	appearance?: 'primary' | 'secondary' | 'text'
	disabled?: boolean
	onClick?: () => void
}

const classBind = cb.bind(styles)

export const UiButton = ({
	appearance = 'primary',
	children,
	...restProps
}: IButtonProps ) => {
	const classes = classBind('ui-button', `ui-button--${appearance}`)

	return (
		<button className={classes} {...restProps}>
			<span className={styles['ui-button__content']}>{ children }</span>
		</button>
	)
}