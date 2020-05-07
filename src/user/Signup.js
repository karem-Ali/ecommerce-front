import React,{useState} from 'react';
import Layout from '../core/Layout'
import { Link } from 'react-router-dom';
import {signup} from '../auth'

const Signup=()=>{
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error: '',
        success:false
        
    })
    const {name,email,password,error,success}=values
    const handleChange=(e)=>{
            setValues({...values,error:false ,[e.target.name]:e.target.value})
    }
   
    const clickSubmit=(e)=>{
        e.preventDefault()
        signup({name,email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({...values,name:'',password:'',email:'',error:false,success:true})
            }
        })


    }
    const showError =()=>(
        <div className="alert alert-danger" style={{display: error ?'':'none'}}>
            {error}
         </div>

        )
       
    const showSuccess=()=>(
        <div className="alert alert-info" style={{display: success ?'':'none'}}>
              you are successfullu Signup please <Link to='signin'>signIn</Link>
         </div>

    )
    
    const singUpForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted" >Name</label>
                <input type="text" onChange={handleChange} name="name" value={name}className="form-control"/>
            </div>
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
        <Layout title="Signup page" 
        description="this is Signup page component for mbile store"
        className="container col-md-8 offset-md-2"
        >
                  {showSuccess()}
                {singUpForm()}
                {JSON.stringify(values)}
                {showError()}
        </Layout>

    )
}
   
export default Signup;
