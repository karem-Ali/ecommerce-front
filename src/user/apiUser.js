import {API} from '../config'
export const read=(userId,token)=>{
    return fetch(`${API}/user/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            "Content-type":'application/json',
            Authorization: `Bearer ${token}`
        }
     })
     .then(response=>response.json())
     .catch(error=>console.log(error))

}
export const update=(userId,token,user)=>{
    return fetch(`${API}/user/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            "Content-type":'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(user)
     })
     .then(response=>response.json())
     .catch(error=>console.log(error))

}
export const updateUser=(user,next)=>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('token')){
            let auth=JSON.parse(localStorage.getItem('token'))
            auth.user=user
            localStorage.setItem('token',JSON.stringify(auth))
            next()
        }
    }
}

export const getHistoryParchase=(userId,token)=>{
    return fetch(`${API}/orders/by/user/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            "Content-type":'application/json',
            Authorization: `Bearer ${token}`
        }
     })
     .then(response=>response.json())
     .catch(error=>console.log(error))

}