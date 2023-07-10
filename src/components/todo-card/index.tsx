import React from 'react'
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect } from 'react-redux'
import * as dateFns from 'date-fns'

import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, NotePencil } from '@phosphor-icons/react'

import EditModal from '../edit-modal'

import { changeTodoStateAction } from '@/redux/actions/todos.actions';
import { RootState } from '@/redux/reducers/todos.reducer';

import styles from './styles.module.scss'


type TodoCardProps = {
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  id: string;
  changeTodoState: (todoId: string, state: boolean) => void;
}

class TodoCard extends React.Component<TodoCardProps> {
  state = {
    deadlineMessage: '',
    cardColor: '',
  }

  componentDidMount() {
    const { deadline } = this.props

    const parsedDeadline = deadline.replace(/-/g, '/')

    if (dateFns.isAfter(new Date(parsedDeadline), new Date())) {
      this.setState({ cardColor: '#5856D6' })

      if(dateFns.isTomorrow(new Date(parsedDeadline))) {
        return this.setState({ deadlineMessage: 'Amanhã' })
      }

      this.setState({ deadlineMessage: dateFns.format(new Date(parsedDeadline), 'dd/MM/yyyy') })
    } else if (dateFns.isToday(new Date(parsedDeadline))) {
      this.setState({ 
        deadlineMessage: 'Hoje',
        cardColor: '#0BB3FF',
      })
    } else if (dateFns.isBefore(new Date(parsedDeadline), new Date())) {
      this.setState({ cardColor: '#FF3B30' })

      if (dateFns.isYesterday(new Date(parsedDeadline))) {
        return this.setState({ deadlineMessage: 'Ontem' })
      }

      this.setState({ deadlineMessage: dateFns.format(new Date(parsedDeadline), 'dd/MM/yyyy') })
    }
  }

  componentDidUpdate(prevProps: Readonly<TodoCardProps>) {
    const { deadline } = this.props

    if (prevProps.deadline !== this.props.deadline) {
      const parsedDeadline = deadline.replace(/-/g, '/')

      if (dateFns.isAfter(new Date(parsedDeadline), new Date())) {
        this.setState({ cardColor: '#5856D6' })

        if(dateFns.isTomorrow(new Date(parsedDeadline))) {
          return this.setState({ deadlineMessage: 'Amanhã' })
        }

        this.setState({ deadlineMessage: dateFns.format(new Date(parsedDeadline), 'dd/MM/yyyy') })
      } else if (dateFns.isToday(new Date(parsedDeadline))) {
        this.setState({ 
          deadlineMessage: 'Hoje',
          cardColor: '#0BB3FF',
        })
      } else if (dateFns.isBefore(new Date(parsedDeadline), new Date())) {
        this.setState({ cardColor: '#FF3B30' })

        if (dateFns.isYesterday(new Date(parsedDeadline))) {
          return this.setState({ deadlineMessage: 'Ontem' })
        }

        this.setState({ deadlineMessage: dateFns.format(new Date(parsedDeadline), 'dd/MM/yyyy') })
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
