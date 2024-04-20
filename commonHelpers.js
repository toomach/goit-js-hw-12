import{a as w,S,i as h}from"./assets/vendor-06b1bbdf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const v="43236176-8efbdba212834d112cbf0fa21",P="https://pixabay.com/api/?",p=15;async function g(e,t=1){try{return(await w.get(P,{params:{key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:p}})).data}catch(o){throw new Error(o.response.statusText)}}const q=new S(".gallery-list a",{captionsData:"alt",captionDelay:250});function y(e,t){e.innerHTML+=M(t),q.refresh()}function M(e){return e.map(({webformatURL:t,largeImageURL:o,tags:l,likes:r,views:s,comments:i,downloads:b})=>` <li class="gallery-item">
        <a class="gallery-link" href="${o}">
          <figure class="gallery-figure">
            <img
              class="gallery-image"
              src="${t}"
              alt="${l}"
              width="360"
            />
            <figcaption class="gallery-figcaption">
              <ul class="gallery-text">
                <li>
                  <span>Likes</span>
                  <p>${r}</p>
                </li>
                <li>
                  <span>Views</span>
                  <p>${s}</p>
                </li>
                <li>
                  <span>Comments</span>
                  <p>${i}</p>
                </li>
                <li>
                  <span>Downloads</span>
                  <p>${b}</p>
                </li>
              </ul>
            </figcaption>
          </figure>
        </a>
      </li>`).join("")}const m=document.querySelector(".js-search-form"),E=document.querySelector(".search-input"),d=document.querySelector(".gallery-list"),u=document.querySelector(".loader-wrapper"),n=document.querySelector(".load-more-btn");let a=1,c="";m.addEventListener("submit",$);n.addEventListener("click",H);async function $(e){if(e.preventDefault(),d.innerHTML="",a=1,c=E.value.trim(),n.classList.add("is-hidden"),c===""){f("Please fill out the input field!");return}u.classList.remove("is-hidden");try{const t=await g(c,a);if(t.hits.length===0){f("Sorry, there are no images matching your search query. Please try again!");return}y(d,t.hits),O(t.totalHits)}catch(t){console.error(t)}finally{u.classList.add("is-hidden"),m.reset()}}async function H(){a+=1,u.classList.remove("is-hidden");try{const e=await g(c,a);if(e.hits.length===0){n.classList.add("is-hidden"),f("We're sorry, but you've reached the end of search results.");return}y(d,e.hits),x();const t=Math.ceil(e.totalHits/p);a>=t&&(n.classList.add("is-hidden"),h.info({...L,message:"We're sorry, but you've reached the end of search results."}))}catch(e){console.error(e)}finally{u.classList.add("is-hidden")}}function O(e){e>p&&n.classList.remove("is-hidden")}function x(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}const L={title:"",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff",timeout:3e3,pauseOnHover:!1};function f(e){h.error({...L,message:`${e}`})}
//# sourceMappingURL=commonHelpers.js.map
