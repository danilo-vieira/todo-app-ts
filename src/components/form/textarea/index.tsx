import React from 'react'

import styles from './styles.module.scss'

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  icon: React.ComponentType;
  hasError?: boolean;
  name: string;
}

export default class TextArea extends React.Component<TextAreaProps> {
  elementRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: TextAreaProps) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      value: ''
    }
  }

  

  componentDidUpdate() {
    this.elementRef.current!.style.height = '0px';
    const scrollHeight = this.elementRef.current!.scrollHeight;

    this.elementRef.current!.style.height = `${scrollHeight}px`;
  }
  
  render() {
    const { icon: Icon, hasError, ...rest } = this.props

    return (
      <div 
        onClick={() => this.elementRef.current?.focus()} 
        className={`${styles.container} ${hasError ? styles.errored : ''}`}
      >
        <Icon />
        <textarea 
          onChange={ e => this.setState({ value: e.target.value }) } 
          ref={this.elementRef} {...rest} 
          rows={1} 
          maxLength={250} 
        />
      </div>
    )
  }
}
