import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { DemoUser } from '../src/users/models/demo.user.data';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: DemoUser.username, password: DemoUser.password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    if (response) {
      token = response.body.access_token;
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
