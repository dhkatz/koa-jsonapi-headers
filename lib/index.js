"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Add JSON API compliant headers to Koa.
 * @param options Customization options for handling requests.
 */
function default_1(options) {
    const patterns = options && options.exclude ? options.exclude.map((value) => new RegExp(value)) : [];
    return function headers(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const exclude = ctx.query.jsonapiexclude || false;
            if (exclude) {
                return yield next();
            }
            if (patterns.some((pattern) => pattern.test(ctx.url))) {
                return yield next();
            }
            if (!ctx.header.accept || !/application\/vnd\.api\+json/.test(ctx.header.accept)) {
                ctx.throw(400, JSON.stringify({
                    message: {
                        errors: [
                            {
                                code: 'invalid_request',
                                status: 400,
                                title: 'API requires header "Accept application/vnd.api+json" for exchanging data.',
                            },
                        ],
                    },
                }));
            }
            // Content-type: application/vnd.api+json
            // POST PUT and PATCH must have json-api HTTP content-type header
            if (/^(POST|PUT|PATCH)$/.test(ctx.method)) {
                if (!ctx.header['content-type'] || !/application\/vnd\.api\+json/.test(ctx.header['content-type'])) {
                    ctx.throw(400, JSON.stringify({
                        message: {
                            errors: [
                                {
                                    code: 'invalid_request',
                                    title: 'API requires header "Content-type application/vnd.api+json" for exchanging data.',
                                },
                            ],
                        },
                    }));
                }
            }
            yield next();
        });
    };
}
exports.default = default_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFPQTs7O0dBR0c7QUFDSCxtQkFBd0IsT0FBaUI7SUFDdkMsTUFBTSxRQUFRLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFN0csT0FBTyxTQUFlLE9BQU8sQ0FBQyxHQUFnQixFQUFFLElBQUk7O1lBQ2xELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQztZQUVsRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7YUFDckI7WUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzdELE9BQU8sTUFBTSxJQUFJLEVBQUUsQ0FBQzthQUNyQjtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNoRixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUM1QixPQUFPLEVBQUU7d0JBQ1AsTUFBTSxFQUFFOzRCQUNOO2dDQUNFLElBQUksRUFBRSxpQkFBaUI7Z0NBQ3ZCLE1BQU0sRUFBRSxHQUFHO2dDQUNYLEtBQUssRUFBRSw0RUFBNEU7NkJBQ3BGO3lCQUNGO3FCQUNGO2lCQUNGLENBQUMsQ0FBQyxDQUFDO2FBQ0w7WUFFRCx5Q0FBeUM7WUFDekMsaUVBQWlFO1lBQ2pFLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFO29CQUNsRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUM1QixPQUFPLEVBQUU7NEJBQ1AsTUFBTSxFQUFFO2dDQUNOO29DQUNFLElBQUksRUFBRSxpQkFBaUI7b0NBQ3ZCLEtBQUssRUFBRSxrRkFBa0Y7aUNBQzFGOzZCQUNGO3lCQUNGO3FCQUNGLENBQUMsQ0FBQyxDQUFDO2lCQUNMO2FBQ0Y7WUFFRCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQztLQUFBLENBQUM7QUFDSixDQUFDO0FBL0NELDRCQStDQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBrb2EgPSByZXF1aXJlKCdrb2EnKTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmludGVyZmFjZS1uYW1lXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICBleGNsdWRlPzogc3RyaW5nW107XG59XG5cbi8qKlxuICogQWRkIEpTT04gQVBJIGNvbXBsaWFudCBoZWFkZXJzIHRvIEtvYS5cbiAqIEBwYXJhbSBvcHRpb25zIEN1c3RvbWl6YXRpb24gb3B0aW9ucyBmb3IgaGFuZGxpbmcgcmVxdWVzdHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM/OiBPcHRpb25zKSB7XG4gIGNvbnN0IHBhdHRlcm5zID0gb3B0aW9ucyAmJiBvcHRpb25zLmV4Y2x1ZGUgPyBvcHRpb25zLmV4Y2x1ZGUubWFwKCh2YWx1ZTogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKHZhbHVlKSkgOiBbXTtcblxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gaGVhZGVycyhjdHg6IGtvYS5Db250ZXh0LCBuZXh0KSB7XG4gICAgY29uc3QgZXhjbHVkZSA9IGN0eC5xdWVyeS5qc29uYXBpZXhjbHVkZSB8fCBmYWxzZTtcblxuICAgIGlmIChleGNsdWRlKSB7XG4gICAgICByZXR1cm4gYXdhaXQgbmV4dCgpO1xuICAgIH1cblxuICAgIGlmIChwYXR0ZXJucy5zb21lKChwYXR0ZXJuOiBSZWdFeHApID0+IHBhdHRlcm4udGVzdChjdHgudXJsKSkpIHtcbiAgICAgIHJldHVybiBhd2FpdCBuZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKCFjdHguaGVhZGVyLmFjY2VwdCB8fCAhL2FwcGxpY2F0aW9uXFwvdm5kXFwuYXBpXFwranNvbi8udGVzdChjdHguaGVhZGVyLmFjY2VwdCkpIHtcbiAgICAgIGN0eC50aHJvdyg0MDAsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIGVycm9yczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb2RlOiAnaW52YWxpZF9yZXF1ZXN0JyxcbiAgICAgICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgICAgIHRpdGxlOiAnQVBJIHJlcXVpcmVzIGhlYWRlciBcIkFjY2VwdCBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb25cIiBmb3IgZXhjaGFuZ2luZyBkYXRhLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgLy8gQ29udGVudC10eXBlOiBhcHBsaWNhdGlvbi92bmQuYXBpK2pzb25cbiAgICAvLyBQT1NUIFBVVCBhbmQgUEFUQ0ggbXVzdCBoYXZlIGpzb24tYXBpIEhUVFAgY29udGVudC10eXBlIGhlYWRlclxuICAgIGlmICgvXihQT1NUfFBVVHxQQVRDSCkkLy50ZXN0KGN0eC5tZXRob2QpKSB7XG4gICAgICBpZiAoIWN0eC5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICEvYXBwbGljYXRpb25cXC92bmRcXC5hcGlcXCtqc29uLy50ZXN0KGN0eC5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddKSkge1xuICAgICAgICBjdHgudGhyb3coNDAwLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgZXJyb3JzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2RlOiAnaW52YWxpZF9yZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0FQSSByZXF1aXJlcyBoZWFkZXIgXCJDb250ZW50LXR5cGUgYXBwbGljYXRpb24vdm5kLmFwaStqc29uXCIgZm9yIGV4Y2hhbmdpbmcgZGF0YS4nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgbmV4dCgpO1xuICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcc3JjIn0=
