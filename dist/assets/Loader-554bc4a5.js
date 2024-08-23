import{u as c,r as t,s as b,j as n,b as e,L as u}from"./index-4f880644.js";import{C as r}from"./Highlight-5e950ddf.js";const f=()=>{const d=c();t.useEffect(()=>{d(b("Loader"))});const[l,s]=t.useState([]),a=i=>{l.includes(i)?s(o=>o.filter(m=>m!==i)):s([...l,i])};return n("div",{children:[n("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[e("li",{children:e(u,{to:"#",className:"text-primary hover:underline",children:"Elements"})}),e("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:e("span",{children:"Loader"})})]}),n("div",{className:"pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6",children:[n("div",{className:"panel",id:"with_buttons",children:[n("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Loaders with Buttons"}),e("button",{onClick:()=>{a("code1")},className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:n("span",{className:"flex items-center",children:[n("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:n("div",{className:"flex flex-wrap items-center justify-center w-full gap-4",children:[n("button",{type:"button",className:"btn btn-info btn-lg shrink-0",children:[n("svg",{viewBox:"0 0 24 24",width:"24",height:"24",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5 animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2",children:[e("line",{x1:"12",y1:"2",x2:"12",y2:"6"}),e("line",{x1:"12",y1:"18",x2:"12",y2:"22"}),e("line",{x1:"4.93",y1:"4.93",x2:"7.76",y2:"7.76"}),e("line",{x1:"16.24",y1:"16.24",x2:"19.07",y2:"19.07"}),e("line",{x1:"2",y1:"12",x2:"6",y2:"12"}),e("line",{x1:"18",y1:"12",x2:"22",y2:"12"}),e("line",{x1:"4.93",y1:"19.07",x2:"7.76",y2:"16.24"}),e("line",{x1:"16.24",y1:"7.76",x2:"19.07",y2:"4.93"})]}),"Loading"]}),n("button",{type:"button",className:"btn btn-danger btn-lg",children:[e("span",{className:"animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle shrink-0"}),"Loading"]}),n("button",{type:"button",className:"btn btn-secondary btn-lg",children:[e("span",{className:"animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 inline-block rounded-full bg-white shrink-0"}),"Loading"]})]})}),l.includes("code1")&&e(r,{children:e("pre",{className:"language-xml",children:`<button type="button" className="btn btn-info btn-lg">
    <svg>...</svg>
    Loading
</button>

<button type="button" className="btn btn-danger btn-lg">
    <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
    Loading
</button>

<button type="button" className="btn btn-secondary btn-lg">
    <span className="animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 inline-block rounded-full bg-white"></span>
    Loading
</button>`})})]}),n("div",{className:"panel",id:"positions",children:[n("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Position"}),e("button",{onClick:()=>{a("code2")},className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:n("span",{className:"flex items-center",children:[n("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:n("div",{className:"flex flex-wrap w-full",children:[n("div",{className:"flex flex-wrap items-center justify-center w-full sm:w-1/2 text-center mb-3 sm:mb-0",children:[e("p",{className:"w-full mb-2",children:"Default Button"}),n("button",{type:"button",className:"btn btn-primary btn-lg",children:[n("svg",{viewBox:"0 0 24 24",width:"24",height:"24",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5 animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0",children:[e("line",{x1:"12",y1:"2",x2:"12",y2:"6"}),e("line",{x1:"12",y1:"18",x2:"12",y2:"22"}),e("line",{x1:"4.93",y1:"4.93",x2:"7.76",y2:"7.76"}),e("line",{x1:"16.24",y1:"16.24",x2:"19.07",y2:"19.07"}),e("line",{x1:"2",y1:"12",x2:"6",y2:"12"}),e("line",{x1:"18",y1:"12",x2:"22",y2:"12"}),e("line",{x1:"4.93",y1:"19.07",x2:"7.76",y2:"16.24"}),e("line",{x1:"16.24",y1:"7.76",x2:"19.07",y2:"4.93"})]}),"Loading"]})]}),n("div",{className:"flex flex-wrap items-center justify-center w-full sm:w-1/2 text-center",children:[e("p",{className:"w-full mb-2",children:"Outline Button"}),n("button",{type:"button",className:"btn btn-outline-primary btn-lg",children:["Loading",n("svg",{viewBox:"0 0 24 24",width:"24",height:"24",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5 animate-[spin_2s_linear_infinite] inline-block align-middle rtl:mr-2 ltr:ml-2 shrink-0",children:[e("line",{x1:"12",y1:"2",x2:"12",y2:"6"}),e("line",{x1:"12",y1:"18",x2:"12",y2:"22"}),e("line",{x1:"4.93",y1:"4.93",x2:"7.76",y2:"7.76"}),e("line",{x1:"16.24",y1:"16.24",x2:"19.07",y2:"19.07"}),e("line",{x1:"2",y1:"12",x2:"6",y2:"12"}),e("line",{x1:"18",y1:"12",x2:"22",y2:"12"}),e("line",{x1:"4.93",y1:"19.07",x2:"7.76",y2:"16.24"}),e("line",{x1:"16.24",y1:"7.76",x2:"19.07",y2:"4.93"})]})]})]})]})}),l.includes("code2")&&e(r,{children:e("pre",{className:"language-xml",children:`<div className="flex flex-wrap items-center justify-center w-full sm:w-1/2 text-center mb-3 sm:mb-0">
    <p className="w-full mb-2">Default Button</p>
    <button type="button" className="btn btn-primary btn-lg">
        <svg>...</svg>
        Loading
    </button>
</div>
<div className="flex flex-wrap items-center justify-center w-full sm:w-1/2 text-center">
    <p className="w-full mb-2">Outline Button</p>
    <button type="button" className="btn btn-outline-primary btn-lg">
        Loading
        <svg>...</svg>
    </button>
</div>`})})]}),n("div",{className:"panel",id:"sizes",children:[n("div",{className:"flex items-center justify-between mb-10",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Sizes"}),e("button",{onClick:()=>{a("code3")},className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:n("span",{className:"flex items-center",children:[n("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:n("div",{className:"grid grid-cols-3 w-full gap-4",children:[e("span",{className:"animate-spin border-4 border-success border-l-transparent rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-success border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-transparent border-l-primary rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-[3px] border-transparent border-l-primary rounded-full w-6 h-6 inline-block align-middle m-auto mb-10"}),e("span",{className:"w-5 h-5 m-auto mb-10",children:e("span",{className:"animate-ping inline-flex h-full w-full rounded-full bg-info"})}),e("span",{className:"w-4 h-4 m-auto mb-10",children:e("span",{className:"animate-ping inline-flex h-full w-full rounded-full bg-info"})}),e("span",{className:"w-3 h-3 m-auto mb-10",children:e("span",{className:"animate-ping inline-flex h-full w-full rounded-full bg-info"})})]})}),l.includes("code3")&&e(r,{children:e("pre",{className:"language-xml",children:`<span className="animate-spin border-4 border-success border-l-transparent rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-success border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-[3px] border-transparent border-l-primary rounded-full w-6 h-6 inline-block align-middle m-auto mb-10"></span>

<span className="w-5 h-5 m-auto mb-10">
    <span className="animate-ping inline-flex h-full w-full rounded-full bg-info"></span>
</span>

<span className="w-4 h-4 m-auto mb-10">
    <span className="animate-ping inline-flex h-full w-full rounded-full bg-info"></span>
</span>

<span className="w-3 h-3 m-auto mb-10">
    <span className="animate-ping inline-flex h-full w-full rounded-full bg-info"></span>
</span>`})})]}),n("div",{className:"panel",id:"colors",children:[n("div",{className:"flex items-center justify-between mb-10",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Colors"}),e("button",{onClick:()=>{a("code4")},className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:n("span",{className:"flex items-center",children:[n("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:n("div",{className:"grid grid-cols-4 w-full gap-4",children:[e("span",{className:"animate-spin border-4 border-success border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-danger border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-warning border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-transparent border-l-black rounded-full w-10 h-10 inline-block align-middle m-auto mb-10 dark:border-l-dark"}),e("span",{className:"animate-spin border-4 border-transparent border-l-danger rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-transparent border-l-warning rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-spin border-4 border-transparent border-l-primary rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"}),e("span",{className:"w-4 h-4 m-auto mb-10",children:e("span",{className:"animate-ping inline-flex h-full w-full rounded-full bg-info"})}),e("span",{className:"w-4 h-4 m-auto mb-10",children:e("span",{className:"animate-ping inline-flex h-full w-full rounded-full bg-danger"})}),e("span",{className:"w-4 h-4 m-auto mb-10",children:e("span",{className:"animate-ping inline-flex h-full w-full rounded-full bg-warning"})}),e("span",{className:"w-4 h-4 m-auto mb-10",children:e("span",{className:"animate-ping inline-flex h-full w-full rounded-full bg-primary"})})]})}),l.includes("code4")&&e(r,{children:e("pre",{className:"language-xml",children:`<span className="animate-spin border-4 border-success border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-danger border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-warning border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-transparent border-l-black rounded-full w-10 h-10 inline-block align-middle m-auto mb-10 dark:border-l-dark"></span>

<span className="animate-spin border-4 border-transparent border-l-danger rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-transparent border-l-warning rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="animate-spin border-4 border-transparent border-l-primary rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>

<span className="w-4 h-4 m-auto mb-10">
    <span className="animate-ping inline-flex h-full w-full rounded-full bg-info"></span>
</span>

<span className="w-4 h-4 m-auto mb-10">
    <span className="animate-ping inline-flex h-full w-full rounded-full bg-danger"></span>
</span>

<span className="w-4 h-4 m-auto mb-10">
    <span className="animate-ping inline-flex h-full w-full rounded-full bg-warning"></span>
</span>

<span className="w-4 h-4 m-auto mb-10">
    <span className="animate-ping inline-flex h-full w-full rounded-full bg-primary"></span>
</span>`})})]}),n("div",{className:"panel",id:"custom",children:[n("div",{className:"flex items-center justify-between mb-10",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Custom"}),e("button",{onClick:()=>{a("code5")},className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:n("span",{className:"flex items-center",children:[n("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:n("div",{className:"grid grid-cols-3 w-full gap-4",children:[e("span",{className:"animate-spin border-8 border-[#f1f2f3] border-l-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"}),e("span",{className:"animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"})]})}),l.includes("code5")&&e(r,{children:e("pre",{className:"language-xml",children:`<span className="animate-spin border-8 border-[#f1f2f3] border-l-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>

<span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>

<span className="animate-[spin_3s_linear_infinite] border-8 border-r-warning border-l-primary border-t-danger border-b-success rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>`})})]})]})]})};export{f as default};
