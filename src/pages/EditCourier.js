import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import checkAuth from '../helper/checkAuth';

const EditCourier = () => {
    let { user_id } = useParams();

  return (
    <>
      <Navbar login={checkAuth()} />
      <div>EditCourier {user_id}</div>
    </>
  )
}

export default EditCourier