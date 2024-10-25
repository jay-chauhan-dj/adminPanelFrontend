import{u as z,r as s,s as G,a as L,j as t,b as e,L as J,h as P,D as K,p as Q,g as d}from"./index-b318a832.js";import{_ as M}from"./react-apexcharts.min-0239f2c7.js";const e1=()=>{const x=z(),[a,B]=s.useState({os_x:{},windows:{},linux:{},other:{}}),[i,H]=s.useState({transfer:0,income:0,expance:0}),[j,V]=s.useState([]),[T,Z]=s.useState([{bank:"",banalce:0}]),[S,W]=s.useState([]),[D,_]=s.useState([]),[I,R]=s.useState(0),[O,$]=s.useState(0),[C,v]=s.useState(0),[m,k]=s.useState(0),[u,F]=s.useState(!1);s.useState(!1),s.useState(0);const n={"Content-Type":"application/json",authorization:"Bearer "+localStorage.getItem("accessToken")},U=r=>{const h=new Date(r),f={day:"2-digit",month:"short"},w=h.toLocaleDateString("en-US",f);let c=h.getUTCHours();const g=h.getUTCMinutes().toString().padStart(2,"0"),p=c>=12?"pm":"am";return c=c%12||12,`${w} - ${c}:${g} ${p}`},A=r=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2}).format(r),E=async()=>{u&&C!=m&&(await Q("/v1/updateBankBalance",{newBankBalance:m},{},n),v(m)),k(C),F(!u)};s.useEffect(()=>{const r=async()=>{const l=await d("/v1/dashboard/getVisitorOs",{},n);B(l)},h=async()=>{const l=await d("/v1/dashboard/getVisits",{},n);W(l.map(o=>o.visit_count)),$(l.reduce((o,b)=>o+b.visit_count,0))},f=async()=>{const l=await d("/v1/dashboard/getBotVisits",{},n);_(l.map(o=>o.visit_count)),R(l.reduce((o,b)=>o+b.visit_count,0))},w=async()=>{const l=await d("/v1/money/getBankBalance",{},n);v(l.bankBalance)},c=async()=>{const l=await d("/v1/money/getTransectionSummary",{},n);H(l)},g=async()=>{const l=await d("/v1/money/getRecentTransection",{},n);V(l)},p=async()=>{const l=await d("/v1/money/getBankDetails",{},n);Z(l.bankData)};h(),f(),r(),w(),c(),g(),p(),x(G("Dashboard"))},[x]),L(r=>r.themeConfig.theme==="dark"||r.themeConfig.isDarkMode);const q=L(r=>r.themeConfig.rtlClass)==="rtl",y={series:[{data:S}],options:{chart:{height:58,type:"line",fontFamily:"Nunito, sans-serif",sparkline:{enabled:!0},dropShadow:{enabled:!0,blur:3,color:"#009688",opacity:.4}},stroke:{curve:"smooth",width:2},colors:["#009688"],grid:{padding:{top:5,bottom:5,left:5,right:5}},tooltip:{x:{show:!1},y:{title:{formatter:()=>""}}}}},N={series:[{data:D}],options:{chart:{height:58,type:"line",fontFamily:"Nunito, sans-serif",sparkline:{enabled:!0},dropShadow:{enabled:!0,blur:3,color:"#e2a03f",opacity:.4}},stroke:{curve:"smooth",width:2},colors:["#e2a03f"],grid:{padding:{top:5,bottom:5,left:5,right:5}},tooltip:{x:{show:!1},y:{title:{formatter:()=>""}}}}};return t("div",{children:[t("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[e("li",{children:e(J,{to:"/",className:"text-primary hover:underline",children:"Dashboard"})}),e("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:e("span",{children:"Analytics"})})]}),t("div",{className:"grid gap-6 mb-6",children:[e("div",{className:"pt-5",children:t("div",{className:"panel h-full p-0 border-0 overflow-hidden",children:[t("div",{className:"p-6 bg-gradient-to-r from-[#4361ee] to-[#160f6b] min-h-[190px]",children:[t("div",{className:"flex justify-between items-center mb-6",children:[t("div",{className:"bg-black/50 rounded-full p-1 ltr:pr-3 rtl:pl-3 flex items-center text-white font-semibold",children:[e("img",{className:"w-8 h-8 rounded-full border-2 border-white/50 block object-cover ltr:mr-1 rtl:ml-1",src:"/assets/images/display-pic.jpg",alt:"avatar"}),"Jay Chauhan"]}),e("button",{type:"button",className:"ltr:ml-auto rtl:mr-auto flex items-center justify-between w-9 h-9 bg-black text-white rounded-md hover:opacity-80",onClick:E,children:t("svg",{className:"w-6 h-6 m-auto",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]})})]}),t("div",{className:"text-white flex justify-between items-center",children:[e("p",{className:"text-xl",children:"Wallet Balance"}),e("h5",{className:"ltr:ml-auto rtl:mr-auto text-2xl",children:u?e("input",{type:"text",name:"bankBalance",onChange:P(k),value:m,className:"form-input"}):A(C)})]})]}),t("div",{className:"-mt-12 px-8 grid grid-cols-3 gap-2",children:[t("div",{className:"bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]",children:[t("span",{className:"flex justify-between items-center mb-4 dark:text-white",children:["Received",e("svg",{className:"w-4 h-4 text-success",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 15L12 9L5 15",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),t("div",{className:"btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]",children:["₹",i.income]})]}),t("div",{className:"bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]",children:[t("span",{className:"flex justify-between items-center mb-4 dark:text-white",children:["Transfer",t("svg",{className:"w-4 h-4 text-primary",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M6 8L10.125 4M6 8L10.125 12M6 8L13 8M18 8H16",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),e("path",{d:"M18 16L13.875 12M18 16L13.875 20M18 16L11 16M6 16H8",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})]})]}),t("div",{className:"btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]",children:["₹",i.transfer]})]}),t("div",{className:"bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]",children:[t("span",{className:"flex justify-between items-center mb-4 dark:text-white",children:["Spent",e("svg",{className:"w-4 h-4 text-danger",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),t("div",{className:"btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]",children:["₹",i.expance]})]})]}),e("div",{className:"p-5",children:e("div",{className:"mb-5 space-y-1",children:T.map(r=>t("div",{className:"flex items-center justify-between",children:[e("p",{className:"text-[#515365] font-semibold",children:r.bank}),t("p",{className:"text-base",children:[e("span",{children:"₹"})," ",e("span",{className:"font-semibold",children:r.balance})]})]}))})})]})}),t("div",{className:"grid sm:grid-cols-3 xl:grid-cols-4 gap-6 mb-6",children:[t("div",{className:"panel h-full",children:[e("div",{className:"flex items-center justify-between dark:text-white-light mb-5",children:e("h5",{className:"font-semibold text-lg",children:"Transection Summary"})}),t("div",{className:"space-y-9",children:[t("div",{className:"flex items-center",children:[e("div",{className:"w-9 h-9 ltr:mr-3 rtl:ml-3",children:e("div",{className:"bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light  rounded-full w-9 h-9 grid place-content-center",children:t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M3.74157 18.5545C4.94119 20 7.17389 20 11.6393 20H12.3605C16.8259 20 19.0586 20 20.2582 18.5545M3.74157 18.5545C2.54194 17.1091 2.9534 14.9146 3.77633 10.5257C4.36155 7.40452 4.65416 5.84393 5.76506 4.92196M3.74157 18.5545C3.74156 18.5545 3.74157 18.5545 3.74157 18.5545ZM20.2582 18.5545C21.4578 17.1091 21.0464 14.9146 20.2235 10.5257C19.6382 7.40452 19.3456 5.84393 18.2347 4.92196M20.2582 18.5545C20.2582 18.5545 20.2582 18.5545 20.2582 18.5545ZM18.2347 4.92196C17.1238 4 15.5361 4 12.3605 4H11.6393C8.46374 4 6.87596 4 5.76506 4.92196M18.2347 4.92196C18.2347 4.92196 18.2347 4.92196 18.2347 4.92196ZM5.76506 4.92196C5.76506 4.92196 5.76506 4.92196 5.76506 4.92196Z",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M9.1709 8C9.58273 9.16519 10.694 10 12.0002 10C13.3064 10 14.4177 9.16519 14.8295 8",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})})}),t("div",{className:"flex-1",children:[t("div",{className:"flex font-semibold text-white-dark mb-2",children:[e("h6",{children:"Income"}),t("p",{className:"ltr:ml-auto rtl:mr-auto",children:["₹",i.income]})]}),e("div",{className:"rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow",children:e("div",{className:"bg-gradient-to-r from-[#7579ff] to-[#b224ef] w-full h-full rounded-full",style:{width:i.income*100/i.income+"%"}})})]})]}),t("div",{className:"flex items-center",children:[e("div",{className:"w-9 h-9 ltr:mr-3 rtl:ml-3",children:e("div",{className:"bg-success-light dark:bg-success text-success dark:text-success-light rounded-full w-9 h-9 grid place-content-center",children:t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M4.72848 16.1369C3.18295 14.5914 2.41018 13.8186 2.12264 12.816C1.83509 11.8134 2.08083 10.7485 2.57231 8.61875L2.85574 7.39057C3.26922 5.59881 3.47597 4.70292 4.08944 4.08944C4.70292 3.47597 5.59881 3.26922 7.39057 2.85574L8.61875 2.57231C10.7485 2.08083 11.8134 1.83509 12.816 2.12264C13.8186 2.41018 14.5914 3.18295 16.1369 4.72848L17.9665 6.55812C20.6555 9.24711 22 10.5916 22 12.2623C22 13.933 20.6555 15.2775 17.9665 17.9665C15.2775 20.6555 13.933 22 12.2623 22C10.5916 22 9.24711 20.6555 6.55812 17.9665L4.72848 16.1369Z",stroke:"currentColor",strokeWidth:"1.5"}),e("circle",{opacity:"0.5",cx:"8.60699",cy:"8.87891",r:"2",transform:"rotate(-45 8.60699 8.87891)",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M11.5417 18.5L18.5208 11.5208",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})})}),t("div",{className:"flex-1",children:[t("div",{className:"flex font-semibold text-white-dark mb-2",children:[e("h6",{children:"Internal Trasfer"}),t("p",{className:"ltr:ml-auto rtl:mr-auto",children:["₹",i.transfer]})]}),e("div",{className:"w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow",children:e("div",{className:"bg-gradient-to-r from-[#3cba92] to-[#0ba360] w-full h-full rounded-full",style:{width:i.transfer*100/i.income+"%"}})})]})]}),t("div",{className:"flex items-center",children:[e("div",{className:"w-9 h-9 ltr:mr-3 rtl:ml-3",children:e("div",{className:"bg-warning-light dark:bg-warning text-warning dark:text-warning-light rounded-full w-9 h-9 grid place-content-center",children:t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M10 16H6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M14 16H12.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M2 10L22 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})})}),t("div",{className:"flex-1",children:[t("div",{className:"flex font-semibold text-white-dark mb-2",children:[e("h6",{children:"Expenses"}),t("p",{className:"ltr:ml-auto rtl:mr-auto",children:["₹",i.expance]})]}),e("div",{className:"w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow",children:e("div",{className:"bg-gradient-to-r from-[#f09819] to-[#ff5858] w-full h-full rounded-full",style:{width:i.expance*100/i.income+"%"}})})]})]})]})]}),t("div",{className:"panel h-full",children:[e("div",{className:"flex items-center justify-between dark:text-white-light mb-5",children:e("h5",{className:"font-semibold text-lg",children:"Recent Transactions"})}),e("div",{children:e("div",{className:"space-y-6",children:j.map(r=>t("div",{className:"flex",children:[e("span",{className:"shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light  text-success dark:text-success-light "+(r.transectionType=="1"?"dark:bg-success":r.transectionType=="0"?"dark:bg-warning":"dark:bg-primary"),children:r.transectionType=="1"?e("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.94358 3.25H14.0564C15.8942 3.24998 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33856 22.5969 7.51098C22.6873 8.18385 22.7244 8.9671 22.7395 9.87428C22.7464 9.91516 22.75 9.95716 22.75 10C22.75 10.0353 22.7476 10.0699 22.7429 10.1039C22.75 10.6696 22.75 11.2818 22.75 11.9436V12C22.75 12.4142 22.4142 12.75 22 12.75C21.5858 12.75 21.25 12.4142 21.25 12C21.25 11.5541 21.2499 11.1384 21.248 10.75H2.75199C2.75009 11.1384 2.75 11.5541 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02502 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H14C14.4142 19.25 14.75 19.5858 14.75 20C14.75 20.4142 14.4142 20.75 14 20.75H9.94359C8.10583 20.75 6.65019 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24999 11.2818 1.24999 10.6696 1.25714 10.1039C1.25243 10.0699 1.25 10.0352 1.25 10C1.25 9.95716 1.25359 9.91517 1.26049 9.87429C1.27564 8.96711 1.31267 8.18385 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10582 3.24998 9.94358 3.25ZM2.77607 9.25H21.2239C21.2044 8.66327 21.1701 8.15634 21.1102 7.71085C20.975 6.70476 20.7213 6.12511 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976C4.70476 5.02502 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.82987 8.15634 2.79564 8.66327 2.77607 9.25ZM19 13.25C19.4142 13.25 19.75 13.5858 19.75 14V18.1893L20.4697 17.4697C20.7626 17.1768 21.2374 17.1768 21.5303 17.4697C21.8232 17.7626 21.8232 18.2374 21.5303 18.5303L19.5303 20.5303C19.2374 20.8232 18.7626 20.8232 18.4697 20.5303L16.4697 18.5303C16.1768 18.2374 16.1768 17.7626 16.4697 17.4697C16.7626 17.1768 17.2374 17.1768 17.5303 17.4697L18.25 18.1893V14C18.25 13.5858 18.5858 13.25 19 13.25ZM5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H10C10.4142 15.25 10.75 15.5858 10.75 16C10.75 16.4142 10.4142 16.75 10 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16ZM11.75 16C11.75 15.5858 12.0858 15.25 12.5 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H12.5C12.0858 16.75 11.75 16.4142 11.75 16Z",fill:"#1C274C"})}):r.transectionType=="0"?e("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.94358 3.25H14.0564C15.8942 3.24998 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33856 22.5969 7.51098C22.6873 8.18385 22.7244 8.9671 22.7395 9.87428C22.7464 9.91516 22.75 9.95716 22.75 10C22.75 10.0353 22.7476 10.0699 22.7429 10.1039C22.75 10.6696 22.75 11.2818 22.75 11.9436V12C22.75 12.4142 22.4142 12.75 22 12.75C21.5858 12.75 21.25 12.4142 21.25 12C21.25 11.5541 21.2499 11.1384 21.248 10.75H2.75199C2.75009 11.1384 2.75 11.5541 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02502 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H14C14.4142 19.25 14.75 19.5858 14.75 20C14.75 20.4142 14.4142 20.75 14 20.75H9.94359C8.10583 20.75 6.65019 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24999 11.2818 1.24999 10.6696 1.25714 10.1039C1.25243 10.0699 1.25 10.0352 1.25 10C1.25 9.95716 1.25359 9.91517 1.26049 9.87429C1.27564 8.96711 1.31267 8.18385 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10582 3.24998 9.94358 3.25ZM2.77607 9.25H21.2239C21.2044 8.66327 21.1701 8.15634 21.1102 7.71085C20.975 6.70476 20.7213 6.12511 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976C4.70476 5.02502 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.82987 8.15634 2.79564 8.66327 2.77607 9.25ZM18.4697 13.4697C18.7626 13.1768 19.2374 13.1768 19.5303 13.4697L21.5303 15.4697C21.8232 15.7626 21.8232 16.2374 21.5303 16.5303C21.2374 16.8232 20.7626 16.8232 20.4697 16.5303L19.75 15.8107V20C19.75 20.4142 19.4142 20.75 19 20.75C18.5858 20.75 18.25 20.4142 18.25 20V15.8107L17.5303 16.5303C17.2374 16.8232 16.7626 16.8232 16.4697 16.5303C16.1768 16.2374 16.1768 15.7626 16.4697 15.4697L18.4697 13.4697ZM5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H10C10.4142 15.25 10.75 15.5858 10.75 16C10.75 16.4142 10.4142 16.75 10 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16ZM11.75 16C11.75 15.5858 12.0858 15.25 12.5 15.25H13C13.4142 15.25 13.75 15.5858 13.75 16C13.75 16.4142 13.4142 16.75 13 16.75H12.5C12.0858 16.75 11.75 16.4142 11.75 16Z",fill:"#1C274C"})}):e("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.94358 3.25H14.0564C15.8942 3.24998 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.0368 5.31932 22.374 6.16313 22.5484 7.19112C22.6758 7.94158 22.7222 8.82957 22.7395 9.87437C22.7464 9.91522 22.75 9.95719 22.75 10C22.75 10.0353 22.7476 10.07 22.7428 10.104C22.7464 10.3904 22.7482 10.6882 22.7491 10.9978C22.7503 11.412 22.4155 11.7488 22.0013 11.75C21.5871 11.7512 21.2503 11.4164 21.2491 11.0022C21.2488 10.9168 21.2485 10.8328 21.2481 10.75H2.75199C2.75009 11.1384 2.75 11.5541 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02502 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H11.5C11.9142 19.25 12.25 19.5858 12.25 20C12.25 20.4142 11.9142 20.75 11.5 20.75H9.94359C8.10583 20.75 6.65019 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24999 11.2818 1.24999 10.6696 1.25714 10.1039C1.25243 10.0699 1.25 10.0352 1.25 10C1.25 9.95716 1.25359 9.91517 1.26049 9.87429C1.27564 8.96711 1.31267 8.18385 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10582 3.24998 9.94358 3.25ZM2.77607 9.25H21.2238C21.1999 8.53519 21.1547 7.9438 21.0696 7.44205C20.9267 6.60017 20.6831 6.08692 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976C4.70476 5.02502 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.82987 8.15634 2.79564 8.66327 2.77607 9.25ZM15.5 13.25C15.9142 13.25 16.25 13.5858 16.25 14V18.1893L16.9697 17.4697C17.2626 17.1768 17.7374 17.1768 18.0303 17.4697C18.3232 17.7626 18.3232 18.2374 18.0303 18.5303L16.0303 20.5303C15.7374 20.8232 15.2626 20.8232 14.9697 20.5303L12.9697 18.5303C12.6768 18.2374 12.6768 17.7626 12.9697 17.4697C13.2626 17.1768 13.7374 17.1768 14.0303 17.4697L14.75 18.1893V14C14.75 13.5858 15.0858 13.25 15.5 13.25ZM19.4697 13.4697C19.7626 13.1768 20.2374 13.1768 20.5303 13.4697L22.5303 15.4697C22.8232 15.7626 22.8232 16.2374 22.5303 16.5303C22.2374 16.8232 21.7626 16.8232 21.4697 16.5303L20.75 15.8107V20C20.75 20.4142 20.4142 20.75 20 20.75C19.5858 20.75 19.25 20.4142 19.25 20V15.8107L18.5303 16.5303C18.2374 16.8232 17.7626 16.8232 17.4697 16.5303C17.1768 16.2374 17.1768 15.7626 17.4697 15.4697L19.4697 13.4697ZM5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H10C10.4142 15.25 10.75 15.5858 10.75 16C10.75 16.4142 10.4142 16.75 10 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16Z",fill:"#1C274C"})})}),t("div",{className:"px-3 flex-1",children:[e("div",{children:r.transectionTitle}),e("div",{className:"text-xs text-white-dark dark:text-gray-500",children:U(r.transectionTime)})]}),e("span",{className:"text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre "+(r.transectionType=="1"?"text-success":r.transectionType=="0"?"text-danger":"text-primary"),children:r.transectionAmount})]}))})})]}),t("div",{className:"panel h-full sm:col-span-3 xl:col-span-2",children:[e("div",{className:"flex items-start justify-between mb-5",children:e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Visitors by Browser"})}),t("div",{className:"flex flex-col space-y-5",children:[t("div",{className:"flex items-center",children:[e("div",{className:"w-9 h-9",children:e("div",{className:"bg-primary/10 text-primary rounded-xl w-9 h-9 flex justify-center items-center dark:bg-primary dark:text-white-light",children:t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e("circle",{cx:"12",cy:"12",r:"10"}),e("circle",{opacity:"0.5",cx:"12",cy:"12",r:"4"}),e("line",{opacity:"0.5",x1:"21.17",y1:"8",x2:"12",y2:"8"}),e("line",{opacity:"0.5",x1:"3.95",y1:"6.06",x2:"8.54",y2:"14"}),e("line",{opacity:"0.5",x1:"10.88",y1:"21.94",x2:"15.46",y2:"14"})]})})}),t("div",{className:"px-3 flex-initial w-full",children:[t("div",{className:"w-summary-info flex justify-between font-semibold text-white-dark mb-1",children:[e("h6",{children:"Mac Os"}),t("p",{className:"ltr:ml-auto rtl:mr-auto text-xs",children:[a.os_x.percentage||0,"%"]})]}),e("div",{children:e("div",{className:"w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none",children:e("div",{className:"bg-gradient-to-r from-[#009ffd] to-[#2a2a72] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto",style:{width:(a.os_x.percentage||0)+"%"}})})})]})]}),t("div",{className:"flex items-center",children:[e("div",{className:"w-9 h-9",children:e("div",{className:"bg-danger/10 text-danger rounded-xl w-9 h-9 flex justify-center items-center dark:bg-danger dark:text-white-light",children:t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("circle",{opacity:"0.5",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{d:"M13.024 14.5601C10.7142 15.484 9.5593 15.946 8.89964 15.4977C8.74324 15.3914 8.60834 15.2565 8.50206 15.1001C8.0538 14.4405 8.51575 13.2856 9.43967 10.9758C9.63673 10.4831 9.73527 10.2368 9.90474 10.0435C9.94792 9.99429 9.99429 9.94792 10.0435 9.90474C10.2368 9.73527 10.4831 9.63673 10.9758 9.43966C13.2856 8.51575 14.4405 8.0538 15.1001 8.50206C15.2565 8.60834 15.3914 8.74324 15.4977 8.89964C15.946 9.5593 15.484 10.7142 14.5601 13.024C14.363 13.5166 14.2645 13.763 14.095 13.9562C14.0518 14.0055 14.0055 14.0518 13.9562 14.095C13.763 14.2645 13.5166 14.363 13.024 14.5601Z",stroke:"currentColor",strokeWidth:"1.5"})]})})}),t("div",{className:"px-3 flex-initial w-full",children:[t("div",{className:"w-summary-info flex justify-between font-semibold text-white-dark mb-1",children:[e("h6",{children:"Windows"}),t("p",{className:"ltr:ml-auto rtl:mr-auto text-xs",children:[a.windows.percentage||0,"%"]})]}),e("div",{children:e("div",{className:"w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none",children:e("div",{className:"bg-gradient-to-r from-[#a71d31] to-[#3f0d12] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto",style:{width:(a.windows.percentage||0)+"%"}})})})]})]}),t("div",{className:"flex items-center",children:[e("div",{className:"w-9 h-9",children:e("div",{className:"bg-success/10 text-success rounded-xl w-9 h-9 flex justify-center items-center dark:bg-success dark:text-white-light",children:t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M16.0303 8.46967C15.7374 8.17678 15.2626 8.17678 14.9697 8.46967C14.6768 8.76256 14.6768 9.23744 14.9697 9.53033L15.1412 9.7019C15.8229 10.3836 16.2797 10.8426 16.5753 11.2301C16.8577 11.6002 16.9216 11.8157 16.9216 12C16.9216 12.1843 16.8577 12.3998 16.5753 12.7699C16.2797 13.1574 15.8229 13.6164 15.1412 14.2981L14.9697 14.4697C14.6768 14.7626 14.6768 15.2374 14.9697 15.5303C15.2626 15.8232 15.7374 15.8232 16.0303 15.5303L16.2387 15.322C16.874 14.6867 17.4038 14.1569 17.7678 13.6798C18.1521 13.1762 18.4216 12.6441 18.4216 12C18.4216 11.3559 18.1521 10.8238 17.7678 10.3202C17.4038 9.84307 16.874 9.31331 16.2387 8.67801L16.0303 8.46967Z",fill:"currentColor"}),e("path",{d:"M13.4881 6.4459C13.8882 6.55311 14.1256 6.96436 14.0184 7.36446L11.4302 17.0237C11.323 17.4238 10.9117 17.6613 10.5116 17.5541C10.1115 17.4468 9.8741 17.0356 9.98131 16.6355L12.5695 6.97623C12.6767 6.57614 13.088 6.3387 13.4881 6.4459Z",fill:"currentColor"}),e("path",{d:"M9.03052 8.46967C8.73762 8.17678 8.26275 8.17678 7.96986 8.46967L7.76151 8.67801C7.12618 9.31331 6.59637 9.84307 6.23235 10.3202C5.84811 10.8238 5.57861 11.3559 5.57861 12C5.57861 12.6441 5.84811 13.1762 6.23235 13.6798C6.59637 14.1569 7.12616 14.6867 7.7615 15.322L7.96986 15.5303C8.26275 15.8232 8.73762 15.8232 9.03052 15.5303C9.32341 15.2374 9.32341 14.7626 9.03052 14.4697L8.85894 14.2981C8.17729 13.6164 7.72052 13.1574 7.42488 12.7699C7.14245 12.3998 7.07861 12.1843 7.07861 12C7.07861 11.8157 7.14245 11.6002 7.42488 11.2301C7.72052 10.8426 8.17729 10.3836 8.85894 9.7019L9.03052 9.53033C9.32341 9.23744 9.32341 8.76256 9.03052 8.46967Z",fill:"currentColor"}),e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z",fill:"currentColor"})]})})}),t("div",{className:"px-3 flex-initial w-full",children:[t("div",{className:"w-summary-info flex justify-between font-semibold text-white-dark mb-1",children:[e("h6",{children:"Linux"}),t("p",{className:"ltr:ml-auto rtl:mr-auto text-xs",children:[a.linux.percentage||0,"%"]})]}),e("div",{children:e("div",{className:"w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none",children:e("div",{className:"bg-gradient-to-r from-[#006a3d] to-[#00ab55] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto",style:{width:(a.linux.percentage||0)+"%"}})})})]})]}),t("div",{className:"flex items-center",children:[e("div",{className:"w-9 h-9",children:e("div",{className:"bg-warning/10 text-warning rounded-xl w-9 h-9 flex justify-center items-center dark:bg-warning dark:text-white-light",children:t("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{opacity:"0.5",d:"M2 12H22M16 12C16 13.3132 15.8965 14.6136 15.6955 15.8268C15.4945 17.0401 15.1999 18.1425 14.8284 19.0711C14.457 19.9997 14.016 20.7362 13.5307 21.2388C13.0454 21.7413 12.5253 22 12 22C11.4747 22 10.9546 21.7413 10.4693 21.2388C9.98396 20.7362 9.54301 19.9997 9.17157 19.0711C8.80014 18.1425 8.5055 17.0401 8.30448 15.8268C8.10346 14.6136 8 13.3132 8 12C8 10.6868 8.10346 9.38642 8.30448 8.17316C8.5055 6.95991 8.80014 5.85752 9.17157 4.92893C9.54301 4.00035 9.98396 3.26375 10.4693 2.7612C10.9546 2.25866 11.4747 2 12 2C12.5253 2 13.0454 2.25866 13.5307 2.76121C14.016 3.26375 14.457 4.00035 14.8284 4.92893C15.1999 5.85752 15.4945 6.95991 15.6955 8.17317C15.8965 9.38642 16 10.6868 16 12Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.76121 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L22 12Z",stroke:"currentColor",strokeWidth:"1.5"})]})})}),t("div",{className:"px-3 flex-initial w-full",children:[t("div",{className:"w-summary-info flex justify-between font-semibold text-white-dark mb-1",children:[e("h6",{children:"Others"}),t("p",{className:"ltr:ml-auto rtl:mr-auto text-xs",children:[a.other.percentage||0,"%"]})]}),e("div",{children:e("div",{className:"w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none",children:e("div",{className:"bg-gradient-to-r from-[#fe5f75] to-[#fc9842] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto",style:{width:(a.other.percentage||0)+"%"}})})})]})]})]})]})]}),e("div",{className:"grid sm:grid-cols-1 lg:grid-cols-1 gap-6 mb-6",children:t("div",{className:"panel h-full sm:col-span-2 lg:col-span-1",children:[t("div",{className:"flex justify-between dark:text-white-light mb-5",children:[e("h5",{className:"font-semibold text-lg ",children:"Statistics"}),e("div",{className:"dropdown",children:e(K,{offset:[0,5],placement:`${q?"bottom-start":"bottom-end"}`,btnClassName:"hover:text-primary",button:t("svg",{className:"w-5 h-5 text-black/70 dark:text-white/70 hover:!text-primary",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("circle",{cx:"5",cy:"12",r:"2",stroke:"currentColor",strokeWidth:"1.5"}),e("circle",{opacity:"0.5",cx:"12",cy:"12",r:"2",stroke:"currentColor",strokeWidth:"1.5"}),e("circle",{cx:"19",cy:"12",r:"2",stroke:"currentColor",strokeWidth:"1.5"})]}),children:t("ul",{children:[e("li",{children:e("button",{type:"button",children:"This Week"})}),e("li",{children:e("button",{type:"button",children:"Last Week"})}),e("li",{children:e("button",{type:"button",children:"This Month"})}),e("li",{children:e("button",{type:"button",children:"Last Month"})})]})})})]}),t("div",{className:"grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold",children:[t("div",{children:[t("div",{children:[e("div",{children:"Total Visits"}),e("div",{className:"text-[#f8538d] text-lg",children:O})]}),e(M,{series:y.series,options:y.options,type:"line",height:58,className:"overflow-hidden"})]}),t("div",{children:[t("div",{children:[e("div",{children:"Bot Visits"}),e("div",{className:"text-[#f8538d] text-lg",children:I})]}),e(M,{series:N.series,options:N.options,type:"line",height:58,className:"overflow-hidden"})]})]})]})})]})]})};export{e1 as default};