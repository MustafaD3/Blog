import userFind from "../js/userFind.js" 
const userFindClass = new userFind()
const loginButton = document.getElementById("loginButton")
const usernameInput = document.getElementById("usernameLogin")
const passwordInput = document.getElementById("passwordLogin")
document.body.style.display = "none"
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
            console.log(bool)
            if(bool === "false"){
                
                document.body.style.display = "flex"
            }
            else{
                window.location.href = "http://127.0.0.1:5500/client/panel.html"
            }

            
        })
        .catch(err => {
            console.log(err)
        })
}
else{
    document.body.style.display = "flex"
}

loginButton.addEventListener("click",(e)=>{
    e.preventDefault()
if(usernameInput.value){
    const object= new Object()
    object.username = usernameInput.value
    if(passwordInput.value){
        object.password = passwordInput.value
        object.url = location.href
        userFindClass.userFinder(object)
        .then(cevap =>{
            if(cevap._id){
                console.log("User Giriş Yaptı")
                localStorage.setItem("user",cevap._id)
                window.location.href ="http://127.0.0.1:5500/client/panel.html"
            }
            else{
                alert(cevap)
            }
        })
        .catch(error => console.log(error))
        
    }
}
})

