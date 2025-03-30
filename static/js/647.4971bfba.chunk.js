"use strict";(self.webpackChunkvolunteernow_web=self.webpackChunkvolunteernow_web||[]).push([[647],{2110:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(8168),o=n(8587),a=n(5043),s=n(8387),i=n(8610),l=n(4535),c=n(8206),d=n(3336),u=n(2532),p=n(2372);function m(e){return(0,p.Ay)("MuiCard",e)}(0,u.A)("MuiCard",["root"]);var x=n(579);const h=["className","raised"],A=(0,l.Ay)(d.A,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),v=a.forwardRef((function(e,t){const n=(0,c.b)({props:e,name:"MuiCard"}),{className:a,raised:l=!1}=n,d=(0,o.A)(n,h),u=(0,r.A)({},n,{raised:l}),p=(e=>{const{classes:t}=e;return(0,i.A)({root:["root"]},m,t)})(u);return(0,x.jsx)(A,(0,r.A)({className:(0,s.A)(p.root,a),elevation:l?8:void 0,ref:t,ownerState:u},d))}))},3647:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var r=n(5043),o=n(9252),a=n(6446),s=n(5865),i=n(1906),l=n(8911),c=n(2110),d=n(6494),u=n(7392),p=n(3845),m=n(1081),x=n(6600),h=n(5316),A=n(8155),v=n(9347),f=n(9662),g=n(579);const j=(0,f.A)((0,g.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add");var y=n(3768),b=n(8666),k=n(8472);const C=()=>{const[e,t]=(0,r.useState)([]),[n,f]=(0,r.useState)(!1),[C,D]=(0,r.useState)({organization:"",role:"",startDate:null,endDate:null,description:"",skills:[]}),[w,S]=(0,r.useState)("");(0,r.useEffect)((()=>{M()}),[]);const M=async()=>{try{const e=await k.yW.getUserExperience();t(e)}catch(e){console.error("Failed to load experiences:",e)}},R=()=>{f(!1),D({organization:"",role:"",startDate:null,endDate:null,description:"",skills:[]}),S("")};return(0,g.jsxs)(o.A,{maxWidth:"md",sx:{py:4},children:[(0,g.jsxs)(a.A,{sx:{mb:4,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsx)(s.A,{variant:"h4",component:"h1",children:"My Experience"}),(0,g.jsx)(i.A,{variant:"contained",startIcon:(0,g.jsx)(j,{}),onClick:()=>f(!0),children:"Add Experience"})]}),(0,g.jsx)(l.A,{spacing:2,children:e.map((e=>(0,g.jsx)(c.A,{children:(0,g.jsxs)(d.A,{children:[(0,g.jsxs)(a.A,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,g.jsxs)(a.A,{children:[(0,g.jsx)(s.A,{variant:"h6",gutterBottom:!0,children:e.role}),(0,g.jsx)(s.A,{variant:"subtitle1",color:"text.secondary",gutterBottom:!0,children:e.organization}),(0,g.jsxs)(s.A,{variant:"body2",color:"text.secondary",gutterBottom:!0,children:[new Date(e.startDate).toLocaleDateString()," -",e.endDate?new Date(e.endDate).toLocaleDateString():"Present"]})]}),(0,g.jsx)(u.A,{onClick:()=>(async e=>{try{await k.yW.deleteExperience(e),M()}catch(t){console.error("Failed to delete experience:",t)}})(e.id),color:"error",size:"small",children:(0,g.jsx)(y.A,{})})]}),(0,g.jsx)(s.A,{variant:"body1",paragraph:!0,children:e.description}),(0,g.jsx)(a.A,{sx:{mt:1},children:e.skills.map((e=>(0,g.jsx)(p.A,{label:e,size:"small",sx:{mr:1,mb:1}},e)))})]})},e.id)))}),(0,g.jsxs)(m.A,{open:n,onClose:R,maxWidth:"sm",fullWidth:!0,PaperProps:{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"90%",maxWidth:"600px",m:0,p:2,borderRadius:2}},children:[(0,g.jsx)(x.A,{children:"Add New Experience"}),(0,g.jsx)(h.A,{children:(0,g.jsxs)(a.A,{sx:{mt:2},children:[(0,g.jsx)(A.A,{fullWidth:!0,label:"Organization",value:C.organization,onChange:e=>D((t=>({...t,organization:e.target.value}))),margin:"normal"}),(0,g.jsx)(A.A,{fullWidth:!0,label:"Role",value:C.role,onChange:e=>D((t=>({...t,role:e.target.value}))),margin:"normal"}),(0,g.jsxs)(a.A,{sx:{mt:2,mb:2},children:[(0,g.jsx)(b.l,{label:"Start Date",value:C.startDate,onChange:e=>D((t=>({...t,startDate:e})))}),(0,g.jsx)(a.A,{sx:{display:"inline-block",ml:2},children:(0,g.jsx)(b.l,{label:"End Date",value:C.endDate,onChange:e=>D((t=>({...t,endDate:e})))})})]}),(0,g.jsx)(A.A,{fullWidth:!0,label:"Description",multiline:!0,rows:4,value:C.description,onChange:e=>D((t=>({...t,description:e.target.value}))),margin:"normal"}),(0,g.jsx)(A.A,{fullWidth:!0,label:"Add Skills (Press Enter)",value:w,onChange:e=>S(e.target.value),onKeyPress:e=>{"Enter"===e.key&&w.trim()&&(e.preventDefault(),D((e=>({...e,skills:[...e.skills,w.trim()]}))),S(""))},margin:"normal",helperText:"Press Enter to add a skill"}),(0,g.jsx)(a.A,{sx:{mt:1},children:C.skills.map((e=>(0,g.jsx)(p.A,{label:e,onDelete:()=>{return t=e,void D((e=>({...e,skills:e.skills.filter((e=>e!==t))})));var t},size:"small",sx:{mr:1,mb:1}},e)))})]})}),(0,g.jsxs)(v.A,{children:[(0,g.jsx)(i.A,{onClick:R,children:"Cancel"}),(0,g.jsx)(i.A,{onClick:async()=>{try{if(!C.organization||!C.role||!C.startDate)return;await k.yW.addExperience({title:C.role,description:C.description,date:C.startDate.toISOString(),skills:C.skills,impact:C.description,startDate:C.startDate,endDate:C.endDate||void 0,organization:C.organization,role:C.role}),R(),M()}catch(e){console.error("Failed to add experience:",e)}},variant:"contained",children:"Add Experience"})]})]})]})}},3768:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(9662),o=n(579);const a=(0,r.A)((0,o.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete")},6494:(e,t,n)=>{n.d(t,{A:()=>A});var r=n(8168),o=n(8587),a=n(5043),s=n(8387),i=n(8610),l=n(4535),c=n(8206),d=n(2532),u=n(2372);function p(e){return(0,u.Ay)("MuiCardContent",e)}(0,d.A)("MuiCardContent",["root"]);var m=n(579);const x=["className","component"],h=(0,l.Ay)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),A=a.forwardRef((function(e,t){const n=(0,c.b)({props:e,name:"MuiCardContent"}),{className:a,component:l="div"}=n,d=(0,o.A)(n,x),u=(0,r.A)({},n,{component:l}),A=(e=>{const{classes:t}=e;return(0,i.A)({root:["root"]},p,t)})(u);return(0,m.jsx)(h,(0,r.A)({as:l,className:(0,s.A)(A.root,a),ownerState:u,ref:t},d))}))},6600:(e,t,n)=>{n.d(t,{A:()=>A});var r=n(8168),o=n(8587),a=n(5043),s=n(8387),i=n(8610),l=n(5865),c=n(4535),d=n(8206),u=n(7034),p=n(2563),m=n(579);const x=["className","id"],h=(0,c.Ay)(l.A,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),A=a.forwardRef((function(e,t){const n=(0,d.b)({props:e,name:"MuiDialogTitle"}),{className:l,id:c}=n,A=(0,o.A)(n,x),v=n,f=(e=>{const{classes:t}=e;return(0,i.A)({root:["root"]},u.t,t)})(v),{titleId:g=c}=a.useContext(p.A);return(0,m.jsx)(h,(0,r.A)({component:"h2",className:(0,s.A)(f.root,l),ownerState:v,ref:t,variant:"h6",id:null!=c?c:g},A))}))},8911:(e,t,n)=>{n.d(t,{A:()=>w});var r=n(8587),o=n(8168),a=n(5043),s=n(8387),i=n(9172),l=n(2372),c=n(8610),d=n(6060),u=n(2900),p=n(8698),m=n(8280),x=n(9751),h=n(8604),A=n(579);const v=["component","direction","spacing","divider","children","className","useFlexGap"],f=(0,m.A)(),g=(0,d.A)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function j(e){return(0,u.A)({props:e,name:"MuiStack",defaultTheme:f})}function y(e,t){const n=a.Children.toArray(e).filter(Boolean);return n.reduce(((e,r,o)=>(e.push(r),o<n.length-1&&e.push(a.cloneElement(t,{key:`separator-${o}`})),e)),[])}const b=e=>{let{ownerState:t,theme:n}=e,r=(0,o.A)({display:"flex",flexDirection:"column"},(0,x.NI)({theme:n},(0,x.kW)({values:t.direction,breakpoints:n.breakpoints.values}),(e=>({flexDirection:e}))));if(t.spacing){const e=(0,h.LX)(n),o=Object.keys(n.breakpoints.values).reduce(((e,n)=>(("object"===typeof t.spacing&&null!=t.spacing[n]||"object"===typeof t.direction&&null!=t.direction[n])&&(e[n]=!0),e)),{}),a=(0,x.kW)({values:t.direction,base:o}),s=(0,x.kW)({values:t.spacing,base:o});"object"===typeof a&&Object.keys(a).forEach(((e,t,n)=>{if(!a[e]){const r=t>0?a[n[t-1]]:"column";a[e]=r}}));const l=(n,r)=>{return t.useFlexGap?{gap:(0,h._W)(e,n)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${o=r?a[r]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[o]}`]:(0,h._W)(e,n)}};var o};r=(0,i.A)(r,(0,x.NI)({theme:n},s,l))}return r=(0,x.iZ)(n.breakpoints,r),r};var k=n(4535),C=n(8206);const D=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=g,useThemeProps:n=j,componentName:i="MuiStack"}=e,d=t(b),u=a.forwardRef((function(e,t){const a=n(e),u=(0,p.A)(a),{component:m="div",direction:x="column",spacing:h=0,divider:f,children:g,className:j,useFlexGap:b=!1}=u,k=(0,r.A)(u,v),C={direction:x,spacing:h,useFlexGap:b},D=(0,c.A)({root:["root"]},(e=>(0,l.Ay)(i,e)),{});return(0,A.jsx)(d,(0,o.A)({as:m,ownerState:C,ref:t,className:(0,s.A)(D.root,j)},k,{children:f?y(g,f):g}))}));return u}({createStyledComponent:(0,k.Ay)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,C.b)({props:e,name:"MuiStack"})}),w=D}}]);
//# sourceMappingURL=647.4971bfba.chunk.js.map