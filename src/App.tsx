import React from "react"

import { Pencil, FileText, Calendar } from '@phosphor-icons/react';

import Header from "@/components/header"
import Form from "@/components/form";
import Input from "@/components/form/input"
import TextArea from "@/components/form/textarea";
import Button from "@/components/form/button";

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
      </>
    )
  }
}

export default App
