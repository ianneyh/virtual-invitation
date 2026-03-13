const BLOG_URL = location.origin

async function loadProducts(category){

const url = BLOG_URL + "/feeds/posts/default?alt=json&max-results=20"

const res = await fetch(url)
const data = await res.json()

const posts = data.feed.entry || []

const list = document.querySelector('[data-list="'+category+'"]')

if(!list) return

let html = ""

posts.forEach(post=>{

if(!post.category) return

const labels = post.category.map(c=>c.term)

if(!labels.includes(category)) return

const title = post.title.$t

const link = post.link.find(l=>l.rel=="alternate").href

let img="https://via.placeholder.com/500"

if(post.media$thumbnail){
img = post.media$thumbnail.url.replace("s72-c","s500")
}

html += `
<li class='item animate animate_top'>

<div class='service_item overflow-hidden relative rounded-lg bg-white shadow-md duration-300 hover:shadow-xl'>

<a class='service_thumb' href='${link}'>
<img class='w-full' src='${img}' alt='${title}'>
</a>

<div class='service_info py-5 px-4'>

<div class='flex items-center justify-between'>
<span class='tag caption2 bg-surface'>${category}</span>
</div>

<a class='service_title text-title pt-2 duration-300 hover:text-primary' href='${link}'>
${title}
</a>

</div>

</div>

</li>
`

})

list.innerHTML = html || "<p>No products</p>"

}


// TAB CLICK
document.querySelectorAll(".tab_btn").forEach(btn=>{

btn.addEventListener("click",function(){

document.querySelectorAll(".tab_btn").forEach(b=>b.classList.remove("active"))
this.classList.add("active")

const panel = this.getAttribute("aria-controls")

document.querySelectorAll(".tab_list").forEach(p=>p.classList.remove("active"))

document.getElementById(panel).classList.add("active")

const category = this.dataset.category

loadProducts(category)

})

})


// FIRST LOAD
document.addEventListener("DOMContentLoaded",()=>{

loadProducts("graphic")

})
