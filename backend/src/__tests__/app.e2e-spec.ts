import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('/info/validateUser POST', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('Empty request body results in 400 status code', () => {
    return request(app.getHttpServer()).post('/info/validateUser').expect(400);
  });

  test('Correct input results in 200 status code', () => {
    return request(app.getHttpServer())
      .post('/info/validateUser')
      .send({ name: 'radu c', age: 30, married: true, dob: '1994-03-14' })
      .expect(201)
      .expect(({ body }) => {
        expect(body.success).toBe(true);
      });
  });

  test('Name only input results in error messages for missing age and dob', () => {
    return request(app.getHttpServer())
      .post('/info/validateUser')
      .send({ name: 'radu c' })
      .expect(400)
      .expect(({ body }) => {
        expect(body).toHaveLength(2);
        expect(body[0].constraints).toHaveProperty(
          'isNumber',
          'age must be a number conforming to the specified constraints',
        );
        expect(body[1].constraints).toHaveProperty(
          'isNotEmpty',
          'dob should not be empty',
        );
      });
  });

  test('Over 18 age input should raise error that marriage is input is not completed', () => {
    return request(app.getHttpServer())
      .post('/info/validateUser')
      .send({ name: 'radu c', age: 30, dob: '1994-03-14' })
      .expect(400)
      .expect(({ body }) => {
        expect(body).toHaveLength(1);
        expect(body[0].constraints).toHaveProperty(
          'isNotEmpty',
          'married should not be empty',
        );
        expect(body[0].constraints).toHaveProperty(
          'isBoolean',
          'married must be a boolean value',
        );
      });
  });

  test('Under 18 age input should NOT raise error that marriage is input is not completed', () => {
    return request(app.getHttpServer())
      .post('/info/validateUser')
      .send({ name: 'radu c', age: 15, dob: '1994-03-14' })
      .expect(400)
      .expect(({ body }) => {
        expect(body).toHaveLength(1);
        expect(body[0].constraints).not.toHaveProperty(
          'isNotEmpty',
          'married should not be empty',
        );
        expect(body[0].constraints).not.toHaveProperty(
          'isBoolean',
          'married must be a boolean value',
        );
      });
  });

  test('Expect error to be raised if dob does not match age', () => {
    return request(app.getHttpServer())
      .post('/info/validateUser')
      .send({ name: 'radu c', age: 20, married: false, dob: '1994-03-14' })
      .expect(400)
      .expect(({ body }) => {
        console.log(body);
        expect(body).toHaveLength(1);
        expect(body[0].constraints).toHaveProperty(
          'dobMatchesAge',
          'The date of birth does not match the age!',
        );
      });
  });
});
