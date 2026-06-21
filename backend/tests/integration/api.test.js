const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const { connectMySQL, sequelize } = require('../../src/database/mysql');
const { connectMongo } = require('../../src/database/mongo');
const User = require('../../src/models/sql/User');
const Car = require('../../src/models/mongo/Car');
const Moto = require('../../src/models/mongo/Moto');
const ClothingBrand = require('../../src/models/mongo/ClothingBrand');

let adminToken;
let userId;
let createdUserId;

beforeAll(async () => {
  await connectMySQL();
  await connectMongo();
  await User.destroy({ where: {}, truncate: true, cascade: true });
  await Car.deleteMany({});
  await Moto.deleteMany({});
  await ClothingBrand.deleteMany({});
});

afterAll(async () => {
  await User.destroy({ where: {}, truncate: true, cascade: true });
  await Car.deleteMany({});
  await Moto.deleteMany({});
  await ClothingBrand.deleteMany({});
  await sequelize.close();
  await mongoose.connection.close();
});

describe('Auth', () => {
  test('deve cadastrar administrador', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Admin Teste',
      email: 'admin@teste.com',
      password: '123456',
      role: 'admin'
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;
    userId = res.body.id;
  });

  test('deve fazer login', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@teste.com',
      password: '123456'
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;
  });

  test('deve bloquear rota sem token', async () => {
    const res = await request(app).get('/api/cars');
    expect(res.status).toBe(401);
  });
});

describe('Users SQL', () => {
  test('deve listar usuários', async () => {
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('deve buscar usuário por id', async () => {
    const res = await request(app).get(`/api/users/${userId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('admin@teste.com');
  });

  test('deve criar usuário', async () => {
    const res = await request(app).post('/api/users').set('Authorization', `Bearer ${adminToken}`).send({
      name: 'Usuario Teste',
      email: 'usuario@teste.com',
      password: '123456',
      role: 'user'
    });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe('usuario@teste.com');
    createdUserId = res.body.id;
  });

  test('deve atualizar usuário', async () => {
    const res = await request(app).put(`/api/users/${userId}`).set('Authorization', `Bearer ${adminToken}`).send({
      name: 'Admin Atualizado'
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Admin Atualizado');
  });

  test('deve remover usuário', async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(204);
  });
});

describe('Cars MongoDB', () => {
  let id;
  test('deve criar carro', async () => {
    const res = await request(app).post('/api/cars').set('Authorization', `Bearer ${adminToken}`).send({
      modelo: 'Civic', marca: 'Honda', ano: 2020, cor: 'Prata', preco: 95000
    });
    expect(res.status).toBe(201);
    id = res.body._id;
  });
  test('deve listar carros', async () => {
    const res = await request(app).get('/api/cars').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
  test('deve buscar carro por id', async () => {
    const res = await request(app).get(`/api/cars/${id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
  test('deve atualizar carro', async () => {
    const res = await request(app).put(`/api/cars/${id}`).set('Authorization', `Bearer ${adminToken}`).send({
      modelo: 'Corolla', marca: 'Toyota', ano: 2021, cor: 'Preto', preco: 99000
    });
    expect(res.status).toBe(200);
    expect(res.body.modelo).toBe('Corolla');
  });
  test('deve remover carro', async () => {
    const res = await request(app).delete(`/api/cars/${id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(204);
  });
});

describe('Motos MongoDB', () => {
  let id;
  test('deve criar moto', async () => {
    const res = await request(app).post('/api/motos').set('Authorization', `Bearer ${adminToken}`).send({
      modelo: 'CB 500F', marca: 'Honda', cilindradas: 500, ano: 2022, preco: 38000
    });
    expect(res.status).toBe(201);
    id = res.body._id;
  });
  test('deve listar motos', async () => {
    const res = await request(app).get('/api/motos').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
  test('deve buscar moto por id', async () => {
    const res = await request(app).get(`/api/motos/${id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
  test('deve atualizar moto', async () => {
    const res = await request(app).put(`/api/motos/${id}`).set('Authorization', `Bearer ${adminToken}`).send({
      modelo: 'MT-03', marca: 'Yamaha', cilindradas: 321, ano: 2023, preco: 32000
    });
    expect(res.status).toBe(200);
    expect(res.body.modelo).toBe('MT-03');
  });
  test('deve remover moto', async () => {
    const res = await request(app).delete(`/api/motos/${id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(204);
  });
});

describe('Clothing Brands MongoDB', () => {
  let id;
  test('deve criar marca de roupa', async () => {
    const res = await request(app).post('/api/clothing-brands').set('Authorization', `Bearer ${adminToken}`).send({
      nome: 'Reserva', segmento: 'Moda casual', paisOrigem: 'Brasil', anoFundacao: 2004
    });
    expect(res.status).toBe(201);
    id = res.body._id;
  });
  test('deve listar marcas', async () => {
    const res = await request(app).get('/api/clothing-brands').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
  test('deve buscar marca por id', async () => {
    const res = await request(app).get(`/api/clothing-brands/${id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
  test('deve atualizar marca', async () => {
    const res = await request(app).put(`/api/clothing-brands/${id}`).set('Authorization', `Bearer ${adminToken}`).send({
      nome: 'Hering', segmento: 'Moda básica', paisOrigem: 'Brasil', anoFundacao: 1880
    });
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Hering');
  });
  test('deve remover marca', async () => {
    const res = await request(app).delete(`/api/clothing-brands/${id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(204);
  });
});
