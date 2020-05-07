import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from './apicore'
import {getCart} from './cartHelpers'
import Card from './Card'
import { Link } from 'react-router-dom';
import Checkout from'./Checkout'
const Cart=()=>{
    const [items,setItems]=useState([])
    const [run, setRun] = useState(false);
    useEffect(()=>{
        setItems(getCart())
    },[run])
    const showItems=(items)=>{
        return (
            <div>
                <h2>Your Cart has {items.length} Items </h2>
                <hr />
                {items.map((product,i)=>(
                    <Card key={i} product ={product} showAddCart={false} cartUpdate={true}  showRemove={true}  setRun={setRun} run={run}/>
                ))}
            </div>
        )
    }
    const noItems =()=>(
        <>
        <h2>Your Cart Is Empty </h2> <br />
        <Link to="/shop" >Continue Shoping </Link>
        </>
    )

    return(
        <Layout title=" Shopping Cart " description="Cart Items" className="container-fluid">

                       <div className="row">
                           <div className="col-6">
                               {items.length > 0 ? showItems(items) :noItems() }

                           </div>
                           <div className="col-6">
                               <h2> your cart summary </h2>
                               <hr/>
                               <Checkout products={items} setRun={setRun} run={run}  />

                           </div>
                        </div>   
        </Layout>

    )
}
export default Cart 