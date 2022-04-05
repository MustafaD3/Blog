
function loginControl(){
    if(localStorage.getItem("user")){
        const id = localStorage.getItem("user")
        const options ={
            method:"POST",
            header:{
                "content:type":"application/json"
            },
            redirect:"follow",
            body:id
        }
        fetch("http://localhost:4000/control",options)
            .then(async res =>{
                let bool =await res.text()
                if(bool === "false"){
                    alert("Kullanıcı Bulunamadı Lütfen Giriş Yapınız")
                    window.location.href = "http://127.0.0.1:5500/client/login.html"
                }
                else{
                    document.body.style.display = "block"
                }

                
            })
            .catch(err => {
                console.log(err)
            })
    }
    else{
        alert("Kullanıcı Bulunamadı Lütfen Giriş Yapınız")
        window.location.href = "http://127.0.0.1:5500/client/login.html"
    }
}
loginControl()

window.addEventListener("load",()=>{
    //Çıkış Button
    const logOutButton = document.getElementById("logOut")
    logOutButton.addEventListener("click",()=>{
        localStorage.removeItem("user")
        alert("Çıkış Yaptınız\n\nAnasayfaya Yönlendiriliyorsunuz...")
        window.location.href = "http://127.0.0.1:5500/client/login.html"
    })
    //Çıkış Button Bitiş
    //Arka plan renk seçimi
    const background = document.getElementById("background")
    background.addEventListener("click",backgroundBlog)
    function backgroundBlog(e){
        e.preventDefault()
        if(e.target.innerHTML=="Default Background"){
            localStorage.removeItem("background")
        }
        
        else if(e.target.innerHTML=="#646BFA"){
            localStorage.setItem("background","#646BFA")
        }
        
       else if(e.target.innerHTML=="#FA3CBB"){
        localStorage.setItem("background","#FA3CBB")
        }
        
        else if(e.target.innerHTML=="#F05137"){
            localStorage.setItem("background","#F05137")
        }
    }
    //post Atma
    const titleInput = document.getElementById("title")
    const contentInput = document.getElementById("content")
    const tagInput = document.getElementById("tag")
    const postButton = document.getElementById("postButton")
    postButton.addEventListener("click",(e)=>{
        e.preventDefault()
        if(titleInput.value&&contentInput.value&&tagInput.value){
           const data = new Object()
           data.title = titleInput.value
           data.content = contentInput.value
           data.tag = tagInput.value
            postFetch(data).then(res =>{
                alert(res+"\n\n Yönlendiriliyorsunuz")
                setTimeout(()=>{
                    window.location.href = "http://127.0.0.1:5500/client/blog/index.html"
                },3000)
            })
            .catch(err => console.log(err))
        }
    })

   async function postFetch(data){
       const options = {
           method:"POST",
           header:{
               "content-type":"application/json"
            },
            redirect:"follow",
            body:JSON.stringify(data)
       }
       return new Promise(async (resolve,reject)=>{
        const res = await fetch("http://localhost:4000/addUser",options)
            if(res){
                resolve(await res.text())
            }
            else{
                reject("HATA")
            }
       })
      
   }
    //Post Bitiş


    //update başlangıç
    //update bitiş

    //delete başlangıc
    const deleteSection = document.getElementById("delete")
    const deleteButton = document.getElementById("deleteButton")
    const deleteItemList = document.getElementById("deleteList")
    deleteButton.addEventListener("click",getData)
    
    async function getData () {
        deleteSection.style.display = "block"
       const data = await fetch("http://localhost:4000/getUser")
        const dataJson = await data.json()
        deleteItemList.innerHTML = ""
        dataJson.forEach(element => {
            const li = document.createElement("li")
            li.innerHTML = `<b>Item:${element._id} Post => ${element.title}</b>`
            li.style.cursor="pointer"
            li.addEventListener("click",(e)=>{
                e.preventDefault()
                deleteData(element._id)
            })
            deleteItemList.append(li)  
        })
    }
    async function deleteData(element){
        const options ={
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            redirect:"follow",
            body:element
        }
        await fetch("http://localhost:4000/deletePost",options)
        .then(res => console.log(res))
        .catch(err => console.log(err))
     
    }
    //delete bitiş

})