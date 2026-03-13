async function loadProducts(category, panelId){

const url = "/feeds/posts/default?alt=json&max-results=20";

try{

const response = await fetch(url);
const data = await response.json();

const posts = data.feed.entry || [];

const list = document.querySelector("#"+panelId+" ul");

if(!list) return;

let html = "";

posts.forEach(post=>{

if(!post.category) return;

const labels = post.category.map(c=>c.term);

if(!labels.includes(category)) return;

const title = post.title.$t;

const link = post.link.find(l=>l.rel==="alternate").href;

let image = "";

if(post.media$thumbnail){
image = post.media$thumbnail.url.replace("s72-c","s500");
}else{
image = "https://via.placeholder.com/500";
}

html += `
<li class='item animate animate_top'>
<div class='service_item overflow-hidden relative rounded-lg bg-white shadow-md duration-300 hover:shadow-xl'>

<a class='service_thumb' href='${link}'>
<img class='w-full' src='${image}' alt='${title}'>
</a>

<div class='service_info py-5 px-4'>

<div class='flex items-center justify-between'>
<span class='tag caption2 bg-surface'>${category}</span>
</div>

<a class='service_title text-title pt-2 duration-300 hover:text-primary' href='${link}'>
${title}
</a>

<div class='service_more_info flex items-center justify-between gap-1 mt-4 pt-4 border-t border-line'>
<span class='service_author_name'>Digital Asset</span>

<div class='service_price whitespace-nowrap'>
<span class='price text-title'>View</span>
</div>

</div>

</div>
</div>
</li>
`;

});

list.innerHTML = html;

}catch(e){

console.log("Error loading products",e);

}

}


// event klik tab
document.querySelectorAll(".tab_btn").forEach(btn=>{

btn.addEventListener("click",function(){

const category = this.dataset.category;

const panel = this.getAttribute("aria-controls");

loadProducts(category,panel);

});

});


// load awal
document.addEventListener("DOMContentLoaded",function(){

const firstTab = document.querySelector(".tab_btn.active");

if(firstTab){

const category = firstTab.dataset.category;
const panel = firstTab.getAttribute("aria-controls");

loadProducts(category,panel);

}

});

