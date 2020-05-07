import React, { useState,useEffect } from 'react'
import {Route,Redirect, Link} from'react-router-dom'
import {isAuthenticated} from'../auth'
import Layout from '../core/Layout'
import {getProduct,updateProduct,getCategories} from  './apiAdmin'

const UpdateProduct=({match})=>{
    const [values,setValues]=useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        UpdatedProduct:'',
        redirectTo:false,
        formData:''
    })
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        UpdatedProduct,
        redirectTo,
        formData


    }=values
    const {user,token}=isAuthenticated()
    //load categories ande set form data 
    const init=(prodctId)=>{
        getProduct(prodctId).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})

            }else{
                    setValues({...values,
                        name:data.name,
                        description:data.description,
                        price:data.price,
                        category:data.category._id,
                        shipping:data.shipping,
                        quantity:data.quantity,
                        formData:new FormData()

                    })
                initCategories()
            }
        })

    }
    const initCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})

            }else{
                setValues({formData:new FormData(),categories: data})
                
            }
        })
       
    }

    useEffect(()=>{
        init(match.params.productId)
    },[])
    const handleChange=name=>e=>{
        const value= name === 'photo' ? e.target.files[0] :e.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }
    const clickSunmit=(e)=>{
        e.preventDefault()
        updateProduct(match.params.productId,user._id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,
                    name:'',
                    description:'',
                    price:'',
                    categories:[],
                    category:'',
                    shipping:'',
                    quantity:'',
                    photo:'',
                    loading:false,
                    error:'',
                    UpdatedProduct:true,
                    redirectTo:false,
                    formData:''
                
                })
            }
        })

    }
    const shwoError=()=>(
        <div className="alert alert-danger" style={{display: error ? '':'none' }}>
            {error}
        </div>

    )
    const showSuccess=()=>(
        <div className="alert alert-info" style={{display: UpdatedProduct ? '':'none' }}>
            Product Updated successfully 
        </div>

    )
    const showLoading=()=>(
        <div className="alert alert-info" style={{display: loading ? '':'none' }}>
           Loading ...
        </div>

    )
    const NewProductForm=()=>(
        <form className="mb-5" onSubmit={clickSunmit}>
            <h2>Post a photo</h2>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input type="file" onChange={handleChange('photo')}  name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input  type="text" onChange={handleChange('name') }className="form-control"  value={name} />

            </div>
            <div className="form-group">
                <label className="text-muted">Desctipyion</label>
                <textarea  onChange={handleChange('description')}className="form-control" value={description} >


                </textarea>

            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" onChange={handleChange('price')}className="form-control"  value={price} />

            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select  onChange={handleChange('category')}className="form-control" >
                        <option>Please Select</option>
                    {categories && categories.map((category,index)=>(
                        <option key={index} value={category._id}>{category.name}</option>
                        
                    ))}

                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select  onChange={handleChange('shipping')}className="form-control" >
                  <option>Please Select</option>

                    <option value='0'>no</option>
                    <option value='1'>yes</option>

                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input  onChange={handleChange('quantity')}className="form-control" type="number" value={quantity} />

            </div>

            <button className="btn btn-outline-primary">Update product</button>
        </form>
    )

    return (
        <Layout title="Add a New Product" 
        description={`${user.name} ready to add Category`}
        className="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {shwoError()}
                    {NewProductForm()}
                </div>
            </div>
                 
        </Layout>

    )


}
export default UpdateProduct