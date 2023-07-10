import { Actions } from '@/enums/actions';

const INITIAL_STATE = {
  todos: [] as Todo[],
  isAdding: false,
  isEditing: false,
  showing: 'all' as 'all' | 'completed' | 'pending',
  sorting: 'newest' as 'newest' | 'oldest',
};

export type RootState = typeof INITIAL_STATE;

type ActionProps = {
  type: string;
  payload: any;
};

export default function todosReducer(state = INITIAL_STATE, action: ActionProps) {
  switch (action.type) {
    case Actions.NEW_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload as Todo],
      }
    case Actions.CHANGE_TODO_STATE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            return {
              ...todo,
              completed: action.payload.state as boolean,
            }
          }
          return todo;
        })
      }
    case Actions.IS_ADDING:
      return {
        ...state,
        isAdding: action.payload as boolean,
      }
    case Actions.IS_EDITING:
      return {
        ...state,
        isEditing: action.payload as boolean,
      }
    case Actions.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            console.log('achou')
            return {
              ...todo,
              ...action.payload.formData as Pick<Todo, 'title' | 'description' | 'deadline'>
            }
          }
          return todo;
        })
      }
    case Actions.SET_SHOWING:
      return {
        ...state,
        showing: action.payload as 'all' | 'completed' | 'pending',
      }
    case Actions.SET_SORTING:
      return {
        ...state,
        sorting: action.payload as 'newest' | 'oldest',
      }
    default:
      return state
  }
}