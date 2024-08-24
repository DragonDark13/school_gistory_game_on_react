import{e as Y,f as Z,k as we,s as I,h as z,_ as C,l as De,r as a,n as J,o as L,j as e,p as X,q as ee,t as ft,v as mt,w as Fe,x as qe,S as pt,y as ht,z as xt,A as vt,D as gt,E as jt,a as F,i as q,F as Ct,B as M,b as K,T as k,G as l,L as E,R as _t,I as St,J as bt,K as yt,M as Rt,c as kt,N as $t,O as Mt,C as zt,H as It}from"./index-rRiw6rgx.js";import{D as At,a as Pt,b as Nt,d as Be}from"./ArrowBackIos-u04VEIaA.js";import{d as wt}from"./Star-z5mgZ8Zh.js";import{d as Te}from"./ArrowForwardIos-WJZvpjN6.js";import{b as _e,C as Dt,a as Ft}from"./CardHeader-bJig-HP6.js";import{C as Se}from"./CardContent-E0pb_2gP.js";import{L as Qe}from"./LinearProgress-xHf6kEu0.js";function qt(t){return Y("MuiCircularProgress",t)}Z("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Bt=["className","color","disableShrink","size","style","thickness","value","variant"];let U=t=>t,be,ye,Re,ke;const $=44,Tt=we(be||(be=U`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),Qt=we(ye||(ye=U`
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
`)),Gt=t=>{const{classes:r,variant:s,color:o,disableShrink:c}=t,i={root:["root",s,`color${z(o)}`],svg:["svg"],circle:["circle",`circle${z(s)}`,c&&"circleDisableShrink"]};return ee(i,qt,r)},Ot=I("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,r)=>{const{ownerState:s}=t;return[r.root,r[s.variant],r[`color${z(s.color)}`]]}})(({ownerState:t,theme:r})=>C({display:"inline-block"},t.variant==="determinate"&&{transition:r.transitions.create("transform")},t.color!=="inherit"&&{color:(r.vars||r).palette[t.color].main}),({ownerState:t})=>t.variant==="indeterminate"&&De(Re||(Re=U`
      animation: ${0} 1.4s linear infinite;
    `),Tt)),Et=I("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,r)=>r.svg})({display:"block"}),Lt=I("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,r)=>{const{ownerState:s}=t;return[r.circle,r[`circle${z(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(({ownerState:t,theme:r})=>C({stroke:"currentColor"},t.variant==="determinate"&&{transition:r.transitions.create("stroke-dashoffset")},t.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:t})=>t.variant==="indeterminate"&&!t.disableShrink&&De(ke||(ke=U`
      animation: ${0} 1.4s ease-in-out infinite;
    `),Qt)),Ut=a.forwardRef(function(r,s){const o=J({props:r,name:"MuiCircularProgress"}),{className:c,color:i="primary",disableShrink:n=!1,size:f=40,style:u,thickness:m=3.6,value:x=0,variant:j="indeterminate"}=o,S=L(o,Bt),b=C({},o,{color:i,disableShrink:n,size:f,thickness:m,value:x,variant:j}),g=Gt(b),_={},p={},h={};if(j==="determinate"){const R=2*Math.PI*(($-m)/2);_.strokeDasharray=R.toFixed(3),h["aria-valuenow"]=Math.round(x),_.strokeDashoffset=`${((100-x)/100*R).toFixed(3)}px`,p.transform="rotate(-90deg)"}return e.jsx(Ot,C({className:X(g.root,c),style:C({width:f,height:f},p,u),ownerState:b,ref:s,role:"progressbar"},h,S,{children:e.jsx(Et,{className:g.svg,ownerState:b,viewBox:`${$/2} ${$/2} ${$} ${$}`,children:e.jsx(Lt,{className:g.circle,style:_,ownerState:b,cx:$,cy:$,r:($-m)/2,fill:"none",strokeWidth:m})})}))}),Vt=Ut;function Ht(t){return Y("MuiFormGroup",t)}Z("MuiFormGroup",["root","row","error"]);const Wt=["className","row"],Kt=t=>{const{classes:r,row:s,error:o}=t;return ee({root:["root",s&&"row",o&&"error"]},Ht,r)},Yt=I("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(t,r)=>{const{ownerState:s}=t;return[r.root,s.row&&r.row]}})(({ownerState:t})=>C({display:"flex",flexDirection:"column",flexWrap:"wrap"},t.row&&{flexDirection:"row"})),Zt=a.forwardRef(function(r,s){const o=J({props:r,name:"MuiFormGroup"}),{className:c,row:i=!1}=o,n=L(o,Wt),f=ft(),u=mt({props:o,muiFormControl:f,states:["error"]}),m=C({},o,{row:i,error:u.error}),x=Kt(m);return e.jsx(Yt,C({className:X(x.root,c),ownerState:m,ref:s},n))}),Jt=Zt,Xt=Fe(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),er=Fe(e.jsx("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),tr=I("span",{shouldForwardProp:qe})({position:"relative",display:"flex"}),rr=I(Xt)({transform:"scale(1)"}),sr=I(er)(({theme:t,ownerState:r})=>C({left:0,position:"absolute",transform:"scale(0)",transition:t.transitions.create("transform",{easing:t.transitions.easing.easeIn,duration:t.transitions.duration.shortest})},r.checked&&{transform:"scale(1)",transition:t.transitions.create("transform",{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.shortest})}));function Ge(t){const{checked:r=!1,classes:s={},fontSize:o}=t,c=C({},t,{checked:r});return e.jsxs(tr,{className:s.root,ownerState:c,children:[e.jsx(rr,{fontSize:o,className:s.background,ownerState:c}),e.jsx(sr,{fontSize:o,className:s.dot,ownerState:c})]})}const or=a.createContext(void 0),Oe=or;function ar(){return a.useContext(Oe)}function nr(t){return Y("MuiRadio",t)}const cr=Z("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary","sizeSmall"]),$e=cr,ir=["checked","checkedIcon","color","icon","name","onChange","size","className"],lr=t=>{const{classes:r,color:s,size:o}=t,c={root:["root",`color${z(s)}`,o!=="medium"&&`size${z(o)}`]};return C({},r,ee(c,nr,r))},ur=I(pt,{shouldForwardProp:t=>qe(t)||t==="classes",name:"MuiRadio",slot:"Root",overridesResolver:(t,r)=>{const{ownerState:s}=t;return[r.root,s.size!=="medium"&&r[`size${z(s.size)}`],r[`color${z(s.color)}`]]}})(({theme:t,ownerState:r})=>C({color:(t.vars||t).palette.text.secondary},!r.disableRipple&&{"&:hover":{backgroundColor:t.vars?`rgba(${r.color==="default"?t.vars.palette.action.activeChannel:t.vars.palette[r.color].mainChannel} / ${t.vars.palette.action.hoverOpacity})`:ht(r.color==="default"?t.palette.action.active:t.palette[r.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},r.color!=="default"&&{[`&.${$e.checked}`]:{color:(t.vars||t).palette[r.color].main}},{[`&.${$e.disabled}`]:{color:(t.vars||t).palette.action.disabled}}));function dr(t,r){return typeof r=="object"&&r!==null?t===r:String(t)===String(r)}const Me=e.jsx(Ge,{checked:!0}),ze=e.jsx(Ge,{}),fr=a.forwardRef(function(r,s){var o,c;const i=J({props:r,name:"MuiRadio"}),{checked:n,checkedIcon:f=Me,color:u="primary",icon:m=ze,name:x,onChange:j,size:S="medium",className:b}=i,g=L(i,ir),_=C({},i,{color:u,size:S}),p=lr(_),h=ar();let R=n;const A=xt(j,h&&h.onChange);let y=x;return h&&(typeof R>"u"&&(R=dr(h.value,i.value)),typeof y>"u"&&(y=h.name)),e.jsx(ur,C({type:"radio",icon:a.cloneElement(m,{fontSize:(o=ze.props.fontSize)!=null?o:S}),checkedIcon:a.cloneElement(f,{fontSize:(c=Me.props.fontSize)!=null?c:S}),ownerState:_,classes:p,name:y,checked:R,onChange:A,ref:s,className:X(p.root,b)},g))}),mr=fr,pr=["actions","children","defaultValue","name","onChange","value"],hr=a.forwardRef(function(r,s){const{actions:o,children:c,defaultValue:i,name:n,onChange:f,value:u}=r,m=L(r,pr),x=a.useRef(null),[j,S]=vt({controlled:u,default:i,name:"RadioGroup"});a.useImperativeHandle(o,()=>({focus:()=>{let p=x.current.querySelector("input:not(:disabled):checked");p||(p=x.current.querySelector("input:not(:disabled)")),p&&p.focus()}}),[]);const b=gt(s,x),g=jt(n),_=a.useMemo(()=>({name:g,onChange(p){S(p.target.value),f&&f(p,p.target.value)},value:j}),[g,f,S,j]);return e.jsx(Oe.Provider,{value:_,children:e.jsx(Jt,C({role:"radiogroup",ref:b},m,{children:c}))})}),xr=hr;var te={},vr=q;Object.defineProperty(te,"__esModule",{value:!0});var Ee=te.default=void 0,gr=vr(F()),jr=e,Cr=(0,gr.default)((0,jr.jsx)("path",{d:"m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"}),"ArrowUpward");Ee=te.default=Cr;const _r=({openModal:t,handleClose:r})=>e.jsxs(Ct,{open:t,onClose:r,children:[e.jsx(At,{children:"Success!"}),e.jsx(Pt,{children:e.jsx("p",{children:"Congratulations! You've successfully completed the quiz."})}),e.jsxs(Nt,{children:[e.jsx(M,{onClick:r,color:"primary",children:"Close"}),e.jsx(M,{onClick:r,color:"primary",children:"Next"})]})]});var re={},Sr=q;Object.defineProperty(re,"__esModule",{value:!0});var se=re.default=void 0,br=Sr(F()),yr=e,Rr=(0,br.default)((0,yr.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");se=re.default=Rr;var oe={},kr=q;Object.defineProperty(oe,"__esModule",{value:!0});var Le=oe.default=void 0,$r=kr(F()),Mr=e,zr=(0,$r.default)((0,Mr.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"}),"DoNotDisturbOn");Le=oe.default=zr;var ae={},Ir=q;Object.defineProperty(ae,"__esModule",{value:!0});var Ue=ae.default=void 0,Ar=Ir(F()),Pr=e,Nr=(0,Ar.default)((0,Pr.jsx)("path",{d:"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"}),"Replay");Ue=ae.default=Nr;const wr=({props:t})=>{const{results:r,percentCompleted:s,nextLevelAvailable:o,handleRetakeQuiz:c,currentUser:i,selectedArticleNumber:n,historyList:f,testType:u}=t,m=j=>j?e.jsx(se,{color:"success"}):e.jsx(Le,{color:"error"}),x=K();return e.jsxs("div",{className:"finished_container",children:[e.jsx(k,{className:"title",variant:"h4",children:"Ваші Результати:"}),e.jsx(l,{container:!0,justifyContent:"center",children:e.jsx(l,{item:!0,xs:12,sm:8,md:5,children:e.jsxs(_e,{className:"result_test_card",children:[e.jsx(Dt,{title:`${r.correct}/${r.correct+r.incorrect}`,subheader:m(o)}),e.jsx(Se,{children:e.jsx(Qe,{defaultValue:0,color:"success",value:s,variant:"determinate"})})]})})}),o?e.jsxs("div",{children:[e.jsx(l,{className:"icon_container",container:!0,justifyContent:"center",children:e.jsx(l,{item:!0,children:e.jsx(wt,{fontSize:"large",color:"success",className:"pulse"})})}),u==="article"&&e.jsx(l,{container:!0,justifyContent:"center",children:e.jsx(l,{item:!0,xs:12,md:6,children:e.jsxs(_e,{sx:{background:x.palette.secondary.light},children:[e.jsx(Se,{children:e.jsxs(k,{children:["Вітаю, ",e.jsx(k,{component:"span",variant:"subtitle1",children:i?i.user_name:"Невідомий"}),", ви досягли наступного рівня. Тепер ви можете відправитися у наступний пункт нашої подорожі у часі."]})}),e.jsx(Ft,{children:e.jsx(M,{component:E,to:`/article/${n+1}`,fullWidth:!0,startIcon:e.jsx(Te,{}),color:"secondary",variant:"contained",size:"large",children:f[n+1].date})})]})})})]}):e.jsxs(_t.Fragment,{children:[e.jsx(k,{className:"textMessage",children:"Не сумуйте. Підготуйтесь та спробуйте знову"}),e.jsxs(l,{flexDirection:"row-reverse",spacing:2,container:!0,justifyContent:"space-between",children:[e.jsx(l,{item:!0,xs:12,sm:"auto",children:e.jsx(M,{size:"large",fullWidth:!0,endIcon:e.jsx(Ue,{}),variant:"contained",onClick:c,children:"Пройти ще раз"})}),e.jsx(l,{item:!0,xs:12,sm:"auto",children:e.jsx(M,{variant:"outlined",color:"secondary",size:"large",fullWidth:!0,component:E,to:`/article/${n}`,startIcon:e.jsx(Be,{}),children:"До бібліотеки"})})]})]})]})};var ne={},Dr=q;Object.defineProperty(ne,"__esModule",{value:!0});var Ve=ne.default=void 0,Fr=Dr(F()),Ie=e,qr=(0,Fr.default)([(0,Ie.jsx)("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"},"0"),(0,Ie.jsx)("path",{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"},"1")],"AccessTime");Ve=ne.default=qr;const Ae=["Time's up.","Out of time.","Your time has expired.","Time expired.","Time is over."],Br=()=>{const t=Ae[Math.floor(Math.random()*Ae.length)];return e.jsxs(l,{container:!0,alignItems:"center",columnSpacing:1,children:[e.jsx(l,{item:!0,xs:"auto",children:e.jsx(Ve,{fontSize:"large",color:"error"})}),e.jsx(l,{item:!0,xs:"auto",children:e.jsx(k,{className:"random_phrase",variant:"h5",children:t})})]})};var ce={},Tr=q;Object.defineProperty(ce,"__esModule",{value:!0});var He=ce.default=void 0,Qr=Tr(F()),Gr=e,Or=(0,Qr.default)((0,Gr.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");He=ce.default=Or;const Pe=["Well done!","Excellent job!","Congratulations!","Bravo!","Fantastic!"],Ne=["Incorrect.","Wrong answer.","Try again.","Not quite.","That's incorrect."],Er=({currentAnswerStatus:t})=>{const r=Pe[Math.floor(Math.random()*Pe.length)],s=Ne[Math.floor(Math.random()*Ne.length)];return e.jsxs(l,{container:!0,alignItems:"center",columnSpacing:1,children:[e.jsx(l,{item:!0,xs:"auto",children:t?e.jsx(se,{fontSize:"large",color:"success"}):e.jsx(He,{fontSize:"large",color:"error"})}),e.jsx(l,{item:!0,xs:"auto",children:e.jsx(k,{className:"random_phrase",variant:"h5",children:t?r:s})})]})},Lr=a.memo(({maxTimeStatic:t,answerChosen:r,setTimeIsFinished:s})=>{const[o,c]=a.useState(t);return a.useEffect(()=>{let i;console.log("startTimer");const n=()=>{i=setInterval(()=>{c(f=>f===0?(clearInterval(i),0):f-1)},1e3)};return r?clearInterval(i):(console.log("Run the timer "),n(),s(!1)),()=>{i&&clearInterval(i)}},[r]),a.useEffect(()=>{o===0&&s(!0)},[o]),e.jsxs("div",{className:"timer_progress",children:[e.jsx(Vt,{variant:"determinate",value:o/t*100,color:"secondary",thickness:5,size:60}),e.jsx(k,{color:"secondary",variant:"h6",children:o})]})}),Ur=({currentQuestion:t,quizOptions:r,selectedAnswer:s,handleAnswer:o,handleAnswerKeyPress:c,maxTimeStatic:i,answerChosen:n,currentAnswerStatus:f,isNextButtonActive:u,handleNextQuestion:m,smUp:x,currentArticleTitle:j,optionsHighlightWhenTimerIsFinished:S,optionHighlight:b,percentCompleted:g,currentQuestionText:_,setTimeIsFinished:p,timeIsFinished:h})=>{const{cx:R}=St();return console.log("QuestionContainer start"),e.jsxs("div",{className:"question_container",children:[e.jsx(Qe,{color:"primary",defaultValue:0,value:g||0,variant:"determinate"}),e.jsxs(k,{className:"quiz_title",variant:"h5",children:["Тема: ",j&&j]}),e.jsxs(l,{container:!0,rowSpacing:{xs:2,sm:0},columnSpacing:{xs:1,sm:2,md:3},alignItems:"center",justifyContent:"center",children:[e.jsx(l,{item:!0,xs:12,sm:6,children:e.jsx(k,{variant:"h6",children:_})}),e.jsx(l,{item:!0,xs:12,sm:6,children:e.jsx(xr,{name:"radio-buttons-group",onKeyPress:c,children:r&&r.length>0&&r[t].map((A,y)=>e.jsx(bt,{className:R(h?S(y):n?b(y):""),onKeyPress:c,onClick:()=>{!n&&!h&&o(y)},control:e.jsx(mr,{checked:s===y}),label:A,value:A,disabled:n||h},y+"button"))})})]}),e.jsxs(l,{container:!0,justifyContent:"space-between",mt:2,alignItems:"center",children:[e.jsxs(l,{className:"status_icon_container",item:!0,xs:"auto",children:[n&&e.jsx(Er,{currentAnswerStatus:f}),!n&&(h?e.jsx(Br,{}):e.jsx(Lr,{maxTimeStatic:i,answerChosen:n,setTimeIsFinished:p}))]}),e.jsx(l,{item:!0,xs:12,sm:"auto",children:e.jsx(M,{color:n?f?"success":"error":h?"error":"primary",onKeyDown:m,fullWidth:!x,className:"next_button",endIcon:e.jsx(Te,{}),variant:"contained",size:"large",onClick:m,disabled:!u,children:"Продовжити"})})]})]})},Vr=yt()(t=>({sucessOptionSelected:{"&.MuiFormControlLabel-root.Mui-disabled":{borderColor:t.palette.success.main,color:t.palette.success.main,"& .MuiRadio-root.Mui-disabled":{color:t.palette.success.main},"& .MuiFormControlLabel-label.Mui-disabled":{color:t.palette.success.main}}},errorOptionSelected:{"&.MuiFormControlLabel-root.Mui-disabled":{borderColor:t.palette.error.main,color:t.palette.error.main,"& .MuiRadio-root.Mui-disabled":{color:t.palette.error.main},"& .MuiFormControlLabel-label.Mui-disabled":{color:t.palette.error.main}}}})),Hr=({selectedArticleNumber:t})=>e.jsxs(l,{className:"back_button_container",container:!0,justifyContent:"space-between",children:[e.jsx(l,{item:!0,children:e.jsx(M,{component:E,to:`/article/${t}`,startIcon:e.jsx(Be,{}),children:"До бібліотеки"})}),e.jsx(l,{item:!0,children:e.jsx(M,{component:E,to:"/timeline",endIcon:e.jsx(Ee,{}),color:"secondary",children:"До Часопростору"})})]}),ss=({historyList:t,setAllAnswerIsCorrect:r,testType:s="article",setSelectedSubArticle:o,setCurrentUser:c,currentUser:i})=>{console.log("Current Props:",t,i),console.log("QuizBlock.tsx start");const[n,f]=a.useState(0),[u,m]=a.useState({correct:0,incorrect:0}),[x,j]=a.useState(!1),[S,b]=a.useState(!1),[g,_]=a.useState(null),[p,h]=a.useState(!1),{selectedArticle:R,subtopicId:A}=Rt(),[y,ie]=a.useState(!1),[V,le]=a.useState(!1),[We,H]=a.useState(!1),Ke=30,[B,ue]=a.useState(!1),[Ye,de]=a.useState(null),[Ze,fe]=a.useState(""),[v,me]=a.useState(null),[P,Je]=a.useState([]),[Xe,et]=a.useState([]),[Q,tt]=a.useState([]),[pe,he]=a.useState(0),N=parseInt(R||"0",10);let W=0;const xe=kt(),{cx:Wr,classes:G}=Vr(),rt=K(),st=$t(rt.breakpoints.up("sm"));a.useEffect(()=>{if(console.log("historyList",t),t.length>0)if(console.log("testType",s),s==="subArticle"){W=parseInt(A||"0",10),o&&o(W);const d=t[N];if(d&&d.subtopics){const T=d.subtopics[W];T&&me(T)}}else me(t[N])},[A,t]);const ve=d=>{const T=d.map(w=>w.question)||[];Je(T),console.log("questionsArray",T);const O=d.map(w=>w.options)||[];et(O),console.log("optionsArray",O);const D=d.map(w=>w.correct_answers)||[];tt(D),console.log("correctAnswersArray",D);const dt=O.every((w,Ce)=>D[Ce]>=0&&D[Ce]<w.length);(!(O.length===D.length&&D.length===d.length)||!dt)&&console.warn("Length mismatch: optionsArray and correctAnswersArray should be of the same length as questionsArray")};a.useEffect(()=>{v&&(console.log("currentArticle1111",v),s==="subArticle"?(fe("title"in v?v.title:""),de("sub_article_test_id"in v?v.sub_article_test_id:void 0),"sub_article_test_questions"in v&&v.sub_article_test_questions&&ve(v.sub_article_test_questions)):(fe("text"in v?v.text:""),de("main_article_test_id"in v?v.main_article_test_id:void 0),"main_article_test_questions"in v&&v.main_article_test_questions&&ve(v.main_article_test_questions)))},[v]),a.useEffect(()=>{P.length>0&&he(Math.round(100/P.length*u.correct)),u.correct===P.length&&P.length>0&&u.correct>0&&(r(!0),b(!0),s==="subArticle"&&(ie(!0),setTimeout(()=>{xe(`/article/${N}`)},5e3)),Mt.post("/complete-test",{test_id:Ye,completed:!0},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(d=>{c(d.data.user_data)}).catch(d=>{console.error("Error recording test completion:",d)}))},[u.correct,P.length]);const ot=d=>{le(!0),_(d),Q[n]===d?(m({...u,correct:u.correct+1}),H(!0)):(m({...u,incorrect:u.incorrect+1}),H(!1)),h(!0)};a.useEffect(()=>{B&&!V&&(m({...u,incorrect:u.incorrect+1}),H(!1),h(!0))},[V,B]);const ge=()=>{_(null),h(!1),le(!1),ue(!1)},at=()=>{f(0),m({correct:0,incorrect:0}),j(!1),he(0),ge()},je=()=>{g===null&&!B||(n<P.length-1?(f(n+1),ge()):j(!0))},nt=d=>{d.key==="Enter"&&p&&je()};K();const ct=()=>{ie(!1),xe(`/article/${N}`)},it=d=>g!==null?d===g?d===Q[n]?G.sucessOptionSelected:G.errorOptionSelected:d===Q[n]?G.sucessOptionSelected:" ":" ",lt=d=>d===Q[n]?G.sucessOptionSelected:"",ut={results:u,percentCompleted:pe,nextLevelAvailable:S,handleRetakeQuiz:at,currentUser:i,selectedArticleNumber:N,historyList:t,testType:s};return console.log(B?"timeIsFinished Yes":"timeIsFinished No"),e.jsxs(zt,{children:[e.jsx(It,{children:e.jsxs("title",{children:[" ",`Тестування ${N}`]})}),e.jsx(Hr,{selectedArticleNumber:N}),x?e.jsx(wr,{props:ut}):e.jsx(Ur,{setTimeIsFinished:ue,answerChosen:V,maxTimeStatic:Ke,currentAnswerStatus:We,currentArticleTitle:Ze,currentQuestion:n,handleAnswer:ot,currentQuestionText:P[n],handleAnswerKeyPress:nt,handleNextQuestion:je,isNextButtonActive:p,optionHighlight:it,optionsHighlightWhenTimerIsFinished:lt,percentCompleted:pe,quizOptions:Xe,selectedAnswer:g,smUp:st,timeIsFinished:B}),e.jsx(_r,{openModal:y,handleClose:ct})]})};export{ss as default};