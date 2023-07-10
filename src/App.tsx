import React from "react"
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import { Pencil, FileText, Calendar } from '@phosphor-icons/react';
import * as z from 'zod';

import parseZodErrors from "./helpers/parseZodErrors";
import { asyncCreateTodoAction, setShowingAction, setSortingAction } from "@/redux/actions/todos.actions";
import { RootState } from "./redux/reducers/todos.reducer";

import Header from "@/components/header"
import Form from "@/components/form";
import Input from "@/components/form/input"
import TextArea from "@/components/form/textarea";
import Button from "@/components/form/button";

import RadioGroup from "@/components/radio-group";
import RadioItem from "@/components/radio-group/radio-item";
import TodoCard from "./components/todo-card";

const createTodoSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter no mínimo 3 caracteres' }),
  description: z.string().nonempty({ message: 'A descrição não pode ser vazia' }),
  deadline: z.string().nonempty({ message: 'O prazo não pode ser vazio' }),
});

type AppProps = {
  addTodo: (todo: Todo) => void;
  todos: Todo[];
  isAdding: boolean;
  showing: 'all' | 'completed' | 'pending';
  sorting: 'newest' | 'oldest';
  setShowing: (showing: 'all' | 'completed' | 'pending') => void;
  setSorting: (sorting: 'newest' | 'oldest') => void;
}

type CreateTodoFormData = z.infer<typeof createTodoSchema>;

class App extends React.Component<AppProps> {
  state = {
    errors: {
      title: '',
      description: '',
      deadline: '',
    }
  }

  onFormSubmit = (formData: CreateTodoFormData) => {
    const { addTodo } = this.props;
    const validationResult = createTodoSchema.safeParse(formData);
    
    if (!validationResult.success) {
        return this.setState({
        errors: {
          title: parseZodErrors(validationResult, 'title'),
          description: parseZodErrors(validationResult, 'description'),
          deadline: parseZodErrors(validationResult, 'deadline'),
        }
      })
    }

    addTodo({
      ...formData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    })

    this.setState({
      errors: {
        title: '',
        description: '',
        deadline: '',
      }
    })
  }

  render() {
    const { todos, isAdding, sorting, showing, setShowing, setSorting } = this.props;

    return (
      <>
        <Header />

        <Form onFormSubmit={this.onFormSubmit}>
          <Input
            name="title"
            placeholder="Título da tarefa" 
            icon={Pencil}
            hasError={!!this.state.errors.title}
          />

          <TextArea
            name="description"
            placeholder="Descrição da tarefa" 
            icon={FileText}
            hasError={!!this.state.errors.description}
          />

          <Input
            type="date"
            name="deadline"
            placeholder="Prazo" 
            icon={Calendar}
            hasError={!!this.state.errors.deadline}
          />

          <Button disabled={isAdding} type="submit">{isAdding ? 'Carregando...' : 'Add'}</Button>
        </Form>

        <div style={{ display: 'flex', gap: '1.6rem', marginTop: '3.2rem' }}>
          <RadioGroup
            title="Exibir:"
            defaultValue="all"
            onValueChange={value => {
              setShowing(value as 'all' | 'completed' | 'pending');
            }}
          >
            <RadioItem name="Todos" value="all" />
            <RadioItem name="Somente concluídos" value="completed" />
            <RadioItem name="Somente pendentes" value="pending" />
          </RadioGroup>

          <RadioGroup
            title="Ordenação:"
            defaultValue="newest"
            onValueChange={value => {
              setSorting(value as 'newest' | 'oldest');
            }}
          >
            <RadioItem name="Mais recentes primeiro" value="newest" />
            <RadioItem name="Mais antigas primeiro" value="oldest" />
          </RadioGroup>
        </div>

        <ul 
          style={{ 
            marginTop: '3.2rem',
            listStyle: 'none',
            display: 'grid',
            gap: '1.6rem',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {todos
          .sort((a, b) => {
            if (sorting === 'newest') {
              return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
            }

            return new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1;
          })
          .filter(todo => {
            if (showing === 'all') {
              return true;
            }

            if (showing === 'completed') {
              return todo.completed;
            }

            return !todo.completed;
          })
          .map(todo => (
            <li key={todo.id}>
              <TodoCard 
                title={todo.title}
                description={todo.description}
                deadline={todo.deadline}
                completed={todo.completed}
                id={todo.id}
              />
            </li>
          ))}
        </ul>
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  todos: state.todos,
  isAdding: state.isAdding,
  showing: state.showing,
  sorting: state.sorting,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  addTodo: (todo: Todo) => dispatch(asyncCreateTodoAction(todo)),
  setShowing: (showing: 'all' | 'completed' | 'pending') => dispatch(setShowingAction(showing)),
  setSorting: (sorting: 'newest' | 'oldest') => dispatch(setSortingAction(sorting)),
});

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default WithRedux;
