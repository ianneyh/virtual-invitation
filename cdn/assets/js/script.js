async function loadProducts(category){

const feed = await fetch('/feeds/posts/default?alt=json');
const data = await feed.json();

const container = document.getElementById('product-list');
container.innerHTML='';

data.feed.entry.forEach(post=>{

const parser = new DOMParser();
const html = parser.parseFromString(post.content.$t,'text/html');

const json = html.querySelector('.product-json');

if(!json) return;

const product = JSON.parse(json.textContent);

if(product.category !== category) return;

container.innerHTML += `
<li class="item animate animate_top" style="--i:1">

<div class="service_item overflow-hidden relative rounded-lg bg-white shadow-md duration-300 hover:shadow-xl">

<button class="add_wishlist_btn">
<span class="ph ph-heart text-xl"></span>
<span class="ph-fill ph-heart text-xl"></span>
<span class="blind">button add to wishlist</span>
</button>

<a class="service_thumb" href="${product.demo}">
<img alt="${product.title}" class="w-full" src="${product.image}">
</a>

<div class="service_info py-5 px-4">

<div class="flex items-center justify-between">

<a class="tag caption2 bg-surface hover:bg-primary hover:text-white">
${product.category}
</a>

<div class="rate flex items-center gap-1">
<span class="ph-fill ph-star text-yellow text-xs"></span>
<strong class="service_rate text-button-sm">${product.rating}</strong>
<span class="service_rate_quantity caption1 text-secondary">(${product.reviews})</span>
</div>

</div>

<a class="service_title text-title pt-2 duration-300 hover:text-primary" href="${product.demo}">
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

}

document.querySelectorAll('.tab_btn').forEach(btn=>{

btn.onclick = ()=>{
document.querySelectorAll('.tab_btn').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
loadProducts(btn.dataset.category);
}

});

loadProducts('wordpress');
