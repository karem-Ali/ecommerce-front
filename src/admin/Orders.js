import React, { useState,useEffect } from 'react'
import {Route,Redirect, Link} from'react-router-dom'
import {isAuthenticated} from'../auth'
import Layout from '../core/Layout'
import {listOrders,getStatusValues,UpdateOrderStatus} from  './apiAdmin'
const Orders=()=>{
    const [orders,setOrders]=useState([])
    const [statusValues,setStatusValues]=useState([])

    const {user,token}=isAuthenticated()
    const loadOrders=()=>{
        listOrders(user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        })

    }

    const LoadStatusValues=()=>{
        getStatusValues(user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setStatusValues(data)

            }
        })

    }
    const showOrdersLength=()=>{
       if(orders.length > 0){
           return (
           <h2 className="text-danger display-2">Total Orders {orders.length}</h2>
           )
       }else{
           return <h1 className="text-danger">No Orders</h1>
       }
    }
    const showInput=(key,value)=>(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend ">
                <div className="input-group-text">  {key}  </div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />

        </div>
    )
    useEffect(()=>{
        loadOrders()
        LoadStatusValues()
    },[])
    const handelStatusChange=(e,orderId)=>{
        UpdateOrderStatus(user._id,token,orderId,e.target.value)
        .then(data=>{
            if(data.error){
                console.log('status update failed')
            }else{
                loadOrders()
            }
        })
    }
    const showStatus=(o)=>(
        <div className="form-group">
            <h3 className=" mark mb-4"> Status {o.status}</h3>
            <select className="form-control" onChange={(e)=>handelStatusChange(e,o._id)}>
                <option>Show Update</option>
                {statusValues.map((status,i)=>(
                    <option key={i} value={status} >
                        {status}
                    </option>
                ))}
            </select>

        </div>

    )
    return (
        <Layout title="Orders" 
        description={`${user.name} you can manage All Orders here`}
        className="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    
                    {showOrdersLength()}
                    {orders.map((order,i)=>{
                        return (
                            <div className="mt-5" key={i} style={{borderBottom:'5ppx solid indigo'}}>
                                <h2 className="mb-5">
                        <span className="bg-primary">Order ID {order._id}</span>
                                </h2>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {showStatus(order)}
                                    </li>
                                    <li className="list-group-item">
                                       Transaction ID: {order.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount :{order.amount}

                                    </li>
                                    <li className="list-group-item">
                                      Ordered By:  {order.user.name}

                                    </li>
                                    <li className="list-group-item">
                                      Delevered Address :  {order.address}
                                    </li>
                                </ul>
                                <h3 className="mt-4 mb-4 font-italic">
                                    Total product in order :{order.products.length}
                                </h3>
                                {order.products.map((product,i)=>(
                                    <div className="mb-4" key={i} style={{padding:'20px',border:'1px solid indigo'}}>

                                        {showInput('Product name',product.name)}
                                        {showInput('Product total',product.count)}
                                        {showInput('Product ptice',product.price)}
                                        {showInput('Product Id',product._id)}

                                    </div>
                                ))}
                              </div>
                        )
                    })}
                </div>
            </div>
                 
        </Layout>

    )
}
export default Orders