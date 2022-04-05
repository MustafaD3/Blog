export default class userFind{
      userFinder(object){
          return new Promise(async (resolve,reject) => {
           await fetch("http://localhost:4000/login",{
               method:"POST",
               headers:{
                    "content-type":"application/json"
               },
               redirect:"follow",
               body:JSON.stringify(object)
          }).then(res => res.json())
          .then(res2 => resolve(res2))
          .catch(error => reject("Hata"))
      })

     }
}
