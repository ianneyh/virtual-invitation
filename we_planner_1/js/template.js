document.addEventListener("DOMContentLoaded",()=>{

const slug=location.pathname.replace(/\//g,'');
alert(slug);
fetch(`/feeds/posts/default/-/${slug}?alt=json`)
.then(r=>r.json())
.then(j=>{

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

/* whatsapp */
document.querySelectorAll('[data-wa]').forEach(e=>{
 e.href=`https://wa.me/${data.wa}`;
});

});
});
