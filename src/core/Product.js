import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {read,ListRelated} from './apicore'
import Card from './Card'
import Search from'./Search'
const Product=(props)=>{
    const [product,setProduct]=useState({})
    const [RelatedProduct,setRelatedProduct]=useState([])

    const [error,setError]=useState(false)
    const loadSingleProduct=(productId)=>{

        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                // fetch related product 
                ListRelated(data._id).then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct(data)

                    }

                })
            }
        })
    }
   useEffect(()=>{
       const productId=props.match.params.productId
    loadSingleProduct(productId)

   },[props])
    return(
        <Layout title={product.name} description={product.description} className="container-fluid">
                
            <div className="row">
              <div className="col-8">
              {product && product.description &&
                    <Card product={product} showViewProductButton={false}/>
                }

              </div>
              <div className="col-4">
                  <h2>Related Products</h2>
                  {RelatedProduct.map((product,i)=>(
                        <div className="mb-3">
                    <Card key={i}product={product} />

                        </div>

                  ))}
                }

              </div>

            </div>

           

        </Layout>

    )

}
export default Product