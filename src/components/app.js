import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { googleLogout } from "@react-oauth/google";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from './navigation/navBar';
import Cart from './pages/cart';
import Home from './pages/home';
import Admin from './pages/admin';
import Login from './auth/login';

import '../style/main.scss';


const App = () =>  {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
  fetchUserProfile();
  }, [user]);
  
  // useEffect(() => {
  const fetchUserProfile = () => {
    if (user && user.access_token) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch(error => {
          console.log('Error fetching user profile', error);
        });
      }
  }


  return (
    <div className="App">
      <Router>
        <div>
          <NavBar user={user} setUser={setUser} />
          <Switch>
            <Route exact path="/" ><Home setCart={setCart}/></Route>
            {/* <Route exact path="/" component={(props) => (user ? <Cart cartItems={cart} setCart={setCart} /> : <Home {...props} setCart={setCart} />)} /> */}
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            {/* //Admin login / edit page */}

            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
      {user ? 
        <Cart cartItems={cart} setCart={setCart} />
      :
      null
    }
    </div>
  );
}

export default App;