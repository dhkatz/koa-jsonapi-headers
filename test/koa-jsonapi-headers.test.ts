import Koa from 'koa';
import request from 'supertest';

import headers from '../src';

import koa = require('koa');

describe('koa-jsonapi-headers.test.js', () => {
  describe('Missing Content-Type Header', () => {
    const app = new Koa();

    app.use(async (ctx: koa.BaseContext, next) => {
      try {
        await next();
      } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = JSON.parse(error.message);
      }
    });

    app.use(headers());

    app.use(async (ctx: koa.BaseContext, next) => {
      await next();

      ctx.body = 'OK';
    });

    test('GET', async (done) => {
      const response = await request(app.listen()).get('/').expect(400);

      const json = JSON.parse(response.text);

      expect(json.errors).toBeDefined();
      expect(Array.isArray(json.errors)).toEqual(true);

      expect(json.errors[0].code).toEqual('invalid_request');
      // tslint:disable-next-line:max-line-length
      expect(json.errors[0].title).toEqual('API requires header \'Accept application/vnd.api+json\' for exchanging data.');

      done();
    });

    test('POST', async (done) => {
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
      expect(json.errors[0].title).toEqual('API requires header \'Content-type application/vnd.api+json\' for exchanging data.');

      done();
    });

    test('PUT', async (done) => {
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
      expect(json.errors[0].title).toEqual('API requires header \'Content-type application/vnd.api+json\' for exchanging data.');

      done();
    });

    test('PATCH', async (done) => {
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
      expect(json.errors[0].title).toEqual('API requires header \'Content-type application/vnd.api+json\' for exchanging data.');

      done();
    });
  });

  describe('Accept', () => {
    describe('Valid Headers', () => {
      const app = new Koa();

      app.use(async (ctx: koa.BaseContext, next) => {
        try {
          await next();
        } catch (error) {
          ctx.status = error.status || 500;
          ctx.body = JSON.parse(error.message);
        }
      });

      app.use(headers());

      app.use(async (ctx: koa.BaseContext, next) => {
        await next();

        ctx.body = 'Correct headers found';
      });

      test('GET', async (done) => {
        const response = await request(app.listen())
          .get('/')
          .set('Accept', 'application/vnd.api+json')
          .expect(200);

        expect(response.text).toEqual('Correct headers found');

        done();
      });

      test('POST', async (done) => {
        const response = await request(app.listen())
          .post('/')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-type', 'application/vnd.api+json')
          .send('name=test')
          .expect(200);

        expect(response.text).toEqual('Correct headers found');

        done();
      });

      test('PUT', async (done) => {
        const response = await request(app.listen())
          .put('/')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-type', 'application/vnd.api+json')
          .send('name=test')
          .expect(200);

        expect(response.text).toEqual('Correct headers found');

        done();
      });

      test('PATCH', async (done) => {
        const response = await request(app.listen())
          .patch('/')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-type', 'application/vnd.api+json')
          .send('name=test')
          .expect(200);

        expect(response.text).toEqual('Correct headers found');

        done();
      });
    });

    test('URL Exclusions', async (done) => {
      const app = new Koa();

      app.use(async (ctx: koa.BaseContext, next) => {
        try {
          await next();
        } catch (error) {
          ctx.status = error.status || 500;
          ctx.body = JSON.parse(error.message);
        }
      });

      app.use(headers());

      app.use(async (ctx: koa.BaseContext, next) => {
        await next();

        ctx.body = 'Excluded headers request OK';
      });

      const response = await request(app.listen())
        .get('/?jsonapiexclude=true')
        .expect(200);

      expect(response.text).toEqual('Excluded headers request OK');

      done();
    });

    test('Regex Exclusions', async (done) => {
      const app = new Koa();

      app.use(async (ctx: koa.BaseContext, next) => {
        try {
          await next();
        } catch (error) {
          ctx.status = error.status || 500;
          ctx.body = JSON.parse(error.message);
        }
      });

      app.use(headers(
        {
          exclude: [
            'resource\/path',
            'excluded\/endpoint\\?id',
          ],
        },
      ));

      app.use(async (ctx: koa.BaseContext, next) => {
        await next();

        ctx.body = 'Excluded headers request OK';
      });

      const response = await request(app.listen())
        .get('/excluded/endpoint?id=1')
        .expect(200);

      expect(response.text).toEqual('Excluded headers request OK');

      done();
    });
  });
});
