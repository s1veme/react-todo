import { InputHTMLAttributes } from "react"

import styles from './styles.module.scss'

export const UiInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return <input className={styles['ui-input']} {...props} />
}
