"use strict";
(() => {
var exports = {};
exports.id = 155;
exports.ids = [155];
exports.modules = {

/***/ 4021:
/***/ ((module) => {

module.exports = import("next/dist/compiled/@vercel/og/index.node.js");;

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 7384:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&isDynamic=0!./src/app/favicon.ico?__next_metadata_route__
var favicon_next_metadata_route_namespaceObject = {};
__webpack_require__.r(favicon_next_metadata_route_namespaceObject);
__webpack_require__.d(favicon_next_metadata_route_namespaceObject, {
  GET: () => (GET),
  dynamic: () => (dynamic)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./node_modules/next/server.js
var server = __webpack_require__(514);
;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&isDynamic=0!./src/app/favicon.ico?__next_metadata_route__


const contentType = "image/x-icon"
const buffer = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAG1BMVEVHVaBMaXFGVaBHVaFGVZ9GVZ9GVKBGVKBHVaB/ieeKAAAACXRSTlP/AL0X3k5tlzR379WEAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAERElEQVR4nO2b65arIAyFN5cE3v+Jz2qrFSFBsChrzZFfM0XYHyAhBISZnPAAmGcIJic8AOYZgskJD4DpShQ8APjgiizH9pWFQNcNQfxIfHSyPN6ybLwIgN6t/8qkneASNAB0CUDcaQA+ydvr9xCg+Um3a/9+FEKe5d14gJCLAOtYuzIrDAdwpQiszgY3GoCgqxSDA4BHAwQJgMS3s2sM0AqQv+dJM8XOsbMB/J/rgSCpxBvfAZJUzI2zwHi9lbfYAcOTLaEpx2Az+Hx6BMxP78BGEC5/B0jQH0KAHn27yXjOCBJvJdgOAvToG+PelfuX30f5wv/xFy271WrxMABa9YVfZdfDNvtFOK2/WsAfCXBefwwBftAfQoBf9EcQ4CCfD9bWnwkg/OY4WGvfW6xCP76zOEpzgULYZSUEkYMN4qYNpfzX2njO9Tdrs22/FoL4LWYpJ9iKvYzEAQAVy66V91+sW+mg+1E+HgAQGvUTmUoZwZOLVYDYU9fJPnA1AKtXJayHTndISF8mbQWAoKv0uWS+sqOLOoAVHl86WnJ9fcUpjaojt3fXsO8PIVm9pppbznqTfB+AV7t5HWmRLeidgz4A6E1ZmsmVjqvU2NkDdjZA0IeAxg2B12sSm+nUqba+hBK31QGC2spqiMbq5kPqHdYBYmXOBN3cUWWul526t8XYAQgqdGqZQPOuDXuAoqqghwmTlhSZG7a+ussAzjfrpyY90+GKvjtwSFyQKlr0vVpR6iz4bNh8bdsOPSaexOQXfTLsC7drTbQW48JjXRvlQ2z0iiMxJc9+9V9/EzPJ4Y88K/WYsxqPAPYp1e9INY+9C8BdqW8wWd9gsr7BZH1zMAtK/dgyC8rYhYsUxVKo2oFc37XZgUJ/OdGTTvtQ/JJawkyfGi1hpp8WK+JGyP4vbf6mz81rQSWCd7QWWF2fOlbDShS1vhqGQn9bD89tQWOXPxCLp7emnPSIBHfN9fmEfKdP6HWVgV5x59YMd+4LoDfz5M5oOgAGABh9CPiOIfDD4wMVAKs3ZWCEpLI3JL2mgTEiGh8l86OiZEbYAFbOpdR1qna7I4tUYg8gRT1dw0oZtEZWqGUAU9vNVWrj1tstdCZa7qRouc+W3a1YHi3n1ZEDSp8MTecFLj8vcN83L+bFivOCl0Wgb7EWgDQVBIUbqN/bajo9hLmMoO30EuYqgsbTUxwC1M6tKgStp7cw1xA0nx7D/EiQz4WUi4ednvOXgIL3Pp1rH4LXLoXsenreoW8a7w8sBJtF2azNQsCX3h8wwrq+7VhEp2PwDQrTTTD+HhHrGoI/MP4WjQldx3b33KgMd96k4k6n9J4blW72jUq68T6h7wTwf64H7OwblTx7FjjMvlEZZt+odLNv1xuqvOd3fF9gMoL7v7Awu29MeMI3JublEn4kWP3K5n3b8jqA8QkX1PkAdCWYyQkPgHmGYHLCfw/wDzD3O8DEtkz9AAAAAElFTkSuQmCC", 'base64'
  )

function GET() {
  return new server.NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': "public, max-age=0, must-revalidate",
    },
  })
}

const dynamic = 'force-static'

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Ffavicon.ico%2Froute&name=app%2Ffavicon.ico%2Froute&pagePath=private-next-app-dir%2Ffavicon.ico&appDir=%2FUsers%2Fkhanhgn%2FDevelopment%2Fpersonal-website%2Fsrc%2Fapp&appPaths=%2Ffavicon.ico&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/favicon.ico/route",
        pathname: "/favicon.ico",
        filename: "favicon",
        bundlePath: "app/favicon.ico/route"
    },
    resolvedPagePath: "next-metadata-route-loader?page=%2Ffavicon.ico%2Froute&isDynamic=0!/Users/khanhgn/Development/personal-website/src/app/favicon.ico?__next_metadata_route__",
    nextConfigOutput,
    userland: favicon_next_metadata_route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/favicon.ico/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,565,218], () => (__webpack_exec__(7384)));
module.exports = __webpack_exports__;

})();