import React from 'react'

import styles from './styles.module.scss'

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  icon: React.ComponentType;
  hasError?: boolean;
  name: string;
}

const textareaRef = React.createRef<HTMLTextAreaElement>()

export default class TextArea extends React.Component<TextAreaProps> {
  state = {
    value: ''
  }

  componentDidUpdate() {
    textareaRef.current!.style.height = '0px';
    const scrollHeight = textareaRef.current!.scrollHeight;

    textareaRef.current!.style.height = `${scrollHeight}px`;
  }
  
  render() {
    const { icon: Icon, hasError, ...rest } = this.props

    return (
      <div 
        onClick={() => textareaRef.current?.focus()} 
        className={`${styles.container} ${hasError ? styles.errored : ''}`}
      >
        <Icon />
        <textarea onChange={ e => this.setState({ value: e.target.value }) } ref={textareaRef} {...rest} rows={1} maxLength={250} />
      </div>
    )
  }
}
