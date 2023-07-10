import React from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

import styles from './styles.module.scss';

type RadioGroupProps = RadixRadioGroup.RadioGroupProps & {
  title: string;
  containerStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export default class RadioGroup extends React.Component<RadioGroupProps> {
  render() {
    const { containerStyle, title, children, ...rest } = this.props;

    return (
      <form className={styles.container} style={containerStyle}>
        <h2 className={styles.title}>{title}</h2>

        <RadixRadioGroup.Root className={styles.RadioGroupRoot} {...rest}>
          {children}
        </RadixRadioGroup.Root>
      </form>
    )
  }
}
