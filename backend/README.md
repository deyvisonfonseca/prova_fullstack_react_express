# API RESTful - Sistema de Gerenciamento de Recursos Híbridos (P2)

Este diretório contém a implementação de uma aplicação integrada com arquitetura robusta de segurança, baseada em Express. O diferencial técnico deste projeto reside no modelo de persistência híbrida (Múltiplos Bancos de Dados).

**Desenvolvedor:** Deyvison Fonseca de Miranda  
**Contexto Acadêmico:** Engenharia de Software - 6º Período

## 🏛️ Arquitetura e Engenharia de Dados

A API foi projetada dividindo as responsabilidades de persistência de acordo com a natureza dos dados:

* **Contexto Relacional (SQL / MySQL):** Destinado à tabela de **Usuários** e regras de autenticação, garantindo a integridade referencial através do ORM Sequelize.
* **Contexto Não-Relacional (NoSQL / MongoDB):** Utilizado para o ecossistema de entidades dinâmicas (**Carros, Motos e Marcas de Roupa**) gerenciado via Mongoose, otimizando consultas massivas.

---

## 🛠️ Stack Tecnológica

### Core e Infraestrutura
* **Runtime:** Node.js v20+
* **Framework Backend:** Express
* **Biblioteca Frontend:** React.js (Vite)
* **Estilização:** Tailwind CSS + Lucide Icons
* **Orquestração:** Docker & Docker Compose

### Camada de Segurança (Práticas OWASP Top 10)
* **Criptografia:** BcryptJS (Hashing de senhas)
* **Sessão:** JSON Web Token (JWT) com validação via Bearer
* **Sanitização:** Proteção ativa contra Cross-Site Scripting (XSS) e NoSQL Injection
* **Políticas HTTP:** Configuração de CORS customizada e Headers de segurança via Helmet

---

## 🚀 Guia de Execução da Aplicação

### 1. Inicialização dos Containers (Backend e Bancos)
Na raiz do diretório do backend, execute o comando para subir os serviços em segundo plano:
```bash
docker compose up -d --build

2. Execução do Ecossistema de Testes (Jest)
Para validar os endpoints de integração com segurança, utilize:

docker compose exec api npm test

3. Endpoints de Acesso Local

Documentação Interativa (Swagger): http://localhost:3000/docs
Ponto de Entrada da API: http://localhost:3000/api
Interface do Usuário (Frontend): http://localhost:5173

🔐 Estrutura Padrão de Credenciais Administrativas
Para o primeiro provisionamento do sistema através do Swagger ou interface de cadastro, utilize a estrutura JSON padronizada:

JSON
{
  "name": "Administrador Sistema",
  "email": "admin@email.com",
  "password": "123456",
  "role": "admin"
}