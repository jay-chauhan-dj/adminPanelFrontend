import{u as P,r as a,s as $,j as r,b as e,L as V}from"./index-64c412fa.js";import{d as l}from"./index-cbe13e22.js";const d=[{id:1,text:"Need to be approved",name:"Kelly Young"},{id:2,text:"Meeting with client",name:"Andy King"},{id:3,text:"Project Detail",name:"Judy Holmes"},{id:4,text:"Edited Post Apporval",name:"Vincent Carpenter"},{id:5,text:"Project Lead Pickup",name:"Mary McDonald"}],s=[{id:6,text:"Need to be approved",name:"Kelly Young"},{id:7,text:"Meeting with client",name:"Andy King"},{id:8,text:"Project Detail",name:"Judy Holmes"},{id:9,text:"Edited Post Apporval",name:"Vincent Carpenter"},{id:10,text:"Project Lead Pickup",name:"Mary McDonald"}],A=[{id:2,text:"Meeting with client",name:"Andy King"},{id:1,text:"Need to be approved",name:"Kelly Young"},{id:3,text:"Project Detail",name:"Judy Holmes"},{id:4,text:"Edited Post Apporval",name:"Vincent Carpenter"}],E=[{id:1,name:"Item 1"},{id:2,name:"Item 2"},{id:3,name:"Item 3"},{id:4,name:"Item 4"},{id:5,name:"Item 5"},{id:6,name:"Item 6"},{id:7,name:"Item 7"},{id:8,name:"Item 8"},{id:9,name:"Item 9"},{id:10,name:"Item 10"},{id:11,name:"Item 11"},{id:12,name:"Item 12"}],W=()=>{const k=P();a.useEffect(()=>{k($("Drag & Drop"))});const[o,y]=a.useState(d),[h,C]=a.useState(s),[x,j]=a.useState(d),[g,L]=a.useState(s),[b,S]=a.useState(d),[p,D]=a.useState(s),[f,I]=a.useState(A),[i,u]=a.useState(d),[c,v]=a.useState(s),[N,M]=a.useState(E),[w,R]=a.useState([...d,...s]);return r("div",{children:[r("ul",{className:"flex space-x-2 rtl:space-x-reverse mb-6",children:[e("li",{children:e(V,{to:"#",className:"text-primary hover:underline",children:"Dashboard"})}),e("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:e("span",{children:"Drag & Drop"})})]}),r("div",{className:"dragndrop space-y-8",children:[r("div",{className:"panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap",children:[e("div",{className:"ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3",children:r("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),e("span",{className:"ltr:mr-3 rtl:ml-3",children:"Documentation: "}),e("a",{href:"https://www.npmjs.com/package/react-sortablejs",target:"_blank",className:"block hover:underline",rel:"noreferrer",children:"https://www.npmjs.com/package/react-sortablejs"})]}),r("div",{className:"panel",children:[e("div",{className:"font-semibold text-lg mb-5",children:"Sortable"}),r("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-x-12",children:[e("div",{children:e("ul",{id:"example1",children:e(l.ReactSortable,{list:o,setList:y,animation:200,delay:2,ghostClass:"gu-transit",group:"shared",children:o.map(t=>e("li",{className:"mb-2.5 cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full mx-auto"})}),r("div",{className:"flex md:flex-row flex-col justify-between items-center flex-1",children:[r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]}),e("div",{children:e("button",{type:"button",className:"btn btn-secondary btn-sm px-5 py-2",children:"View"})})]})]})},t.id))})})}),e("div",{children:e("ul",{id:"example2",children:e(l.ReactSortable,{list:h,setList:C,animation:200,delay:2,ghostClass:"gu-transit",group:"shared",children:h.map(t=>e("li",{className:"mb-2.5 cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full mx-auto"})}),r("div",{className:"flex md:flex-row flex-col justify-between items-center flex-1",children:[r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]}),e("div",{children:e("button",{type:"button",className:"btn btn-secondary btn-sm px-5 py-2",children:"View"})})]})]})},t.id))})})})]})]}),r("div",{className:"panel",children:[e("div",{className:"font-semibold text-lg dark:text-white mb-5",children:"Icon Change"}),r("div",{className:"icon-change grid grid-cols-1 sm:grid-cols-2 gap-x-12",children:[e("div",{children:e("ul",{id:"example3",className:"left",children:e(l.ReactSortable,{list:x,setList:j,animation:200,ghostClass:"gu-transit",group:"icon",children:x.map(t=>e("li",{className:"mb-2.5 cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full"})}),r("div",{className:"flex justify-between items-center flex-1",children:[r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]}),e("div",{className:"text-white-dark",children:e("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z",stroke:"currentColor",strokeWidth:"1.5"})})})]})]})},t.id))})})}),e("div",{children:e("ul",{id:"example4",className:"right",children:e(l.ReactSortable,{list:g,setList:L,animation:200,ghostClass:"gu-transit",group:"icon",children:g.map(t=>e("li",{className:"mb-2.5 cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full"})}),r("div",{className:"flex justify-between items-center flex-1",children:[r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]}),e("div",{className:"text-white-dark",children:r("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",children:[e("path",{d:"M12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M12 5.50063C16.4998 0.825464 22 4.27416 22 9.1371C22 14 17.9806 16.5914 15.0383 18.9109C14 19.7294 13 20.5 12 20.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})})]})]})},t.id))})})})]})]}),r("div",{className:"panel",children:[e("div",{className:"font-semibold text-lg dark:text-white mb-5",children:"Handler"}),r("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-x-12",children:[e("div",{children:e("ul",{id:"example5",children:e(l.ReactSortable,{list:b,setList:S,animation:200,handle:".handle",group:"handler",ghostClass:"gu-transit",children:b.map(t=>e("li",{className:"mb-2.5 cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full mx-auto"})}),r("div",{className:"flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left",children:[r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]}),e("div",{className:"text-white-dark",children:e("span",{className:"handle px-2 ltr:mr-1 rtl:ml-1 bg-[#ebedf2] dark:bg-black rounded cursor-move",children:"+"})})]})]})},t.id))})})}),e("div",{children:e("ul",{id:"example6",children:e(l.ReactSortable,{list:p,setList:D,animation:200,handle:".handle",group:"handler",ghostClass:"gu-transit",children:p.map(t=>e("li",{className:"mb-2.5 cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full mx-auto"})}),r("div",{className:"sm:flex block justify-between items-center flex-1 text-center md:text-left",children:[r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]}),e("div",{className:"text-white-dark",children:e("span",{className:"handle px-2 ltr:mr-1 rtl:ml-1 bg-[#ebedf2] dark:bg-black rounded cursor-move",children:"+"})})]})]})},t.id))})})})]})]}),r("div",{className:"panel",children:[e("div",{className:"font-semibold text-lg dark:text-white mb-5",children:"News Feed"}),e("div",{children:e("div",{id:"example12",children:e(l.ReactSortable,{list:f,setList:I,animation:200,className:"grid grid-cols-1 sm:grid-cols-2 gap-x-12",children:f.map(t=>e("div",{className:"mb-2.5",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5",children:[r("div",{className:"py-sm-2.5 sm:flex block ltr:md:text-left rtl:md:text-right text-center items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id+1}.jpeg`,className:"w-11 h-11 rounded-lg mx-auto"})}),e("div",{className:"flex md:flex-row flex-col justify-between items-center flex-1",children:r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.name}),e("div",{className:"text-white-dark text-xs",children:"11 hours ago"})]})})]}),e("div",{className:"py-5 border-b border-b-[#f1f2f3] dark:border-b-dark mb-4",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}),r("div",{className:"md:flex items-center flex-wrap",children:[e("div",{className:"ltr:md:text-left rtl:md:text-right text-center xl:flex-1",children:r("div",{className:"flex md:justify-start justify-center -space-x-2 rtl:space-x-reverse text-white",children:[e("img",{className:"w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white-dark",src:"/assets/images/profile-6.jpeg",alt:"avatar"}),e("img",{className:"w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white-dark",src:"/assets/images/profile-7.jpeg",alt:"avatar"}),e("img",{className:"w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white-dark",src:"/assets/images/profile-8.jpeg",alt:"avatar"}),e("img",{className:"w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white-dark",src:"/assets/images/profile-10.jpeg",alt:"avatar"})]})}),e("div",{className:"ltr:md:text-right rtl:md:text-left text-center",children:r("span",{className:"text-xs text-white-dark lg:pt-0 pt-2 block",children:[e("button",{className:"text-danger dark:text-primary font-semibold text-sm mr-1",children:"Vincent, Mary"}),"and 19 other like this"]})})]})]})},t.id))})})})]}),r("div",{className:"panel",children:[e("div",{className:"font-semibold text-lg dark:text-white mb-5",children:"Delete User"}),r("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-x-12",children:[e("div",{children:e("ul",{id:"example7",children:e(l.ReactSortable,{list:i,setList:u,animation:200,group:"delete",removeOnSpill:!0,onSpill:t=>{const n=i[t.oldIndex];u(i.filter(m=>m!==n))},className:"min-h-[200px]",children:i.map(t=>e("li",{className:"mb-2.5 cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full mx-auto"})}),e("div",{className:"flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left",children:r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]})})]})},t.id))})})}),e("div",{children:e("ul",{id:"example8",children:e(l.ReactSortable,{list:c,setList:v,animation:200,group:"delete",removeOnSpill:!0,onSpill:t=>{const n=c[t.oldIndex];v(c.filter(m=>m!==n))},className:"min-h-[200px]",children:c.map(t=>e("li",{className:"mb-2.5 cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full mx-auto"})}),e("div",{className:"flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left",children:r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]})})]})},t.id))})})})]})]}),e("div",{className:"dragndrop space-y-8",children:r("div",{className:"panel",children:[e("div",{className:"font-semibold text-lg dark:text-white mb-5",children:"Grid drag"}),e("div",{id:"example11",children:e(l.ReactSortable,{list:N,setList:M,animation:200,className:"grid grid-cols-2 xs sm:grid-cols-4 md:grid-cols-8 gap-8 place-items-center",children:N.map(t=>e("div",{className:"w-24 h-24 border border-white-light rounded-md shadow dark:border-dark flex items-center justify-center font-semibold cursor-grab",children:t.name},t.id))})})]})}),r("div",{className:"panel",children:[e("div",{className:"font-semibold text-lg dark:text-white mb-5",children:"Swap"}),e("div",{children:e("div",{children:e("ul",{id:"example7",children:e(l.ReactSortable,{list:w,setList:R,animation:200,swap:!0,swapThreshold:1,className:"grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2.5",children:w.map(t=>e("li",{className:" cursor-grab",children:r("div",{className:"bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center",children:[e("div",{className:"ltr:sm:mr-4 rtl:sm:ml-4",children:e("img",{alt:"avatar",src:`/assets/images/profile-${t.id}.jpeg`,className:"w-11 h-11 rounded-full mx-auto"})}),e("div",{className:"flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left",children:r("div",{className:"font-semibold md:my-0 my-3",children:[e("div",{className:"text-dark dark:text-[#bfc9d4] text-base",children:t.text}),e("div",{className:"text-white-dark text-xs",children:t.name})]})})]})},t.id))})})})})]})]})]})};export{W as default};