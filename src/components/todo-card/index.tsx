import React from 'react'
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect } from 'react-redux'

import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, NotePencil } from '@phosphor-icons/react'

import { changeTodoStateAction } from '@/redux/actions/todos.actions';
import { RootState } from '@/redux/reducers/todos.reducer';

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
  changeTodoState: (todoId: string, state: boolean) => void;
}

dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.extend(isToday)

class TodoCard extends React.Component<TodoCardProps> {
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

  componentDidUpdate(prevProps: Readonly<TodoCardProps>) {
    const { deadline } = this.props

    if (prevProps.deadline !== this.props.deadline) {
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
  }

  onCheckedChange = (checkedState: boolean) => {
    const { changeTodoState, id } = this.props

    changeTodoState(id, checkedState);
  }

  render() {
    const { title, description, completed, id } = this.props
    const { deadlineMessage, cardColor } = this.state

    return (
      <div className={styles.container} style={{ background: cardColor }}>
        <Checkbox.Root 
          className={styles.CheckboxRoot} 
          title="Marcar/Desmarcar"
          checked={completed}
          onCheckedChange={this.onCheckedChange}
        >
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

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  changeTodoState: 
    (todoId: string, state: boolean) => dispatch(changeTodoStateAction(todoId, state)),
})

const WithRedux = connect(null, mapDispatchToProps)(TodoCard)

export default WithRedux
