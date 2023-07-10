import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '@/redux/reducers/todos.reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import * as z from 'zod'

import * as Dialog from '@radix-ui/react-dialog'
import { Calendar, FileText, Pencil, X } from '@phosphor-icons/react'

import { asyncEditTodoAction } from '@/redux/actions/todos.actions'
import parseZodErrors from '@/helpers/parseZodErrors'

import Form from '../form'
import Input from '../form/input'
import Button from '../form/button'

import styles from './styles.module.scss'

type EditModalProps = {
  trigger: React.ReactNode;
  todoId: string;
  todos: Todo[];
  editTodo: (todoId: string, formData: EditTodoFormData) => void;
  isEditing: boolean;
}

type EditModalState = {
  isOpen: boolean;
  defaultValues: {
    title: string;
    description: string;
    deadline: string;
  };
  errors: {
    title: string;
    description: string;
    deadline: string;
  }
}

const editTodoSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),
  description: z.string().nonempty({ message: 'A descrição não pode ser vazia' }),
  deadline: z.string().nonempty({ message: 'O prazo não pode ser vazio' }),
});

type EditTodoFormData = z.infer<typeof editTodoSchema>;

class EditModal extends React.Component<EditModalProps, EditModalState> {
  modalContainer: HTMLElement

  constructor(props: EditModalProps) {
    super(props)
    this.state = {
      isOpen: false,
      defaultValues: {
        title: '',
        description: '',
        deadline: '',
      },
      errors: {
        title: '',
        description: '',
        deadline: '',
      }
    }
    this.modalContainer = document.getElementById('modal-container')!
  }

  componentDidUpdate(_: any, prevState: Readonly<EditModalState>) {
    if (prevState.isOpen !== this.state.isOpen) {
      const { todoId, todos } = this.props
      const todo = todos.find(todo => todo.id === todoId)!

      this.setState({
        defaultValues: {
          title: todo.title,
          description: todo.description,
          deadline: todo.deadline,
        }})
  }}

  onOpenChange = (isOpen: boolean) => {
    this.setState({ isOpen });
  }

  onSubmit = (formData: EditTodoFormData) => {
    const { editTodo, todoId } = this.props;
    const validationResult = editTodoSchema.safeParse(formData);
    
    if (!validationResult.success) {
        return this.setState({
        errors: {
          title: parseZodErrors(validationResult, 'title'),
          description: parseZodErrors(validationResult, 'description'),
          deadline: parseZodErrors(validationResult, 'deadline'),
        }
      })
    }

    editTodo(
      todoId,
      formData
    )
    this.setState({ 
      isOpen: false,
      errors: {
        title: '',
        description: '',
        deadline: '',
      }
    })
  }

  render() {
    const { trigger, isEditing } = this.props
    const { defaultValues } = this.state

    return (
      <Dialog.Root 
        onOpenChange={this.onOpenChange}
        open={this.state.isOpen}
      >
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal container={this.modalContainer}>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>Editando</Dialog.Title>
          
          <Form 
            onFormSubmit={this.onSubmit}
            containerStyle={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '3.2rem',
              width: '32.8rem',
              gap: '0.8rem'
            }}
          >
            <Input
              name="title"
              placeholder="Título da tarefa"
              icon={Pencil}
              defaultValue={defaultValues.title}
              hasError={!!this.state.errors.title}
            />

            <Input
              name="description"
              placeholder="Descrição da tarefa"
              icon={FileText}
              defaultValue={defaultValues.description}
              hasError={!!this.state.errors.description}
            />

            <Input
              type="date"
              name="deadline"
              placeholder="Prazo"
              icon={Calendar}
              defaultValue={defaultValues.deadline}
              hasError={!!this.state.errors.deadline}
            />

            <div className={styles.action}>
              <Dialog.Close asChild>
                <Button
                  style={{
                    maxWidth: 'unset'
                  }}
                  type="button"
                >
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button
                style={{
                  maxWidth: 'unset'
                }} 
                type="submit"
                disabled={isEditing}
              >
                {isEditing ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </Form>

          <Dialog.Close asChild>
            <button className={styles.CloseButton} aria-label="Close">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  todos: state.todos,
  isEditing: state.isEditing,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  editTodo: (todoId: string, formData: EditTodoFormData) => dispatch(asyncEditTodoAction(todoId, formData)),
})

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(EditModal)

export default WithRedux;