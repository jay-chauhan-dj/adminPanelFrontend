import{r as o,R as S}from"./index-4f880644.js";import{V as F,j as K,y as M,s as q,o as R,l as W,X as _,I as Y,u as O,e as te,a as v}from"./keyboard-64d0cc51.js";import{h as H,s as re,A as C,N as U,I as A,L as I,t as ne}from"./hidden-11b6ad6f.js";import{s as ae}from"./use-resolve-button-type-9b80668d.js";function le({onFocus:e}){let[t,r]=o.useState(!0);return t?S.createElement(H,{as:"button",type:"button",features:re.Focusable,onFocus:n=>{n.preventDefault();let a,s=50;function u(){if(s--<=0){a&&cancelAnimationFrame(a);return}if(e()){r(!1),cancelAnimationFrame(a);return}a=requestAnimationFrame(u)}a=requestAnimationFrame(u)}}):null}const J=o.createContext(null);function se(){return{groups:new Map,get(e,t){var r;let n=this.groups.get(e);n||(n=new Map,this.groups.set(e,n));let a=(r=n.get(t))!=null?r:0;n.set(t,a+1);let s=Array.from(n.keys()).indexOf(t);function u(){let g=n.get(t);g>1?n.set(t,g-1):n.delete(t)}return[s,u]}}}function ue({children:e}){let t=o.useRef(se());return o.createElement(J.Provider,{value:t},e)}function Q(e){let t=o.useContext(J);if(!t)throw new Error("You must wrap your component in a <StableCollection>");let r=oe(),[n,a]=t.current.get(e,r);return o.useEffect(()=>a,[]),n}function oe(){var e,t,r;let n=(r=(t=(e=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)==null?void 0:e.ReactCurrentOwner)==null?void 0:t.current)!=null?r:null;if(!n)return Symbol();let a=[],s=n;for(;s;)a.push(s.index),s=s.return;return"$."+a.join(".")}var ie=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(ie||{}),ce=(e=>(e[e.Less=-1]="Less",e[e.Equal=0]="Equal",e[e.Greater=1]="Greater",e))(ce||{}),de=(e=>(e[e.SetSelectedIndex=0]="SetSelectedIndex",e[e.RegisterTab=1]="RegisterTab",e[e.UnregisterTab=2]="UnregisterTab",e[e.RegisterPanel=3]="RegisterPanel",e[e.UnregisterPanel=4]="UnregisterPanel",e))(de||{});let pe={[0](e,t){var r;let n=C(e.tabs,c=>c.current),a=C(e.panels,c=>c.current),s=n.filter(c=>{var P;return!((P=c.current)!=null&&P.hasAttribute("disabled"))}),u={...e,tabs:n,panels:a};if(t.index<0||t.index>n.length-1){let c=O(Math.sign(t.index-e.selectedIndex),{[-1]:()=>1,[0]:()=>O(Math.sign(t.index),{[-1]:()=>0,[0]:()=>0,[1]:()=>1}),[1]:()=>0});return s.length===0?u:{...u,selectedIndex:O(c,{[0]:()=>n.indexOf(s[0]),[1]:()=>n.indexOf(s[s.length-1])})}}let g=n.slice(0,t.index),T=[...n.slice(t.index),...g].find(c=>s.includes(c));if(!T)return u;let b=(r=n.indexOf(T))!=null?r:e.selectedIndex;return b===-1&&(b=e.selectedIndex),{...u,selectedIndex:b}},[1](e,t){var r;if(e.tabs.includes(t.tab))return e;let n=e.tabs[e.selectedIndex],a=C([...e.tabs,t.tab],u=>u.current),s=(r=a.indexOf(n))!=null?r:e.selectedIndex;return s===-1&&(s=e.selectedIndex),{...e,tabs:a,selectedIndex:s}},[2](e,t){return{...e,tabs:e.tabs.filter(r=>r!==t.tab)}},[3](e,t){return e.panels.includes(t.panel)?e:{...e,panels:C([...e.panels,t.panel],r=>r.current)}},[4](e,t){return{...e,panels:e.panels.filter(r=>r!==t.panel)}}},j=o.createContext(null);j.displayName="TabsDataContext";function k(e){let t=o.useContext(j);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,k),r}return t}let z=o.createContext(null);z.displayName="TabsActionsContext";function V(e){let t=o.useContext(z);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,V),r}return t}function fe(e,t){return O(t.type,pe,e,t)}let be=o.Fragment,xe=F(function(e,t){let{defaultIndex:r=0,vertical:n=!1,manual:a=!1,onChange:s,selectedIndex:u=null,...g}=e;const T=n?"vertical":"horizontal",b=a?"manual":"auto";let c=u!==null,P=M(t),[i,m]=o.useReducer(fe,{selectedIndex:u??r,tabs:[],panels:[]}),p=o.useMemo(()=>({selectedIndex:i.selectedIndex}),[i.selectedIndex]),D=q(s||(()=>{})),L=q(i.tabs),f=o.useMemo(()=>({orientation:T,activation:b,...i}),[T,b,i]),x=R(d=>(m({type:1,tab:d}),()=>m({type:2,tab:d}))),y=R(d=>(m({type:3,panel:d}),()=>m({type:4,panel:d}))),$=R(d=>{w.current!==d&&D.current(d),c||m({type:0,index:d})}),w=q(c?e.selectedIndex:i.selectedIndex),B=o.useMemo(()=>({registerTab:x,registerPanel:y,change:$}),[]);W(()=>{m({type:0,index:u??r})},[u]),W(()=>{if(w.current===void 0||i.tabs.length<=0)return;let d=C(i.tabs,E=>E.current);d.some((E,l)=>i.tabs[l]!==E)&&$(d.indexOf(i.tabs[w.current]))});let G={ref:P};return S.createElement(ue,null,S.createElement(z.Provider,{value:B},S.createElement(j.Provider,{value:f},f.tabs.length<=0&&S.createElement(le,{onFocus:()=>{var d,E;for(let l of L.current)if(((d=l.current)==null?void 0:d.tabIndex)===0)return(E=l.current)==null||E.focus(),!0;return!1}}),_({ourProps:G,theirProps:g,slot:p,defaultTag:be,name:"Tabs"}))))}),me="div",ge=F(function(e,t){let{orientation:r,selectedIndex:n}=k("Tab.List"),a=M(t);return _({ourProps:{ref:a,role:"tablist","aria-orientation":r},theirProps:e,slot:{selectedIndex:n},defaultTag:me,name:"Tabs.List"})}),ve="button",Ie=F(function(e,t){var r,n;let a=Y(),{id:s=`headlessui-tabs-tab-${a}`,...u}=e,{orientation:g,activation:T,selectedIndex:b,tabs:c,panels:P}=k("Tab"),i=V("Tab"),m=k("Tab"),p=o.useRef(null),D=M(p,t);W(()=>i.registerTab(p),[i,p]);let L=Q("tabs"),f=c.indexOf(p);f===-1&&(f=L);let x=f===b,y=R(l=>{var h;let N=l();if(N===U.Success&&T==="auto"){let Z=(h=te(p))==null?void 0:h.activeElement,X=m.tabs.findIndex(ee=>ee.current===Z);X!==-1&&i.change(X)}return N}),$=R(l=>{let h=c.map(N=>N.current).filter(Boolean);if(l.key===v.Space||l.key===v.Enter){l.preventDefault(),l.stopPropagation(),i.change(f);return}switch(l.key){case v.Home:case v.PageUp:return l.preventDefault(),l.stopPropagation(),y(()=>A(h,I.First));case v.End:case v.PageDown:return l.preventDefault(),l.stopPropagation(),y(()=>A(h,I.Last))}if(y(()=>O(g,{vertical(){return l.key===v.ArrowUp?A(h,I.Previous|I.WrapAround):l.key===v.ArrowDown?A(h,I.Next|I.WrapAround):U.Error},horizontal(){return l.key===v.ArrowLeft?A(h,I.Previous|I.WrapAround):l.key===v.ArrowRight?A(h,I.Next|I.WrapAround):U.Error}}))===U.Success)return l.preventDefault()}),w=o.useRef(!1),B=R(()=>{var l;w.current||(w.current=!0,(l=p.current)==null||l.focus(),i.change(f),ne(()=>{w.current=!1}))}),G=R(l=>{l.preventDefault()}),d=o.useMemo(()=>({selected:x}),[x]),E={ref:D,onKeyDown:$,onMouseDown:G,onClick:B,id:s,role:"tab",type:ae(e,p),"aria-controls":(n=(r=P[f])==null?void 0:r.current)==null?void 0:n.id,"aria-selected":x,tabIndex:x?0:-1};return _({ourProps:E,theirProps:u,slot:d,defaultTag:ve,name:"Tabs.Tab"})}),Te="div",he=F(function(e,t){let{selectedIndex:r}=k("Tab.Panels"),n=M(t),a=o.useMemo(()=>({selectedIndex:r}),[r]);return _({ourProps:{ref:n},theirProps:e,slot:a,defaultTag:Te,name:"Tabs.Panels"})}),Pe="div",Ee=K.RenderStrategy|K.Static,ye=F(function(e,t){var r,n,a,s;let u=Y(),{id:g=`headlessui-tabs-panel-${u}`,tabIndex:T=0,...b}=e,{selectedIndex:c,tabs:P,panels:i}=k("Tab.Panel"),m=V("Tab.Panel"),p=o.useRef(null),D=M(p,t);W(()=>m.registerPanel(p),[m,p]);let L=Q("panels"),f=i.indexOf(p);f===-1&&(f=L);let x=f===c,y=o.useMemo(()=>({selected:x}),[x]),$={ref:D,id:g,role:"tabpanel","aria-labelledby":(n=(r=P[f])==null?void 0:r.current)==null?void 0:n.id,tabIndex:x?T:-1};return!x&&((a=b.unmount)==null||a)&&!((s=b.static)!=null&&s)?S.createElement(H,{as:"span",...$}):_({ourProps:$,theirProps:b,slot:y,defaultTag:Pe,features:Ee,visible:x,name:"Tabs.Panel"})}),Se=Object.assign(Ie,{Group:xe,List:ge,Panels:he,Panel:ye});export{Se as X};
