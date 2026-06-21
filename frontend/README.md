# Sistema de Gerenciamento Fullstack - Prova de Integração API & Frontend

Este projeto consiste em uma aplicação web fullstack completa, desenvolvida como parte das avaliações acadêmicas de Engenharia de Software (6º Período). A solução integra uma API robusta desenvolvida em Node.js e Express a uma interface de usuário moderna e responsiva construída em React e Tailwind CSS, totalmente conteinerizada utilizando Docker e Docker Compose.

**Desenvolvedor:** Deyvison Fonseca de Miranda  
**Contexto:** Atividade P2 (Backend) & Prova Prática (Integração Fullstack)

---

## 🏛️ Arquitetura e Decisões Técnicas (Descrição do Trabalho)

A estrutura do ecossistema foi projetada seguindo o padrão de responsabilidade única e separação de conceitos (*Separation of Concerns*). O ecossistema divide-se fundamentalmente em três camadas orquestradas:

1. **Camada de Persistência (Bancos de Dados):** Utilizamos uma estratégia híbrida de armazenamento. Para o controle de acessos, dados estruturados e autenticação de usuários, foi implementado um banco de dados relacional **MySQL**. Para o cadastro e gerenciamento dinâmico de recursos voláteis (Carros/Itens, Motos e Marcas de Roupa), optou-se pelo **MongoDB** (NoSQL), garantindo alta escalabilidade e flexibilidade de esquema.
2. **Camada de Backend (API REST):** Desenvolvida em **Node.js** com **Express**, a API centraliza as regras de negócio através de um padrão *Factory* para otimização dos CRUDs. A segurança segue estritamente os guias da OWASP Top 10, implementando sanitização de requisições contra NoSQL Injection, limitação de taxa (*Rate Limiting*) para mitigar ataques de força bruta, e proteção de rotas via tokens **JWT (JSON Web Tokens)**. Toda a API encontra-se documentada interativamente via **Swagger** e validada por testes de integração automáticos com **Jest** e **Supertest**.
3. **Camada de Frontend (Interface do Usuário):** Construída em **React** utilizando **Vite** como ferramenta de build e **Tailwind CSS** para uma estilização utilitária, moderna e totalmente responsiva (Mobile e Desktop). A aplicação gerencia o estado global de autenticação via *React Context API*, garantindo que rotas protegidas interceptem requisições HTTP para injetar os cabeçalhos de autorização JWT de forma transparente através do Axios.

---

## 🛠️ Tecnologias Utilizadas

* **Runtime:** Node.js
* **Framework Backend:** Express.js
* **Biblioteca Frontend:** React (Vite)
* **Estilização:** Tailwind CSS
* **Bancos de Dados:** MySQL (SQL) & MongoDB (NoSQL)
* **Segurança:** JWT, Helmet, Express-Rate-Limit, Express-Mongo-Sanitize
* **Testes:** Jest & Supertest
* **Documentação:** Swagger UI
* **Conteinerização:** Docker & Docker Compose
* **Proxy/Servidor Web (Frontend):** Nginx

---

## 🚀 Como Executar a Aplicação com Docker

A aplicação foi totalmente configurada para subir sem a necessidade de comandos manuais de desenvolvimento como `npm start` ou `npm run dev`. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

### 1. Clonar o Repositório
```bash
git clone <link-do-seu-repositorio>
cd prova_fullstack_react_express
