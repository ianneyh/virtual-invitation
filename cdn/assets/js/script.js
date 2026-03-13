async function loadProducts(category, containerId){

const url = "/feeds/posts/default?alt=json&max-results=20";

const res = await fetch(url);
const data = await res.json();

const posts = data.feed.entry || [];

let html = "";

posts.forEach(post => {

if(!post.category) return;

const labels = post.category.map(c => c.term);

if(!labels.includes(category)) return;

const title = post.title.$t;

const link = post.link.find(l => l.rel == "alternate").href;

let image = "";
try{
image = post.media$thumbnail.url.replace("/s72-c","/s500");
}catch(e){
image = "https://via.placeholder.com/500";
}

html += `
<li class='item animate animate_top'>
<div class='service_item overflow-hidden relative rounded-lg bg-white shadow-md duration-300 hover:shadow-xl'>

<a class='service_thumb' href='${link}'>
<img class='w-full' src='${image}' alt='${title}'>
</a>

<div class='service_info py-5 px-4'>

<a class='service_title text-title pt-2 duration-300 hover:text-primary' href='${link}'>
${title}
</a>

</div>

</div>
</li>
`;

});

document.querySelector(containerId).innerHTML = html;

}


// klik tab
document.querySelectorAll(".tab_btn").forEach(btn=>{

btn.addEventListener("click",function(){

const category = this.dataset.category;
const panel = this.getAttribute("aria-controls");

loadProducts(category,"#"+panel+" ul");

});

});


// load pertama
loadProducts("html","#services_01 ul");
