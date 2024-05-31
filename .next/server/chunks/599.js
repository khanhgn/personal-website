"use strict";
exports.id = 599;
exports.ids = [599];
exports.modules = {

/***/ 8710:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
    if (args.length < required) {
        throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
}


/***/ }),

/***/ 8844:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(335);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8710);


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */ function toDate(argument) {
    (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    // Clone the date
    if (argument instanceof Date || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(argument) === "object" && argStr === "[object Date]") {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
        return new Date(argument);
    } else {
        if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
            // eslint-disable-next-line no-console
            console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
            // eslint-disable-next-line no-console
            console.warn(new Error().stack);
        }
        return new Date(NaN);
    }
}


/***/ }),

/***/ 335:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
}


/***/ }),

/***/ 4770:
/***/ (() => {


// UNUSED EXPORTS: guards, isType, pick

;// CONCATENATED MODULE: ./node_modules/@contentlayer/client/dist/guards.js
function is(typeName, _) {
    if (_) {
        if (Array.isArray(typeName)) {
            // TODO make type field name dynamic (probably will require to code-gen the guard function)
            return typeName.some((typeName_)=>_?.type === typeName_);
        } else {
            return typeName === _?.type;
        }
    } else {
        return (_)=>is(typeName, _);
    }
}
const isType = (/* unused pure expression or super */ null && (is));
const guards = {
    is,
    // isType,
    // hasAllFields,
    // allFields,
    hasField
};
function hasField(_, property) {
    return _.hasOwnProperty(property);
} //# sourceMappingURL=guards.js.map

;// CONCATENATED MODULE: ./node_modules/@contentlayer/client/dist/index.js

 //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/contentlayer/dist/client/index.js
 //# sourceMappingURL=index.js.map


/***/ })

};
;