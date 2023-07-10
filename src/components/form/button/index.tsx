import React from 'react'

import styles from './styles.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button className={styles.container} {...this.props} />
    )
  }
}
