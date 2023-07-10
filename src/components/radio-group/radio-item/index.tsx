import React from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

import styles from './styles.module.scss';

type RadioItemProps = {
  name: string;
  value: string;
}

export default class RadioItem extends React.Component<RadioItemProps> {
  render() {
    const { name, value } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label className={styles.Label}>
          <RadixRadioGroup.Item className={styles.RadioGroupItem} value={value}>
            <RadixRadioGroup.Indicator className={styles.RadioGroupIndicator} />
          </RadixRadioGroup.Item>
          {name}
        </label>
      </div>
    )
  }
}
