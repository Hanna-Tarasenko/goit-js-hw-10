import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as y,i as p}from"./assets/vendor-BbbuE1sJ.js";const s=document.querySelector("#datetime-picker"),c=document.querySelector("button"),D=document.querySelector("span[data-days]"),S=document.querySelector("span[data-hours]"),b=document.querySelector("span[data-minutes]"),q=document.querySelector("span[data-seconds");let a=null,i=null;const C={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=t[0],n=e>=new Date;n||p.error({title:"Error",message:"Please choose a date in the future"}),c.disabled=!n,a=n?e:a}};y(s,C);c.addEventListener("click",g);function g(){a&&(c.disabled=!0,s.disabled=!0,i=setInterval(()=>{const t=a-new Date;if(t<=0){clearInterval(i),d(0,0,0,0),s.disabled=!1;return}const e=r(t);d(e.days,e.hours,e.minutes,e.seconds)},1e3))}function d(t,e,n,u){D.textContent=o(t),S.textContent=o(e),b.textContent=o(n),q.textContent=o(u)}function o(t){return String(t).padStart(2,"0")}function r(t){const l=Math.floor(t/864e5),m=Math.floor(t%864e5/36e5),f=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:f,seconds:h}}console.log(r(2e3));console.log(r(14e4));console.log(r(2414e4));
//# sourceMappingURL=1-timer.js.map
