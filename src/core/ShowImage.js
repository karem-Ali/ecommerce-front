import React from 'react'
import {API} from '../config'
const ShowImage=({item,url})=>(
    <div className="product-image">
        <img src={`${API}/${url}/photo/${item._id}`} alt="" className="mb-5" style={{maxWidth:'100%',maxHeight:'100%'}}/>
    </div>

)
export default ShowImage