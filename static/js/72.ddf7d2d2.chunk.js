"use strict";(self.webpackChunkhealth_project_app=self.webpackChunkhealth_project_app||[]).push([[72],{4987:(e,a,l)=>{l.d(a,{A:()=>D});var r=l(5043),i=l(3003),t=l(6),s=l(9375),o=l(5475);const n={container:"RecommendedDaily_container__-GZ6P",title:"RecommendedDaily_title__NqbWN",recommendedCalories:"RecommendedDaily_recommendedCalories__mHniM",smallText:"RecommendedDaily_smallText__hpo-V",boldText:"RecommendedDaily_boldText__7qrWb",listContainer:"RecommendedDaily_listContainer__IkKIn",list:"RecommendedDaily_list__BXp5-"};var c=l(579);const d=e=>{let{recommendedDailyCaloriesIntake:a,restrictedAliments:l}=e;return(0,c.jsxs)("div",{className:n.container,children:[(0,c.jsx)("div",{className:n.caloriesContainer,children:(0,c.jsxs)("h2",{className:n.title,children:["Your recommended daily calorie intake is",(0,c.jsxs)("span",{className:n.recommendedCalories,children:[Math.round(a),(0,c.jsx)("span",{className:n.smallText,children:"Kcal"})]})]})}),(0,c.jsxs)("div",{className:n.listContainer,children:[(0,c.jsx)("h3",{className:n.boldText,children:"Foods you should not eat"}),(0,c.jsx)("ol",{className:n.list,children:l.slice(0,4).map(((e,a)=>(0,c.jsx)("li",{children:e.title},a)))})]}),(0,c.jsxs)(o.N_,{to:"/login",children:[" ",(0,c.jsx)(t.A,{text:"Start losing weight"})]})]})},m="CalorieCalculatorForm_formContainer__XHb2D",h="CalorieCalculatorForm_title__2IyOa",u="CalorieCalculatorForm_flexContainer__0uIhp",_="CalorieCalculatorForm_form__CEL9M",C="CalorieCalculatorForm_leftContainer__i9ln7",x="CalorieCalculatorForm_rightContainer__A1S96",g="CalorieCalculatorForm_inputContainer__+MbjP",p="CalorieCalculatorForm_label__jVmrC",j="CalorieCalculatorForm_input__wbDuC",N="CalorieCalculatorForm_radioGroup__W6Fp3",b="CalorieCalculatorForm_radioLabelText__pOM11",v="CalorieCalculatorForm_radioLabel__pRrp6",y="CalorieCalculatorForm_button__Tx2uE",F="CalorieCalculatorForm_radioContainer__QcoRj";var W=l(2879);const D=e=>{let{apiCallFunction:a}=e;const l=(0,i.d4)(W.Ge),o=(0,i.d4)(W.ZA),n=(0,i.wA)(),[D,A]=(0,r.useState)({height:"",desiredWeight:"",age:"",currentWeight:"",bloodGroupIndex:""}),[w,I]=(0,r.useState)(null),[k,f]=(0,r.useState)(!1),G=e=>{const{name:a,value:l}=e.target;A({...D,[a]:l})};return(0,c.jsx)("section",{children:(0,c.jsxs)("div",{className:m,children:[(0,c.jsx)("h1",{className:h,children:"Calculate your daily calorie intake right now"}),(0,c.jsxs)("form",{className:_,onSubmit:async e=>{e.preventDefault();const l={...D,height:Number(D.height),desiredWeight:Number(D.desiredWeight),age:Number(D.age),currentWeight:Number(D.currentWeight),bloodGroupIndex:Number(D.bloodGroupIndex)};try{const e=await n(a(l));console.log(e),I(e),f(!0)}catch(r){console.error("Error fetching data:",r)}},children:[(0,c.jsxs)("div",{className:u,children:[(0,c.jsxs)("div",{className:C,children:[(0,c.jsxs)("div",{className:g,children:[(0,c.jsx)("input",{type:"number",id:"height",name:"height",placeholder:"Height",value:D.height,onChange:G,className:j,required:!0}),(0,c.jsx)("label",{htmlFor:"height",className:p,children:"Height *"})]}),(0,c.jsxs)("div",{className:g,children:[(0,c.jsx)("input",{type:"number",id:"age",name:"age",placeholder:"Age",value:D.age,onChange:G,className:j,required:!0}),(0,c.jsx)("label",{htmlFor:"age",className:p,children:"Age *"})]}),(0,c.jsxs)("div",{className:g,children:[(0,c.jsx)("input",{type:"number",id:"currentWeight",name:"currentWeight",placeholder:"Current weight",value:D.currentWeight,onChange:G,className:j,required:!0}),(0,c.jsx)("label",{htmlFor:"currentWeight",className:p,children:"Current weight *"})]})]}),(0,c.jsxs)("div",{className:x,children:[(0,c.jsxs)("div",{className:g,children:[(0,c.jsx)("input",{type:"number",id:"desiredWeight",name:"desiredWeight",placeholder:"Desired weight",value:D.desiredWeight,onChange:G,className:j,required:!0}),(0,c.jsx)("label",{htmlFor:"desiredWeight",className:p,children:"Desired weight *"})]}),(0,c.jsxs)("div",{className:F,children:[(0,c.jsx)("label",{className:b,children:"Blood type *"}),(0,c.jsx)("div",{className:N,children:["1","2","3","4"].map((e=>(0,c.jsxs)("label",{className:v,children:[(0,c.jsx)("input",{type:"radio",name:"bloodGroupIndex",value:e,checked:D.bloodGroupIndex===e,onChange:G,required:!0}),e]},e)))})]})]})]}),(0,c.jsx)(t.A,{text:"Start losing weight",type:"submit",extraClass:y})]}),k&&w&&(0,c.jsx)(s.A,{handleModalClose:()=>{f(!1)},isVisible:k,children:(0,c.jsx)(d,{recommendedDailyCaloriesIntake:l,restrictedAliments:o})})]})})}},5072:(e,a,l)=>{l.r(a),l.d(a,{default:()=>s});l(5043);var r=l(4987),i=l(6911),t=l(579);const s=()=>(0,t.jsx)(r.A,{apiCallFunction:i.KL})},2879:(e,a,l)=>{l.d(a,{Ge:()=>i,VW:()=>r,ZA:()=>t});const r=e=>e.product.products,i=e=>e.product.recommendedDailyCaloriesIntake,t=e=>e.product.restrictedAliments}}]);
//# sourceMappingURL=72.ddf7d2d2.chunk.js.map