import * as Koa from 'koa';
import * as request from 'supertest';

import headers from '../src';

import koa = require('koa');

describe('koa-jsonapi-headers.test.js', () => {
  describe('reject', () => {
    const app = new Koa();

    app.use(async (ctx: koa.BaseContext, next) => {
      try {
        await next();
      } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = error.message;
      }
    });

    app.use(headers());

    app.use(async (ctx: koa.BaseContext, next) => {
      await next();

      ctx.body = 'OK';
    });

    test('missing Accept header', async (done) => {
      const response = await request(app.listen()).get('/').expect(400);

      const json = JSON.parse(response.text);

      expect(json.errors).toBeDefined();
      expect(Array.isArray(json.errors)).toEqual(true);

      expect(json.errors[0].code).toEqual('invalid_request');
      // tslint:disable-next-line:max-line-length
      expect(json.errors[0].title).toEqual('API requires header "Accept application/vnd.api+json" for exchanging data.');

      done();
    });

    test('POST missing Content-type header', async (done) => {
      const response = await request(app.listen())
        .post('/')
        .set('Accept', 'application/vnd.api+json')
        .send({})
        .expect(400);

      const json = JSON.parse(response.text);

      expect(json.errors).toBeDefined();
      expect(Array.isArray(json.errors)).toEqual(true);

      expect(json.errors[0].code).toEqual('invalid_request');
      // tslint:disable-next-line:max-line-length
      expect(json.errors[0].title).toEqual('API requires header "Content-type application/vnd.api+json" for exchanging data.');

      done();
    });

    test('PUT missing Content-type header', async (done) => {
      const response = await request(app.listen())
      .put('/')
      .set('Accept', 'application/vnd.api+json')
      .send({})
      .expect(400);

      const json = JSON.parse(response.text);

      expect(json.errors).toBeDefined();
      expect(Array.isArray(json.errors)).toEqual(true);

      expect(json.errors[0].code).toEqual('invalid_request');
      // tslint:disable-next-line:max-line-length
      expect(json.errors[0].title).toEqual('API requires header "Content-type application/vnd.api+json" for exchanging data.');

      done();
    });

    test('PATCH missing Content-type header', async (done) => {
      const response = await request(app.listen())
      .patch('/')
      .set('Accept', 'application/vnd.api+json')
      .send({})
      .expect(400);

      const json = JSON.parse(response.text);

      expect(json.errors).toBeDefined();
      expect(Array.isArray(json.errors)).toEqual(true);

      expect(json.errors[0].code).toEqual('invalid_request');
      // tslint:disable-next-line:max-line-length
      expect(json.errors[0].title).toEqual('API requires header "Content-type application/vnd.api+json" for exchanging data.');

      done();
    });
  });
});
