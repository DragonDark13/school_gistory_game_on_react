import{f as Ce,h as _e,s as J,_ as h,r as m,o as Ee,P as Te,Q as $e,p as be,b as we,F as ze,j as e,q as Re,t as Se,V as te,a as U,i as O,T as y,R as ne,L as ae,c as ie,m as se,B as S,u as Ne,M as Me,d as De,C as Ie,H as Ae,J as p,N as Le,W as re,e as oe}from"./index-amkNguL2.js";import{a as Pe,d as ke}from"./ArrowForwardIos-145SC-ql.js";import{c as qe,C as Fe,b as B,a as We}from"./CardHeader-YupL2eCa.js";import{C as He}from"./CardMedia-ONrj4RqF.js";import{L as Ue}from"./LinearProgress-2dtbjevO.js";function Oe(t){return Ce("MuiCollapse",t)}_e("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const Qe=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],Ge=t=>{const{orientation:n,classes:s}=t,r={root:["root",`${n}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${n}`],wrapperInner:["wrapperInner",`${n}`]};return Se(r,Oe,s)},Be=J("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:s}=t;return[n.root,n[s.orientation],s.state==="entered"&&n.entered,s.state==="exited"&&!s.in&&s.collapsedSize==="0px"&&n.hidden]}})(({theme:t,ownerState:n})=>h({height:0,overflow:"hidden",transition:t.transitions.create("height")},n.orientation==="horizontal"&&{height:"auto",width:0,transition:t.transitions.create("width")},n.state==="entered"&&h({height:"auto",overflow:"visible"},n.orientation==="horizontal"&&{width:"auto"}),n.state==="exited"&&!n.in&&n.collapsedSize==="0px"&&{visibility:"hidden"})),Je=J("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(t,n)=>n.wrapper})(({ownerState:t})=>h({display:"flex",width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),Ve=J("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(t,n)=>n.wrapperInner})(({ownerState:t})=>h({width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),le=m.forwardRef(function(n,s){const r=Ee({props:n,name:"MuiCollapse"}),{addEndListener:c,children:N,className:C,collapsedSize:f="0px",component:d,easing:_,in:E,onEnter:l,onEntered:q,onEntering:T,onExit:F,onExited:Q,onExiting:M,orientation:D="vertical",style:I,timeout:g=Te.standard,TransitionComponent:A=$e}=r,Z=be(r,Qe),v=h({},r,{orientation:D,collapsedSize:f}),$=Ge(v),b=we(),L=m.useRef(),x=m.useRef(null),P=m.useRef(),i=typeof f=="number"?`${f}px`:f,o=D==="horizontal",w=o?"width":"height";m.useEffect(()=>()=>{clearTimeout(L.current)},[]);const z=m.useRef(null),W=ze(s,z),R=a=>u=>{if(a){const j=z.current;u===void 0?a(j):a(j,u)}},G=()=>x.current?x.current[o?"clientWidth":"clientHeight"]:0,me=R((a,u)=>{x.current&&o&&(x.current.style.position="absolute"),a.style[w]=i,l&&l(a,u)}),xe=R((a,u)=>{const j=G();x.current&&o&&(x.current.style.position="");const{duration:k,easing:H}=te({style:I,timeout:g,easing:_},{mode:"enter"});if(g==="auto"){const ee=b.transitions.getAutoHeightDuration(j);a.style.transitionDuration=`${ee}ms`,P.current=ee}else a.style.transitionDuration=typeof k=="string"?k:`${k}ms`;a.style[w]=`${j}px`,a.style.transitionTimingFunction=H,T&&T(a,u)}),fe=R((a,u)=>{a.style[w]="auto",q&&q(a,u)}),ge=R(a=>{a.style[w]=`${G()}px`,F&&F(a)}),je=R(Q),ve=R(a=>{const u=G(),{duration:j,easing:k}=te({style:I,timeout:g,easing:_},{mode:"exit"});if(g==="auto"){const H=b.transitions.getAutoHeightDuration(u);a.style.transitionDuration=`${H}ms`,P.current=H}else a.style.transitionDuration=typeof j=="string"?j:`${j}ms`;a.style[w]=i,a.style.transitionTimingFunction=k,M&&M(a)}),ye=a=>{g==="auto"&&(L.current=setTimeout(a,P.current||0)),c&&c(z.current,a)};return e.jsx(A,h({in:E,onEnter:me,onEntered:fe,onEntering:xe,onExit:ge,onExited:je,onExiting:ve,addEndListener:ye,nodeRef:z,timeout:g==="auto"?null:g},Z,{children:(a,u)=>e.jsx(Be,h({as:d,className:Re($.root,C,{entered:$.entered,exited:!E&&i==="0px"&&$.hidden}[a]),style:h({[o?"minWidth":"minHeight"]:i},I),ownerState:h({},v,{state:a}),ref:W},u,{children:e.jsx(Je,{ownerState:h({},v,{state:a}),className:$.wrapper,ref:x,children:e.jsx(Ve,{ownerState:h({},v,{state:a}),className:$.wrapperInner,children:N})})}))}))});le.muiSupportAuto=!0;const Ke=le;var V={},Xe=O;Object.defineProperty(V,"__esModule",{value:!0});var ce=V.default=void 0,Ye=Xe(U()),Ze=e,et=(0,Ye.default)((0,Ze.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");ce=V.default=et;var K={},tt=O;Object.defineProperty(K,"__esModule",{value:!0});var de=K.default=void 0,nt=tt(U()),at=e,it=(0,nt.default)((0,at.jsx)("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess");de=K.default=it;var X={},st=O;Object.defineProperty(X,"__esModule",{value:!0});var ue=X.default=void 0,rt=st(U()),ot=e,lt=(0,rt.default)((0,ot.jsx)("path",{d:"M11.07 12.85c.77-1.39 2.25-2.21 3.11-3.44.91-1.29.4-3.7-2.18-3.7-1.69 0-2.52 1.28-2.87 2.34L6.54 6.96C7.25 4.83 9.18 3 11.99 3c2.35 0 3.96 1.07 4.78 2.41.7 1.15 1.11 3.3.03 4.9-1.2 1.77-2.35 2.31-2.97 3.45-.25.46-.35.76-.35 2.24h-2.89c-.01-.78-.13-2.05.48-3.15zM14 20c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"}),"QuestionMark");ue=X.default=lt;var Y={},ct=O;Object.defineProperty(Y,"__esModule",{value:!0});var pe=Y.default=void 0,dt=ct(U()),ut=e,pt=(0,dt.default)((0,ut.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check");pe=Y.default=pt;const he=t=>{console.log("content",t);let n=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;if(t){if(typeof t=="object"&&t.length>0)return t.map((s,r)=>e.jsx(y,{className:s.type&&s.type==="title"?"title":"text",variant:s.type&&s.type==="title"?"h6":"body1",children:s.text},r));if(typeof t=="string")return e.jsx(y,{children:t})}else return e.jsx(y,{children:n})},ht=({content:t,title:n,subArticleIndex:s,done:r})=>{const[c,N]=ne.useState(!1),C=()=>{N(!c)},{selectedArticle:f}=ae(),d=ie(),_=()=>{d(`/test/${f}/${s}`)};return e.jsxs(qe,{elevation:r?6:0,className:"subtopics_card",children:[e.jsx(Fe,{avatar:r?e.jsx(pe,{}):e.jsx(ue,{}),titleTypographyProps:{variant:"h5"},title:n}),e.jsx(He,{component:"img",image:se,alt:"myImage"}),!c&&!r&&e.jsx(B,{disableSpacing:!0,children:e.jsx(S,{color:"secondary",onClick:C,endIcon:e.jsx(ce,{}),"aria-expanded":c,size:"small",fullWidth:!0,variant:"contained",className:"learn-more-button",children:"Дізнатися більше"})}),!r&&e.jsx(Ke,{in:c,timeout:"auto",unmountOnExit:!0,children:e.jsx(We,{children:he(t)})}),c&&e.jsx(B,{disableSpacing:!0,children:e.jsx(S,{onClick:C,endIcon:e.jsx(de,{}),color:"secondary","aria-expanded":c,size:"small",fullWidth:!0,variant:"contained",className:"learn-more-button",children:"Згорнути"})}),r?null:e.jsx(B,{disableSpacing:!0,children:e.jsx(S,{onClick:_,endIcon:e.jsx(Pe,{}),color:"secondary",size:"small",fullWidth:!0,variant:"outlined",className:"goToTest",children:"Пройти тест"})})]})},mt=async t=>(await oe.get(`/ep/maincontent/${t}/`)).data,xt=async t=>(await oe.get(`/ep/subtwithcontent/${t}`)).data.subtopics,ft=t=>re(["articleContent",t],()=>mt(t),{enabled:!!t}),gt=t=>re(["subTopicsArray",t],()=>xt(t),{enabled:!!t}),Et=({setSelectedArticle:t,subArticleSuccessLevels:n,setSelectedSubArticle:s,historyList:r,isLoading:c})=>{console.log("historyList",r),console.log("isLoading::",c);const{selectedArticle:N}=ae(),[C,f]=m.useState(null),[d,_]=m.useState([]),E=ie(),l=parseInt(N||"0",10);m.useEffect(()=>{l&&t(l)},[l]);const q=()=>{E(`/test/${l}`)},T=r[l],F=Ne(),Q=Me(F.breakpoints.up("md")),{isAuthenticated:M}=De();m.useEffect(()=>{M||E("/")},[M]);const D=i=>{E(`/test/${i}`),t(i)},I=(i,o)=>{E(`/test/${i}/${o}`),t(i),s(o)},g=i=>{debugger;if(d&&d.length>0){const o=d.findIndex((w,z)=>{var W;return!((W=n[i])!=null&&W[z])});o!==-1?I(i,o):D(i)}else D(i)},{data:A,isLoading:Z}=ft(l),{data:v,isLoading:$}=gt(l);m.useEffect(()=>{f(A||null),_(v||[])},[A,v]);const b=d?d.length:0,L=n.length>0?n[l].filter(i=>i).length:0,x=b>0?L/b*100:0,P=d.length>0&&n.length>0?!n[l].every(i=>i):!1;return e.jsxs(Ie,{className:"article_page_container",children:[e.jsx(Ae,{children:e.jsxs("title",{children:[" ",c?"Loading":`Тема ${T.text}`]})}),c?e.jsx("div",{children:"Loading..."}):e.jsxs(ne.Fragment,{children:[e.jsx(p,{className:"back_button_container",container:!0,children:e.jsx(p,{item:!0,children:e.jsx(S,{component:Le,to:"/timeline",color:"secondary",startIcon:e.jsx(ke,{}),className:"close-button",children:"До Часопростору"})})}),e.jsx(y,{textAlign:"center",variant:"h6",className:"lesson",children:"Lesson"}),e.jsx(y,{textAlign:"center",className:"date",variant:"h5",children:T.date}),e.jsx(y,{textAlign:"center",className:"title",variant:"h4",children:T.text}),e.jsx(p,{container:!0,justifyContent:"center",children:e.jsx(p,{item:!0,xs:"auto",children:e.jsx(S,{className:"start_button_top",onClick:()=>g(l),variant:"contained",children:"Start Tests"})})}),e.jsx("img",{src:se,alt:""}),e.jsx("div",{className:"content_container",children:C&&he(C)}),d.length>0&&e.jsxs(p,{className:"subtopic_card_list",container:!0,justifyContent:"center",children:[e.jsx(p,{item:!0,xs:12,sm:6,md:6,xl:6,children:e.jsx(y,{variant:"h6",children:"Пройдіть додаткові завдання перед головним тестом"})}),e.jsx(p,{className:"additional_test_progress_container",container:!0,justifyContent:"center",children:e.jsxs(p,{item:!0,xs:12,sm:6,md:6,xl:4,children:[e.jsx(Ue,{color:"primary",variant:"determinate",value:x}),e.jsxs(y,{variant:"body2",gutterBottom:!0,children:["Виконано: ",L," із ",b," (",x.toFixed(2),"%)"]})]})}),e.jsx(p,{item:!0,container:!0,xs:12,spacing:2,children:d.map((i,o)=>e.jsx(p,{item:!0,xs:12,sm:6,md:4,xl:3,children:e.jsx(ht,{done:n.length>0?n[l][o]:!1,subArticleIndex:o,title:i.title,content:i.content})},o+"card"))})]}),e.jsx(p,{container:!0,justifyContent:"center",children:e.jsx(p,{item:!0,xs:12,sm:6,md:"auto",children:e.jsx(S,{disabled:P,size:"large",fullWidth:!Q,variant:"contained",className:"quiz-button",onClick:q,children:"Завершити рівень"})})})]})]})};export{Et as default};
