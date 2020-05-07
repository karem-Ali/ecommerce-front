import {API} from '../config'
export  const signup=(user)=>{
    return  fetch(`${API}/signup`,{
         method:'POST',
         headers:{
             Accept:'application/json',
             "Content-type":'application/json'
         },
         body:JSON.stringify(user)

     })
     .then(response=>response.json())
     .catch(error=>console.log(error))
 }
 export const signin=(user)=>{
    return  fetch(`${API}/signin`,{
         method:'POST',
         headers:{
             Accept:'application/json',
             "Content-type":'application/json'
         },
         body:JSON.stringify(user)

     })
     .then(response=>response.json())
     .catch(error=>console.log(error))
 }
 export const authenticated=(data,next)=>{
     localStorage.setItem('token',JSON.stringify(data))
     next()
 }
 export const signout=(next)=>{
    localStorage.removeItem('token')
    next()

    return fetch(`${API}/signout`,{
        method:'GET'
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

}
export const isAuthenticated=()=>{
    if(localStorage.getItem('token')){
        return JSON.parse(localStorage.getItem('token'))
    }else{
        return false
    }
}