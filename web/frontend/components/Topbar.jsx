import React, { useEffect,useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthenticatedFetch } from '../hooks'

export  const Topbar = () => {

    let fetch = useAuthenticatedFetch();
    let [storeName, setStoreName] =useState("")
    useEffect(async()=>{
        try {
            
            let request = await fetch("/api/store/info",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let response=await request.json()
            setStoreName(response.data[0].name)
            

        } catch (error) {
            console.log(error)
        }
    })

  return (
    <div className='topbar-section'>
        <div className='logo-block'>
            <img className='logo' src='../assets/logo.png' alt='log image'></img>
            <h1 className='text-bold h4'>{storeName} </h1>
            <NavLink to="/">Sales</NavLink>
            <NavLink to="/Products">Products</NavLink>
            </div>
    
    </div>
  )
}

