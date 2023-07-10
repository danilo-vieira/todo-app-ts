import React from 'react'

import styles from './styles.module.scss'

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  onFormSubmit: (data: any) => void;
  containerStyle?: React.CSSProperties;
}

export default class Form extends React.Component<FormProps> {
  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { onFormSubmit } = this.props

    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(data)

    onFormSubmit(formData)
  }
  
  render() {
    const { children, containerStyle } = this.props

    return (
      <form 
        className={styles.container}
        style={containerStyle}
        onSubmit={this.onSubmit}
      >
        {children}
      </form>
    )
  }
}
