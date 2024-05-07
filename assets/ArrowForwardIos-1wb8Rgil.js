import{f as p,h as g,s as v,_ as r,r as u,o as f,p as x,j as d,q as D,t as C,T,W as $,a as R,i as w}from"./index-UmAyWuww.js";function y(o){return p("MuiDialogActions",o)}g("MuiDialogActions",["root","spacing"]);const S=["className","disableSpacing"],j=o=>{const{classes:t,disableSpacing:s}=o;return C({root:["root",!s&&"spacing"]},y,t)},A=v("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:s}=o;return[t.root,!s.disableSpacing&&t.spacing]}})(({ownerState:o})=>r({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!o.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})),b=u.forwardRef(function(t,s){const e=f({props:t,name:"MuiDialogActions"}),{className:n,disableSpacing:i=!1}=e,l=x(e,S),a=r({},e,{disableSpacing:i}),c=j(a);return d.jsx(A,r({className:D(c.root,n),ownerState:a,ref:s},l))}),oo=b;function h(o){return p("MuiDialogContent",o)}g("MuiDialogContent",["root","dividers"]);function I(o){return p("MuiDialogTitle",o)}const N=g("MuiDialogTitle",["root"]),U=N,q=["className","dividers"],P=o=>{const{classes:t,dividers:s}=o;return C({root:["root",s&&"dividers"]},h,t)},L=v("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:s}=o;return[t.root,s.dividers&&t.dividers]}})(({theme:o,ownerState:t})=>r({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},t.dividers?{padding:"16px 24px",borderTop:`1px solid ${(o.vars||o).palette.divider}`,borderBottom:`1px solid ${(o.vars||o).palette.divider}`}:{[`.${U.root} + &`]:{paddingTop:0}})),k=u.forwardRef(function(t,s){const e=f({props:t,name:"MuiDialogContent"}),{className:n,dividers:i=!1}=e,l=x(e,q),a=r({},e,{dividers:i}),c=P(a);return d.jsx(L,r({className:D(c.root,n),ownerState:a,ref:s},l))}),to=k,B=["className","id"],E=o=>{const{classes:t}=o;return C({root:["root"]},I,t)},O=v(T,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(o,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),W=u.forwardRef(function(t,s){const e=f({props:t,name:"MuiDialogTitle"}),{className:n,id:i}=e,l=x(e,B),a=e,c=E(a),{titleId:M=i}=u.useContext($);return d.jsx(O,r({component:"h2",className:D(c.root,n),ownerState:a,ref:s,variant:"h6",id:i??M},l))}),so=W;var m={},z=w;Object.defineProperty(m,"__esModule",{value:!0});var F=m.default=void 0,Y=z(R()),G=d,H=(0,Y.default)((0,G.jsx)("path",{d:"M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}),"ArrowBackIos");F=m.default=H;var _={},J=w;Object.defineProperty(_,"__esModule",{value:!0});var K=_.default=void 0,Q=J(R()),V=d,X=(0,Q.default)((0,V.jsx)("path",{d:"M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"}),"ArrowForwardIos");K=_.default=X;export{so as D,to as a,oo as b,K as c,F as d};