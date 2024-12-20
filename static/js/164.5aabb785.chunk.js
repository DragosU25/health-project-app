"use strict";(self.webpackChunkhealth_project_app=self.webpackChunkhealth_project_app||[]).push([[164],{4987:(e,a,r)=>{r.d(a,{A:()=>f});var s=r(9379),l=r(5043),t=r(3003),i=r(6),n=r(9375),o=r(5475);const d={container:"RecommendedDaily_container__-GZ6P",title:"RecommendedDaily_title__NqbWN",recommendedCalories:"RecommendedDaily_recommendedCalories__mHniM",smallText:"RecommendedDaily_smallText__hpo-V",boldText:"RecommendedDaily_boldText__7qrWb",listContainer:"RecommendedDaily_listContainer__IkKIn",list:"RecommendedDaily_list__BXp5-"};var c=r(579);const m=e=>{let{recommendedDailyCaloriesIntake:a,restrictedAliments:r}=e;return(0,c.jsxs)("div",{className:d.container,children:[(0,c.jsx)("div",{className:d.caloriesContainer,children:(0,c.jsxs)("h2",{className:d.title,children:["Your recommended daily calorie intake is",(0,c.jsxs)("span",{className:d.recommendedCalories,children:[Math.round(a),(0,c.jsx)("span",{className:d.smallText,children:"Kcal"})]})]})}),(0,c.jsxs)("div",{className:d.listContainer,children:[(0,c.jsx)("h3",{className:d.boldText,children:"Foods you should not eat"}),(0,c.jsx)("ol",{className:d.list,children:r.slice(0,4).map(((e,a)=>(0,c.jsx)("li",{children:e.title},a)))})]}),(0,c.jsxs)(o.N_,{to:"/login",children:[" ",(0,c.jsx)(i.A,{text:"Start losing weight"})]})]})},h="CalorieCalculatorForm_formContainer__XHb2D",u="CalorieCalculatorForm_title__2IyOa",_="CalorieCalculatorForm_flexContainer__0uIhp",x="CalorieCalculatorForm_form__CEL9M",C="CalorieCalculatorForm_leftContainer__i9ln7",j="CalorieCalculatorForm_rightContainer__A1S96",p="CalorieCalculatorForm_inputContainer__+MbjP",g="CalorieCalculatorForm_label__jVmrC",N="CalorieCalculatorForm_input__wbDuC",b="CalorieCalculatorForm_radioGroup__W6Fp3",v="CalorieCalculatorForm_radioLabelText__pOM11",y="CalorieCalculatorForm_radioLabel__pRrp6",A="CalorieCalculatorForm_button__Tx2uE",F="CalorieCalculatorForm_radioContainer__QcoRj";var W=r(2879);const f=e=>{let{apiCallFunction:a}=e;const r=(0,t.d4)(W.Ge),o=(0,t.d4)(W.ZA),d=(0,t.wA)(),[f,k]=(0,l.useState)({height:"",desiredWeight:"",age:"",currentWeight:"",bloodGroupIndex:""}),[D,T]=(0,l.useState)(null),[I,R]=(0,l.useState)(!1),S=e=>{const{name:a,value:r}=e.target;k((0,s.A)((0,s.A)({},f),{},{[a]:r}))};return(0,c.jsx)("section",{children:(0,c.jsxs)("div",{className:h,children:[(0,c.jsx)("h1",{className:u,children:"Calculate your daily calorie intake right now"}),(0,c.jsxs)("form",{className:x,onSubmit:async e=>{e.preventDefault();const r=(0,s.A)((0,s.A)({},f),{},{height:Number(f.height),desiredWeight:Number(f.desiredWeight),age:Number(f.age),currentWeight:Number(f.currentWeight),bloodGroupIndex:Number(f.bloodGroupIndex)});try{const e=await d(a(r));console.log(e),T(e),R(!0)}catch(l){console.error("Error fetching data:",l)}},children:[(0,c.jsxs)("div",{className:_,children:[(0,c.jsxs)("div",{className:C,children:[(0,c.jsxs)("div",{className:p,children:[(0,c.jsx)("input",{type:"number",id:"height",name:"height",placeholder:"Height",value:f.height,onChange:S,className:N,required:!0}),(0,c.jsx)("label",{htmlFor:"height",className:g,children:"Height *"})]}),(0,c.jsxs)("div",{className:p,children:[(0,c.jsx)("input",{type:"number",id:"age",name:"age",placeholder:"Age",value:f.age,onChange:S,className:N,required:!0}),(0,c.jsx)("label",{htmlFor:"age",className:g,children:"Age *"})]}),(0,c.jsxs)("div",{className:p,children:[(0,c.jsx)("input",{type:"number",id:"currentWeight",name:"currentWeight",placeholder:"Current weight",value:f.currentWeight,onChange:S,className:N,required:!0}),(0,c.jsx)("label",{htmlFor:"currentWeight",className:g,children:"Current weight *"})]})]}),(0,c.jsxs)("div",{className:j,children:[(0,c.jsxs)("div",{className:p,children:[(0,c.jsx)("input",{type:"number",id:"desiredWeight",name:"desiredWeight",placeholder:"Desired weight",value:f.desiredWeight,onChange:S,className:N,required:!0}),(0,c.jsx)("label",{htmlFor:"desiredWeight",className:g,children:"Desired weight *"})]}),(0,c.jsxs)("div",{className:F,children:[(0,c.jsx)("label",{className:v,children:"Blood type *"}),(0,c.jsx)("div",{className:b,children:["1","2","3","4"].map((e=>(0,c.jsxs)("label",{className:y,children:[(0,c.jsx)("input",{type:"radio",name:"bloodGroupIndex",value:e,checked:f.bloodGroupIndex===e,onChange:S,required:!0}),e]},e)))})]})]})]}),(0,c.jsx)(i.A,{text:"Start losing weight",type:"submit",extraClass:A})]}),I&&D&&(0,c.jsx)(n.A,{handleModalClose:()=>{R(!1)},isVisible:I,children:(0,c.jsx)(m,{recommendedDailyCaloriesIntake:r,restrictedAliments:o})})]})})}},3183:(e,a,r)=>{r.d(a,{A:()=>x});var s=r(5043),l=r(3003);const t={sidebar:"Sidebar_sidebar__zfhso",notRecommendedContainer:"Sidebar_notRecommendedContainer__Ukt5h",title:"Sidebar_title__mzY+F",summaryText:"Sidebar_summaryText__EMBZk",summaryContainer:"Sidebar_summaryContainer__KdhAr"};var i=r(1696);const n="NotRecommendedList_title__Qm+vL",o="NotRecommendedList_list__RzvCA",d="NotRecommendedList_item__ncFsV";var c=r(579);const m=e=>{let{restrictedAliments:a}=e;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("h3",{className:n,children:"Food not recommended"}),(0,c.jsx)("ul",{className:o,children:a.slice(0,4).map((e=>(0,c.jsx)("li",{className:d,children:e.title},e._id)))})]})};var h=r(266),u=r(2879),_=r(6911);const x=()=>{const e=(0,l.d4)(i.mB),a=(0,l.d4)(u.T),r=localStorage.getItem("date"),n=(0,l.wA)();(0,s.useEffect)((()=>{r&&(n((0,_.IO)(r)),n((0,h.HW)()))}),[n,r]);const o=e.restrictedAliments||[],d=a.filter((e=>new Date(e.date).toISOString().split("T")[0]===r)).reduce(((e,a)=>e+(a.calories||0)),0),x=e.dailyCalorieIntake,C=Math.round(d/x*100),j=x-d;return(0,c.jsxs)("div",{className:t.sidebar,children:[(0,c.jsxs)("div",{className:t.summary,children:[(0,c.jsxs)("h3",{className:t.title,children:["Summary for ",r]}),(0,c.jsxs)("div",{className:t.summaryContainer,children:[(0,c.jsxs)("p",{className:t.summaryText,children:["Left: ",(0,c.jsxs)("span",{children:[" ",Math.round(j)," kcal"]})]}),(0,c.jsxs)("p",{className:t.summaryText,children:["Consumed: ",(0,c.jsxs)("span",{children:[Math.round(d)," kcal"]})]}),(0,c.jsxs)("p",{className:t.summaryText,children:["Daily rate: ",(0,c.jsxs)("span",{children:[x," kcal"]})]}),(0,c.jsxs)("p",{className:t.summaryText,children:["% of normal: ",(0,c.jsxs)("span",{children:[Math.round(C),"%"]})]})]})]}),(0,c.jsx)("div",{className:t.notRecommendedContainer,children:(0,c.jsx)(m,{restrictedAliments:o})})]})}},5164:(e,a,r)=>{r.r(a),r.d(a,{default:()=>o});r(5043);var s=r(4987),l=r(6911),t=r(3183);const i="CalculatorPage_container__158vw";var n=r(579);const o=()=>(0,n.jsxs)("div",{className:i,children:[(0,n.jsx)(s.A,{apiCallFunction:l.$J}),(0,n.jsx)(t.A,{})]})},2879:(e,a,r)=>{r.d(a,{Ge:()=>l,T:()=>i,VW:()=>s,ZA:()=>t});const s=e=>e.product.products,l=e=>e.product.recommendedDailyCaloriesIntake,t=e=>e.product.restrictedAliments,i=e=>e.product.consumedProducts}}]);
//# sourceMappingURL=164.5aabb785.chunk.js.map