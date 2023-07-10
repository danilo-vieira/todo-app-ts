import React from 'react'

import styles from './styles.module.scss'

class Header extends React.Component {
  render() {
    return (
      <header className={styles.container}>
        <h1>Todo app</h1>
      </header>
    )
  }
}

export default Header;
