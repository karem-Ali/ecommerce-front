import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import Card from './Card'
import {getCategories,getFilteredProducts} from './apicore'
import Checkbox from'./Checkbox'
import {prices} from './FixedPrice'
import RadioBox from './RadioBox'
const Shop=()=>{
    const [myfilters,setMyFilters]=useState({
        filters:{category:[],price:[]}
    })
    const [categories,setCategories]=useState([])
    const [limit,setLimit]=useState(4)
    const [skip,setSkip]=useState(0)
    const [size,setSize]=useState(0)
    const [filteredResults,setFilteredResults]=useState([])



    const [error,setError]=useState(false)

    const init=()=>{
        getCategories().then(data=>{
            if(data.error){
                setError(data.error)
               

            }else{
                setCategories(data)
                
            }
        })
       
    }
    const loadFilteredResults=(newFilters)=>{
        //console.log(newFilters)
        getFilteredProducts(skip,limit,newFilters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                    setFilteredResults(data.data)
                    setSize(data.size)
                    setSkip(0)
            }   
        })

  
    }

    const loadMore=()=>{
        //console.log(newFilters)
        let toSkip=skip+limit
        getFilteredProducts(toSkip,limit,myfilters.filters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                    setFilteredResults([filteredResults,...data.data])
                    setSize(data.size)
                    setSkip(0)
            }   
        })

  
    }
    const loadButton=()=>{
        return(
            size && size >= limit &&(
                <button onClick={loadMore} className="btn btn-warning mb-5">More</button>
            )
        )
    }
  const handleFilters=(filters,filterBy)=>{
        // console.log(filters,filterBy,'from shop')
        const newFilters={...myfilters}
        newFilters.filters[filterBy]=filters
        if(filterBy == 'price'){
            let pricevalues= handleprice(filters)
            newFilters.filters[filterBy]=pricevalues 
        }
        loadFilteredResults(myfilters.filters)
        setMyFilters( newFilters)
  }
  const handleprice=(value)=>{
      const data= prices
      let array=[]
      for(let key in data){
          if(data[key]._id == parseInt(value)){
              array=data[key].array
          }
      }
      return array

  }
  
    useEffect(()=>{
        init()
    },[])
    return(
        <Layout className="container-fluid" title="Shop Page">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by Categories</h4>
                    <ul>
                  <Checkbox categories={categories} handleFilters={(filters)=>handleFilters(filters,'category')} />
                    </ul>
                    <h4>Filter by Price</h4>
                    <div>
                  <RadioBox prices={prices} handleFilters={(filters)=>handleFilters(filters,'price')} />
                    </div>

                </div>
                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product,i)=>(
                                <div key={i} className="col-4 mb-3">
                                 <Card product={product}  />
                                </div>
                        ))}

                    </div>
                    {loadButton()}
                </div>


            </div>
        </Layout>
    )
}
export default Shop
