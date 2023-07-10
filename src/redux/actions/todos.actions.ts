import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../reducers/todos.reducer'
import { AnyAction } from 'redux'

import { Actions } from '@/enums/actions'
import { fakeFetch } from '@/fakes/fetch'

export const isAddingAction = (isAdding: boolean) => ({
  type: Actions.IS_ADDING,
  payload: isAdding,
})

const addTodoAction = (todo: Todo) => ({
  type: Actions.NEW_TODO,
  payload: todo,
})

export const asyncCreateTodoAction = (todo: Todo) => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(isAddingAction(true))

    await fakeFetch(2000)

    dispatch(addTodoAction(todo))
    dispatch(isAddingAction(false))
  }
}

export const changeTodoStateAction = (todoId: string, state: boolean) => ({
  type: Actions.CHANGE_TODO_STATE,
  payload: {
    todoId,
    state,
  },
})

const editTodoAction = (todoId: string, formData: Pick<Todo, 'title' | 'description' | 'deadline'>) => ({
  type: Actions.EDIT_TODO,
  payload: {
    todoId,
    formData,
  },
})

export const isEditingAction = (isEditing: boolean) => ({
  type: Actions.IS_EDITING,
  payload: isEditing,
})

export const asyncEditTodoAction = (todoId: string, formData: Pick<Todo, 'title' | 'description' | 'deadline'>) => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(isEditingAction(true))

    await fakeFetch(500)

    dispatch(editTodoAction(todoId, formData))
    dispatch(isEditingAction(false))
  }
}

export const setShowingAction = (showing: 'all' | 'completed' | 'pending') => ({
  type: Actions.SET_SHOWING,
  payload: showing,
})

export const setSortingAction = (sorting: 'newest' | 'oldest') => ({
  type: Actions.SET_SORTING,
  payload: sorting,
})