import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta'
import Cookies from 'js-cookie'
import { login, whoAmI } from './api/index'

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {    
    // Cookies.remove('token')
  });

  const loginhander = () => {
    console.log('in 7 ');
    login()
  }

  const whoAmIHandler = () => {
    whoAmI()
      .then( res => {
        console.log(res);
        setUser(res)
      })
    }
    
  const logout = () => {
    Cookies.remove('token')
    setUser(null)
  }

  return (
    <div>
      <Meta title='Login' />
      {user && 
        <h1>{user.name}</h1>
      }
      <button onClick={() => loginhander()}>login</button> &nbsp;
      <button onClick={() => whoAmIHandler()}>me</button> &nbsp;
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}
