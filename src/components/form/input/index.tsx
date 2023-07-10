import React from 'react'

import styles from './styles.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ComponentType;
  hasError?: boolean;
  name: string;
}

export default class Input extends React.Component<InputProps> {  
  render() {
    const { icon: Icon, hasError, ...rest } = this.props

    return (
      <div className={`${styles.container} ${hasError ? styles.errored : ''}`}>
        <Icon />
        <input {...rest} />
      </div>
    )
  }
}


