import{r as b,g as ce,a as Y,i as J,j as c,u as ue,R as $,m as de,T as P,B as M,b as fe,c as pe,d as he,C as me,H as ve,e as ge}from"./index-FgZcBDIe.js";import{C as ye,a as be,b as _e,c as Te}from"./CardHeader-QQxYF9FB.js";import{C as xe}from"./CardMedia-qVSkW5jC.js";import{H as Oe}from"./Hidden-zbkGxo6G.js";import{L as Ce}from"./LinearProgress-eWB4lN3c.js";var Q={exports:{}},je="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",we=je,Ve=we;function X(){}function Z(){}Z.resetWarningCache=X;var Ne=function(){function e(a,t,i,d,l,o){if(o!==Ve){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}e.isRequired=e;function r(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:Z,resetWarningCache:X};return n.PropTypes=n,n};Q.exports=Ne();var ee=Q.exports,S={},te={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var r={}.hasOwnProperty;function n(){for(var a=[],t=0;t<arguments.length;t++){var i=arguments[t];if(i){var d=typeof i;if(d==="string"||d==="number")a.push(i);else if(Array.isArray(i)){if(i.length){var l=n.apply(null,i);l&&a.push(l)}}else if(d==="object"){if(i.toString!==Object.prototype.toString&&!i.toString.toString().includes("[native code]")){a.push(i.toString());continue}for(var o in i)r.call(i,o)&&i[o]&&a.push(o)}}}return a.join(" ")}e.exports?(n.default=n,e.exports=n):window.classNames=n})()})(te);var re=te.exports;S.__esModule=!0;S.default=void 0;var ke=z(b),x=z(ee),Re=z(re);function z(e){return e&&e.__esModule?e:{default:e}}const ne=({animate:e=!0,className:r="",layout:n="2-columns",lineColor:a="#FFF",children:t})=>(typeof window=="object"&&document.documentElement.style.setProperty("--line-color",a),ke.default.createElement("div",{className:(0,Re.default)(r,"vertical-timeline",{"vertical-timeline--animate":e,"vertical-timeline--two-columns":n==="2-columns","vertical-timeline--one-column-left":n==="1-column"||n==="1-column-left","vertical-timeline--one-column-right":n==="1-column-right"})},t));ne.propTypes={children:x.default.oneOfType([x.default.arrayOf(x.default.node),x.default.node]).isRequired,className:x.default.string,animate:x.default.bool,layout:x.default.oneOf(["1-column-left","1-column","2-columns","1-column-right"]),lineColor:x.default.string};var Se=ne;S.default=Se;var E={};function D(){return D=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},D.apply(this,arguments)}function Ee(e,r){e.prototype=Object.create(r.prototype),e.prototype.constructor=e,F(e,r)}function F(e,r){return F=Object.setPrototypeOf||function(a,t){return a.__proto__=t,a},F(e,r)}function Ie(e,r){if(e==null)return{};var n={},a=Object.keys(e),t,i;for(i=0;i<a.length;i++)t=a[i],!(r.indexOf(t)>=0)&&(n[t]=e[t]);return n}var W=new Map,N=new WeakMap,G=0,ie=void 0;function Me(e){ie=e}function $e(e){return e?(N.has(e)||(G+=1,N.set(e,G.toString())),N.get(e)):"0"}function Pe(e){return Object.keys(e).sort().filter(function(r){return e[r]!==void 0}).map(function(r){return r+"_"+(r==="root"?$e(e.root):e[r])}).toString()}function De(e){var r=Pe(e),n=W.get(r);if(!n){var a=new Map,t,i=new IntersectionObserver(function(d){d.forEach(function(l){var o,s=l.isIntersecting&&t.some(function(h){return l.intersectionRatio>=h});e.trackVisibility&&typeof l.isVisible>"u"&&(l.isVisible=s),(o=a.get(l.target))==null||o.forEach(function(h){h(s,l)})})},e);t=i.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),n={id:r,observer:i,elements:a},W.set(r,n)}return n}function A(e,r,n,a){if(n===void 0&&(n={}),a===void 0&&(a=ie),typeof window.IntersectionObserver>"u"&&a!==void 0){var t=e.getBoundingClientRect();return r(a,{isIntersecting:a,target:e,intersectionRatio:typeof n.threshold=="number"?n.threshold:0,time:0,boundingClientRect:t,intersectionRect:t,rootBounds:t}),function(){}}var i=De(n),d=i.id,l=i.observer,o=i.elements,s=o.get(e)||[];return o.has(e)||o.set(e,s),s.push(r),l.observe(e),function(){s.splice(s.indexOf(r),1),s.length===0&&(o.delete(e),l.unobserve(e)),o.size===0&&(l.disconnect(),W.delete(d))}}var Fe=["children","as","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView","fallbackInView"];function L(e){return typeof e.children!="function"}var R=function(e){Ee(r,e);function r(a){var t;return t=e.call(this,a)||this,t.node=null,t._unobserveCb=null,t.handleNode=function(i){t.node&&(t.unobserve(),!i&&!t.props.triggerOnce&&!t.props.skip&&t.setState({inView:!!t.props.initialInView,entry:void 0})),t.node=i||null,t.observeNode()},t.handleChange=function(i,d){i&&t.props.triggerOnce&&t.unobserve(),L(t.props)||t.setState({inView:i,entry:d}),t.props.onChange&&t.props.onChange(i,d)},t.state={inView:!!a.initialInView,entry:void 0},t}var n=r.prototype;return n.componentDidUpdate=function(t){(t.rootMargin!==this.props.rootMargin||t.root!==this.props.root||t.threshold!==this.props.threshold||t.skip!==this.props.skip||t.trackVisibility!==this.props.trackVisibility||t.delay!==this.props.delay)&&(this.unobserve(),this.observeNode())},n.componentWillUnmount=function(){this.unobserve(),this.node=null},n.observeNode=function(){if(!(!this.node||this.props.skip)){var t=this.props,i=t.threshold,d=t.root,l=t.rootMargin,o=t.trackVisibility,s=t.delay,h=t.fallbackInView;this._unobserveCb=A(this.node,this.handleChange,{threshold:i,root:d,rootMargin:l,trackVisibility:o,delay:s},h)}},n.unobserve=function(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)},n.render=function(){if(!L(this.props)){var t=this.state,i=t.inView,d=t.entry;return this.props.children({inView:i,entry:d,ref:this.handleNode})}var l=this.props,o=l.children,s=l.as,h=Ie(l,Fe);return b.createElement(s||"div",D({ref:this.handleNode},h),o)},r}(b.Component);R.displayName="InView";R.defaultProps={threshold:0,triggerOnce:!1,initialInView:!1};function We(e){var r=e===void 0?{}:e,n=r.threshold,a=r.delay,t=r.trackVisibility,i=r.rootMargin,d=r.root,l=r.triggerOnce,o=r.skip,s=r.initialInView,h=r.fallbackInView,m=b.useRef(),g=b.useState({inView:!!s}),y=g[0],T=g[1],C=b.useCallback(function(_){m.current!==void 0&&(m.current(),m.current=void 0),!o&&_&&(m.current=A(_,function(j,V){T({inView:j,entry:V}),V.isIntersecting&&l&&m.current&&(m.current(),m.current=void 0)},{root:d,rootMargin:i,threshold:n,trackVisibility:t,delay:a},h))},[Array.isArray(n)?n.toString():n,d,i,l,o,t,h,a]);b.useEffect(function(){!m.current&&y.entry&&!l&&!o&&T({inView:!!s})});var v=[C,y.inView,y.entry];return v.ref=v[0],v.inView=v[1],v.entry=v[2],v}const ze=Object.freeze(Object.defineProperty({__proto__:null,InView:R,default:R,defaultFallbackInView:Me,observe:A,useInView:We},Symbol.toStringTag,{value:"Module"})),Ae=ce(ze);E.__esModule=!0;E.default=void 0;var O=q(b),f=q(ee),k=q(re),qe=Ae;function q(e){return e&&e.__esModule?e:{default:e}}const ae=({children:e="",className:r="",contentArrowStyle:n=null,contentStyle:a=null,date:t="",dateClassName:i="",icon:d=null,iconClassName:l="",iconOnClick:o=null,onTimelineElementClick:s=null,iconStyle:h=null,id:m="",position:g="",style:y=null,textClassName:T="",intersectionObserverProps:C={rootMargin:"0px 0px -40px 0px",triggerOnce:!0},visible:v=!1})=>O.default.createElement(qe.InView,C,({inView:_,ref:j})=>O.default.createElement("div",{ref:j,id:m,className:(0,k.default)(r,"vertical-timeline-element",{"vertical-timeline-element--left":g==="left","vertical-timeline-element--right":g==="right","vertical-timeline-element--no-children":e===""}),style:y},O.default.createElement(O.default.Fragment,null,O.default.createElement("span",{style:h,onClick:o,className:(0,k.default)(l,"vertical-timeline-element-icon",{"bounce-in":_||v,"is-hidden":!(_||v)})},d),O.default.createElement("div",{style:a,onClick:s,className:(0,k.default)(T,"vertical-timeline-element-content",{"bounce-in":_||v,"is-hidden":!(_||v)})},O.default.createElement("div",{style:n,className:"vertical-timeline-element-content-arrow"}),e,O.default.createElement("span",{className:(0,k.default)(i,"vertical-timeline-element-date")},t)))));ae.propTypes={children:f.default.oneOfType([f.default.arrayOf(f.default.node),f.default.node]),className:f.default.string,contentArrowStyle:f.default.shape({}),contentStyle:f.default.shape({}),date:f.default.node,dateClassName:f.default.string,icon:f.default.element,iconClassName:f.default.string,iconStyle:f.default.shape({}),iconOnClick:f.default.func,onTimelineElementClick:f.default.func,id:f.default.string,position:f.default.string,style:f.default.shape({}),textClassName:f.default.string,visible:f.default.bool,intersectionObserverProps:f.default.shape({root:f.default.object,rootMargin:f.default.string,threshold:f.default.number,triggerOnce:f.default.bool})};var Ue=ae;E.default=Ue;var K={VerticalTimeline:S.default,VerticalTimelineElement:E.default},U={},Be=J;Object.defineProperty(U,"__esModule",{value:!0});var oe=U.default=void 0,He=Be(Y()),Ge=c,Le=(0,He.default)((0,Ge.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUncheckedRounded");oe=U.default=Le;var B={},Ke=J;Object.defineProperty(B,"__esModule",{value:!0});var se=B.default=void 0,Ye=Ke(Y()),Je=c,Qe=(0,Ye.default)((0,Je.jsx)("path",{d:"M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"CheckCircleOutline");se=B.default=Qe;const Xe=({event:e,index:r,buttonState:n,handleExpandArticle:a,handleGoToTestNow:t,handleGoToSubArticleTest:i,successLevel:d,isAllSubtaskDone:l,totalSubtopics:o,completedSubtopics:s})=>{const h=ue(),m=n?h.palette.text.primary:h.palette.text.disabled,g=o>0?s/o*100:0;return c.jsxs($.Fragment,{children:[c.jsx(ye,{titleTypographyProps:{color:m},title:e.date}),c.jsx(xe,{className:n?"":"imageOpacity",component:"img",height:"194",image:de,alt:"city"}),c.jsx(Oe,{smDown:!0,children:c.jsx(be,{children:c.jsx(P,{color:m,component:"div",children:e.text})})}),c.jsxs(_e,{disableSpacing:!0,sx:{flexWrap:"wrap"},children:[c.jsx(M,{variant:"outlined",color:"secondary",size:"small",sx:{mb:1},fullWidth:!0,disabled:!n,className:"learn-more-button",onClick:y=>{y.stopPropagation(),a(r+1)},children:"Дізнатися більше"}),!d&&(l?c.jsx(M,{size:"large",variant:"contained",fullWidth:!0,disabled:!n,className:"goToTest",onClick:y=>{y.stopPropagation(),t(r)},children:"Завершити рівень"}):c.jsxs($.Fragment,{children:[c.jsxs("div",{className:"progress_bar_container",children:[c.jsx(Ce,{color:"primary",variant:"determinate",value:g}),c.jsxs(P,{variant:"body2",gutterBottom:!0,children:["Виконано: ",s," із ",o," (",g.toFixed(2),"%)"]})]}),c.jsx(M,{size:"large",variant:"contained",fullWidth:!0,disabled:!n,className:"goToTest",onClick:y=>{y.stopPropagation(),i(r+1)},children:"Пройти завдання"})]}))]})]})},it=({historyList:e,buttonStates:r,successLevels:n,setSelectedArticle:a,selectedArticle:t,subArticleSuccessLevels:i,setSelectedSubArticle:d,isLoading:l})=>{const o=fe();console.log("isLoading>>>>>>",l?"isLoading true":"isLoading false"),b.useState([]);const[s,h]=b.useState([]),m=u=>u?o.palette.primary.contrastText:o.palette.primary.main,g=pe(),y=u=>{a(u),g(`/article/${u}`)},T=u=>{g(`/test/${u}`),a(u)},C=(u,p)=>{g(`/test/${u}/${p}`),a(u),d(p)},v=async u=>{try{const p=await ge.get(`https://zelse.asuscomm.com/SchoolHistoryGame/ep/subtopics/${u}/ `);h(p.data)}catch(p){console.error("Error fetching data:",p)}},_=u=>{a(u),v(u)};b.useEffect(()=>{if(s&&s.length>0){const u=s.findIndex((p,I)=>{var w;return!((w=i[t])!=null&&w[I])});u!==-1?C(t,u):T(t)}},[s,i,t,C,T]);const j=u=>s.length>0?!s||s.length>0&&s.every((p,I)=>{var w;return(w=i[u])==null?void 0:w[I]}):!0,V=u=>h?h.length:0,le=u=>i.length>0?i[u].filter(p=>p).length:0,{isAuthenticated:H}=he();return b.useEffect(()=>{H||g("/")},[H]),c.jsxs(me,{className:"history_timeline_page",children:[c.jsx(ve,{children:c.jsx("title",{children:"Часопростір"})}),c.jsx(P,{className:"main_title",textAlign:"center",component:"h1",variant:"h3",children:"Часопростір"}),c.jsx(K.VerticalTimeline,{lineColor:o.palette.primary.light,children:l?c.jsx("div",{children:"Loading..."}):e&&e.length>0?e.map((u,p)=>c.jsx($.Fragment,{children:c.jsx(K.VerticalTimelineElement,{dateClassName:"hidden",className:r[p]&&!n[p]?"current_active_vertical_timeline_element":"",iconStyle:{background:o.palette.primary.light,color:m(r[p])},contentStyle:{padding:0,boxShadow:"none"},icon:n[p]?c.jsx(se,{}):c.jsx(oe,{}),children:c.jsx(Te,{elevation:r[p]?4:1,children:c.jsx(Xe,{completedSubtopics:le(p),totalSubtopics:V(),isAllSubtaskDone:j(p),event:u,index:p,buttonState:r[p],handleExpandArticle:y,handleGoToSubArticleTest:_,handleGoToTestNow:T,successLevel:n[p]})})},p+"history-timeline")},p+"TimelineCard")):c.jsx("div",{children:"data not found..."})})]})};export{it as default};
