# Todo App (TypeScript)
## Executando o projeto
Para executar o projeto, basta clonar o repositório e executar os seguintes comandos:
```bash
# Instalar as dependências
yarn install

# Executar o projeto
yarn dev
```

A aplicação também está disponível em: https://todo-app-ts-beta.vercel.app/

O layout criado no Figma pode ser visualizado [aqui](https://www.figma.com/file/yw4zzRcRRoASJnEpRizLtt/Todo-App?type=design&node-id=0%3A1&mode=dev)

## Tecnologias
- RadixUI:
  
  O RadixUI é uma biblioteca de componentes React para construir interfaces de usuário acessíveis e semânticas. Ele fornece componentes de interface do usuário de baixo nível, como primitivos de layout e componentes de formulário, bem como componentes de interface do usuário de alto nível, como menus, listas suspensas e botões de alternância. Os componentes não possuem estilo por padrão, diferente de outras bibliotecas de componentes, já que o foco aqui é acessibilidade.

- date-fns

  Uma biblioteca JavaScript moderna e leve de utilitários de data. Inspirado pelo Moment.js, mas mais leve. Foi utilizado para formatar a data de criação da tarefa e exibir uma mensagem "Ontem", "Hoje" ou "Amanhã" de acordo com a data atual ou a data por extenso caso não seja nenhuma das opções anteriores.

- Zod

  O Zod é uma biblioteca de validação de esquema TypeScript. Ele foi utilizado para validar os dados de entrada do usuário no formulário de criação e de tarefas.

- Sass

  O Sass é um pré-processador CSS que estende a sintaxe do CSS convencional, adicionando novas funcionalidades que tornam a escrita de estilos mais fácil e rápida. Ele foi utilizado para estilizar toda a aplicação.

## Principais componentes criados com RadixUI
- [Checkbox](https://radix-ui.com/primitives/docs/components/checkbox) - Link para arquivo: [todo-card.tsx](https://github.com/danilo-vieira/todo-app-ts/blob/45d07fcd6c463264f0d829afd991a615de2cf439/src/components/todo-card/index.tsx#L105)
- [RadioGroup](https://radix-ui.com/primitives/docs/components/radio-group) - Link para arquivo: [radio-group.tsx](https://github.com/danilo-vieira/todo-app-ts/blob/main/src/components/radio-group/index.tsx)
- [Dialog](https://radix-ui.com/primitives/docs/components/dialog) - Link para arquivo: [radio-group.tsx](https://github.com/danilo-vieira/todo-app-ts/blob/main/src/components/edit-modal/index.tsx)