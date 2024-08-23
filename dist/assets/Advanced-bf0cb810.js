import{u as $,r as o,s as U,b as e,j as s,p as _}from"./index-4f880644.js";import{N as q}from"./index-cc9c39c2.js";import{s as E}from"./sortBy-652799c5.js";import{l as X}from"./index-3d564bcc.js";import"./floating-ui.dom.browser.min-e93d2b51.js";import"./_baseIsEqual-438f02f9.js";import"./_defineProperty-ca8dadd9.js";const r1=()=>{const w=$();o.useEffect(()=>{w(U("Advanced Table"))},[w]);const B=["id","name","email","message","cTime"],D=["Id","Name","Email","Message","Date Time"],[M,b]=o.useState(1),V=[12,15,20,25,30,50,100],[p,T]=o.useState(V[0]),[y,W]=o.useState([]),[h,N]=o.useState([]),[j,S]=o.useState([]);function A(){X.downloadExcel({fileName:"table",sheet:"react-export-table-to-excel",tablePayload:{header:D,body:y}})}const g=t=>{let a=B,i=y,d="table",m;if(m=window.navigator,t==="csv"){let n=";",C=`
`,r=a.map(c=>Z(c)).join(n);if(r+=C,i.map(c=>{a.map((L,H)=>{H>0&&(r+=n);let k=c[L]?c[L]:"";r+=k}),r+=C}),r==null)return;if(!r.match(/^data:text\/csv/i)&&!m.msSaveOrOpenBlob){var O="data:application/csv;charset=utf-8,"+encodeURIComponent(r),v=document.createElement("a");v.setAttribute("href",O),v.setAttribute("download",d+".csv"),v.click()}else{var R=new Blob([r]);m.msSaveOrOpenBlob&&m.msSaveBlob(R,d+".csv")}}else if(t==="print"){var l="<p>"+d+"</p>";l+='<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ',a.map(n=>{l+="<th>"+Z(n)+"</th>"}),l+="</tr></thead>",l+="<tbody>",i.map(n=>{l+="<tr>",a.map(C=>{let r=n[C]?n[C]:"";l+="<td>"+r+"</td>"}),l+="</tr>"}),l+="<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>",l+="</tbody></table>";var f=window.open("","","left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0");f.document.write("<title>Print</title>"+l),f.document.close(),f.focus(),f.print()}else if(t==="txt"){let n=",",C=`
`,r=a.map(c=>Z(c)).join(n);if(r+=C,i.map(c=>{a.map((L,H)=>{H>0&&(r+=n);let k=c[L]?c[L]:"";r+=k}),r+=C}),r==null)return;if(!r.match(/^data:text\/txt/i)&&!m.msSaveOrOpenBlob){var I="data:application/txt;charset=utf-8,"+encodeURIComponent(r),x=document.createElement("a");x.setAttribute("href",I),x.setAttribute("download",d+".txt"),x.click()}else{var z=new Blob([r]);m.msSaveOrOpenBlob&&m.msSaveBlob(z,d+".txt")}}},Z=t=>t.replace("_"," ").replace("-"," ").toLowerCase().split(" ").map(a=>a.charAt(0).toUpperCase()+a.substring(1)).join(" ");o.useEffect(()=>{(async()=>{const a={"Content-Type":"application/json",accessToken:localStorage.getItem("accessToken")},i=await _("/v1/contactData",{},{},a);W(i);const d=E(i,"id");N(d),S(d.slice(0,p))})()},[p]);const[u,P]=o.useState({columnAccessor:"id",direction:"asc"});return o.useEffect(()=>{b(1)},[p]),o.useEffect(()=>{const t=(M-1)*p,a=t+p;S([...h.slice(t,a)])},[M,p,h]),o.useEffect(()=>{const t=E(h,u.columnAccessor);N(u.direction==="desc"?t.reverse():t),b(1)},[u,h]),e("div",{children:s("div",{className:"panel",children:[e("div",{className:"flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5",children:s("div",{className:"flex items-center flex-wrap",children:[s("button",{type:"button",onClick:()=>g("csv"),className:"btn btn-primary btn-sm m-1 ",children:[s("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z",fill:"currentColor"}),e("path",{opacity:"0.5",d:"M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22",stroke:"currentColor",strokeWidth:"1.5"})]}),"CSV"]}),s("button",{type:"button",onClick:()=>g("txt"),className:"btn btn-primary btn-sm m-1",children:[s("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z",fill:"currentColor"}),e("path",{opacity:"0.5",d:"M6 14.5H14",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M6 18H11.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22",stroke:"currentColor",strokeWidth:"1.5"})]}),"TXT"]}),s("button",{type:"button",className:"btn btn-primary btn-sm m-1",onClick:A,children:[s("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z",fill:"currentColor"}),e("path",{opacity:"0.5",d:"M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M7 14L6 15L7 16M11.5 16L12.5 17L11.5 18M10 14L8.5 18",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),"EXCEL"]}),s("button",{type:"button",onClick:()=>g("print"),className:"btn btn-primary btn-sm m-1",children:[s("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M6 17.9827C4.44655 17.9359 3.51998 17.7626 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 6.87868C22 7.75736 22 9.17157 22 12C22 14.8284 22 16.2426 21.1213 17.1213C20.48 17.7626 19.5535 17.9359 18 17.9827",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M9 10H6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M19 14L5 14",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M18 14V16C18 18.8284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V14",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M17.9827 6C17.9359 4.44655 17.7626 3.51998 17.1213 2.87868C16.2427 2 14.8284 2 12 2C9.17158 2 7.75737 2 6.87869 2.87868C6.23739 3.51998 6.06414 4.44655 6.01733 6",stroke:"currentColor",strokeWidth:"1.5"}),e("circle",{opacity:"0.5",cx:"17",cy:"10",r:"1",fill:"currentColor"}),e("path",{opacity:"0.5",d:"M15 16.5H9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13 19H9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"PRINT"]})]})}),e("h5",{className:"font-semibold text-lg dark:text-white-light mb-5",children:"Messages from website"}),e("div",{className:"datatables",children:e(q,{noRecordsText:"No results match your search query",highlightOnHover:!0,className:"whitespace-nowrap table-hover",records:j,columns:[{accessor:"id",title:"ID",sortable:!0,render:({id:t})=>s("strong",{className:"text-info",children:["#",t]})},{accessor:"name",title:"Name",sortable:!0,render:({name:t})=>e("div",{className:"flex items-center gap-2",children:e("div",{className:"font-semibold",children:t})})},{accessor:"email",title:"Email Address",render:({email:t})=>e("div",{className:"flex items-center gap-2",children:e("a",{href:`mailto:${t}`,className:"text-primary hover:underline",children:t})})},{accessor:"message",title:"Message",sortable:!0,render:({message:t})=>e("div",{children:t})}],totalRecords:h.length,recordsPerPage:p,page:M,onPageChange:t=>b(t),recordsPerPageOptions:V,onRecordsPerPageChange:T,sortStatus:u,onSortStatusChange:P,minHeight:200,paginationText:({from:t,to:a,totalRecords:i})=>`Showing  ${t} to ${a} of ${i} entries`})})]})})};export{r1 as default};
