import React from 'react'

import styles from './styles.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ComponentType;
  hasError?: boolean;
  name: string;
  defaultValue?: string;
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

  componentDidMount() {
    const { defaultValue } = this.props

    if (defaultValue) {
      this.elementRef.current!.value = defaultValue;

      this.setState({ filled: !!defaultValue });
    }
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
        { rest.type === 'date' && <span>{rest.placeholder}</span>}
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


