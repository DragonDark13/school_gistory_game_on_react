import{f as Z,h as J,k as Be,s as N,l as P,_ as m,n as Ee,r as o,o as X,p as q,j as e,q as ee,t as re,v as ar,w as nr,x as Ge,y as Ue,S as cr,z as ir,A as lr,D as ur,E as dr,F as fr,a as F,i as A,G as mr,B as I,I as c,T as z,J as hr,K as pr,c as xr,d as vr,b as ye,L as jr,U as gr,C as Cr,H as yr,M as L,R as kr,N as Sr}from"./index-UmAyWuww.js";import{D as _r,a as br,b as Rr,d as ke,c as Y}from"./ArrowForwardIos-1wb8Rgil.js";import{d as $r}from"./Star-nh3ecbK6.js";import{b as Se,C as Mr,a as Ir}from"./CardHeader-pHVmuLRx.js";import{C as _e}from"./CardContent-MDGjKJ7J.js";import{L as be}from"./LinearProgress-BcNbyVKs.js";function zr(r){return Z("MuiCircularProgress",r)}J("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Pr=["className","color","disableShrink","size","style","thickness","value","variant"];let Q=r=>r,Re,$e,Me,Ie;const M=44,Nr=Be(Re||(Re=Q`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),wr=Be($e||($e=Q`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),Dr=r=>{const{classes:t,variant:s,color:a,disableShrink:i}=r,h={root:["root",s,`color${P(a)}`],svg:["svg"],circle:["circle",`circle${P(s)}`,i&&"circleDisableShrink"]};return re(h,zr,t)},Fr=N("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,t)=>{const{ownerState:s}=r;return[t.root,t[s.variant],t[`color${P(s.color)}`]]}})(({ownerState:r,theme:t})=>m({display:"inline-block"},r.variant==="determinate"&&{transition:t.transitions.create("transform")},r.color!=="inherit"&&{color:(t.vars||t).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&Ee(Me||(Me=Q`
      animation: ${0} 1.4s linear infinite;
    `),Nr)),Ar=N("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,t)=>t.svg})({display:"block"}),Br=N("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,t)=>{const{ownerState:s}=r;return[t.circle,t[`circle${P(s.variant)}`],s.disableShrink&&t.circleDisableShrink]}})(({ownerState:r,theme:t})=>m({stroke:"currentColor"},r.variant==="determinate"&&{transition:t.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&Ee(Ie||(Ie=Q`
      animation: ${0} 1.4s ease-in-out infinite;
    `),wr)),Er=o.forwardRef(function(t,s){const a=X({props:t,name:"MuiCircularProgress"}),{className:i,color:h="primary",disableShrink:j=!1,size:f=40,style:d,thickness:p=3.6,value:v=0,variant:_="indeterminate"}=a,l=q(a,Pr),x=m({},a,{color:h,disableShrink:j,size:f,thickness:p,value:v,variant:_}),C=Dr(x),g={},u={},y={};if(_==="determinate"){const k=2*Math.PI*((M-p)/2);g.strokeDasharray=k.toFixed(3),y["aria-valuenow"]=Math.round(v),g.strokeDashoffset=`${((100-v)/100*k).toFixed(3)}px`,u.transform="rotate(-90deg)"}return e.jsx(Fr,m({className:ee(C.root,i),style:m({width:f,height:f},u,d),ownerState:x,ref:s,role:"progressbar"},y,l,{children:e.jsx(Ar,{className:C.svg,ownerState:x,viewBox:`${M/2} ${M/2} ${M} ${M}`,children:e.jsx(Br,{className:C.circle,style:g,ownerState:x,cx:M,cy:M,r:(M-p)/2,fill:"none",strokeWidth:p})})}))}),Gr=Er;function Ur(r){return Z("MuiFormGroup",r)}J("MuiFormGroup",["root","row","error"]);const Or=["className","row"],Tr=r=>{const{classes:t,row:s,error:a}=r;return re({root:["root",s&&"row",a&&"error"]},Ur,t)},Lr=N("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(r,t)=>{const{ownerState:s}=r;return[t.root,s.row&&t.row]}})(({ownerState:r})=>m({display:"flex",flexDirection:"column",flexWrap:"wrap"},r.row&&{flexDirection:"row"})),qr=o.forwardRef(function(t,s){const a=X({props:t,name:"MuiFormGroup"}),{className:i,row:h=!1}=a,j=q(a,Or),f=ar(),d=nr({props:a,muiFormControl:f,states:["error"]}),p=m({},a,{row:h,error:d.error}),v=Tr(p);return e.jsx(Lr,m({className:ee(v.root,i),ownerState:p,ref:s},j))}),Qr=qr,Vr=Ge(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),Wr=Ge(e.jsx("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),Hr=N("span",{shouldForwardProp:Ue})({position:"relative",display:"flex"}),Kr=N(Vr)({transform:"scale(1)"}),Yr=N(Wr)(({theme:r,ownerState:t})=>m({left:0,position:"absolute",transform:"scale(0)",transition:r.transitions.create("transform",{easing:r.transitions.easing.easeIn,duration:r.transitions.duration.shortest})},t.checked&&{transform:"scale(1)",transition:r.transitions.create("transform",{easing:r.transitions.easing.easeOut,duration:r.transitions.duration.shortest})}));function Oe(r){const{checked:t=!1,classes:s={},fontSize:a}=r,i=m({},r,{checked:t});return e.jsxs(Hr,{className:s.root,ownerState:i,children:[e.jsx(Kr,{fontSize:a,className:s.background,ownerState:i}),e.jsx(Yr,{fontSize:a,className:s.dot,ownerState:i})]})}const Zr=o.createContext(void 0),Te=Zr;function Jr(){return o.useContext(Te)}function Xr(r){return Z("MuiRadio",r)}const et=J("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary","sizeSmall"]),ze=et,rt=["checked","checkedIcon","color","icon","name","onChange","size","className"],tt=r=>{const{classes:t,color:s,size:a}=r,i={root:["root",`color${P(s)}`,a!=="medium"&&`size${P(a)}`]};return m({},t,re(i,Xr,t))},st=N(cr,{shouldForwardProp:r=>Ue(r)||r==="classes",name:"MuiRadio",slot:"Root",overridesResolver:(r,t)=>{const{ownerState:s}=r;return[t.root,s.size!=="medium"&&t[`size${P(s.size)}`],t[`color${P(s.color)}`]]}})(({theme:r,ownerState:t})=>m({color:(r.vars||r).palette.text.secondary},!t.disableRipple&&{"&:hover":{backgroundColor:r.vars?`rgba(${t.color==="default"?r.vars.palette.action.activeChannel:r.vars.palette[t.color].mainChannel} / ${r.vars.palette.action.hoverOpacity})`:ir(t.color==="default"?r.palette.action.active:r.palette[t.color].main,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.color!=="default"&&{[`&.${ze.checked}`]:{color:(r.vars||r).palette[t.color].main}},{[`&.${ze.disabled}`]:{color:(r.vars||r).palette.action.disabled}}));function ot(r,t){return typeof t=="object"&&t!==null?r===t:String(r)===String(t)}const Pe=e.jsx(Oe,{checked:!0}),Ne=e.jsx(Oe,{}),at=o.forwardRef(function(t,s){var a,i;const h=X({props:t,name:"MuiRadio"}),{checked:j,checkedIcon:f=Pe,color:d="primary",icon:p=Ne,name:v,onChange:_,size:l="medium",className:x}=h,C=q(h,rt),g=m({},h,{color:d,size:l}),u=tt(g),y=Jr();let k=j;const E=lr(_,y&&y.onChange);let w=v;return y&&(typeof k>"u"&&(k=ot(y.value,h.value)),typeof w>"u"&&(w=y.name)),e.jsx(st,m({type:"radio",icon:o.cloneElement(p,{fontSize:(a=Ne.props.fontSize)!=null?a:l}),checkedIcon:o.cloneElement(f,{fontSize:(i=Pe.props.fontSize)!=null?i:l}),ownerState:g,classes:u,name:w,checked:k,onChange:E,ref:s,className:ee(u.root,x)},C))}),nt=at,ct=["actions","children","defaultValue","name","onChange","value"],it=o.forwardRef(function(t,s){const{actions:a,children:i,defaultValue:h,name:j,onChange:f,value:d}=t,p=q(t,ct),v=o.useRef(null),[_,l]=ur({controlled:d,default:h,name:"RadioGroup"});o.useImperativeHandle(a,()=>({focus:()=>{let u=v.current.querySelector("input:not(:disabled):checked");u||(u=v.current.querySelector("input:not(:disabled)")),u&&u.focus()}}),[]);const x=dr(s,v),C=fr(j),g=o.useMemo(()=>({name:C,onChange(u){l(u.target.value),f&&f(u,u.target.value)},value:_}),[C,f,l,_]);return e.jsx(Te.Provider,{value:g,children:e.jsx(Qr,m({role:"radiogroup",ref:x},p,{children:i}))})}),lt=it;var te={},ut=A;Object.defineProperty(te,"__esModule",{value:!0});var Le=te.default=void 0,dt=ut(F()),ft=e,mt=(0,dt.default)((0,ft.jsx)("path",{d:"m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"}),"ArrowUpward");Le=te.default=mt;var se={},ht=A;Object.defineProperty(se,"__esModule",{value:!0});var qe=se.default=void 0,pt=ht(F()),xt=e,vt=(0,pt.default)((0,xt.jsx)("path",{d:"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"}),"Replay");qe=se.default=vt;var oe={},jt=A;Object.defineProperty(oe,"__esModule",{value:!0});var ae=oe.default=void 0,gt=jt(F()),Ct=e,yt=(0,gt.default)((0,Ct.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");ae=oe.default=yt;var ne={},kt=A;Object.defineProperty(ne,"__esModule",{value:!0});var Qe=ne.default=void 0,St=kt(F()),_t=e,bt=(0,St.default)((0,_t.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"}),"DoNotDisturbOn");Qe=ne.default=bt;const Rt=({openModal:r,handleClose:t})=>e.jsxs(mr,{open:r,onClose:t,children:[e.jsx(_r,{children:"Success!"}),e.jsx(br,{children:e.jsx("p",{children:"Congratulations! You've successfully completed the quiz."})}),e.jsxs(Rr,{children:[e.jsx(I,{onClick:t,color:"primary",children:"Close"}),e.jsx(I,{onClick:t,color:"primary",children:"Next"})]})]});var ce={},$t=A;Object.defineProperty(ce,"__esModule",{value:!0});var Ve=ce.default=void 0,Mt=$t(F()),It=e,zt=(0,Mt.default)((0,It.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");Ve=ce.default=zt;const we=["Well done!","Excellent job!","Congratulations!","Bravo!","Fantastic!"],De=["Incorrect.","Wrong answer.","Try again.","Not quite.","That's incorrect."],Pt=({currentAnswerStatus:r})=>{const t=we[Math.floor(Math.random()*we.length)],s=De[Math.floor(Math.random()*De.length)];return e.jsxs(c,{container:!0,alignItems:"center",columnSpacing:1,children:[e.jsx(c,{item:!0,xs:"auto",children:r?e.jsx(ae,{fontSize:"large",color:"success"}):e.jsx(Ve,{fontSize:"large",color:"error"})}),e.jsx(c,{item:!0,xs:"auto",children:e.jsx(z,{className:"random_phrase",variant:"h5",children:r?t:s})})]})};var ie={},Nt=A;Object.defineProperty(ie,"__esModule",{value:!0});var We=ie.default=void 0,wt=Nt(F()),Fe=e,Dt=(0,wt.default)([(0,Fe.jsx)("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"},"0"),(0,Fe.jsx)("path",{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"},"1")],"AccessTime");We=ie.default=Dt;const Ae=["Time's up.","Out of time.","Your time has expired.","Time expired.","Time is over."],Ft=()=>{const r=Ae[Math.floor(Math.random()*Ae.length)];return e.jsxs(c,{container:!0,alignItems:"center",columnSpacing:1,children:[e.jsx(c,{item:!0,xs:"auto",children:e.jsx(We,{fontSize:"large",color:"error"})}),e.jsx(c,{item:!0,xs:"auto",children:e.jsx(z,{className:"random_phrase",variant:"h5",children:r})})]})},At=({maxTimeStatic:r,remainingTime:t})=>e.jsxs("div",{className:"timer_progress",children:[e.jsx(Gr,{variant:"determinate",value:t/r*100,color:"secondary",thickness:5,size:60}),e.jsx(z,{color:"secondary",variant:"h6",children:t})]}),Bt=hr()(r=>({sucessOptionSelected:{"&.MuiFormControlLabel-root.Mui-disabled":{borderColor:r.palette.success.main,color:r.palette.success.main,"& .MuiRadio-root.Mui-disabled":{color:r.palette.success.main},"& .MuiFormControlLabel-label.Mui-disabled":{color:r.palette.success.main}}},errorOptionSelected:{"&.MuiFormControlLabel-root.Mui-disabled":{borderColor:r.palette.error.main,color:r.palette.error.main,"& .MuiRadio-root.Mui-disabled":{color:r.palette.error.main},"& .MuiFormControlLabel-label.Mui-disabled":{color:r.palette.error.main}}}})),qt=({questions:r,options:t,correctAnswers:s,onAnswer:a,historyList:i,setAllAnswerIsCorrect:h,testType:j="article",setSelectedSubArticle:f})=>{var je,ge;const[d,p]=o.useState(0),[v,_]=o.useState(Array(r.length).fill("")),[l,x]=o.useState({correct:0,incorrect:0}),[C,g]=o.useState(!1),[u,y]=o.useState(!1),[k,E]=o.useState(null),[w,V]=o.useState(!1),{selectedArticle:He,subtopicId:Ke}=pr(),[Ye,le]=o.useState(!1),[b,ue]=o.useState(!1),[de,W]=o.useState(!1),H=10,[R,fe]=o.useState(H),S=parseInt(He||"0",10);let G=0,D,U;const K=xr(),{isAuthenticated:me}=vr(),{cx:Ze,classes:O}=Bt(),Je=ye(),T=jr(Je.breakpoints.up("sm"));o.useEffect(()=>{f&&f(G)},[f,G]),j==="subArticle"?(G=parseInt(Ke||"0",10),D=(ge=(je=i[S])==null?void 0:je.subtopics)==null?void 0:ge[G],U=D==null?void 0:D.title):(D=i[S],U=D.text,o.useEffect(()=>{me||K("/")},[me])),o.useEffect(()=>{l.correct===r.length&&(h(!0),y(!0),j==="subArticle"&&(le(!0),setTimeout(()=>{K(`/article/${S}`)},5e3)))},[l.correct,r.length]);const Xe=n=>{ue(!0),E(n),s[d]===n?(x({...l,correct:l.correct+1}),W(!0)):(x({...l,incorrect:l.incorrect+1}),W(!1)),V(!0)};o.useEffect(()=>{R===0&&!b&&(x({...l,incorrect:l.incorrect+1}),W(!1),V(!0))},[b,R]);const he=()=>{E(null),V(!1),ue(!1),fe(H)},er=()=>{p(0),_(Array(r.length).fill("")),x({correct:0,incorrect:0}),g(!1),he()},{currentUser:pe}=o.useContext(gr),B=()=>{!k&&R>0||(d<r.length-1?(p(d+1),he()):(a(l),g(!0)))},xe=n=>{n.key==="Enter"&&w&&B()},rr=n=>n?e.jsx(ae,{color:"success"}):e.jsx(Qe,{color:"error"}),ve=ye(),tr=()=>{le(!1),K(`/article/${S}`)};o.useEffect(()=>{let n;return b?clearInterval(n):(()=>{n=setInterval(()=>{fe(Ce=>Ce===0?(clearInterval(n),0):Ce-1)},1e3)})(),()=>{n&&clearInterval(n)}},[b]);const sr=n=>n===k?n===s[d]?O.sucessOptionSelected:O.errorOptionSelected:n===s[d]?O.sucessOptionSelected:"",or=n=>n===s[d]?O.sucessOptionSelected:"";return o.useEffect(()=>{const n=$=>{$.key==="Enter"&&B()};return document.addEventListener("keypress",n),()=>{document.removeEventListener("keypress",n)}},[B]),e.jsxs(Cr,{children:[e.jsx(yr,{children:e.jsxs("title",{children:[" ",`Тестування ${S}`]})}),e.jsxs(c,{sx:{display:"none"},className:"back_button_container",container:!0,justifyContent:"space-between",children:[e.jsx(c,{item:!0,children:e.jsx(I,{component:L,to:`/article/${S}`,startIcon:e.jsx(ke,{}),children:"До бібліотеки"})}),e.jsx(c,{item:!0,children:e.jsx(I,{component:L,to:"/timeline",endIcon:e.jsx(Le,{}),color:"secondary",children:"До Часопростору"})})]}),C?e.jsxs("div",{className:"finished_container",children:[e.jsx(z,{className:"title",variant:"h4",children:"Ваші Результати:"}),e.jsx(c,{container:!0,justifyContent:"center",children:e.jsx(c,{item:!0,xs:12,sm:8,md:5,children:e.jsxs(Se,{className:"result_test_card",children:[e.jsx(Mr,{title:` ${t.length}/${l.correct}`,subheader:rr(u)}),e.jsx(_e,{children:e.jsx(be,{color:"success",value:Math.round(100/t.length*l.correct),variant:"determinate"})})]})})}),u?e.jsxs("div",{children:[e.jsx(c,{className:"icon_container",container:!0,justifyContent:"center",children:e.jsx(c,{item:!0,children:e.jsx($r,{fontSize:"large",color:"success",className:"pulse"})})}),j==="article"&&e.jsxs(Se,{sx:{background:ve.palette.secondary.light},children:[e.jsx(_e,{children:e.jsxs(z,{sx:{color:ve.palette.text.secondary},children:["Вітаю, ",e.jsx(z,{component:"span",variant:"subtitle1",children:pe?pe.name:"Невідомий"}),", ви досягли наступного рівня. Тепер ви можити відправитися у наступний пункт нашої подорожі у часі."]})}),e.jsx(Ir,{children:e.jsx(I,{component:L,to:`/article/${S+1}`,fullWidth:!0,startIcon:e.jsx(Y,{}),color:"secondary",endIcon:e.jsx(Y,{}),variant:"contained",size:"large",children:S!==null?i[S+1].date:"Помилка у машині часу"})})]})]}):e.jsxs(kr.Fragment,{children:[e.jsx(z,{className:"textMessage",children:"Не сумуйте. Підготуйтесь та спробуйте знову"}),e.jsxs(c,{flexDirection:T?"row-reverse":"row",spacing:2,container:!0,justifyContent:"space-between",children:[e.jsx(c,{item:!0,xs:12,sm:"auto",children:e.jsx(I,{size:"large",fullWidth:!0,endIcon:e.jsx(qe,{}),variant:"contained",onClick:er,children:"Пройти ще раз"})}),e.jsx(c,{item:!0,xs:12,sm:"auto",children:e.jsx(I,{variant:"outlined",color:"secondary",size:"large",fullWidth:!0,component:L,to:`/article/${S}`,startIcon:e.jsx(ke,{}),children:"До бібліотеки"})})]})]})]}):e.jsxs("div",{className:"question_container",children:[e.jsx(be,{color:"secondary",value:Math.round(100/t.length*l.correct),variant:"determinate"}),e.jsxs("h1",{children:["Тема: ",U&&U]}),e.jsxs(c,{container:!0,rowSpacing:{xs:2,sm:0},columnSpacing:{xs:1,sm:2,md:3},alignItems:"center",justifyContent:"center",children:[e.jsx(c,{item:!0,xs:12,sm:6,children:e.jsx(z,{variant:T?"h6":"body1",children:r[d]})}),e.jsx(c,{item:!0,xs:12,sm:6,children:e.jsx(lt,{name:"radio-buttons-group",onKeyPress:xe,children:t[d].map((n,$)=>e.jsx(Sr,{className:Ze(R==0?or($+1):sr($+1)),onKeyPress:xe,onClick:()=>{!b&&R>0&&Xe($+1)},control:e.jsx(nt,{checked:k===$+1}),label:n,value:n,disabled:b||R==0},$+"button"))})})]}),e.jsxs(c,{container:!0,justifyContent:T?"space-between":"start",mt:2,alignItems:"center",children:[e.jsxs(c,{className:"status_icon_container",item:!0,xs:"auto",md:"auto",children:[b&&e.jsx(Pt,{currentAnswerStatus:de}),!b&&(R>0?e.jsx(At,{maxTimeStatic:H,remainingTime:R}):e.jsx(Ft,{}))]}),e.jsx(c,{item:!0,xs:12,sm:"auto",children:e.jsx(I,{color:b?de?"success":"error":R==0?"error":"primary",onKeyDown:B,fullWidth:!T,className:"next_button",endIcon:e.jsx(Y,{}),variant:"contained",size:"large",onClick:B,disabled:!w,children:"Продовжити"})})]})]}),e.jsx(Rt,{openModal:Ye,handleClose:tr})]})};export{qt as default};