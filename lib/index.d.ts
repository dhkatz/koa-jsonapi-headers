import koa = require('koa');
export interface Options {
    exclude?: string[];
}
/**
 * Add JSON API compliant headers to Koa.
 * @param options Customization options for handling requests.
 */
export default function (options?: Options): (ctx: koa.Context, next: any) => Promise<any>;
