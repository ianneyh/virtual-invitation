document.addEventListener("DOMContentLoaded", function(){

/* function load kategori */

async function loadCategory(category){

const url = `/feeds/posts/default/-/${category}?alt=json&max-results=10`;

try{

const res = await fetch(url);
const data = await res.json();

const ul = document.getElementById(category);

if(!ul) return;

ul.innerHTML = "";

let i = 1;

data.feed.entry.forEach(post=>{

const parser = new DOMParser();
const html = parser.parseFromString(post.content.$t,'text/html');

const json = html.querySelector('.product-json');
if(!json) return;

const product = JSON.parse(json.textContent);

const title = product.title;
const image = product.image;
const author = product.author;
const rating = product.rating;
const reviews = product.reviews;
const demo = product.demo;
const price = product.price;

/* render */

ul.innerHTML += `

<li class="item animate animate_top" style="--i:${i++}">

<div class="service_item overflow-hidden relative rounded-lg bg-white shadow-md duration-300 hover:shadow-xl">

<button class="add_wishlist_btn">
<span class="ph ph-heart text-xl"></span>
<span class="ph-fill ph-heart text-xl"></span>
<span class="blind">button add to wishlist</span>
</button>

<a class="service_thumb" href="${demo}">
<img alt="${title}" class="w-full" src="${image}">
</a>

<div class="service_info py-5 px-4">

<div class="flex items-center justify-between">

<a class="tag caption2 bg-surface hover:bg-primary hover:text-white">
${category}
</a>

<div class="rate flex items-center gap-1">
<span class="ph-fill ph-star text-yellow text-xs"></span>
<strong class="service_rate text-button-sm">${rating}</strong>
<span class="service_rate_quantity caption1 text-secondary">(${reviews})</span>
</div>

</div>

<a class="service_title text-title pt-2 duration-300 hover:text-primary" href="${demo}">
${title}
</a>

<div class="service_more_info flex items-center justify-between gap-1 mt-4 pt-4 border-t border-line">

<a class="service_author flex items-center gap-2">

<img class="service_author_avatar w-8 h-8 rounded-full"
src="https://ui-avatars.com/api/?name=${encodeURIComponent(author)}">

<span class="service_author_name -style-1">
${author}
</span>

</a>

<div class="service_price whitespace-nowrap">
<span class="text-secondary">From </span>
<span class="price text-title">$${price}</span>
</div>

</div>

</div>

</div>

</li>

`;

});

}catch(err){

console.error("Error load category:",category,err);

}

}


/* auto load semua kategori */

document.querySelectorAll(".tab_list ul").forEach(ul=>{

const category = ul.id;

loadCategory(category);

});

});


document.addEventListener("DOMContentLoaded", function(){
const postUrl = post.link.find(l => l.rel === "alternate").href;
const maxResults = 8;

/* ambil label dari URL */

function getLabel(){

const path = window.location.pathname;

const match = path.match(/search\/label\/([^/?]+)/);

if(match){
return decodeURIComponent(match[1]);
}

return null;

}

const label = getLabel();

/* load produk */

async function loadProducts(page=1){

if(!label) return;

const startIndex = ((page-1) * maxResults) + 1;

const url = `/feeds/posts/default/-/${label}?alt=json&max-results=${maxResults}&start-index=${startIndex}`;

const res = await fetch(url);
const data = await res.json();

const container = document.getElementById("product-list");

container.innerHTML = "";

let i = 1;

data.feed.entry.forEach(post=>{

const parser = new DOMParser();
const html = parser.parseFromString(post.content.$t,"text/html");

const json = html.querySelector(".product-json");

if(!json) return;

const product = JSON.parse(json.textContent);

container.innerHTML += `

<li class="item h-full">

<div class="service_item overflow-hidden relative rounded-lg h-full bg-white shadow-md duration-300 hover:shadow-xl">

<button class="add_wishlist_btn">
<span class="ph ph-heart text-xl"></span>
<span class="ph-fill ph-heart text-xl"></span>
</button>

<a class="service_thumb" href="${postUrl}">
<img class="w-full" src="${product.image}" alt="${product.title}">
</a>

<div class="service_info py-5 px-4">

<div class="flex items-center justify-between">

<a class="tag caption2 bg-surface hover:bg-primary hover:text-white">
${product.category}
</a>

<div class="rate flex items-center gap-1">
<span class="ph-fill ph-star text-yellow text-xs"></span>
<strong class="service_rate text-button-sm">${product.rating}</strong>
<span class="service_rate_quantity caption1 text-secondary">
(${product.reviews})
</span>
</div>

</div>

<a class="service_title text-title pt-2 duration-300 hover:text-primary"
href="${postUrl}">
${product.title}
</a>

<div class="service_more_info flex items-center justify-between gap-1 mt-4 pt-4 border-t border-line">

<a class="service_author flex items-center gap-2">

<img class="service_author_avatar w-8 h-8 rounded-full"
src="https://ui-avatars.com/api/?name=${encodeURIComponent(product.author)}">

<span class="service_author_name -style-1">
${product.author}
</span>

</a>

<div class="service_price whitespace-nowrap">
<span class="text-secondary">From </span>
<span class="price text-title">$${product.price}</span>
</div>

</div>

</div>

</div>

</li>

`;

});

createPagination(page);

}

/* pagination */

function createPagination(current){

const pagination = document.getElementById("pagination");

pagination.innerHTML = "";

for(let i=1;i<=5;i++){

pagination.innerHTML += `

<li>
<a href="#"
class="tab_btn -fill flex items-center justify-center w-10 h-10 rounded border border-line text-title duration-300 hover:border-black ${i===current?'active':''}"
data-page="${i}">
${i}
</a>
</li>

`;

}

/* click pagination */

pagination.querySelectorAll("a").forEach(btn=>{

btn.onclick = e =>{

e.preventDefault();

const page = btn.dataset.page;

loadProducts(page);

};

});

}

/* start */

loadProducts(1);

});

alert('b');

