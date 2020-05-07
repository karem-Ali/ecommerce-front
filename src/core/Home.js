import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from './apicore'
import Card from './Card'
import Search from'./Search'
const Home=()=> {
    const [productBySell,getproductBySell]=useState([])
    const [productByArrival,getproductByArrival]=useState([])
    const [error,setError]=useState(false)

    const loadProductsBySell=()=>{
        getProducts('sold')
        .then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                getproductBySell(data)
            }
        })
    }
    const loadProductsbyArrival=()=>{
        getProducts('createdAt')
        .then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                getproductByArrival(data)
            }
        })
    }
    useEffect(()=>{
        loadProductsbyArrival()
        loadProductsBySell()
    },[])

    return(
        <Layout title="Home page" description="this is Home page component for mobile store" className="container-fluid">
                
                <Search />
                <h2 className="mb-4"> Best Seller</h2>
                <div className="row">
                {productBySell.map((product,i)=>(
                   <div key={i} className="col-4 mb-3">
                   <Card product={product}  />
                   </div>
                ))}

                </div>
                <h2 className="mb-4"> Best Arrival</h2>
                <div className="row">
                {productByArrival.map((product,i)=>(
                    <div key={i} className="col-4 mb-3">
                    <Card product={product}  />
                    </div>
                ))}

                </div>
               

           

        </Layout>

    )
   
}
export default Home;
