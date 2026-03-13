document.addEventListener("DOMContentLoaded", function(){

async function loadProducts(){

const res = await fetch('/feeds/posts/default?alt=json&max-results=50');
const data = await res.json();

const container = document.querySelector('#product-list');

container.innerHTML = "";

let i = 1;

data.feed.entry.forEach(post=>{

/* parsing html post */

const parser = new DOMParser();
const html = parser.parseFromString(post.content.$t,'text/html');

const json = html.querySelector('.product-json');

if(!json) return;

/* convert json */

const product = JSON.parse(json.textContent);


/* ambil data */

const title = product.title;
const image = product.image;
const category = product.category;
const author = product.author;
const rating = product.rating;
const reviews = product.reviews;
const demo = product.demo;
const price = product.price;


/* render html */

container.innerHTML += `

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

}

loadProducts();

});
