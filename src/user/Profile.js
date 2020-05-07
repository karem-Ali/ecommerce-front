import React,{useState, useEffect} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from'../auth'
import {Link, Redirect} from 'react-router-dom'
import {read,update,updateUser} from './apiUser'
const Profile=({match})=>{
 const [values,setValues]=useState({
     name:'',
     email:'',
     password:'',
     error:'',
     success:false
 })
 const {token}=isAuthenticated()
 const {name,email,password,error,success}=values
 const init=(userId)=>{
    read(userId,token)
    .then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({...values,name:data.name,email:data.email,success:false})
        }
    })
 }
 const handleChange=name=>e=>{
    setValues({...values,error:false,[name]:e.target.value,success:false})
 }
 const clickSubmit=(e)=>{
    e.preventDefault()
    update(match.params.userId,token,{name,email,password}).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            updateUser(data,()=>{
                setValues({...values,name:data.name,email:data.email,success:true})
                redirectUser(success)
            })
        }
    })
 }
 const redirectUser=(success)=>{
     if(success){
         return <Redirect to="/cart" />
     }

 }
 const updateProfile=(name,email,password)=>(
    <form>
        <div className="form-group">
            <label className="text-muted" >Name</label>
            <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
        </div>
        <div className="form-group">
            <label className="text-muted" >Email</label>
            <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
        </div>
        <div className="form-group">
            <label className="text-muted" >Password</label>
            <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
        </div>
        <button className="btn btn-success" onClick={clickSubmit}>Update</button>
    </form>
 )
 useEffect(()=>{
    init(match.params.userId)
 },[])
 return(
    <Layout title="Profile page" description="Update your Profile" className="container-fluid">
           {updateProfile(name,email,password)}
           {redirectUser(success)}
    </Layout>

)
}
export default Profile