
//Yönlendirme
const linkButton = document.getElementById("newPost")
linkButton.addEventListener("click",(e)=>{
    e.preventDefault()
    window.location.href = "http://127.0.0.1:5500/client/login.html"
})

//Data Çağırma
/*Örnek Post    <li>
                <h2 class="title">title</h2>
                <p class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic iure, corporis explicabo similique atque exercitationem eveniet enim mollitia tempora autem vero expedita eius. Laudantium provident culpa officiis eligendi dolorem, iure ratione praesentium recusandae itaque ex eius laboriosam cumque impedit atque quam architecto! Sed temporibus cupiditate possimus velit perferendis sunt corrupti distinctio saepe iste earum, quia facere nobis placeat quos harum! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque expedita non dolore nobis repellendus voluptates? Velit atque pariatur amet dolore, repellat cum sunt deleniti nemo quasi excepturi eligendi similique dicta consequatur officia, commodi perferendis ea numquam ipsa! Perspiciatis amet sunt quae laboriosam autem hic, consequuntur eveniet accusantium repudiandae corporis ea.</p>
                <h2 class="tag">tag</h2>
            </li> */
const postList = document.getElementById("postList")
async function getData(){
await fetch("http://localhost:4000/getUser",{
    
})
.then(res => res.json())
.then(res2 => {
    mapArray(res2)
})
.catch(err => console.log("Hata",err))
}

function mapArray(array){
    array.map(item  => {
          itemUI(item)
    })
}
 function itemUI(item){
    const li = document.createElement("li")
    li.addEventListener("click",()=>{
        window.location.href = `http://127.0.0.1:5500/client/blog/post/${item._id.toString()}.html`
    })
    const h2 = document.createElement("h2")
    h2.classList.add("title")
    const p = document.createElement("p")
    p.classList.add("content")
    const h2_2 = document.createElement("h2")
    h2_2.classList.add("tag")
    h2.innerHTML ="Başlık => "+item.title
    p.innerHTML = "İçerik => "+item.content
    h2_2.innerHTML = "Tag => "+item.tag
    li.append(h2,p,h2_2)
    postList.append(li)
    
}

getData()
    
   