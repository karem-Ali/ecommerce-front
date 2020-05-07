import React, { useState, useEffect } from 'react'
import {Route,Redirect, Link} from'react-router-dom'
import {isAuthenticated} from'../auth'
import {getProducts,deleteProduct} from'./apiAdmin'
import Layout from '../core/Layout'
const ManageProducts=()=>{
    const [products,setProducts]=useState([])
    const {user,token}=isAuthenticated()
    const loadProducts=()=>{
        getProducts().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setProducts(data)
            }
        })
    }
    const destroy=productId=>{
        deleteProduct(productId,user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                loadProducts()
            }
        })
    }
    useEffect(()=>{
        loadProducts()
    },[])
    return(
        <Layout title="Manage Product " description="Manage Products of site " className="container-fluid">
                
      
            <div className="row">
                <div className="col-12">
                     <h2 className="text-center">Total {products.length}Products</h2>
                    <ul className="list-group">
                       {products.map((p,i)=>(
                            <li className="list-group-item d-flex justify-content-between align-items-center"
                            
                                key={i}
                            >
                               <strong>{p.name}</strong> 
                               <Link to={`/admin/product/update/${p._id}`} >
                                   <span><button className="btn btn-primary">Update</button></span>
                               </Link>
                               <span><button className="btn btn-danger" onClick={()=>destroy(p._id)}>Delete</button></span>

                            </li>
    
                       ))}
                    </ul>
                </div>

            </div>
        </Layout>

    )

}
export default ManageProducts