exports.id = 714;
exports.ids = [714];
exports.modules = {

/***/ 9957:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 1232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 2987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 6926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 4282, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 6505, 23))

/***/ }),

/***/ 5222:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 954, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4554));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 2799))

/***/ }),

/***/ 4554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1072);
/* __next_internal_client_entry_do_not_use__ ThemeProvider auto */ 

function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_themes__WEBPACK_IMPORTED_MODULE_1__/* .ThemeProvider */ .f, {
        ...props,
        children: children
    });
}


/***/ }),

/***/ 2799:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeSwitch: () => (/* binding */ ThemeSwitch),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var modularize_import_loader_name_MoonStar_from_default_as_default_join_esm_icons_moon_star_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3197);
/* harmony import */ var modularize_import_loader_name_Sun_from_default_as_default_join_esm_icons_sun_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4904);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1072);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ ThemeSwitch,default auto */ 




function ThemeSwitch() {
    let { resolvedTheme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_1__/* .useTheme */ .F)();
    let otherTheme = resolvedTheme === "dark" ? "light" : "dark";
    let [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setMounted(true);
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "button",
        "aria-label": mounted ? `Switch to ${otherTheme} theme` : "Toggle theme",
        className: "group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20",
        onClick: ()=>setTheme(otherTheme),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(modularize_import_loader_name_Sun_from_default_as_default_join_esm_icons_sun_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                className: "h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-zinc-50 [@media(prefers-color-scheme:dark)]:stroke-zinc-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-zinc-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-600"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(modularize_import_loader_name_MoonStar_from_default_as_default_join_esm_icons_moon_star_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                className: "hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-zinc-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-zinc-500"
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeSwitch);


/***/ }),

/***/ 9889:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1363);
;// CONCATENATED MODULE: ./src/app/providers.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/khanhgn/Development/personal-website/src/app/providers.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["ThemeProvider"];

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(5182);
;// CONCATENATED MODULE: ./src/components/Container.tsx


function Container({ children, className }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (0,clsx/* default */.Z)(className, "mx-auto max-w-2xl px-6 lg:max-w-4xl"),
        children: children
    });
}

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(5124);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/components/Navigation.tsx


function Navigation() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        className: "flex flex-wrap justify-center md:justify-start",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/",
                className: "nav-link",
                children: "Home"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/about",
                className: "nav-link",
                children: "About"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/blogs",
                className: "nav-link",
                children: "Blog"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/resume",
                className: "nav-link hidden md:block",
                children: "Resume"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/transcript",
                className: "nav-link hidden md:block",
                children: "Transcript"
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/ThemeSwitch.tsx

const ThemeSwitch_proxy = (0,module_proxy.createProxy)(String.raw`/Users/khanhgn/Development/personal-website/src/components/ThemeSwitch.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: ThemeSwitch_esModule, $$typeof: ThemeSwitch_$$typeof } = ThemeSwitch_proxy;
const ThemeSwitch_default_ = ThemeSwitch_proxy.default;

const ThemeSwitch_e0 = ThemeSwitch_proxy["ThemeSwitch"];


/* harmony default export */ const ThemeSwitch = (ThemeSwitch_default_);
// EXTERNAL MODULE: ./src/lib/constants.ts
var constants = __webpack_require__(4873);
// EXTERNAL MODULE: ./src/app/global.css
var global = __webpack_require__(833);
;// CONCATENATED MODULE: ./src/app/layout.tsx








const meta = {
    title: "Khanh Nguyen",
    description: "Aspiring and sleep deprived DL research student",
    image: `${constants/* WEBSITE_HOST_URL */.Y}/og-preview.jpg`
};
const metadata = {
    title: {
        default: meta.title,
        template: "%s | Khanh"
    },
    description: meta.description
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e0, {
                attribute: "class",
                defaultTheme: "dark",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("header", {
                        className: "py-4",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Container, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex items-center justify-between py-6",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(Navigation, {}),
                                    /*#__PURE__*/ jsx_runtime_.jsx(ThemeSwitch, {})
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("main", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Container, {
                            children: children
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("footer", {
                        className: "py-16",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Container, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                children: [
                                    "Built by",
                                    " ",
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        className: "link",
                                        href: "https://twitter.com/khanhgng",
                                        children: "Khanh Nguyen"
                                    })
                                ]
                            })
                        })
                    })
                ]
            })
        })
    });
}


/***/ }),

/***/ 4873:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ WEBSITE_HOST_URL)
/* harmony export */ });
const WEBSITE_HOST_URL = "https://nextjs-typescript-mdx-blog.vercel.app";


/***/ }),

/***/ 3881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"16x16"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 833:
/***/ (() => {



/***/ })

};
;