import React from "react"

import { Pencil, FileText, Calendar } from '@phosphor-icons/react';

import Header from "@/components/header"

import Form from "@/components/form";
import Input from "@/components/form/input"
import TextArea from "@/components/form/textarea";
import Button from "@/components/form/button";

import RadioGroup from "@/components/radio-group";
import RadioItem from "@/components/radio-group/radio-item";
import TodoCard from "./components/todo-card";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />

        <Form onFormSubmit={(formData) => console.log(formData)}>
          <Input
            name="title"
            placeholder="Título da tarefa" 
            icon={Pencil}
          />

          <TextArea
            name="description"
            placeholder="Descrição da tarefa" 
            icon={FileText}
            defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          />

          <Input
            type="date"
            name="deadline"
            placeholder="Prazo" 
            icon={Calendar}
          />

          <Button type="submit">Add</Button>
        </Form>

        <div style={{ display: 'flex', gap: '1.6rem', marginTop: '3.2rem' }}>
          <RadioGroup
            title="Exibir:"
            defaultValue="all"
          >
            <RadioItem name="Todos" value="all" />
            <RadioItem name="Somente concluídos" value="completed" />
            <RadioItem name="Somente pendentes" value="pending" />
          </RadioGroup>

          <RadioGroup
            title="Ordenação:"
            defaultValue="newest"
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
          <li>
            <TodoCard 
              title="Título da tarefa"
              description="Descrição da tarefa é um pouco longa, entao"
              deadline="2023-07-10"
              completed={false}
              id="1"
            />
          </li>
          <li>
            <TodoCard 
              title="Título da tarefa"
              description="Descrição da tarefa é um pouco longa, entao"
              deadline="2023-07-16"
              completed={false}
              id="2"
            />
          </li>
          <li>
            <TodoCard 
              title="Título da tarefa"
              description="Descrição da tarefa é um pouco longa, entao"
              deadline="2023-07-11"
              completed={false}
              id="3"
            />
          </li>
          <li>
            <TodoCard 
              title="Título da tarefa"
              description="Descrição da tarefa é um pouco longa, entao"
              deadline="2023-07-11"
              completed={false}
              id="4"
            />
          </li>
          <li>
            <TodoCard 
              title="Título da tarefa"
              description="Descrição da tarefa é um pouco longa, entao"
              deadline="2023-07-11"
              completed={false}
              id="5"
            />
          </li>
          <li>
            <TodoCard 
              title="Título da tarefa"
              description="Descrição da tarefa é um pouco longa, entao"
              deadline="2023-07-09"
              completed={false}
              id="6"
            />
          </li>
        </ul>
      </>
    )
  }
}

export default App
