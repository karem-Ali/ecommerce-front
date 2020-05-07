import React,{useState} from 'react';
import Layout from '../core/Layout'
import { Link, Redirect } from 'react-router-dom';
import {signin, authenticated,isAuthenticated} from '../auth'


const Signin=()=>{
    const [values,setValues]=useState({
        email:'',
        password:'',
        error: '',
        loading:false,
        redirecTO:false
        
    })
    const {email,password,error,loading,redirecTO}=values
    const {user}=isAuthenticated()
    const handleChange=(e)=>{
            setValues({...values,error:false ,[e.target.name]:e.target.value})
    }
   
    const clickSubmit=(e)=>{
        e.preventDefault()
        setValues({...values,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }else{
                authenticated(data,()=>setValues({...values,redirecTO:true}))
                
            }
        })


    }
    const showError =()=>(
        <div className="alert alert-danger" style={{display: error ?'':'none'}}>
            {error}
         </div>

        )
       
    const showLoading=()=>(
        loading && (<div className="alert alert-info">loading ...</div>) 

    )
    const redirectUser=()=>{
        if(redirecTO){
            if(user && user.role===1){
                return <Redirect to='/admin/dashboard'/>
            }else{
                return <Redirect to='/user/dashboard'/>
            }

        }
        if(isAuthenticated() ){
                return <Redirect to='/'/>
                
        }
    }
    
    const singInForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted" >Email</label>
                <input type="email" onChange={handleChange} name="email" value={email}className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted" >Password</label>
                <input type="password" onChange={handleChange}  name="password" value={password}className="form-control"/>
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}>Signup</button>
        </form>
    )
    return (
        <Layout title="Signin page" 
        description="this is Signin page component for mbile store"
        className="container col-md-8 offset-md-2"
        >
                  {showLoading()}
                {singInForm()}
                {JSON.stringify(values)}
                {showError()}
                {redirectUser()}
        </Layout>

    )
}
   
export default Signin;
