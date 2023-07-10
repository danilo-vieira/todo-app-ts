import React from 'react'

import styles from './styles.module.scss'

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void;
}

export default class Form extends React.Component<FormProps> {
  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { onSubmit } = this.props

    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(data)

    onSubmit(formData)
  }
  
  render() {
    const { children } = this.props

    return (
      <form 
        className={styles.container}
        onSubmit={this.onSubmit}
      >
        {children}
      </form>
    )
  }
}
