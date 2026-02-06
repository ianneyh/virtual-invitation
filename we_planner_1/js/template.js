(async()=>{

const slug=location.pathname.replace(/\//g,'');

 alert(slug + ' ada');
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



})();
