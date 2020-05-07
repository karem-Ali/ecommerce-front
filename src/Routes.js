import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import UserDashboard from './user/UserDashboard'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import Orders from './admin/Orders'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import Home from './core/Home'
import Shop from './core/Shop'
import Cart from './core/Cart'
import Profile from './user/Profile'
import Product from './core/Product'
import UpdateProduct from './admin/UpdateProduct'

const Routes=()=>{
    return(

            <BrowserRouter>

                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/shop' exact component={Shop} />
                    <Route path='/cart' exact component={Cart} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/signin' exact component={Signin} />
                  <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>
                  <AdminRoute path ="/admin/dashboard" exact component={AdminDashboard} />
                  <AdminRoute path ="/create/category" exact component={AddCategory} />
                  <PrivateRoute path ="/create/product" exact component={AddProduct} />
                  <Route path='/product/:productId' exact component={Product} />
                  <AdminRoute path ="/admin/orders" exact component={Orders} />
                  <AdminRoute path ="/admin/products" exact component={ManageProducts} />
                  <PrivateRoute path="/profile/:userId" exact component={Profile}/>
                  <AdminRoute path ="/admin/product/update/:productId" exact component={UpdateProduct} />



                </Switch>
        </BrowserRouter>    
    )
}
export default Routes
