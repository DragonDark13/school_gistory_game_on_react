import{e as X,f as ee,k as Be,s as N,h as P,_ as h,l as Oe,r as o,n as te,o as W,j as e,p as re,q as se,t as dt,v as ft,w as Ge,x as Te,S as mt,y as pt,z as ht,A as xt,D as vt,E as jt,a as F,i as q,F as gt,B as z,G as c,T as w,I as Ct,J as _t,c as St,d as bt,b as be,K as yt,L as kt,C as Rt,H as $t,M as V,R as Mt,N as It}from"./index-WAL7zlsL.js";import{D as zt,a as wt,b as Pt,d as ye,c as J}from"./ArrowForwardIos-LCD0ZwyT.js";import{d as Nt}from"./Star-KPZjYvIz.js";import{b as ke,C as At,a as Dt}from"./CardHeader-dD8TgI9s.js";import{C as Re}from"./CardContent-AH9VTDZx.js";import{L as $e}from"./LinearProgress-BGTe06rn.js";function Ft(t){return X("MuiCircularProgress",t)}ee("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const qt=["className","color","disableShrink","size","style","thickness","value","variant"];let H=t=>t,Me,Ie,ze,we;const I=44,Et=Be(Me||(Me=H`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),Bt=Be(Ie||(Ie=H`
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
`)),Ot=t=>{const{classes:r,variant:a,color:n,disableShrink:l}=t,x={root:["root",a,`color${P(n)}`],svg:["svg"],circle:["circle",`circle${P(a)}`,l&&"circleDisableShrink"]};return se(x,Ft,r)},Gt=N("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,r)=>{const{ownerState:a}=t;return[r.root,r[a.variant],r[`color${P(a.color)}`]]}})(({ownerState:t,theme:r})=>h({display:"inline-block"},t.variant==="determinate"&&{transition:r.transitions.create("transform")},t.color!=="inherit"&&{color:(r.vars||r).palette[t.color].main}),({ownerState:t})=>t.variant==="indeterminate"&&Oe(ze||(ze=H`
      animation: ${0} 1.4s linear infinite;
    `),Et)),Tt=N("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,r)=>r.svg})({display:"block"}),Lt=N("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,r)=>{const{ownerState:a}=t;return[r.circle,r[`circle${P(a.variant)}`],a.disableShrink&&r.circleDisableShrink]}})(({ownerState:t,theme:r})=>h({stroke:"currentColor"},t.variant==="determinate"&&{transition:r.transitions.create("stroke-dashoffset")},t.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:t})=>t.variant==="indeterminate"&&!t.disableShrink&&Oe(we||(we=H`
      animation: ${0} 1.4s ease-in-out infinite;
    `),Bt)),Qt=o.forwardRef(function(r,a){const n=te({props:r,name:"MuiCircularProgress"}),{className:l,color:x="primary",disableShrink:_=!1,size:u=40,style:S,thickness:i=3.6,value:f=0,variant:R="indeterminate"}=n,j=W(n,qt),g=h({},n,{color:x,disableShrink:_,size:u,thickness:i,value:f,variant:R}),b=Ot(g),v={},d={},C={};if(R==="determinate"){const y=2*Math.PI*((I-i)/2);v.strokeDasharray=y.toFixed(3),C["aria-valuenow"]=Math.round(f),v.strokeDashoffset=`${((100-f)/100*y).toFixed(3)}px`,d.transform="rotate(-90deg)"}return e.jsx(Gt,h({className:re(b.root,l),style:h({width:u,height:u},d,S),ownerState:g,ref:a,role:"progressbar"},C,j,{children:e.jsx(Tt,{className:b.svg,ownerState:g,viewBox:`${I/2} ${I/2} ${I} ${I}`,children:e.jsx(Lt,{className:b.circle,style:v,ownerState:g,cx:I,cy:I,r:(I-i)/2,fill:"none",strokeWidth:i})})}))}),Ut=Qt;function Vt(t){return X("MuiFormGroup",t)}ee("MuiFormGroup",["root","row","error"]);const Wt=["className","row"],Ht=t=>{const{classes:r,row:a,error:n}=t;return se({root:["root",a&&"row",n&&"error"]},Vt,r)},Kt=N("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(t,r)=>{const{ownerState:a}=t;return[r.root,a.row&&r.row]}})(({ownerState:t})=>h({display:"flex",flexDirection:"column",flexWrap:"wrap"},t.row&&{flexDirection:"row"})),Yt=o.forwardRef(function(r,a){const n=te({props:r,name:"MuiFormGroup"}),{className:l,row:x=!1}=n,_=W(n,Wt),u=dt(),S=ft({props:n,muiFormControl:u,states:["error"]}),i=h({},n,{row:x,error:S.error}),f=Ht(i);return e.jsx(Kt,h({className:re(f.root,l),ownerState:i,ref:a},_))}),Zt=Yt,Jt=Ge(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),Xt=Ge(e.jsx("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),er=N("span",{shouldForwardProp:Te})({position:"relative",display:"flex"}),tr=N(Jt)({transform:"scale(1)"}),rr=N(Xt)(({theme:t,ownerState:r})=>h({left:0,position:"absolute",transform:"scale(0)",transition:t.transitions.create("transform",{easing:t.transitions.easing.easeIn,duration:t.transitions.duration.shortest})},r.checked&&{transform:"scale(1)",transition:t.transitions.create("transform",{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.shortest})}));function Le(t){const{checked:r=!1,classes:a={},fontSize:n}=t,l=h({},t,{checked:r});return e.jsxs(er,{className:a.root,ownerState:l,children:[e.jsx(tr,{fontSize:n,className:a.background,ownerState:l}),e.jsx(rr,{fontSize:n,className:a.dot,ownerState:l})]})}const sr=o.createContext(void 0),Qe=sr;function or(){return o.useContext(Qe)}function ar(t){return X("MuiRadio",t)}const nr=ee("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary","sizeSmall"]),Pe=nr,ir=["checked","checkedIcon","color","icon","name","onChange","size","className"],cr=t=>{const{classes:r,color:a,size:n}=t,l={root:["root",`color${P(a)}`,n!=="medium"&&`size${P(n)}`]};return h({},r,se(l,ar,r))},lr=N(mt,{shouldForwardProp:t=>Te(t)||t==="classes",name:"MuiRadio",slot:"Root",overridesResolver:(t,r)=>{const{ownerState:a}=t;return[r.root,a.size!=="medium"&&r[`size${P(a.size)}`],r[`color${P(a.color)}`]]}})(({theme:t,ownerState:r})=>h({color:(t.vars||t).palette.text.secondary},!r.disableRipple&&{"&:hover":{backgroundColor:t.vars?`rgba(${r.color==="default"?t.vars.palette.action.activeChannel:t.vars.palette[r.color].mainChannel} / ${t.vars.palette.action.hoverOpacity})`:pt(r.color==="default"?t.palette.action.active:t.palette[r.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},r.color!=="default"&&{[`&.${Pe.checked}`]:{color:(t.vars||t).palette[r.color].main}},{[`&.${Pe.disabled}`]:{color:(t.vars||t).palette.action.disabled}}));function ur(t,r){return typeof r=="object"&&r!==null?t===r:String(t)===String(r)}const Ne=e.jsx(Le,{checked:!0}),Ae=e.jsx(Le,{}),dr=o.forwardRef(function(r,a){var n,l;const x=te({props:r,name:"MuiRadio"}),{checked:_,checkedIcon:u=Ne,color:S="primary",icon:i=Ae,name:f,onChange:R,size:j="medium",className:g}=x,b=W(x,ir),v=h({},x,{color:S,size:j}),d=cr(v),C=or();let y=_;const K=ht(R,C&&C.onChange);let A=f;return C&&(typeof y>"u"&&(y=ur(C.value,x.value)),typeof A>"u"&&(A=C.name)),e.jsx(lr,h({type:"radio",icon:o.cloneElement(i,{fontSize:(n=Ae.props.fontSize)!=null?n:j}),checkedIcon:o.cloneElement(u,{fontSize:(l=Ne.props.fontSize)!=null?l:j}),ownerState:v,classes:d,name:A,checked:y,onChange:K,ref:a,className:re(d.root,g)},b))}),fr=dr,mr=["actions","children","defaultValue","name","onChange","value"],pr=o.forwardRef(function(r,a){const{actions:n,children:l,defaultValue:x,name:_,onChange:u,value:S}=r,i=W(r,mr),f=o.useRef(null),[R,j]=xt({controlled:S,default:x,name:"RadioGroup"});o.useImperativeHandle(n,()=>({focus:()=>{let d=f.current.querySelector("input:not(:disabled):checked");d||(d=f.current.querySelector("input:not(:disabled)")),d&&d.focus()}}),[]);const g=vt(a,f),b=jt(_),v=o.useMemo(()=>({name:b,onChange(d){j(d.target.value),u&&u(d,d.target.value)},value:R}),[b,u,j,R]);return e.jsx(Qe.Provider,{value:v,children:e.jsx(Zt,h({role:"radiogroup",ref:g},i,{children:l}))})}),hr=pr;var oe={},xr=q;Object.defineProperty(oe,"__esModule",{value:!0});var Ue=oe.default=void 0,vr=xr(F()),jr=e,gr=(0,vr.default)((0,jr.jsx)("path",{d:"m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"}),"ArrowUpward");Ue=oe.default=gr;var ae={},Cr=q;Object.defineProperty(ae,"__esModule",{value:!0});var Ve=ae.default=void 0,_r=Cr(F()),Sr=e,br=(0,_r.default)((0,Sr.jsx)("path",{d:"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"}),"Replay");Ve=ae.default=br;var ne={},yr=q;Object.defineProperty(ne,"__esModule",{value:!0});var ie=ne.default=void 0,kr=yr(F()),Rr=e,$r=(0,kr.default)((0,Rr.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");ie=ne.default=$r;var ce={},Mr=q;Object.defineProperty(ce,"__esModule",{value:!0});var We=ce.default=void 0,Ir=Mr(F()),zr=e,wr=(0,Ir.default)((0,zr.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"}),"DoNotDisturbOn");We=ce.default=wr;const Pr=({openModal:t,handleClose:r})=>e.jsxs(gt,{open:t,onClose:r,children:[e.jsx(zt,{children:"Success!"}),e.jsx(wt,{children:e.jsx("p",{children:"Congratulations! You've successfully completed the quiz."})}),e.jsxs(Pt,{children:[e.jsx(z,{onClick:r,color:"primary",children:"Close"}),e.jsx(z,{onClick:r,color:"primary",children:"Next"})]})]});var le={},Nr=q;Object.defineProperty(le,"__esModule",{value:!0});var He=le.default=void 0,Ar=Nr(F()),Dr=e,Fr=(0,Ar.default)((0,Dr.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");He=le.default=Fr;const De=["Well done!","Excellent job!","Congratulations!","Bravo!","Fantastic!"],Fe=["Incorrect.","Wrong answer.","Try again.","Not quite.","That's incorrect."],qr=({currentAnswerStatus:t})=>{const r=De[Math.floor(Math.random()*De.length)],a=Fe[Math.floor(Math.random()*Fe.length)];return e.jsxs(c,{container:!0,alignItems:"center",columnSpacing:1,children:[e.jsx(c,{item:!0,xs:"auto",children:t?e.jsx(ie,{fontSize:"large",color:"success"}):e.jsx(He,{fontSize:"large",color:"error"})}),e.jsx(c,{item:!0,xs:"auto",children:e.jsx(w,{className:"random_phrase",variant:"h5",children:t?r:a})})]})};var ue={},Er=q;Object.defineProperty(ue,"__esModule",{value:!0});var Ke=ue.default=void 0,Br=Er(F()),qe=e,Or=(0,Br.default)([(0,qe.jsx)("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"},"0"),(0,qe.jsx)("path",{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"},"1")],"AccessTime");Ke=ue.default=Or;const Ee=["Time's up.","Out of time.","Your time has expired.","Time expired.","Time is over."],Gr=()=>{const t=Ee[Math.floor(Math.random()*Ee.length)];return e.jsxs(c,{container:!0,alignItems:"center",columnSpacing:1,children:[e.jsx(c,{item:!0,xs:"auto",children:e.jsx(Ke,{fontSize:"large",color:"error"})}),e.jsx(c,{item:!0,xs:"auto",children:e.jsx(w,{className:"random_phrase",variant:"h5",children:t})})]})},Tr=({maxTimeStatic:t,remainingTime:r})=>e.jsxs("div",{className:"timer_progress",children:[e.jsx(Ut,{variant:"determinate",value:r/t*100,color:"secondary",thickness:5,size:60}),e.jsx(w,{color:"secondary",variant:"h6",children:r})]}),Lr=Ct()(t=>({sucessOptionSelected:{"&.MuiFormControlLabel-root.Mui-disabled":{borderColor:t.palette.success.main,color:t.palette.success.main,"& .MuiRadio-root.Mui-disabled":{color:t.palette.success.main},"& .MuiFormControlLabel-label.Mui-disabled":{color:t.palette.success.main}}},errorOptionSelected:{"&.MuiFormControlLabel-root.Mui-disabled":{borderColor:t.palette.error.main,color:t.palette.error.main,"& .MuiRadio-root.Mui-disabled":{color:t.palette.error.main},"& .MuiFormControlLabel-label.Mui-disabled":{color:t.palette.error.main}}}})),Yr=({onAnswer:t,historyList:r,setAllAnswerIsCorrect:a,testType:n="article",setSelectedSubArticle:l,setCurrentUser:x,currentUser:_})=>{const[u,S]=o.useState(0);o.useState([]);const[i,f]=o.useState({correct:0,incorrect:0}),[R,j]=o.useState(!1),[g,b]=o.useState(!1),[v,d]=o.useState(null),[C,y]=o.useState(!1),{selectedArticle:K,subtopicId:A}=_t(),[Ye,de]=o.useState(!1),[$,fe]=o.useState(!1),[me,Y]=o.useState(!1),Z=10,[M,pe]=o.useState(Z),[Ze,he]=o.useState(null),[xe,ve]=o.useState(""),[m,je]=o.useState(null),[D,Je]=o.useState([]),[E,Xe]=o.useState([]),[G,et]=o.useState([]),k=parseInt(K||"0",10);let T=0;const ge=St();bt();const{cx:tt,classes:L}=Lr(),rt=be(),Q=yt(rt.breakpoints.up("sm"));o.useEffect(()=>{l&&l(T)},[l,T]),o.useEffect(()=>{if(r.length>0)if(n==="subArticle"){T=parseInt(A||"0",10);const s=r[k];if(s&&s.subtopics){const p=s.subtopics[T];p&&je(p)}}else je(r[k])},[r,A]),o.useEffect(()=>{const s=p=>{const U=p.map(O=>O.question)||[];Je(U);const lt=p.map(O=>O.options)||[];Xe(lt);const ut=p.map(O=>O.correct_answers)||[];et(ut)};m&&(n==="subArticle"?(ve("title"in m?m.title:""),he("sub_article_test_id"in m?m.sub_article_test_id:void 0),"sub_article_test_questions"in m&&m.sub_article_test_questions&&s(m.sub_article_test_questions)):(ve("text"in m?m.text:""),he("main_article_test_id"in m?m.main_article_test_id:void 0),"main_article_test_questions"in m&&m.main_article_test_questions&&s(m.main_article_test_questions)))},[m,n]),o.useEffect(()=>{i.correct===D.length&&D.length>0&&i.correct>0&&(a(!0),b(!0),n==="subArticle"&&(de(!0),setTimeout(()=>{ge(`/article/${k}`)},5e3)),kt.post("/complete-test",{test_id:Ze,completed:!0},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(s=>{x(s.data.user_data)}).catch(s=>{console.error("Error recording test completion:",s)}))},[i.correct,D.length]);const st=s=>{fe(!0),d(s),G[u]===s?(f({...i,correct:i.correct+1}),Y(!0)):(f({...i,incorrect:i.incorrect+1}),Y(!1)),y(!0)};o.useEffect(()=>{M===0&&!$&&(f({...i,incorrect:i.incorrect+1}),Y(!1),y(!0))},[$,M]);const Ce=()=>{d(null),y(!1),fe(!1),pe(Z)},ot=()=>{S(0),f({correct:0,incorrect:0}),j(!1),Ce()},B=()=>{!v&&M>0||(u<D.length-1?(S(u+1),Ce()):(t(i),j(!0)))},_e=s=>{s.key==="Enter"&&C&&B()},at=s=>s?e.jsx(ie,{color:"success"}):e.jsx(We,{color:"error"}),Se=be(),nt=()=>{de(!1),ge(`/article/${k}`)};o.useEffect(()=>{let s;return $?clearInterval(s):(()=>{s=setInterval(()=>{pe(U=>U===0?(clearInterval(s),0):U-1)},1e3)})(),()=>{s&&clearInterval(s)}},[$]);const it=s=>s===v?s===G[u]?L.sucessOptionSelected:L.errorOptionSelected:s===G[u]?L.sucessOptionSelected:"",ct=s=>s===G[u]?L.sucessOptionSelected:"";return o.useEffect(()=>{const s=p=>{p.key==="Enter"&&B()};return document.addEventListener("keypress",s),()=>{document.removeEventListener("keypress",s)}},[B]),e.jsxs(Rt,{children:[e.jsx($t,{children:e.jsxs("title",{children:[" ",`Тестування ${k}`]})}),e.jsxs(c,{sx:{display:"none"},className:"back_button_container",container:!0,justifyContent:"space-between",children:[e.jsx(c,{item:!0,children:e.jsx(z,{component:V,to:`/article/${k}`,startIcon:e.jsx(ye,{}),children:"До бібліотеки"})}),e.jsx(c,{item:!0,children:e.jsx(z,{component:V,to:"/timeline",endIcon:e.jsx(Ue,{}),color:"secondary",children:"До Часопростору"})})]}),R?e.jsxs("div",{className:"finished_container",children:[e.jsx(w,{className:"title",variant:"h4",children:"Ваші Результати:"}),e.jsx(c,{container:!0,justifyContent:"center",children:e.jsx(c,{item:!0,xs:12,sm:8,md:5,children:e.jsxs(ke,{className:"result_test_card",children:[e.jsx(At,{title:` ${E.length}/${i.correct}`,subheader:at(g)}),e.jsx(Re,{children:e.jsx($e,{color:"success",value:Math.round(100/D.length*i.correct),variant:"determinate"})})]})})}),g?e.jsxs("div",{children:[e.jsx(c,{className:"icon_container",container:!0,justifyContent:"center",children:e.jsx(c,{item:!0,children:e.jsx(Nt,{fontSize:"large",color:"success",className:"pulse"})})}),n==="article"&&e.jsx(c,{container:!0,justifyContent:"center",children:e.jsx(c,{item:!0,xs:12,md:6,children:e.jsxs(ke,{sx:{background:Se.palette.secondary.light},children:[e.jsx(Re,{children:e.jsxs(w,{sx:{color:Se.palette.text.secondary},children:["Вітаю, ",e.jsx(w,{component:"span",variant:"subtitle1",children:_?_.user_name:"Невідомий"}),", ви досягли наступного рівня. Тепер ви можити відправитися у наступний пункт нашої подорожі у часі."]})}),e.jsx(Dt,{children:e.jsx(z,{component:V,to:`/article/${k+1}`,fullWidth:!0,startIcon:e.jsx(J,{}),color:"secondary",endIcon:e.jsx(J,{}),variant:"contained",size:"large",children:k!==null?r[k+1].date:"Помилка у машині часу"})})]})})})]}):e.jsxs(Mt.Fragment,{children:[e.jsx(w,{className:"textMessage",children:"Не сумуйте. Підготуйтесь та спробуйте знову"}),e.jsxs(c,{flexDirection:Q?"row-reverse":"row",spacing:2,container:!0,justifyContent:"space-between",children:[e.jsx(c,{item:!0,xs:12,sm:"auto",children:e.jsx(z,{size:"large",fullWidth:!0,endIcon:e.jsx(Ve,{}),variant:"contained",onClick:ot,children:"Пройти ще раз"})}),e.jsx(c,{item:!0,xs:12,sm:"auto",children:e.jsx(z,{variant:"outlined",color:"secondary",size:"large",fullWidth:!0,component:V,to:`/article/${k}`,startIcon:e.jsx(ye,{}),children:"До бібліотеки"})})]})]})]}):e.jsxs("div",{className:"question_container",children:[e.jsx($e,{color:"secondary",value:Math.round(100/E.length*i.correct),variant:"determinate"}),e.jsxs("h1",{children:["Тема: ",xe&&xe]}),e.jsxs(c,{container:!0,rowSpacing:{xs:2,sm:0},columnSpacing:{xs:1,sm:2,md:3},alignItems:"center",justifyContent:"center",children:[e.jsxs(c,{item:!0,xs:12,sm:6,children:[e.jsx(w,{variant:Q?"h6":"body1",children:D[u]})," "]}),e.jsxs(c,{item:!0,xs:12,sm:6,children:[e.jsx(hr,{name:"radio-buttons-group",onKeyPress:_e,children:E&&E.length>0&&E[u].map((s,p)=>e.jsx(It,{className:tt(M==0?ct(p+1):it(p+1)),onKeyPress:_e,onClick:()=>{!$&&M>0&&st(p+1)},control:e.jsx(fr,{checked:v===p+1}),label:s,value:s,disabled:$||M==0},p+"button"))})," "]})]}),e.jsxs(c,{container:!0,justifyContent:Q?"space-between":"start",mt:2,alignItems:"center",children:[e.jsxs(c,{className:"status_icon_container",item:!0,xs:"auto",md:"auto",children:[$&&e.jsx(qr,{currentAnswerStatus:me}),!$&&(M>0?e.jsx(Tr,{maxTimeStatic:Z,remainingTime:M}):e.jsx(Gr,{}))]}),e.jsx(c,{item:!0,xs:12,sm:"auto",children:e.jsx(z,{color:$?me?"success":"error":M==0?"error":"primary",onKeyDown:B,fullWidth:!Q,className:"next_button",endIcon:e.jsx(J,{}),variant:"contained",size:"large",onClick:B,disabled:!C,children:"Продовжити"})})]})]}),e.jsx(Pr,{openModal:Ye,handleClose:nt})]})};export{Yr as default};
