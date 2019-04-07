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
            yield next();
        });
    };
}
exports.default = default_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFPQTs7O0dBR0c7QUFDSCxtQkFBd0IsT0FBaUI7SUFDdkMsTUFBTSxRQUFRLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFN0csT0FBTyxTQUFlLE9BQU8sQ0FBQyxHQUFnQixFQUFFLElBQUk7O1lBQ2xELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQztZQUVsRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7YUFDckI7WUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzdELE9BQU8sTUFBTSxJQUFJLEVBQUUsQ0FBQzthQUNyQjtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNoRixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUM1QixNQUFNLEVBQUU7d0JBQ047NEJBQ0UsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsTUFBTSxFQUFFLEdBQUc7NEJBQ1gsS0FBSyxFQUFFLDhFQUE4RTt5QkFDdEY7cUJBQ0Y7aUJBQ0YsQ0FBQyxDQUFDLENBQUM7YUFDTDtZQUVELHlDQUF5QztZQUN6QyxpRUFBaUU7WUFDakUsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQzVCLE1BQU0sRUFBRTs0QkFDTjtnQ0FDRSxJQUFJLEVBQUUsaUJBQWlCO2dDQUN2QixLQUFLLEVBQUUsb0ZBQW9GOzZCQUM1Rjt5QkFDRjtxQkFDRixDQUFDLENBQUMsQ0FBQztpQkFDTDthQUNGO1lBRUQsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNmLENBQUM7S0FBQSxDQUFDO0FBQ0osQ0FBQztBQTNDRCw0QkEyQ0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQga29hID0gcmVxdWlyZSgna29hJyk7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTppbnRlcmZhY2UtbmFtZVxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgZXhjbHVkZT86IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIEFkZCBKU09OIEFQSSBjb21wbGlhbnQgaGVhZGVycyB0byBLb2EuXG4gKiBAcGFyYW0gb3B0aW9ucyBDdXN0b21pemF0aW9uIG9wdGlvbnMgZm9yIGhhbmRsaW5nIHJlcXVlc3RzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zPzogT3B0aW9ucykge1xuICBjb25zdCBwYXR0ZXJucyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5leGNsdWRlID8gb3B0aW9ucy5leGNsdWRlLm1hcCgodmFsdWU6IHN0cmluZykgPT4gbmV3IFJlZ0V4cCh2YWx1ZSkpIDogW107XG5cbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGhlYWRlcnMoY3R4OiBrb2EuQ29udGV4dCwgbmV4dCkge1xuICAgIGNvbnN0IGV4Y2x1ZGUgPSBjdHgucXVlcnkuanNvbmFwaWV4Y2x1ZGUgfHwgZmFsc2U7XG5cbiAgICBpZiAoZXhjbHVkZSkge1xuICAgICAgcmV0dXJuIGF3YWl0IG5leHQoKTtcbiAgICB9XG5cbiAgICBpZiAocGF0dGVybnMuc29tZSgocGF0dGVybjogUmVnRXhwKSA9PiBwYXR0ZXJuLnRlc3QoY3R4LnVybCkpKSB7XG4gICAgICByZXR1cm4gYXdhaXQgbmV4dCgpO1xuICAgIH1cblxuICAgIGlmICghY3R4LmhlYWRlci5hY2NlcHQgfHwgIS9hcHBsaWNhdGlvblxcL3ZuZFxcLmFwaVxcK2pzb24vLnRlc3QoY3R4LmhlYWRlci5hY2NlcHQpKSB7XG4gICAgICBjdHgudGhyb3coNDAwLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGVycm9yczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvZGU6ICdpbnZhbGlkX3JlcXVlc3QnLFxuICAgICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgICB0aXRsZTogJ0FQSSByZXF1aXJlcyBoZWFkZXIgXFwnQWNjZXB0IGFwcGxpY2F0aW9uL3ZuZC5hcGkranNvblxcJyBmb3IgZXhjaGFuZ2luZyBkYXRhLicsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvLyBDb250ZW50LXR5cGU6IGFwcGxpY2F0aW9uL3ZuZC5hcGkranNvblxuICAgIC8vIFBPU1QgUFVUIGFuZCBQQVRDSCBtdXN0IGhhdmUganNvbi1hcGkgSFRUUCBjb250ZW50LXR5cGUgaGVhZGVyXG4gICAgaWYgKC9eKFBPU1R8UFVUfFBBVENIKSQvLnRlc3QoY3R4Lm1ldGhvZCkpIHtcbiAgICAgIGlmICghY3R4LmhlYWRlclsnY29udGVudC10eXBlJ10gfHwgIS9hcHBsaWNhdGlvblxcL3ZuZFxcLmFwaVxcK2pzb24vLnRlc3QoY3R4LmhlYWRlclsnY29udGVudC10eXBlJ10pKSB7XG4gICAgICAgIGN0eC50aHJvdyg0MDAsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBlcnJvcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29kZTogJ2ludmFsaWRfcmVxdWVzdCcsXG4gICAgICAgICAgICAgIHRpdGxlOiAnQVBJIHJlcXVpcmVzIGhlYWRlciBcXCdDb250ZW50LXR5cGUgYXBwbGljYXRpb24vdm5kLmFwaStqc29uXFwnIGZvciBleGNoYW5naW5nIGRhdGEuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IG5leHQoKTtcbiAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHNyYyJ9
