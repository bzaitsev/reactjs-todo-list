if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,o)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const l=e=>n(e,t),r={module:{uri:t},exports:c,require:l};s[t]=Promise.all(i.map((e=>r[e]||l(e)))).then((e=>(o(...e),c)))}}define(["./workbox-5374417e"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"12a996b87c10fd25041a.jpeg",revision:null},{url:"353eb5cb77789b2e9d56.svg",revision:null},{url:"4fe75d5f9adb18067b85.ico",revision:null},{url:"71eb13e2fdd1de624e9a.svg",revision:null},{url:"build/app.css",revision:"a7c5961d7310479ee719e7aa35cfaac4"},{url:"build/app.js",revision:"4aded6d0ae46447fdd8d9125f8eef519"},{url:"build/app.js.LICENSE.txt",revision:"7b70a30e242a9bb6a3473821f7596372"},{url:"index.html",revision:"d216229b579acb4efcfccff412c5cc33"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"fonts.googleapis.com",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"fonts.gstatic.com",plugins:[new e.ExpirationPlugin({maxAgeSeconds:7776e3})]}),"GET"),e.registerRoute(/\/manifest.*\.json/,new e.StaleWhileRevalidate({cacheName:"manifest",plugins:[]}),"GET"),e.registerRoute(/\/*\.png/,new e.StaleWhileRevalidate({cacheName:"images",plugins:[]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
