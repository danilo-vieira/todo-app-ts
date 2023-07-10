import React from "react"

import { Pencil, FileText, Calendar } from '@phosphor-icons/react';

import Header from "@/components/header"

import Form from "@/components/form";
import Input from "@/components/form/input"
import TextArea from "@/components/form/textarea";
import Button from "@/components/form/button";

import RadioGroup from "@/components/radio-group";
import RadioItem from "@/components/radio-group/radio-item";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form onSubmit={(formData) => console.log(formData)}>
          <Input
            name="title"
            placeholder="Título da tarefa" 
            icon={Pencil}
          />

          <TextArea
            name="description"
            placeholder="Descrição da tarefa" 
            icon={FileText}
          />

          <Input
            name="deadline"
            placeholder="Prazo" 
            icon={Calendar}
          />

          <Button type="submit">Add</Button>
        </Form>

        <div style={{ display: 'flex', gap: '1.6rem' }}>
          <RadioGroup
            containerStyle={{ marginTop: '3.2rem' }}
            title="Exibir:"
            defaultValue="all"
          >
            <RadioItem name="Todos" value="all" />
            <RadioItem name="Somente concluídos" value="completed" />
            <RadioItem name="Somente pendentes" value="pending" />
          </RadioGroup>

          <RadioGroup
            containerStyle={{ marginTop: '3.2rem' }}
            title="Ordenação:"
            defaultValue="newest"
          >
            <RadioItem name="Mais recentes primeiro" value="newest" />
            <RadioItem name="Mais antigas primeiro" value="oldest" />
          </RadioGroup>
        </div>
      </>
    )
  }
}

export default App
