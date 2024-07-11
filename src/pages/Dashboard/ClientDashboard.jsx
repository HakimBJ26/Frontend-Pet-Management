import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../service/UserService'

function ClientDashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <h1> Clinet Dashboard</h1>
      <Button variant='countined'  sx={{ mt: 3, mb: 2 }} title='logout'  onClick={()=>{
 UserService.logout()
 navigate('/signin')
  }
   
}
 >Logout</Button>
    </div>
    
  )
}

export default ClientDashboard
