import React, { useState } from 'react'
import {Route,Redirect, Link} from'react-router-dom'
import {isAuthenticated} from'../auth'
import Layout from '../core/Layout'
import {CreateCategory} from  './apiAdmin'

const AddCategory=()=>{
    const [name,setName]=useState('')
    const [success,setSuccess]=useState(false)
    const [error,setError]=useState(false)
    const {user,token}=isAuthenticated()
    const handleChamge=(e)=>{
        setError("")
        setName(e.target.value)
    }
    const clickSubmit=(e)=>{
            e.preventDefault()

                setError('')
                setSuccess(false)
         CreateCategory(user._id,token,{name})
            .then(data=>{
                if(data.error){
                    setError(true)
                }else{
                    setError('')
                    setSuccess(true)

                }
            })
    }
    const showSuccess=()=>{
        if(success){
            return   <h3 className="text-success">{name} is created</h3>
             
        }

    }
    const showError=()=>{
        if(error){
            return <h3 className="alert alert-danger">Category must be Uniqe</h3>
        }
    }
    const GoBack=()=>(
     <div className="mt-5">
         <Link to="/admin/dashboard" className="text-warning">Back To Dashboard</Link>
     </div>
    )
    
    const newCategoryForm=()=>(
        <form onSubmit={clickSubmit}>
            <div className="form-group ">
                <label className="text-muted">Name</label>
                <input
                 type="text"
                 className="form-control " 
                 onChange={handleChamge} 
                 value={name}
                  autoFocus
                  required
                  />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>

        </form>
    )
    return (
        <Layout title="Add a New Category" 
        description={`${user.name} ready to add Category`}
        className="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                    {GoBack()}

                </div>
            </div>
                 
        </Layout>

    )


}
export default AddCategory