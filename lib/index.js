"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Add JSON API compliant headers to Koa.
 * @param options Customization options for handling requests.
 */
function default_1(options) {
    const patterns = options && options.exclude ? options.exclude.map((value) => new RegExp(value)) : [];
    return function headers(ctx, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exclude = ctx.query.jsonapiexclude || false;
            if (exclude) {
                return yield next();
            }
            if (patterns.some((pattern) => pattern.test(ctx.url))) {
                return yield next();
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
            else if (/^(POST|PUT|PATCH)$/.test(ctx.method)) {
                if (!ctx.header['content-type'] || !/application\/vnd\.api\+json/.test(ctx.header['content-type'])) {
                    ctx.throw(400, JSON.stringify({
                        errors: [
                            {
                                code: 'invalid_request',
                                status: 400,
                                title: 'API requires header \'Content-type application/vnd.api+json\' for exchanging data.',
                            },
                        ],
                    }));
                }
            }
            yield next();
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0E7OztHQUdHO0FBQ0gsbUJBQXlCLE9BQWlCO0lBQ3hDLE1BQU0sUUFBUSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRTdHLE9BQU8sU0FBZSxPQUFPLENBQUMsR0FBZ0IsRUFBRSxJQUFjOztZQUM1RCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUM7WUFFbEQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsT0FBTyxNQUFNLElBQUksRUFBRSxDQUFDO2FBQ3JCO1lBRUQsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM3RCxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7YUFDckI7WUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDaEYsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDNUIsTUFBTSxFQUFFO3dCQUNOOzRCQUNFLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLE1BQU0sRUFBRSxHQUFHOzRCQUNYLEtBQUssRUFBRSw4RUFBOEU7eUJBQ3RGO3FCQUNGO2lCQUNGLENBQUMsQ0FBQyxDQUFDO2FBQ0w7aUJBQU0sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQzVCLE1BQU0sRUFBRTs0QkFDTjtnQ0FDRSxJQUFJLEVBQUUsaUJBQWlCO2dDQUN2QixNQUFNLEVBQUUsR0FBRztnQ0FDWCxLQUFLLEVBQUUsb0ZBQW9GOzZCQUM1Rjt5QkFDRjtxQkFDRixDQUFDLENBQUMsQ0FBQztpQkFDTDthQUNGO1lBRUQsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNmLENBQUM7S0FBQSxDQUFDO0FBQ0osQ0FBQztBQXhDRCw0QkF3Q0MifQ==