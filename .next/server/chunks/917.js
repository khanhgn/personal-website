exports.id = 917;
exports.ids = [917];
exports.modules = {

/***/ 1606:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4682))

/***/ }),

/***/ 4682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2945);
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3754);
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(swiper_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var swiper_css_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2119);
/* harmony import */ var swiper_css_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(swiper_css_navigation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_styles_Carousel_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2309);
/* harmony import */ var src_styles_Carousel_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(src_styles_Carousel_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* __next_internal_client_entry_do_not_use__ default auto */ 





const Carousel = ({ books = [] })=>{
    const [selectedBook, setSelectedBook] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const handleBookClick = (book)=>{
        if (selectedBook === book) {
            setSelectedBook(null);
        } else {
            setSelectedBook(book);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__/* .Swiper */ .tq, {
                spaceBetween: 2,
                slidesPerView: "auto",
                children: books.length > 0 ? books.map((book, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__/* .SwiperSlide */ .o5, {
                        className: (src_styles_Carousel_module_css__WEBPACK_IMPORTED_MODULE_5___default()["slider-item"]),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: book.url,
                            alt: book.name,
                            className: `${(src_styles_Carousel_module_css__WEBPACK_IMPORTED_MODULE_5___default()["book-spine"])} ${selectedBook === book ? (src_styles_Carousel_module_css__WEBPACK_IMPORTED_MODULE_5___default().selected) : ""}`,
                            id: book.name.replace(/\s+/g, "-").toLowerCase(),
                            onClick: ()=>handleBookClick(book)
                        })
                    }, idx)) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    children: "No books available"
                })
            }),
            selectedBook && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        children: selectedBook.name
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("em", {
                            children: [
                                "Rating: ",
                                selectedBook.rating
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: selectedBook.review
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Carousel);


/***/ }),

/***/ 2309:
/***/ ((module) => {

// Exports
module.exports = {
	"slider-item": "Carousel_slider-item__UUU5l",
	"book-spine": "Carousel_book-spine__CZ_qY",
	"swiper": "Carousel_swiper__V8nIS",
	"swiper-slide": "Carousel_swiper-slide__NfH3w",
	"selected": "Carousel_selected___NG_e"
};


/***/ }),

/***/ 6354:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/khanhgn/Development/personal-website/src/app/books/page.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;