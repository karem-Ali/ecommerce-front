import React,{useState,useEffect} from 'react'
const RadioBox=({prices,handleFilters})=>{
    const [value,setValue]=useState(0)
     const handleChange=(e)=>{
        handleFilters(e.target.value)
        setValue(e.target.value)

     }
    return prices.map((price,index)=>(
        <div key={index}>
            <input onChange={handleChange}type="radio" value={price._id}className="mr-2 ml-4" name={price} />
             <label className="form-check-lable">{price.name}</label>
        </div>
    ))

}
export default RadioBox