import React,{useState,useEffect} from 'react'
const Checkbox=({categories,handleFilters})=>{
    const [checked,SetChecked]=useState([])
    const handelToggle=c=>()=>{
        const currentCategoryId=checked.indexOf(c)
        const newCheckedCategoryId=[...checked]
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        SetChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }
    return categories.map((category,index)=>(
        <li key={index}className="list-unstyled">
            <input onChange={handelToggle(category._id)}type="checkbox" className="form-check-input"  />
             <label className="form-check-lable">{category.name}</label>
        </li>
    ))
}
export default Checkbox