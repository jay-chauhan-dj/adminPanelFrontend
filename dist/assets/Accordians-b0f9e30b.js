import{u as C,r as c,s as L,j as t,b as e,L as q}from"./index-0b985f04.js";import{A as d}from"./index-db423aa0.js";import{C as m}from"./Highlight-e8f9257a.js";const M=()=>{const k=C();c.useEffect(()=>{k(L("Accordians"))});const[s,v]=c.useState([]),u=o=>{s.includes(o)?v(l=>l.filter(N=>N!==o)):v([...s,o])},[i,x]=c.useState("1"),b=o=>{x(l=>l===o?"":o)},[r,f]=c.useState("1"),h=o=>{f(l=>l===o?"":o)},[a,w]=c.useState("1"),p=o=>{w(l=>l===o?"":o)},[n,y]=c.useState("1"),g=o=>{y(l=>l===o?"":o)};return t("div",{children:[t("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[e("li",{children:e(q,{to:"#",className:"text-primary hover:underline",children:"Components"})}),e("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:e("span",{children:"Accordians"})})]}),t("div",{className:"pt-5 space-y-8",children:[t("div",{className:"panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap",children:[e("div",{className:"ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3",children:t("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),e("span",{className:"ltr:mr-3 rtl:ml-3",children:"Documentation: "}),e("a",{href:"https://www.npmjs.com/package/react-animate-height",target:"_blank",className:"block hover:underline",rel:"noreferrer",children:"https://www.npmjs.com/package/react-animate-height"})]}),t("div",{className:"grid lg:grid-cols-2 grid-cols-1 gap-6",children:[t("div",{className:"panel",id:"basic",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Basic"}),e("button",{onClick:()=>u("code1"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:t("div",{className:"space-y-2 font-semibold",children:[t("div",{className:"border border-[#d3d3d3] rounded dark:border-[#1b2e4b]",children:[t("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${i==="1"?"!text-primary":""}`,onClick:()=>b("1"),children:["Collapsible Group Item #1",e("div",{className:`ltr:ml-auto rtl:mr-auto ${i==="1"?"rotate-180":""}`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:i==="1"?"auto":0,children:t("div",{className:"space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:[e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})})]}),t("div",{className:"border border-[#d3d3d3] dark:border-[#1b2e4b] rounded",children:[t("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${i==="2"?"!text-primary":""}`,onClick:()=>b("2"),children:["Collapsible Group Item #2",e("div",{className:`ltr:ml-auto rtl:mr-auto ${i==="2"?"rotate-180":""}`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:i==="2"?"auto":0,children:e("div",{className:"p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:t("ul",{className:"space-y-1",children:[e("li",{children:e("button",{type:"button",children:"Apple"})}),e("li",{children:e("button",{type:"button",children:"Orange"})}),e("li",{children:e("button",{type:"button",children:"Banana"})}),e("li",{children:e("button",{type:"button",children:"list"})})]})})})})]}),t("div",{className:"border border-[#d3d3d3] dark:border-[#1b2e4b] rounded",children:[t("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${i==="3"?"!text-primary":""}`,onClick:()=>b("3"),children:["Collapsible Group Item #3",e("div",{className:`ltr:ml-auto rtl:mr-auto ${i==="3"?"rotate-180":""}`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:i==="3"?"auto":0,children:t("div",{className:"p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:[e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."}),e("button",{type:"button",className:"btn btn-primary mt-4",children:"Accept"})]})})})]})]})}),s.includes("code1")&&e(m,{children:e("pre",{className:"language-typescript",children:`import AnimateHeight from 'react-animate-height';
import { useState } from 'react';

const [active, setActive] = useState<string>('1');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

<div className="mb-5">
    <div className="space-y-2 font-semibold">
        <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${i==="1"?"!text-primary":""}\`}
                onClick={() => togglePara('1')}
            >
                Collapsible Group Item #1
                <div className={\`ltr:ml-auto rtl:mr-auto ${i==="1"?"rotate-180":""}\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                    <div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </AnimateHeight>
            </div>
        </div>
        <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${i==="2"?"!text-primary":""}\`}
                onClick={() => togglePara('2')}
            >
                Collapsible Group Item #2
                <div className={\`ltr:ml-auto rtl:mr-auto ${i==="2"?"rotate-180":""}\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active === '2' ? 'auto' : 0}>
                    <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <ul className="space-y-1">
                            <li>
                                <button type="button">Apple</button>
                            </li>
                            <li>
                                <button type="button">Orange</button>
                            </li>
                            <li>
                                <button type="button">Banana</button>
                            </li>
                            <li>
                                <button type="button">list</button>
                            </li>
                        </ul>
                    </div>
                </AnimateHeight>
            </div>
        </div>
        <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${i==="3"?"!text-primary":""}\`}
                onClick={() => togglePara('3')}
            >
                Collapsible Group Item #3
                <div className={\`ltr:ml-auto rtl:mr-auto ${i==="3"?"rotate-180":""}\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active === '3' ? 'auto' : 0}>
                    <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                            labore sustainable VHS.
                        </p>
                        <button type="button" className="btn btn-primary mt-4">
                            Accept
                        </button>
                    </div>
                </AnimateHeight>
            </div>
        </div>
    </div>
</div>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Without Spacing"}),e("button",{className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",onClick:()=>u("code2"),children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:t("div",{className:"border border-[#d3d3d3] dark:border-[#3b3f5c] rounded font-semibold",children:[t("div",{className:"border-b border-[#d3d3d3] dark:border-[#3b3f5c]",children:[t("button",{type:"button",className:` ${r==="1"?"!text-primary":""} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]`,onClick:()=>h("1"),children:["Collapsible Group Item #1",e("div",{className:`${r==="1"?"rotate-180":""} ltr:ml-auto rtl:mr-auto`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:r==="1"?"auto":0,children:t("div",{className:"space-y-2 p-4 text-white-dark text-[13px]",children:[e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})})]}),t("div",{className:"border-b border-[#d3d3d3] dark:border-[#3b3f5c]",children:[t("button",{type:"button",className:` ${r==="2"?"!text-primary":""} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]`,onClick:()=>h("2"),children:["Collapsible Group Item #2",e("div",{className:`${r==="2"?"rotate-180":""} ltr:ml-auto rtl:mr-auto`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:r==="2"?"auto":0,children:e("div",{className:"p-4 text-[13px]",children:t("ul",{className:"space-y-1",children:[e("li",{children:e("button",{type:"button",children:"Apple"})}),e("li",{children:e("button",{type:"button",children:"Orange"})}),e("li",{children:e("button",{type:"button",children:"Banana"})}),e("li",{children:e("button",{type:"button",children:"list"})})]})})})})]}),t("div",{children:[t("button",{type:"button",className:` ${r==="3"?"!text-primary":""} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]`,onClick:()=>h("3"),children:["Collapsible Group Item #3",e("div",{className:`${r==="3"?"rotate-180":""} ltr:ml-auto rtl:mr-auto`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:r==="3"?"auto":0,children:t("div",{className:"p-4 text-[13px]",children:[e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."}),e("button",{type:"button",className:"btn btn-primary mt-4",children:"Accept"})]})})})]})]})}),s.includes("code2")&&e(m,{children:e("pre",{className:"language-typescript",children:`import AnimateHeight from 'react-animate-height';
import { useState } from 'react';

const [active1, setActive1] = useState<string>('1');
    const togglePara1 = (value: string) => {
        setActive1((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

<div className="mb-5">
    <div className="border border-[#d3d3d3] dark:border-[#3b3f5c] rounded font-semibold">
        <div className="border-b border-[#d3d3d3] dark:border-[#3b3f5c]">
            <button
                type="button"
                className={\`${r==="1"?"!text-primary":""} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]\`}
                onClick={() => togglePara1('1')}
            >
                Collapsible Group Item #1
                <div className={\`${r==="1"?"rotate-180":""} ltr:ml-auto rtl:mr-auto\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active1 === '1' ? 'auto' : 0}>
                    <div className="space-y-2 p-4 text-white-dark text-[13px]">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </AnimateHeight>
            </div>
        </div>

        <div className="border-b border-[#d3d3d3] dark:border-[#3b3f5c]">
            <button
                type="button"
                className={\`${r==="2"?"!text-primary":""} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]\`}
                onClick={() => togglePara1('2')}
            >
                Collapsible Group Item #2
                <div className={\`${r==="2"?"rotate-180":""} ltr:ml-auto rtl:mr-auto\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active1 === '2' ? 'auto' : 0}>
                    <div className="p-4 text-[13px]">
                        <ul className="space-y-1">
                            <li>
                                <button type="button">Apple</button>
                            </li>
                            <li>
                                <button type="button">Orange</button>
                            </li>
                            <li>
                                <button type="button">Banana</button>
                            </li>
                            <li>
                                <button type="button">list</button>
                            </li>
                        </ul>
                    </div>
                </AnimateHeight>
            </div>
        </div>

        <div>
            <button
                type="button"
                className={\`${r==="3"?"!text-primary":""} p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]\`}
                onClick={() => togglePara1('3')}
            >
                Collapsible Group Item #3
                <div className={\`${r==="3"?"rotate-180":""} ltr:ml-auto rtl:mr-auto\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active1 === '3' ? 'auto' : 0}>
                    <div className="p-4 text-[13px]">
                        <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                            labore sustainable VHS.
                        </p>
                        <button type="button" className="btn btn-primary mt-4">
                            Accept
                        </button>
                    </div>
                </AnimateHeight>
            </div>
        </div>
    </div>
</div>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Icons"}),e("button",{onClick:()=>u("code3"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:t("div",{className:"space-y-2 font-semibold",children:[t("div",{className:"border border-[#d3d3d3] rounded dark:border-[#1b2e4b]",children:[t("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${a==="1"?"!text-primary":""}`,onClick:()=>p("1"),children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2 text-primary shrink-0",children:[e("path",{opacity:"0.5",d:"M7.142 18.9706C5.18539 18.8995 3.99998 18.6568 3.17157 17.8284C2 16.6569 2 14.7712 2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11C22 14.7712 22 16.6569 20.8284 17.8284C20.0203 18.6366 18.8723 18.8873 17 18.965",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M9.94955 16.0503C10.8806 15.1192 11.3461 14.6537 11.9209 14.6234C11.9735 14.6206 12.0261 14.6206 12.0787 14.6234C12.6535 14.6537 13.119 15.1192 14.0501 16.0503C16.0759 18.0761 17.0888 19.089 16.8053 19.963C16.7809 20.0381 16.7506 20.1112 16.7147 20.1815C16.2973 21 14.8648 21 11.9998 21C9.13482 21 7.70233 21 7.28489 20.1815C7.249 20.1112 7.21873 20.0381 7.19436 19.963C6.91078 19.089 7.92371 18.0761 9.94955 16.0503Z",stroke:"currentColor",strokeWidth:"1.5"})]}),"Collapsible Group Item #1",e("div",{className:`ltr:ml-auto rtl:mr-auto ${a==="1"?"rotate-180":""}`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:a==="1"?"auto":0,children:t("div",{className:"space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:[e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})})]}),t("div",{className:"border border-[#d3d3d3] dark:border-[#1b2e4b] rounded",children:[t("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${a==="2"?"!text-primary":""}`,onClick:()=>p("2"),children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2 text-primary shrink-0",children:[e("path",{d:"M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M21 7.5L12 12M12 12L3 7.5M12 12V21.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Collapsible Group Item #2",e("div",{className:`ltr:ml-auto rtl:mr-auto ${a==="2"?"rotate-180":""}`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:a==="2"?"auto":0,children:e("div",{className:"p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:t("ul",{className:"space-y-1",children:[e("li",{children:e("button",{type:"button",children:"Apple"})}),e("li",{children:e("button",{type:"button",children:"Orange"})}),e("li",{children:e("button",{type:"button",children:"Banana"})}),e("li",{children:e("button",{type:"button",children:"list"})})]})})})})]}),t("div",{className:"border border-[#d3d3d3] dark:border-[#1b2e4b] rounded",children:[t("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${a==="3"?"!text-primary":""}`,onClick:()=>p("3"),children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2 text-primary shrink-0",children:[e("path",{d:"M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M2 8.75C1.58579 8.75 1.25 9.08579 1.25 9.5C1.25 9.91421 1.58579 10.25 2 10.25V8.75ZM22 10.25C22.4142 10.25 22.75 9.91421 22.75 9.5C22.75 9.08579 22.4142 8.75 22 8.75V10.25ZM8.25 21C8.25 21.4142 8.58579 21.75 9 21.75C9.41421 21.75 9.75 21.4142 9.75 21H8.25ZM9.75 10C9.75 9.58579 9.41421 9.25 9 9.25C8.58579 9.25 8.25 9.58579 8.25 10L9.75 10ZM2 10.25H22V8.75H2V10.25ZM9.75 21L9.75 10L8.25 10L8.25 21H9.75Z",fill:"currentColor"})]}),"Collapsible Group Item #3",e("div",{className:`ltr:ml-auto rtl:mr-auto ${a==="3"?"rotate-180":""}`,children:e("svg",{className:"w-4 h-4",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e("div",{children:e(d,{duration:300,height:a==="3"?"auto":0,children:t("div",{className:"p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:[e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."}),e("button",{type:"button",className:"btn btn-primary mt-4",children:"Accept"})]})})})]})]})}),s.includes("code3")&&e(m,{children:e("pre",{className:"language-typescript",children:`import AnimateHeight from 'react-animate-height';
import { useState } from 'react';

const [active2, setActive2] = useState<string>('1');
    const togglePara2 = (value: string) => {
        setActive2((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

<div className="mb-5">
    <div className="space-y-2 font-semibold">
        <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${a==="1"?"!text-primary":""}\`}
                onClick={() => togglePara2('1')}
            >
                <svg>...</svg>
                Collapsible Group Item #1
                <div className={\`ltr:ml-auto rtl:mr-auto ${a==="1"?"rotate-180":""}\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active2 === '1' ? 'auto' : 0}>
                    <div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </AnimateHeight>
            </div>
        </div>
        <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${a==="2"?"!text-primary":""}\`}
                onClick={() => togglePara2('2')}
            >
                <svg>...</svg>
                Collapsible Group Item #2
                <div className={\`ltr:ml-auto rtl:mr-auto ${a==="2"?"rotate-180":""}\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active2 === '2' ? 'auto' : 0}>
                    <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <ul className="space-y-1">
                            <li>
                                <button type="button">Apple</button>
                            </li>
                            <li>
                                <button type="button">Orange</button>
                            </li>
                            <li>
                                <button type="button">Banana</button>
                            </li>
                            <li>
                                <button type="button">list</button>
                            </li>
                        </ul>
                    </div>
                </AnimateHeight>
            </div>
        </div>
        <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${a==="3"?"!text-primary":""}\`}
                onClick={() => togglePara2('3')}
            >
                <svg>...</svg>
                Collapsible Group Item #3
                <div className={\`ltr:ml-auto rtl:mr-auto ${a==="3"?"rotate-180":""}\`}>
                    <svg>...</svg>
                </div>
            </button>
            <div>
                <AnimateHeight duration={300} height={active2 === '3' ? 'auto' : 0}>
                    <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                            labore sustainable VHS.
                        </p>
                        <button type="button" className="btn btn-primary mt-4">
                            Accept
                        </button>
                    </div>
                </AnimateHeight>
            </div>
        </div>
    </div>
</div>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"No Icons"}),e("button",{onClick:()=>u("code4"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),"Code"]})})]}),e("div",{className:"mb-5",children:t("div",{className:"space-y-2 font-semibold",children:[t("div",{className:"border border-[#d3d3d3] rounded dark:border-[#1b2e4b]",children:[e("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${n==="1"?"!text-primary":""}`,onClick:()=>g("1"),children:"Collapsible Group Item #1"}),e("div",{children:e(d,{duration:300,height:n==="1"?"auto":0,children:t("div",{className:"space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:[e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})})]}),t("div",{className:"border border-[#d3d3d3] dark:border-[#1b2e4b] rounded",children:[e("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${n==="2"?"!text-primary":""}`,onClick:()=>g("2"),children:"Collapsible Group Item #2"}),e("div",{children:e(d,{duration:300,height:n==="2"?"auto":0,children:e("div",{className:"p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:t("ul",{className:"space-y-1",children:[e("li",{children:e("button",{type:"button",children:"Apple"})}),e("li",{children:e("button",{type:"button",children:"Orange"})}),e("li",{children:e("button",{type:"button",children:"Banana"})}),e("li",{children:e("button",{type:"button",children:"list"})})]})})})})]}),t("div",{className:"border border-[#d3d3d3] dark:border-[#1b2e4b] rounded",children:[e("button",{type:"button",className:`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${n==="3"?"!text-primary":""}`,onClick:()=>g("3"),children:"Collapsible Group Item #3"}),e("div",{children:e(d,{duration:300,height:n==="3"?"auto":0,children:t("div",{className:"p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]",children:[e("p",{children:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."}),e("button",{type:"button",className:"btn btn-primary mt-4",children:"Accept"})]})})})]})]})}),s.includes("code4")&&e(m,{children:e("pre",{className:"language-typescript",children:`import AnimateHeight from 'react-animate-height';
import { useState } from 'react';

const [active3, setActive3] = useState<string>('1');
    const togglePara3 = (value: string) => {
        setActive3((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

<div className="mb-5">
    <div className="space-y-2 font-semibold">
        <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${n==="1"?"!text-primary":""}\`}
                onClick={() => togglePara3('1')}
            >
                Collapsible Group Item #1
            </button>
            <div>
                <AnimateHeight duration={300} height={active3 === '1' ? 'auto' : 0}>
                    <div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </AnimateHeight>
            </div>
        </div>
        <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${n==="2"?"!text-primary":""}\`}
                onClick={() => togglePara3('2')}
            >
                Collapsible Group Item #2
            </button>
            <div>
                <AnimateHeight duration={300} height={active3 === '2' ? 'auto' : 0}>
                    <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <ul className="space-y-1">
                            <li>
                                <button type="button">Apple</button>
                            </li>
                            <li>
                                <button type="button">Orange</button>
                            </li>
                            <li>
                                <button type="button">Banana</button>
                            </li>
                            <li>
                                <button type="button">list</button>
                            </li>
                        </ul>
                    </div>
                </AnimateHeight>
            </div>
        </div>
        <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
            <button
                type="button"
                className={\`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${n==="3"?"!text-primary":""}\`}
                onClick={() => togglePara3('3')}
            >
                Collapsible Group Item #3
            </button>
            <div>
                <AnimateHeight duration={300} height={active3 === '3' ? 'auto' : 0}>
                    <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                            labore sustainable VHS.
                        </p>
                        <button type="button" className="btn btn-primary mt-4">
                            Accept
                        </button>
                    </div>
                </AnimateHeight>
            </div>
        </div>
    </div>
</div>`})})]})]})]})]})};export{M as default};
