import React,{useState,useEffect} from 'react';
import {isAuthenticated} from '../auth'
import {getbraintreeToken,processPayment,createOrder} from './apicore'
import { Link } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import {emptyCart,getCart} from './cartHelpers'
const Checkout=({products,setRun = f => f, run = undefined})=>{
    const [data,setData]=useState({
        success:false,
        clientToken: null,
        error:'',
        instance:{},
        address:'',
        loading:false
    })
    const userId=isAuthenticated() && isAuthenticated().user._id
    const token=isAuthenticated() && isAuthenticated().token
     const getToken=(userId,token)=>{
        getbraintreeToken(userId,token).then(data=>{
            if(data.error){
                setData({...data ,error:data.error})
            }else{
                setData({clientToken:data.clientToken})
            }
        })
     }
     useEffect(()=>{
        getToken(userId,token)
     },[])
    const getTotal=()=>{
        return products.reduce((currentvalue,nextvalue)=>{
            return currentvalue + nextvalue.count * nextvalue.price

        },0)
    }
    const showCheckout =()=>{
        return isAuthenticated() ? (
        <div >{showDropIn()}</div>
    ):(
        <Link to="/signin" >Please Sign in</Link>
    )
    }
    let deleveryAdress=data.address
    const buy=()=>{
        setData({loading:true})
        let nonce;
        let getnonce=data.instance.requestPaymentMethod()
        .then(data=>{
            //console.log(data,'this is data')
            nonce =data.nonce
            // nonce is a card number or a card type send it to noncePaymenMethod in back end
            // and total will be charged
            // console.log('send nonce and total to process',nonce,getTotal(products))
            const paymentData={
                paymentMethodNonce:nonce,
                amount:getTotal(products)
            }
            processPayment(userId,token,paymentData)
            .then(response=>{
               //send orderInfo to backend
                const createOrderData={
                    products:products,
                    transaction_id:response.transaction.id,
                    amount :response.transaction.amount,
                    address:deleveryAdress
                }
               createOrder(userId,token,createOrderData)
               .then(response=>{
                console.log(response)
                emptyCart(()=>{
                    setRun(!run); // run useEffect in parent Cart
                    console.log('payment success and empty')
                    setData({loading:false,success:true})
 
                }) 
               }).catch(error=>{
                   console.log(error)
                   setData({loading:false,success:true})
               })
            
            })
            .catch(error=>{
                setData({loading:false})
            })
        })
        .catch(error=>{
            console.log('dropin error:',error)
            setData({...data ,error:error.message})
        })
    }
   const showError=(error)=>{
       return(<div className="alert alert-danger" style={{display: error ? '':'none'}}>
           {error}
       </div>)

    }
    const showSucess=(success)=>{
        return(<div className="alert alert-info" style={{display: success ? '':'none'}}>
            
        SUCCESS PAYMENT
        </div>)
 
     }
     const showLoading=(loading)=>(
         loading && <h2 className='alert alert-danger'>loading ...</h2>
     )
     const handleAddress=e=>{
         setData({...data ,address:e.target.value})
     }
    const showDropIn=()=>(
        <div onBlur={()=>setData({...data,error:''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <>  
                <div className="gorm-group mb-3">
                    <label className="text-muted ">Delivery Address</label>
                    <textarea className="form-control"
                     onChange={handleAddress}
                     value={data.address}
                     placeholder="enter your Address" ></textarea>

                </div>
               <DropIn options={{
                authorization: data.clientToken,
                paypal:{flow:'vault'}
               }} onInstance={instance=> data.instance =instance}/>     
               <button  onClick={buy}className="btn btn-success btn-block" >Checkout</button>
               </>

            ):null}
        </div>
    )
    return(
        <div>
            <h2>Total : {getTotal(products)}</h2>
            {showLoading(data.loading)}
            {showSucess(data.success)}
            {showError(data.error)}
           {showCheckout()}
        </div>
    )

}
export default Checkout