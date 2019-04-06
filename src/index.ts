import koa = require('koa');

// tslint:disable-next-line:interface-name
export interface Options {
  exclude?: string[];
}

/**
 * Add JSON API compliant headers to Koa.
 * @param options Customization options for handling requests.
 */
export default function(options?: Options) {
  const patterns = options && options.exclude ? options.exclude.map((value: string) => new RegExp(value)) : [];

  return async function headers(ctx: koa.Context, next) {
    const exclude = ctx.query.jsonapiexclude || false;

    if (exclude) {
      return await next();
    }

    if (patterns.some((pattern: RegExp) => pattern.test(ctx.url))) {
      return await next();
    }

    if (!ctx.header.accept || !/application\/vnd\.api\+json/.test(ctx.header.accept)) {
      ctx.throw(400, JSON.stringify({
        errors: [
          {
            code: 'invalid_request',
            status: 400,
            title: 'API requires header \'Accept application/vnd.api+json\' for exchanging data.',
          },
        ],
      }));
    }

    // Content-type: application/vnd.api+json
    // POST PUT and PATCH must have json-api HTTP content-type header
    if (/^(POST|PUT|PATCH)$/.test(ctx.method)) {
      if (!ctx.header['content-type'] || !/application\/vnd\.api\+json/.test(ctx.header['content-type'])) {
        ctx.throw(400, JSON.stringify({
          errors: [
            {
              code: 'invalid_request',
              title: 'API requires header \'Content-type application/vnd.api+json\' for exchanging data.',
            },
          ],
        }));
      }
    }

    await next();
  };
}
