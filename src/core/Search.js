import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getCategories,List} from './apicore'
import Card from './Card'
const Search=()=>{
    const [data,setData]=useState({
        categories:[],
        category:'',
        results:[],
        search:'',
        searched:false

    })
    const [error,setError]=useState('')
    const {categories,category,results,search,searched}=data
    const loadCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setData({...data,categories:data})
            }
        })
    }
    const searchData=()=>{
       // console.log(search,category)
       if(search){
           List({search: search || undefined ,category:category})
           .then(response=>{
                if(response.error){
                     setError(response.error)
                }else{
                    setData({...data,results:response,searched:true})
                }
           })
       }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        searchData()

    }
    const searchMessage=(searched,results)=>{
        if(searched && results.length > 0){
            return (
                <h2 className="alert alert-info mt-4 mb-4 ">
                    Found {results.length} Products
                </h2>
            )
        }
        if(searched && results.length < 1){
            return (
            <h2 className="alert alert-danger mt-4 mb-4 ">
                no Products Found
            </h2>

            )
            
        }

    }
    const searchedProducts=(results=[])=>(
        results.map((product,i)=>(
            <Card key={i} product={product}  />
    ))

    )

    
    const handleChange=(name)=>e=>{
        setData({...data,[name]:e.target.value,searched:false})

    }
    const searchform=()=>(
        <form onSubmit={handleSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('category')}>
                            <option value="All">Pick Category</option>
                            {categories.map((category,i)=>(
                                <option key={i} value={category._id}>{category.name}</option>
                            ))}
                        </select>

                    </div>
                    <input
                    type="search"
                    className="form-control" 
                    onChange={handleChange('search')}
                    placeholder='Search by name'/>

                </div>
                <div className="btn input-group-append" style={{border:"none"}}>
                    <button className="input-group-text">Search</button>
                </div>
                
            </span>

        </form>
    )
    useEffect(() => {
        loadCategories()
        
    }, [])
    return (
        <div>
            <div className="container mb-3">
                {searchform()}
            
            </div>
            <div className="container-fluid mb-3">
                    <div>
                       {searchMessage(searched,results)}
                       </div>
                <div className="row">
                        {searchedProducts(results)}
                </div>
               
            
            </div>
        </div>
    )
}
export default Search