import React from 'react'

import styles from './styles.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ComponentType;
  hasError?: boolean;
  name: string;
}

type InputState = {
  filled: boolean;
}

export default class Input extends React.Component<InputProps, InputState> {
  elementRef: React.RefObject<HTMLInputElement>;

  constructor(props: InputProps) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      filled: false,
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filled: !!e.target.value })
  }

  render() {
    const { icon: Icon, hasError, ...rest } = this.props
    const { filled } = this.state

    return (
      <div
        onClick={() => this.elementRef.current?.focus()}
        className={`${styles.container} ${hasError ? styles.errored : ''}`}
      >
        <Icon />
        <input 
          {...rest}
          onChange={this.onChange} 
          data-has-value={filled} 
          ref={this.elementRef} 
        />
      </div>
    )
  }
}


