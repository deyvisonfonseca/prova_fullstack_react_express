const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express SQL e NoSQL',
      version: '1.0.0',
      description: 'Trabalho com Node.js, Express, JWT, MySQL, MongoDB, OWASP, Docker e testes.'
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Register: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Administrador' },
            email: { type: 'string', example: 'admin@email.com' },
            password: { type: 'string', example: '123456' },
            role: { type: 'string', example: 'admin' }
          }
        },
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@email.com' },
            password: { type: 'string', example: '123456' }
          }
        },
        Car: {
          type: 'object',
          required: ['modelo', 'marca', 'ano', 'cor', 'preco'],
          properties: {
            modelo: { type: 'string', example: 'Civic' },
            marca: { type: 'string', example: 'Honda' },
            ano: { type: 'integer', example: 2020 },
            cor: { type: 'string', example: 'Prata' },
            preco: { type: 'number', example: 95000 }
          }
        },
        Moto: {
          type: 'object',
          required: ['modelo', 'marca', 'cilindradas', 'ano', 'preco'],
          properties: {
            modelo: { type: 'string', example: 'CB 500F' },
            marca: { type: 'string', example: 'Honda' },
            cilindradas: { type: 'integer', example: 500 },
            ano: { type: 'integer', example: 2022 },
            preco: { type: 'number', example: 38000 }
          }
        },
        ClothingBrand: {
          type: 'object',
          required: ['nome', 'segmento', 'paisOrigem', 'anoFundacao'],
          properties: {
            nome: { type: 'string', example: 'Reserva' },
            segmento: { type: 'string', example: 'Moda casual' },
            paisOrigem: { type: 'string', example: 'Brasil' },
            anoFundacao: { type: 'integer', example: 2004 }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths: {
      '/health': { get: { tags: ['Health'], summary: 'Verifica status da API', responses: { 200: { description: 'API funcionando' } } } },
      '/auth/register': { post: { tags: ['Auth'], summary: 'Cadastro de usuário', security: [], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Register' } } } }, responses: { 201: { description: 'Usuário criado' } } } },
      '/auth/login': { post: { tags: ['Auth'], summary: 'Login com JWT', security: [], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Login' } } } }, responses: { 200: { description: 'Login realizado' } } } },
      '/users': { get: { tags: ['Users'], summary: 'Lista usuários - admin', responses: { 200: { description: 'Lista de usuários' } } }, post: { tags: ['Users'], summary: 'Cria usuário - admin', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Register' } } } }, responses: { 201: { description: 'Usuário criado' } } } },
      '/users/{id}': { get: { tags: ['Users'], summary: 'Busca usuário por ID - admin', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'Usuário encontrado' } } }, put: { tags: ['Users'], summary: 'Atualiza usuário - admin', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'Usuário atualizado' } } }, delete: { tags: ['Users'], summary: 'Remove usuário - admin', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 204: { description: 'Usuário removido' } } } },
      '/cars': { get: { tags: ['Cars'], summary: 'Lista carros', responses: { 200: { description: 'Lista' } } }, post: { tags: ['Cars'], summary: 'Cria carro', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Car' } } } }, responses: { 201: { description: 'Criado' } } } },
      '/cars/{id}': { get: { tags: ['Cars'], summary: 'Busca carro por ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Encontrado' } } }, put: { tags: ['Cars'], summary: 'Atualiza carro', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Car' } } } }, responses: { 200: { description: 'Atualizado' } } }, delete: { tags: ['Cars'], summary: 'Remove carro', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 204: { description: 'Removido' } } } },
      '/motos': { get: { tags: ['Motos'], summary: 'Lista motos', responses: { 200: { description: 'Lista' } } }, post: { tags: ['Motos'], summary: 'Cria moto', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Moto' } } } }, responses: { 201: { description: 'Criado' } } } },
      '/motos/{id}': { get: { tags: ['Motos'], summary: 'Busca moto por ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Encontrado' } } }, put: { tags: ['Motos'], summary: 'Atualiza moto', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Moto' } } } }, responses: { 200: { description: 'Atualizado' } } }, delete: { tags: ['Motos'], summary: 'Remove moto', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 204: { description: 'Removido' } } } },
      '/clothing-brands': { get: { tags: ['Clothing Brands'], summary: 'Lista marcas de roupa', responses: { 200: { description: 'Lista' } } }, post: { tags: ['Clothing Brands'], summary: 'Cria marca de roupa', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ClothingBrand' } } } }, responses: { 201: { description: 'Criado' } } } },
      '/clothing-brands/{id}': { get: { tags: ['Clothing Brands'], summary: 'Busca marca por ID', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Encontrado' } } }, put: { tags: ['Clothing Brands'], summary: 'Atualiza marca', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ClothingBrand' } } } }, responses: { 200: { description: 'Atualizado' } } }, delete: { tags: ['Clothing Brands'], summary: 'Remove marca', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 204: { description: 'Removido' } } } }
    }
  },
  apis: []
};

module.exports = swaggerJsdoc(options);
