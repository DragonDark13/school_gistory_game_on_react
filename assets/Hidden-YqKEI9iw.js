import{b as x,at as j,p as y,r as D,a3 as O,L as H,_ as h,j as m,f as v,h as S,s as _,q as E,l as b,t as P}from"./index-UmAyWuww.js";const T=["initialWidth","width"],f=["xs","sm","md","lg","xl"],A=(e,r,s=!0)=>s?f.indexOf(e)<=f.indexOf(r):f.indexOf(e)<f.indexOf(r),M=(e,r,s=!1)=>s?f.indexOf(r)<=f.indexOf(e):f.indexOf(r)<f.indexOf(e),R=(e={})=>r=>{const{withTheme:s=!1,noSSR:t=!1,initialWidth:o}=e;function n(i){const a=x(),d=i.theme||a,l=j({theme:d,name:"MuiWithWidth",props:i}),{initialWidth:c,width:u}=l,p=y(l,T),[g,W]=D.useState(!1);O(()=>{W(!0)},[]);const C=d.breakpoints.keys.slice().reverse().reduce((k,U)=>{const $=H(d.breakpoints.up(U));return!k&&$?U:k},null),w=h({width:u||(g||t?C:void 0)||c||o},s?{theme:d}:{},p);return w.width===void 0?null:m.jsx(r,h({},w))}return n},L=R;function N(e){const{children:r,only:s,width:t}=e,o=x();let n=!0;if(s)if(Array.isArray(s))for(let i=0;i<s.length;i+=1){const a=s[i];if(t===a){n=!1;break}}else s&&t===s&&(n=!1);if(n)for(let i=0;i<o.breakpoints.keys.length;i+=1){const a=o.breakpoints.keys[i],d=e[`${a}Up`],l=e[`${a}Down`];if(d&&A(a,t)||l&&M(a,t)){n=!1;break}}return n?m.jsx(D.Fragment,{children:r}):null}const B=L()(N);function J(e){return v("PrivateHiddenCss",e)}S("PrivateHiddenCss",["root","xlDown","xlUp","onlyXl","lgDown","lgUp","onlyLg","mdDown","mdUp","onlyMd","smDown","smUp","onlySm","xsDown","xsUp","onlyXs"]);const X=["children","className","only"],q=e=>{const{classes:r,breakpoints:s}=e,t={root:["root",...s.map(({breakpoint:o,dir:n})=>n==="only"?`${n}${b(o)}`:`${o}${b(n)}`)]};return P(t,J,r)},z=_("div",{name:"PrivateHiddenCss",slot:"Root"})(({theme:e,ownerState:r})=>{const s={display:"none"};return h({},r.breakpoints.map(({breakpoint:t,dir:o})=>o==="only"?{[e.breakpoints.only(t)]:s}:o==="up"?{[e.breakpoints.up(t)]:s}:{[e.breakpoints.down(t)]:s}).reduce((t,o)=>(Object.keys(o).forEach(n=>{t[n]=o[n]}),t),{}))});function F(e){const{children:r,className:s,only:t}=e,o=y(e,X),n=x(),i=[];for(let l=0;l<n.breakpoints.keys.length;l+=1){const c=n.breakpoints.keys[l],u=o[`${c}Up`],p=o[`${c}Down`];u&&i.push({breakpoint:c,dir:"up"}),p&&i.push({breakpoint:c,dir:"down"})}t&&(Array.isArray(t)?t:[t]).forEach(c=>{i.push({breakpoint:c,dir:"only"})});const a=h({},e,{breakpoints:i}),d=q(a);return m.jsx(z,{className:E(d.root,s),ownerState:a,children:r})}const K=["implementation","lgDown","lgUp","mdDown","mdUp","smDown","smUp","xlDown","xlUp","xsDown","xsUp"];function I(e){const{implementation:r="js",lgDown:s=!1,lgUp:t=!1,mdDown:o=!1,mdUp:n=!1,smDown:i=!1,smUp:a=!1,xlDown:d=!1,xlUp:l=!1,xsDown:c=!1,xsUp:u=!1}=e,p=y(e,K);return r==="js"?m.jsx(B,h({lgDown:s,lgUp:t,mdDown:o,mdUp:n,smDown:i,smUp:a,xlDown:d,xlUp:l,xsDown:c,xsUp:u},p)):m.jsx(F,h({lgDown:s,lgUp:t,mdDown:o,mdUp:n,smDown:i,smUp:a,xlDown:d,xlUp:l,xsDown:c,xsUp:u},p))}export{I as H};