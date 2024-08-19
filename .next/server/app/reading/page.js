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
        url: "/book-covers/steallikeanartist.png",
        name: "Steal like an artist",
        review: "Steal Like an Artist by Austin Kleon is a creative manifesto that flips the script on originality. Kleon argues that nothing is truly original, and that the best way to create is by embracing the influence of others—stealing ideas, but making them your own. The book is filled with practical advice for tapping into your creativity, encouraging you to draw inspiration from everywhere, remix existing ideas, and forge your own unique path. Kleon’s writing is accessible and motivating, breaking down the creative process into simple, actionable steps. He emphasizes that creativity isn’t about waiting for lightning to strike; it’s about actively engaging with the world around you, collecting ideas, and recombining them in new ways. The book’s playful illustrations and quotes add to its charm, making it a fun and quick read. Steal Like an Artist is a must-read for anyone looking to boost their creativity and let go of the pressure to be completely original. It’s a reminder that creativity thrives on influence, and that by embracing the ideas of others, you can discover your own voice. This book isn’t just about creating art—it’s about living a creative life.",
        rating: 9
    },
    {
        url: "/book-covers/1984georgeowell.png",
        name: "1984",
        review: "1984 by George Orwell is a brutal indictment of totalitarianism, showing just how far a regime can go in controlling not just actions, but thoughts. The novel doesn’t just warn about the loss of freedom—it showcases the horrifying power of propaganda and surveillance to rewrite reality itself. Winston Smith’s rebellion is less a fight for freedom and more a tragic exercise in futility. Orwell’s world isn’t just dystopian; it’s a nightmare of psychological manipulation where truth is a casualty. Hot take: The most terrifying part of 1984 isn’t the constant surveillance—it’s the idea that with enough control, the state can make you believe anything, even that 2 + 2 = 5. As AI and data surveillance grow more pervasive in our own world, Orwell's vision feels less like fiction and more like a warning. It’s going to be fascinating—and possibly frightening—to see how our future unfolds in this context.",
        rating: 9
    },
    {
        url: "/book-covers/onearthwerebrieflygorgeous.png",
        name: "On Earth We're Briefly Gorgeous",
        review: "On Earth We're Briefly Gorgeous by Ocean Vuong is a poetic gut-punch that lingers long after you close the book. Vuong’s prose is as beautiful as it is devastating, capturing the raw, aching complexities of identity, trauma, and love. But the book’s lyrical style can feel overwhelming at times, almost too rich, like trying to drink poetry straight from the bottle. It’s a gorgeous, emotional read, but not one you can breeze through—its intensity demands your full attention. For some, that might make it a bit of a slow burn, but the payoff is worth it.",
        rating: 9
    },
    {
        url: "/book-covers/showurwork.png",
        name: "Show Your Work",
        review: "Show Your Work! by Austin Kleon had a profound impact on me, inspiring me to create my own website and blog. Kleon’s message about the importance of sharing your creative process really hit home. Instead of waiting for everything to be perfect, I realized the value in putting my work out there, step by step, and letting others see the journey unfold. The book encouraged me to embrace transparency and connect with others through my work. It’s not just about the end result—it’s about sharing the ups, downs, and everything in between. This shift in mindset motivated me to build my platform, where I can document my projects, thoughts, and growth in real time. Kleon’s advice made me see that the process itself is worth celebrating, and that by sharing it, I can inspire and engage with a community of like-minded individuals.",
        rating: 8
    },
    {
        url: "/book-covers/atomichabbits.png",
        name: "Atomic Habbits",
        review: "Atomic Habits by James Clear is a practical guide to building good habits and breaking bad ones, all through the power of small, incremental changes. Clear’s core idea is that it's not massive shifts that lead to success, but rather tiny habits that compound over time to produce significant results. He breaks down the science of habit formation in a way that’s easy to understand and apply, offering a clear roadmap for making lasting changes in your life. The book is filled with actionable strategies, such as the “2-minute rule” and habit stacking, which make it easier to start and maintain new habits. Clear also dives into the psychology behind why we do what we do, helping readers understand the cues and rewards that drive their behavior. Atomic Habits is an essential read for anyone looking to make positive changes in their life without the overwhelm. Clear’s approach is both realistic and encouraging, showing that even the smallest actions, when done consistently, can lead to big transformations. Whether you're looking to improve your health, productivity, or personal growth, this book provides the tools you need to make those changes stick.",
        rating: 8
    },
    {
        url: "/book-covers/deepwork.png",
        name: "Deep Work",
        review: "Deep Work by Cal Newport is a game-changer for anyone seeking to achieve truly meaningful and productive work. Newport makes a compelling case for the power of focused, distraction-free effort in an age where constant connectivity often leads to shallow, unfocused work. The book is packed with actionable strategies to help you carve out time for deep, concentrated effort, enabling you to produce high-quality results and reach your full potential. It’s an essential read for anyone serious about taking their productivity and work quality to the next level.",
        rating: 9
    },
    {
        url: "/book-covers/obstacleistheway.png",
        name: "The obstacle is the way",
        review: "The Obstacle Is the Way by Ryan Holiday serves up Stoic philosophy with a side of self-help, but at times, it feels like it’s stuck in first gear. While Holiday's advice on turning challenges into opportunities is practical and motivating, the pacing can drag, and the repetition of key ideas makes it feel like the book is circling the same point over and over. If you’re looking for a quick, impactful read, this one might test your patience. It's a solid introduction to Stoicism, but the message could have been delivered in half the time.",
        rating: 8
    },
    {
        url: "/book-covers/warofart.png",
        name: "War of Art",
        review: 'The War of Art by Steven Pressfield is a no-nonsense guide to overcoming the internal barriers that keep us from doing our best work. Pressfield identifies these obstacles as "Resistance," a force that manifests as procrastination, fear, self-doubt, and anything else that keeps you from pursuing your true calling. The book is divided into three sections, each tackling different aspects of Resistance and offering strategies to conquer it. Pressfield’s tone is direct and almost militaristic, urging readers to treat their creative work with the same seriousness and discipline as a professional soldier. He makes it clear that the hardest battle is often within ourselves, and the key to success is showing up every day, no matter how difficult it feels. The War of Art is a powerful kick in the pants for anyone struggling to get started on a creative project or who feels stuck in their work. It’s a reminder that the biggest obstacles are often self-imposed, and that true artists must push through Resistance to reach their potential. This book isn’t just about creativity; it’s about developing the mental toughness to pursue your passion relentlessly.',
        rating: 9
    },
    {
        url: "/book-covers/E-reader.png",
        name: "No Death - No Fear",
        review: "No Death, No Fear by Thich Nhat Hanh holds a special resonance for me as a Vietnamese Buddhist. Hanh’s teachings are deeply rooted in the Buddhist principles that have been a part of my cultural and spiritual upbringing. His gentle wisdom and compassionate approach to life and death reflect the essence of what I’ve learned through Buddhist practices—the understanding that life is transient and interconnected. Hanh’s words feel like a reminder of the lessons I've grown up with: that death is not an end, but a transformation, and that fear of death only arises when we forget our true nature. The book beautifully captures the peaceful acceptance of impermanence that is at the heart of Buddhism, and it provides a comforting, spiritual perspective that aligns with the values and beliefs I’ve carried with me throughout my life. It’s a deeply personal and affirming read, one that echoes the teachings I hold close and offers a profound sense of peace.",
        rating: 8
    }
];
const ReadingPage = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: "mb-12",
                children: "What I have been reading"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "mt-10 space-y-12 border-t border-gray-200 pt-10 dark:border-gray-700",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(src_app_books_page_tsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    books: data
                })
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