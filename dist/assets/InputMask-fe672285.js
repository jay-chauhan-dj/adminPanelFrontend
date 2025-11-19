import{u as h,r as c,s as k,j as t,b as e,L as p}from"./index-0b985f04.js";import{C as l}from"./Highlight-e8f9257a.js";import{M as a}from"./reactTextMask-ed1811cf.js";const f=()=>{const o=h();c.useEffect(()=>{o(k("Input Mask"))});const[r,d]=c.useState([]),s=i=>{r.includes(i)?d(n=>n.filter(m=>m!==i)):d([...r,i])};return t("div",{children:[t("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[e("li",{children:e(p,{to:"#",className:"text-primary hover:underline",children:"Forms"})}),e("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:e("span",{children:"Input Mask"})})]}),t("div",{className:"pt-5 space-y-8 flex-1",id:"basic",children:[t("div",{className:"panel p-3 flex items-center text-primary overflow-x-auto whitespace-nowrap",children:[e("div",{className:"ring-2 ring-primary/30 rounded-full bg-primary text-white p-1.5 ltr:mr-3 rtl:ml-3",children:t("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z",stroke:"currentColor",strokeWidth:"1.5"}),e("path",{opacity:"0.5",d:"M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),e("span",{className:"ltr:mr-3 rtl:ml-3",children:"Documentation: "}),e("a",{href:"https://www.npmjs.com/package/react-text-mask",target:"_blank",className:"block hover:underline",rel:"noreferrer",children:"https://www.npmjs.com/package/react-text-mask"})]}),t("div",{className:"grid xl:grid-cols-2 grid-cols-1 gap-6",children:[t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Static Mask Basic"}),e("button",{type:"button",className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",onClick:()=>s("code1"),children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})," ","Code"]})})]}),t("div",{className:"mb-5",children:[t("p",{className:"text-white-dark mb-5",children:["Input mask are use with ",e("span",{className:"text-danger",children:"input"})," tags."]}),e("form",{children:t("fieldset",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[t("div",{children:[e("label",{htmlFor:"staticMask1",className:"text-white-dark",children:`mask="'##-#######'" (99-9999999)`}),e(a,{id:"staticMask1",type:"text",placeholder:"__-_______",className:"form-input",mask:[/[0-9]/,/[0-9]/,"-",/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]})]}),t("div",{children:[e("label",{htmlFor:"staticMask2",className:"text-white-dark",children:`mask="'AA-####'" (aa-9999)`}),e(a,{id:"staticMask2",type:"text",placeholder:"__-____",className:"form-input",mask:[/[a-z]/,/[a-z]/,"-",/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]})]})]})})]}),r.includes("code1")&&e(l,{children:e("pre",{className:"language-typescript",children:`import MaskedInput from 'react-text-mask';

<form>
    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="staticMask1" className="text-white-dark">
                mask="'##-#######'" (99-9999999)
            </label>
            <MaskedInput
                id="staticMask1"
                type="text"
                placeholder="__-_______"
                className="form-input"
                mask={[/[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
            />
        </div>
        <div>
            <label htmlFor="staticMask2" className="text-white-dark">
                mask="'AA-####'" (aa-9999)
            </label>
            <MaskedInput id="staticMask2" type="text" placeholder="__-____" className="form-input" mask={[/[a-z]/, /[a-z]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]} />
        </div>
    </fieldset>
</form>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Alternate masks"}),e("button",{type:"button",className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",onClick:()=>s("code2"),children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})," ","Code"]})})]}),e("div",{className:"mb-5",children:e("form",{children:t("fieldset",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[t("div",{children:[e("label",{htmlFor:"altnMask1",className:"text-white-dark",children:`mask="'##.#'" (99.9)`}),e(a,{id:"altnMask1",type:"text",placeholder:"__._",className:"form-input",mask:[/[0-9]/,/[0-9]/,".",/[0-9]/]})]}),t("div",{children:[e("label",{htmlFor:"altnMask2",className:"text-white-dark",children:`mask="'##.##'" (99.99)`}),e(a,{id:"altnMask2",type:"text",placeholder:"__.__",className:"form-input",mask:[/[0-9]/,/[0-9]/,".",/[0-9]/,/[0-9]/]})]})]})})}),r.includes("code2")&&e(l,{children:e("pre",{className:"language-typescript",children:`import MaskedInput from 'react-text-mask';

<form>
    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="altnMask1" className="text-white-dark">
                mask="'##.#'" (99.9)
            </label>
            <MaskedInput id="altnMask1" type="text" placeholder="__._" className="form-input" mask={[/[0-9]/, /[0-9]/, '.', /[0-9]/]} />
        </div>
        <div>
            <label htmlFor="altnMask2" className="text-white-dark">
                mask="'##.##'" (99.99)
            </label>
            <MaskedInput id="altnMask2" type="text" placeholder="__.__" className="form-input" mask={[/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/]} />
        </div>
    </fieldset>
</form>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Dynamic Syntax"}),e("button",{type:"button",className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",onClick:()=>s("code3"),children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})," ","Code"]})})]}),e("div",{className:"mb-5",children:e("form",{children:t("fieldset",{className:"grid grid-cols-1 md:grid-cols-3 items-end gap-4",children:[t("div",{children:[t("label",{htmlFor:"dynamicMask1",className:"text-white-dark",children:[`mask="'#-AAA###'" (9-a`,"{1,3}","9","{1,3}",")"]}),e(a,{id:"dynamicMask1",type:"text",placeholder:"_-__",className:"form-input",mask:[/[0-9]/,"-",/[a-z]/,/[a-z]/,/[a-z]/,/[0-9]/,/[0-9]/,/[0-9]/]})]}),t("div",{children:[t("label",{htmlFor:"dynamicMask2",className:"text-white-dark",children:[`mask="'AA-####'" (aa-9`,"{1,4}",")"]}),e(a,{id:"dynamicMask2",type:"text",placeholder:"__-____",className:"form-input",mask:[/[a-z]/,/[a-z]/,"-",/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]})]}),t("div",{children:[t("label",{htmlFor:"dynamicMask3",className:"text-white-dark",children:[`mask="'AA-##'" (aa-9`,"{1,2}",")"]}),e(a,{id:"dynamicMask3",type:"text",placeholder:"__-__",className:"form-input",mask:[/[a-z]/,/[a-z]/,"-",/[0-9]/,/[0-9]/]})]})]})})}),r.includes("code3")&&e(l,{children:e("pre",{className:"language-typescript",children:`import MaskedInput from 'react-text-mask';

<form>
    <fieldset className="grid grid-cols-1 md:grid-cols-3 items-end gap-4">
        <div>
            <label htmlFor="dynamicMask1" className="text-white-dark">
                mask="'#-AAA###'" (9-a{'{1,3}'}9{'{1,3}'})
            </label>
            <MaskedInput
                id="dynamicMask1"
                type="text"
                placeholder="_-__"
                className="form-input"
                mask={[/[0-9]/, '-', /[a-z]/, /[a-z]/, /[a-z]/, /[0-9]/, /[0-9]/, /[0-9]/]}
            />
        </div>
        <div>
            <label htmlFor="dynamicMask2" className="text-white-dark">
                mask="'AA-####'" (aa-9{'{1,4}'})
            </label>
            <MaskedInput id="dynamicMask2" type="text" placeholder="__-____" className="form-input" mask={[/[a-z]/, /[a-z]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]} />
        </div>
        <div>
            <label htmlFor="dynamicMask3" className="text-white-dark">
                mask="'AA-##'" (aa-9{'{1,2}'})
            </label>
            <MaskedInput id="dynamicMask3" type="text" placeholder="__-__" className="form-input" mask={[/[a-z]/, /[a-z]/, '-', /[0-9]/, /[0-9]/]} />
        </div>
    </fieldset>
</form>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Date"}),e("button",{type:"button",className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",onClick:()=>s("code4"),children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})," ","Code"]})})]}),e("div",{className:"mb-5",children:e("form",{children:t("fieldset",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[t("div",{children:[e("label",{htmlFor:"dateMask1",className:"text-white-dark",children:`mask="'##/##/####'" (dd/mm/yyyy)`}),e(a,{id:"dateMask1",type:"text",placeholder:"__/__/____",className:"form-input",mask:[/[0-9]/,/[0-9]/,"/",/[0-9]/,/[0-9]/,"/",/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]})]}),t("div",{children:[e("label",{htmlFor:"dateMask2",className:"text-white-dark",children:`mask="'##-##-####'" (99-99-9999)`}),e(a,{id:"dateMask2",type:"text",placeholder:"__-__-____",className:"form-input",mask:[/[0-9]/,/[0-9]/,"-",/[0-9]/,/[0-9]/,"-",/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]})]}),t("div",{children:[e("label",{htmlFor:"dateMask3",className:"text-white-dark",children:`mask="'## December, ####'" (99 December, 9999)`}),e(a,{id:"dateMask3",type:"text",placeholder:"__ December, ____",className:"form-input",mask:[/[0-9]/,/[0-9]/," ","D","e","c","e","m","b","e","r"," ",/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]})]})]})})}),r.includes("code4")&&e(l,{children:e("pre",{className:"language-typescript",children:`import MaskedInput from 'react-text-mask';

<form>
    <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
            <label htmlFor="dateMask1" className="text-white-dark">
                mask="'##/##/####'" (dd/mm/yyyy)
            </label>
            <MaskedInput
                id="dateMask1"
                type="text"
                placeholder="__/__/____"
                className="form-input"
                mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
            />
        </div>
        <div>
            <label htmlFor="dateMask2" className="text-white-dark">
                mask="'##-##-####'" (99-99-9999)
            </label>
            <MaskedInput
                id="dateMask2"
                type="text"
                placeholder="__-__-____"
                className="form-input"
                mask={[/[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
            />
        </div>
        <div>
            <label htmlFor="dateMask3" className="text-white-dark">
                mask="'## December, ####'" (99 December, 9999)
            </label>
            <MaskedInput
                id="dateMask3"
                type="text"
                placeholder="__ December, ____"
                className="form-input"
                // mask={['99 December, 9999']}
                mask={[/[0-9]/, /[0-9]/, ' ', 'D', 'e', 'c', 'e', 'm', 'b', 'e', 'r', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
            />
        </div>
    </fieldset>
</form>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"IP"}),e("button",{type:"button",className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",onClick:()=>s("code5"),children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})," ","Code"]})})]}),e("div",{className:"mb-5",children:e("form",{children:t("fieldset",{children:[e("label",{htmlFor:"ipMask",className:"text-white-dark",children:`mask="'###.###.###.###'" (192.198.1.1)`}),e(a,{id:"ipMask",type:"text",placeholder:"___.___.___.___",className:"form-input",mask:[/[0-9]/,/[0-9]/,/[0-9]/,".",/[0-9]/,/[0-9]/,/[0-9]/,".",/[0-9]/,/[0-9]/,/[0-9]/]})]})})}),r.includes("code5")&&e(l,{children:e("pre",{className:"language-typescript",children:`import MaskedInput from 'react-text-mask';

<form>
    <fieldset>
        <label htmlFor="ipMask" className="text-white-dark">
            mask="'###.###.###.###'" (192.198.1.1)
        </label>
        <MaskedInput
            id="ipMask"
            type="text"
            placeholder="___.___.___.___"
            className="form-input"
            mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/]}
        />
    </fieldset>
</form>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Phone"}),e("button",{type:"button",className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",onClick:()=>s("code6"),children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})," ","Code"]})})]}),e("div",{className:"mb-5",children:e("form",{children:t("fieldset",{children:[e("label",{htmlFor:"phoneMask",className:"text-white-dark",children:`mask="'(###) ###-####'" ((999) 999-9999)`}),e(a,{id:"phoneMask",type:"text",placeholder:"(___) ___-____",className:"form-input",mask:["(",/[0-9]/,/[0-9]/,/[0-9]/,")"," ",/[0-9]/,/[0-9]/,/[0-9]/,"-",/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]})]})})}),r.includes("code6")&&e(l,{children:e("pre",{className:"language-typescript",children:`import MaskedInput from 'react-text-mask';

<form>
    <fieldset>
        <label htmlFor="phoneMask" className="text-white-dark">
            mask="'(###) ###-####'" ((999) 999-9999)
        </label>
        <MaskedInput
            id="phoneMask"
            type="text"
            placeholder="(___) ___-____"
            className="form-input"
            mask={['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
        />
    </fieldset>
</form>`})})]}),t("div",{className:"panel",children:[t("div",{className:"flex items-center justify-between mb-5",children:[e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Currency"}),e("button",{type:"button",className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",onClick:()=>s("code7"),children:t("span",{className:"flex items-center",children:[t("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5 ltr:mr-2 rtl:ml-2",children:[e("path",{d:"M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{opacity:"0.5",d:"M13.9868 5L10.0132 19.8297",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e("path",{d:"M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})," ","Code"]})})]}),e("div",{className:"mb-5",children:e("form",{children:t("fieldset",{children:[e("label",{htmlFor:"currencyMask",className:"text-white-dark",children:"$999,9999,999.99"}),e(a,{id:"currencyMask",type:"text",placeholder:"$___,____,___.__",className:"form-input",mask:["$",/[0-9]/,/[0-9]/,/[0-9]/,",",/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,",",/[0-9]/,/[0-9]/,/[0-9]/,".",/[0-9]/,/[0-9]/]})]})})}),r.includes("code7")&&e(l,{children:e("pre",{className:"language-typescript",children:`import MaskedInput from 'react-text-mask';

<form>
    <fieldset>
        <label htmlFor="currencyMask" className="text-white-dark">
            $999,9999,999.99
        </label>
        <MaskedInput
            id="currencyMask"
            type="text"
            placeholder="$___,____,___.__"
            className="form-input"
            mask={['$', /[0-9]/, /[0-9]/, /[0-9]/, ',', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ',', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/]}
        />
    </fieldset>
</form>`})})]})]})]})]})};export{f as default};
