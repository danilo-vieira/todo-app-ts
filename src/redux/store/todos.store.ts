import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

import todosReducer from '../reducers/todos.reducer'

const store = createStore(todosReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store