# CodeMentor

**CodeMentor** é uma plataforma web de mentoria técnica projetada para conectar desenvolvedores iniciantes (Mentees) a especialistas experientes (Mentors). A aplicação foca em colaboração em tempo real, oferecendo ferramentas integradas para revisão de código e aprendizado prático.

## Funcionalidades Principais

* **Sistema de Match:** Busca e filtro de mentores baseada em habilidades (tags) e disponibilidade.
* **War Room (Sala Virtual):** Ambiente colaborativo em tempo real contendo:
  * Editor de Código com syntax highlighting.
  * Quadro Branco (Whiteboard) interativo.
  * Chat ao vivo com baixa latência simulada.
* **Gamificação:** Sistema de engajamento com pontos, níveis e conquistas (badges) para incentivar a continuidade.
* **Dashboards Personalizados:** Visões distintas e adaptadas para os perfis de Aluno, Mentor e Administrador.

## Tech Stack

O projeto foi desenvolvido utilizando tecnologias do ecossistema JavaScript:

* **Core:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Ícones:** [Lucide React](https://lucide.dev/)

## Como Executar

### Pré-requisitos

* Node.js (v18 ou superior)
* pnpm (Recomendado) ou npm

### Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/peesousa/codementor.git
    cd codementor
    ```

2. Instale as dependências:

    ```bash
    pnpm install
    # ou
    npm install
    ```

3. Execute o servidor de desenvolvimento:

    ```bash
    pnpm dev
    ```

A aplicação estará disponível em `http://localhost:3000`.
