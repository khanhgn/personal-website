(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[113],{3414:function(){},172:function(){},2001:function(){},3779:function(){},2258:function(){},2165:function(e,n,t){Promise.resolve().then(t.bind(t,5611))},5611:function(e,n,t){"use strict";t.r(n);var i=t(7437),r=t(2265),s=t(3188),a=t(8832),d=t(7931),o=t(9556);t(4077),s.default.GlobalWorkerOptions.workerSrc="//unpkg.com/pdfjs-dist@".concat(s.default.version,"/build/pdf.worker.min.js"),n.default=()=>{let e=(0,o.Z)(),[n,t]=(0,r.useState)(null),s="https://raw.githubusercontent.com/khanhgn/personal-website/main/public/academic/transcript.pdf",c=e.width>e.height?e.height:.9*e.width;return(0,i.jsxs)("div",{children:[n?(0,i.jsx)("div",{className:"controlCon",children:(0,i.jsxs)("div",{className:"pdfNumCon",children:[(0,i.jsx)("span",{className:"lastUpdate",children:"last update: 28/04/2024"}),(0,i.jsx)("a",{className:"downBtn",href:s,children:"Download"})]})}):null,(0,i.jsx)("div",{className:"pdfCon",children:(0,i.jsx)(a.Z,{file:s,onLoadSuccess:function(e){let{numPages:n}=e;t(n)},loading:"Loading Transcript...",children:(0,i.jsx)(d.Z,{pageNumber:1,renderTextLayer:!1,renderAnnotationLayer:!1,width:c})})})]})}},9556:function(e,n,t){"use strict";var i=t(2265);n.Z=()=>{let[e,n]=(0,i.useState)({width:0,height:0});return(0,i.useEffect)(()=>{{let e=()=>{n({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)}},[]),e}},4077:function(){}},function(e){e.O(0,[651,434,971,596,744],function(){return e(e.s=2165)}),_N_E=e.O()}]);