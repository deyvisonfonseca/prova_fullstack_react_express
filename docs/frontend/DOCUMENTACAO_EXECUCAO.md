# Documentação curta de execução

Este projeto é um frontend desenvolvido em React com Vite e Tailwind CSS para consumir a API backend criada na atividade anterior. A aplicação possui tela de login, armazenamento do token JWT, navegação protegida e telas de CRUD para usuários, carros, motos e marcas de roupa.

## Como executar

Antes de subir o frontend, deixe o backend da atividade anterior rodando na porta 3000.

Na pasta do frontend, execute:

```bash
docker compose up -d --build
```

Depois acesse no navegador:

```text
http://localhost:5173
```

## Configuração da API

A URL da API fica no arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Login de teste

Use o botão "Criar administrador padrão" na tela de login ou cadastre pelo Swagger do backend:

```json
{
  "name": "Administrador",
  "email": "admin@email.com",
  "password": "123456",
  "role": "admin"
}
```

Depois faça login com:

```text
admin@email.com
123456
```

## Funcionalidades

- Login integrado com JWT.
- Rotas protegidas no frontend.
- Envio automático do token nas requisições.
- CRUD de usuários.
- CRUD de carros.
- CRUD de motos.
- CRUD de marcas de roupa.
- Interface responsiva com Tailwind CSS.
- Execução via Docker e Docker Compose.
