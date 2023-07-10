import React from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, NotePencil } from '@phosphor-icons/react'

import styles from './styles.module.scss'

import * as dayjs from 'dayjs'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import isToday from 'dayjs/plugin/isToday'
import EditModal from '../edit-modal'

type TodoCardProps = {
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  id: string;
}

dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.extend(isToday)

export default class TodoCard extends React.Component<TodoCardProps> {
  state = {
    deadlineMessage: '',
    cardColor: '',
  }

  componentDidMount() {
    const { deadline } = this.props

    if (dayjs(deadline).isAfter(dayjs(), 'day')) {
      this.setState({ cardColor: '#5856D6' })

      if(dayjs(deadline).isTomorrow()) {
        return this.setState({ deadlineMessage: 'Amanhã' })
      }

      this.setState({ deadlineMessage: dayjs(deadline).format('DD/MM/YYYY') })
    } else if (dayjs(deadline).isToday()) {
      this.setState({ 
        deadlineMessage: 'Hoje',
        cardColor: '#0BB3FF',
      })
    } else if (dayjs(deadline).isBefore(dayjs(), 'day')) {
      this.setState({ cardColor: '#FF3B30' })

      if (dayjs(deadline).isYesterday()) {
        return this.setState({ deadlineMessage: 'Ontem' })
      }

      this.setState({ deadlineMessage: dayjs(deadline).format('DD/MM/YYYY') })
    }
  }

  render() {
    const { title, description, completed, id } = this.props
    const { deadlineMessage, cardColor } = this.state

    return (
      <div className={styles.container} style={{ background: cardColor }}>
        <Checkbox.Root className={styles.CheckboxRoot} title="Marcar/Desmarcar">
          <Checkbox.Indicator className={styles.CheckboxIndicator}>
            <Check />
          </Checkbox.Indicator>
        </Checkbox.Root>

        <div className={styles.todoData} data-todo-completed={completed}>
          <h3>{title}</h3>
          <p>{description}</p>
          <span>{deadlineMessage}</span>
        </div>

        <EditModal
          trigger={
            <button type="button" className={styles.editButton}>
              <NotePencil />
            </button>
          }
          todoId={id}
        />
      </div>
    )
  }
}
