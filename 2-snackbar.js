import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as s}from"./assets/vendor-BbbuE1sJ.js";const l=document.querySelector(".form");function c(i){i.preventDefault();const r=i.target,e=r.elements.delay.value,n=r.elements.state.value;console.log({time:`${e}`,radio:`${n}`});const o=new Promise((t,m)=>{setTimeout(()=>{n==="fulfilled"?t():m()},e)});o.then(t=>{s.warning({backgroundColor:"#59A10D",position:"center",title:" OK",iconUrl:"img/bi_check2-circle.png",message:`✅ Fulfilled promise in ${e} ms`})}),o.catch(t=>{s.warning({backgroundColor:"#EF4040",position:"center",title:"Error",iconUrl:"img/Group.png",message:`❌ Rejected promise in ${e} ms`})}),console.log(o),l.reset()}l.addEventListener("submit",c);
//# sourceMappingURL=2-snackbar.js.map
