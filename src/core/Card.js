import React,{useState} from 'react'
import {Link, Redirect} from'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {AddItem,updateItem,removeItem} from './cartHelpers'
const Card=({product,showViewProductButton=true,showAddCart=true ,cartUpdate=false,showRemove=false,setRun = f => f,
    run=undefined})=>{
    const [redirect,setRedirect]=useState(false)
    const [count,setCount]=useState(product.count)

    const showViewButton =(showViewProductButton)=>{
            return(
                showViewProductButton &&
                <Link to={`/product/${product._id}`}>

                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Product
                    </button>
                </Link>

            )         
        

    }
    const addToCart=()=>{
        AddItem(product,()=>{
            setRedirect(true)
        })
    }
    const shouldRedirect =(redirect)=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }
    const showAddToCart=(showAddCart)=>{
        return (
            showAddCart &&
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                 Add To Cart
             </button>
        )
    }
    const showRemoveButton=(showRemove)=>{
        return (
            showRemove &&
            <button onClick={()=>{removeItem(product._id); setRun(!run);}} className="btn btn-outline-danger mt-2 mb-2">
                 Remove Product
             </button>
        )
    }
    const showStock=(quantity)=>{
        return quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span>Out Of Stock</span>

    }
    const handleChange=(productId)=>(e)=>{
        setRun(!run)
        setCount(e.target.value < 1 ? 1 : e.target.value )  
        if(e.target.value >= 1){
            updateItem(productId,e.target.value)
        }

    }
    const ShowCartUpdate=(cartUpdate)=>{
        return cartUpdate && <div>
            
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"> Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>
            
            
             </div>

    }
    return (
            <div className="card">
                <div className="card-header name"> {product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="lead mt-2">{product.description}</p>
                    <p className="black-10 ">{product.price}$</p>
                    <p className="black-9 ">Category: {product.category && product.category.name}</p>
                    <p className="black-8 ">Add on : {moment(product.createdAt).fromNow()}</p>
                        {showStock(product.quantity)}
                        <br/>
                      {showViewButton(showViewProductButton)}
                      {showAddToCart(showAddCart)}
                      {ShowCartUpdate(cartUpdate)}
                      {showRemoveButton(showRemove)}

                </div>

            </div>

    )
}
export default Card