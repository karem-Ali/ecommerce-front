import {API} from '../config'
import querystring from 'query-string'
export const getProducts=(sortBy)=>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
       method:'GET',
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}
export const getCategories=()=>{
    return fetch(`${API}/categories`,{
       method:'GET',
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}
export  const getFilteredProducts=(skip,limit,filters={})=>{
    const data={
        limit ,skip,filters
    }
    return  fetch(`${API}/products/by/search/`,{
         method:'POST',
         headers:{
             Accept:'application/json',
             "Content-type":'application/json',
         },
         body:JSON.stringify(data)

     })
     .then(response=>response.json())
     .catch(error=>console.log(error))
 }
 export const List=(params)=>{
     const query=querystring.stringify(params)
     console.log('query',query)
    return fetch(`${API}/products/search?${query}`,{
       method:'GET',
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}
export const read=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:'GET',
     })
     .then(response=>response.json())
     .catch(error=>console.log(error))

}
export const ListRelated=(productId)=>{
    return fetch(`${API}/products/related/${productId}`,{
        method:'GET',
     })
     .then(response=>response.json())
     .catch(error=>console.log(error))
}

export const getbraintreeToken=(userId,token)=>{
    return fetch(`${API}/braintree/getToken/${userId}`,{
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
export const processPayment=(userId,token,paymentData)=>{
    return fetch(`${API}/braintree/payment/${userId}`, {
        method:'POST',
        headers:{
            Accept:'application/json',
            "Content-type":'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
     })
     .then(response=>response.json())
     .catch(error=>console.log(error,paymentData))

}
export const createOrder=(userId,token,orderData)=>{
    return fetch(`${API}/order/create/${userId}`, {
        method:'POST',
        headers:{
            Accept:'application/json',
            "Content-type":'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({order:orderData})
     })
     .then(response=>response.json())
     .catch(error=>console.log(error))

}