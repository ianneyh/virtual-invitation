(async()=>{

const slug=location.pathname.replace(/\//g,'');

 alert(slug + ' 1234');
const r=await fetch(`/feeds/posts/default/-/${slug}?alt=json`);
const j=await r.json();
if(!j.feed.entry)return;

const html=j.feed.entry[0].content.$t;
const data=JSON.parse(
new DOMParser().parseFromString(html,'text/html')
.querySelector('#page-data').textContent);

const get=p=>p.split('.').reduce((a,b)=>a[b],data);

/* text */
document.querySelectorAll('[data-json]').forEach(e=>{
 e.innerHTML=get(e.dataset.json);
});

/* image */
document.querySelectorAll('[data-img]').forEach(e=>{
 e.src=get(e.dataset.img);
});

/* icon */
document.querySelectorAll('[data-icon]').forEach(e=>{
 e.className=get(e.dataset.icon);
});

/* buttons */
document.querySelectorAll('[data-btn]').forEach(e=>{
 let d=get(e.dataset.btn);
 e.innerHTML=d.text;
 e.href=d.link;
});

/* menu */
document.querySelector('[data-menu]').innerHTML=
data.menu.map(m=>`
<li class="nav-item">
<a class="nav-link" href="${m.link}">${m.text}</a>
</li>`).join('');

 /* multiple background */
document.querySelectorAll('[data-bg]').forEach(e=>{
 try{
   e.style.backgroundImage=`url(${get(e.dataset.bg)})`;
 }catch{}
});

  /* multiple video */
document.querySelectorAll('[data-video]').forEach(e=>{
 try{e.href=data.moreFeatures.video}catch{}
});

  /* multiple social */
document.querySelectorAll('[data-social]').forEach(e=>{
 try{e.href=get(e.dataset.social)}catch{}
});




})();
