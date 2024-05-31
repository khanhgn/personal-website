"use strict";
(() => {
var exports = {};
exports.id = 843;
exports.ids = [843];
exports.modules = {

/***/ 8038:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 8704:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react-dom/server-rendering-stub");

/***/ }),

/***/ 7897:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react-server-dom-webpack/client");

/***/ }),

/***/ 6786:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 5868:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/app-render");

/***/ }),

/***/ 1844:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/get-segment-param");

/***/ }),

/***/ 6624:
/***/ ((module) => {

module.exports = require("next/dist/server/future/helpers/interception-routes");

/***/ }),

/***/ 5281:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module");

/***/ }),

/***/ 7085:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context");

/***/ }),

/***/ 199:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/hash");

/***/ }),

/***/ 9569:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/hooks-client-context");

/***/ }),

/***/ 7160:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context");

/***/ }),

/***/ 893:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix");

/***/ }),

/***/ 2336:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url");

/***/ }),

/***/ 7887:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/handle-smooth-scroll");

/***/ }),

/***/ 8735:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot");

/***/ }),

/***/ 120:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url");

/***/ }),

/***/ 8231:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path");

/***/ }),

/***/ 4614:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix");

/***/ }),

/***/ 3750:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash");

/***/ }),

/***/ 982:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href");

/***/ }),

/***/ 9618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/server-inserted-html");

/***/ }),

/***/ 8423:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 4280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7262);
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9513);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1823);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2502);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
// @ts-ignore this need to be imported from next/dist to be external


const AppPageRouteModule = next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: [
        'reading',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4363)), "/Users/khanhgn/Development/personal-website/src/app/reading/page.tsx"],
          
        }]
      },
        {
        
        metadata: {
    icon: [(async (props) => (await Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 3881))).default(props))],
    apple: [],
    openGraph: [],
    twitter: [],
    manifest: undefined
  }
      }
      ]
      },
        {
        'layout': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9889)), "/Users/khanhgn/Development/personal-website/src/app/layout.tsx"],
'not-found': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 5493, 23)), "next/dist/client/components/not-found-error"],
        metadata: {
    icon: [(async (props) => (await Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 3881))).default(props))],
    apple: [],
    openGraph: [],
    twitter: [],
    manifest: undefined
  }
      }
      ]
      }.children;
const pages = ["/Users/khanhgn/Development/personal-website/src/app/reading/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/reading/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/reading/page",
        pathname: "/reading",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ 4363:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2947);
/* harmony import */ var src_app_books_page_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6354);



const data = [
    {
        url: "/book-covers/A Man Called Ove.png",
        name: "A Man Called Ove",
        review: "Last Christmas, my mother gifted me a copy of Fredrik Backman’s A Man Called Ove. It had nothing to do with the fact that I had previously read and reviewed one of Backman’s other books and would have thus thought that I would like this book as well. No, the reason why I got this book as a gift was that there was a cat on the cover of the book and, because of that, she thought that the book might be a good read. I think what my mom was trying to tell me was that she thought I read too many weird books, so she wanted to give me something that was a little more “normal.” And what’s more normal than having a cat on the cover of a book? OK, the reason might partially have been that she misses her own cat, who passed on a couple of years ago, but, in any event, I got this book, and it has taken me a year to finally have the time to read it. It turns out that a year might have been too long. It’s a pretty good book. A Man Called Ove is simply about, well, a man called Ove. He’s a Swedish man in late middle age who is prickly and grumpy at best — but his terseness is a shell to protect him from the sorts of bad things that usually befall people in life. And some very bad things have happened to him by the start of this book. His wife of 40 odd years has recently died and he has just lost his job due to downsizing. He is contemplating ending his life because he feels he no longer has anything to live for. However, every time that he tries to die — and I hope this isn’t much of a spoiler because the book’s pleasure lies in its predictability — he gets rudely interrupted by a neighbour or someone else who wants something of him. In the end, will Ove come to see that he has an extended family of neighbours (along with a friendly feral cat that he winds up adopting) who likes him just as he is? Will his heart turn to gold, revealing that he’s not too much of an old grump at all? Well, does a bear poop in the woods?",
        rating: 9
    },
    {
        url: "/book-covers/A Mathematician's Apology.png",
        name: "A Mathematician's Apology",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/Animal Farm.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/Life of Pi.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/Papillon.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/Skin in the Game.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/The Stranger.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/The Amazing Story.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/The End of Everything.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/The Myth of Normal.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/Tribes.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/To Kill a Mockingbird.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/Zero.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/This Perfect Day.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/The Stranger.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/The Shell Collector.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/The Da Vinci Code.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/OPEN.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/E-reader.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    },
    {
        url: "/book-covers/Banco.png",
        name: "Book One",
        review: "https://example.com/review1",
        rating: 9
    },
    {
        url: "/book-covers/Anxious People.png",
        name: "Book Two",
        review: "https://example.com/review2",
        rating: 8
    }
];
const ReadingPage = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "mb-12",
                children: "Book Carousel"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(src_app_books_page_tsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
                books: data
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReadingPage);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,295,852,714,917], () => (__webpack_exec__(4280)));
module.exports = __webpack_exports__;

})();