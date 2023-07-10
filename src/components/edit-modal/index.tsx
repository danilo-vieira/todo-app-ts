import React from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Calendar, FileText, Pencil, X } from '@phosphor-icons/react'

import Form from '../form'
import Input from '../form/input'
import Button from '../form/button'

import styles from './styles.module.scss'

type EditModalProps = {
  trigger: React.ReactNode;
  todoId: string;
}

type EditModalState = {
  isOpen: boolean;
}

type FormDataProps = {
  title: string;
  description: string;
  deadline: string;
}

export default class EditModal extends React.Component<EditModalProps, EditModalState> {
  modalContainer: HTMLElement

  constructor(props: EditModalProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.modalContainer = document.getElementById('modal-container')!
  }

  onOpenChange = (isOpen: boolean) => {
    this.setState({ isOpen });
  }

  onSubmit = (formData: FormDataProps) => {
    console.log(formData)

    this.setState({ isOpen: false })
  }

  render() {
    const { trigger } = this.props

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
            />

            <Input
              name="description"
              placeholder="Descrição da tarefa"
              icon={FileText}
            />

            <Input
              type="date"
              name="deadline"
              placeholder="Prazo"
              icon={Calendar}
            />

            <div className={styles.action}>
              <Dialog.Close asChild>
                <Button
                  style={{
                    maxWidth: 'unset'
                  }} 
                  type="submit"
                >
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button
                style={{
                  maxWidth: 'unset'
                }} 
                type="submit"
              >
                Salvar
              </Button>
            </div>
          </Form>
          
          {/* <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close> */}
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
