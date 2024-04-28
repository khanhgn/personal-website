"use strict";
exports.id = 918;
exports.ids = [918];
exports.modules = {

/***/ 4031:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    resolveRobots: function() {
        return resolveRobots;
    },
    resolveSitemap: function() {
        return resolveSitemap;
    },
    resolveManifest: function() {
        return resolveManifest;
    },
    resolveRouteData: function() {
        return resolveRouteData;
    }
});
const _utils = __webpack_require__(8454);
function resolveRobots(data) {
    let content = "";
    const rules = Array.isArray(data.rules) ? data.rules : [
        data.rules
    ];
    for (const rule of rules){
        const userAgent = (0, _utils.resolveArray)(rule.userAgent || [
            "*"
        ]);
        for (const agent of userAgent){
            content += `User-Agent: ${agent}\n`;
        }
        if (rule.allow) {
            const allow = (0, _utils.resolveArray)(rule.allow);
            for (const item of allow){
                content += `Allow: ${item}\n`;
            }
        }
        if (rule.disallow) {
            const disallow = (0, _utils.resolveArray)(rule.disallow);
            for (const item of disallow){
                content += `Disallow: ${item}\n`;
            }
        }
        if (rule.crawlDelay) {
            content += `Crawl-delay: ${rule.crawlDelay}\n`;
        }
        content += "\n";
    }
    if (data.host) {
        content += `Host: ${data.host}\n`;
    }
    if (data.sitemap) {
        const sitemap = (0, _utils.resolveArray)(data.sitemap);
        // TODO-METADATA: support injecting sitemap url into robots.txt
        sitemap.forEach((item)=>{
            content += `Sitemap: ${item}\n`;
        });
    }
    return content;
}
function resolveSitemap(data) {
    let content = "";
    content += '<?xml version="1.0" encoding="UTF-8"?>\n';
    content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (const item of data){
        content += "<url>\n";
        content += `<loc>${item.url}</loc>\n`;
        if (item.lastModified) {
            const serializedDate = item.lastModified instanceof Date ? item.lastModified.toISOString() : item.lastModified;
            content += `<lastmod>${serializedDate}</lastmod>\n`;
        }
        if (item.changeFrequency) {
            content += `<changefreq>${item.changeFrequency}</changefreq>\n`;
        }
        if (typeof item.priority === "number") {
            content += `<priority>${item.priority}</priority>\n`;
        }
        content += "</url>\n";
    }
    content += "</urlset>\n";
    return content;
}
function resolveManifest(data) {
    return JSON.stringify(data);
}
function resolveRouteData(data, fileType) {
    if (fileType === "robots") {
        return resolveRobots(data);
    }
    if (fileType === "sitemap") {
        return resolveSitemap(data);
    }
    if (fileType === "manifest") {
        return resolveManifest(data);
    }
    return "";
} //# sourceMappingURL=resolve-route-data.js.map


/***/ }),

/***/ 8454:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    resolveAsArrayOrUndefined: function() {
        return resolveAsArrayOrUndefined;
    },
    resolveArray: function() {
        return resolveArray;
    }
});
function resolveArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    return [
        value
    ];
}
function resolveAsArrayOrUndefined(value) {
    if (typeof value === "undefined" || value === null) {
        return undefined;
    }
    return resolveArray(value);
} //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 1341:
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