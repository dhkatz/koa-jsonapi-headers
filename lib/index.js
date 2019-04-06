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
                return next();
            }
            if (patterns.some((pattern) => pattern.test(ctx.url))) {
                return next();
            }
            if (!ctx.header.accept || !/application\/vnd\.api\+json/.test(ctx.header.accept)) {
                ctx.throw(400, {
                    message: {
                        errors: [
                            {
                                code: 'invalid_request',
                                title: 'API requires header "Accept application/vnd.api+json" for exchanging data.',
                            },
                        ],
                    },
                });
            }
            // Content-type: application/vnd.api+json
            // POST PUT and PATCH must have json-api HTTP content-type header
            if (/^(POST|PUT|PATCH)$/.test(ctx.method)) {
                if (!ctx.header['content-type'] || !/application\/vnd\.api\+json/.test(ctx.header['content-type'])) {
                    ctx.throw(400, {
                        message: {
                            errors: [
                                {
                                    code: 'invalid_request',
                                    title: 'API requires header "Content-type application/vnd.api+json" for exchanging data.',
                                },
                            ],
                        },
                    });
                }
            }
            yield next();
        });
    };
}
exports.default = default_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFPQTs7O0dBR0c7QUFDSCxtQkFBd0IsT0FBaUI7SUFDdkMsTUFBTSxRQUFRLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFN0csT0FBTyxTQUFlLE9BQU8sQ0FBQyxHQUFvQixFQUFFLElBQUk7O1lBQ3RELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQztZQUVsRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzdELE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNoRixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtvQkFDYixPQUFPLEVBQUU7d0JBQ1AsTUFBTSxFQUFFOzRCQUNOO2dDQUNFLElBQUksRUFBRSxpQkFBaUI7Z0NBQ3ZCLEtBQUssRUFBRSw0RUFBNEU7NkJBQ3BGO3lCQUNGO3FCQUNGO2lCQUNGLENBQUMsQ0FBQzthQUNKO1lBRUQseUNBQXlDO1lBQ3pDLGlFQUFpRTtZQUNqRSxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRTtvQkFDbEcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7d0JBQ2IsT0FBTyxFQUFFOzRCQUNQLE1BQU0sRUFBRTtnQ0FDTjtvQ0FDRSxJQUFJLEVBQUUsaUJBQWlCO29DQUN2QixLQUFLLEVBQUUsa0ZBQWtGO2lDQUMxRjs2QkFDRjt5QkFDRjtxQkFDRixDQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUVELE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDZixDQUFDO0tBQUEsQ0FBQztBQUNKLENBQUM7QUE5Q0QsNEJBOENDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGtvYSA9IHJlcXVpcmUoJ2tvYScpO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW50ZXJmYWNlLW5hbWVcbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGV4Y2x1ZGU/OiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBBZGQgSlNPTiBBUEkgY29tcGxpYW50IGhlYWRlcnMgdG8gS29hLlxuICogQHBhcmFtIG9wdGlvbnMgQ3VzdG9taXphdGlvbiBvcHRpb25zIGZvciBoYW5kbGluZyByZXF1ZXN0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucz86IE9wdGlvbnMpIHtcbiAgY29uc3QgcGF0dGVybnMgPSBvcHRpb25zICYmIG9wdGlvbnMuZXhjbHVkZSA/IG9wdGlvbnMuZXhjbHVkZS5tYXAoKHZhbHVlOiBzdHJpbmcpID0+IG5ldyBSZWdFeHAodmFsdWUpKSA6IFtdO1xuXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiBoZWFkZXJzKGN0eDoga29hLkJhc2VDb250ZXh0LCBuZXh0KSB7XG4gICAgY29uc3QgZXhjbHVkZSA9IGN0eC5xdWVyeS5qc29uYXBpZXhjbHVkZSB8fCBmYWxzZTtcblxuICAgIGlmIChleGNsdWRlKSB7XG4gICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH1cblxuICAgIGlmIChwYXR0ZXJucy5zb21lKChwYXR0ZXJuOiBSZWdFeHApID0+IHBhdHRlcm4udGVzdChjdHgudXJsKSkpIHtcbiAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKCFjdHguaGVhZGVyLmFjY2VwdCB8fCAhL2FwcGxpY2F0aW9uXFwvdm5kXFwuYXBpXFwranNvbi8udGVzdChjdHguaGVhZGVyLmFjY2VwdCkpIHtcbiAgICAgIGN0eC50aHJvdyg0MDAsIHtcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIGVycm9yczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb2RlOiAnaW52YWxpZF9yZXF1ZXN0JyxcbiAgICAgICAgICAgICAgdGl0bGU6ICdBUEkgcmVxdWlyZXMgaGVhZGVyIFwiQWNjZXB0IGFwcGxpY2F0aW9uL3ZuZC5hcGkranNvblwiIGZvciBleGNoYW5naW5nIGRhdGEuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENvbnRlbnQtdHlwZTogYXBwbGljYXRpb24vdm5kLmFwaStqc29uXG4gICAgLy8gUE9TVCBQVVQgYW5kIFBBVENIIG11c3QgaGF2ZSBqc29uLWFwaSBIVFRQIGNvbnRlbnQtdHlwZSBoZWFkZXJcbiAgICBpZiAoL14oUE9TVHxQVVR8UEFUQ0gpJC8udGVzdChjdHgubWV0aG9kKSkge1xuICAgICAgaWYgKCFjdHguaGVhZGVyWydjb250ZW50LXR5cGUnXSB8fCAhL2FwcGxpY2F0aW9uXFwvdm5kXFwuYXBpXFwranNvbi8udGVzdChjdHguaGVhZGVyWydjb250ZW50LXR5cGUnXSkpIHtcbiAgICAgICAgY3R4LnRocm93KDQwMCwge1xuICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgIGVycm9yczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29kZTogJ2ludmFsaWRfcmVxdWVzdCcsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdBUEkgcmVxdWlyZXMgaGVhZGVyIFwiQ29udGVudC10eXBlIGFwcGxpY2F0aW9uL3ZuZC5hcGkranNvblwiIGZvciBleGNoYW5naW5nIGRhdGEuJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgbmV4dCgpO1xuICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcc3JjIn0=
