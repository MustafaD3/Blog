if(localStorage.getItem("background")){
    const buttonlar = document.querySelectorAll("nav ul li")
    for(const x of buttonlar){
        x.style.background=localStorage.getItem("background")
    }
}