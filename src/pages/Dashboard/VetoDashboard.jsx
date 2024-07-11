import { Button } from '@mui/material'
import React from 'react'
import UserService from '../../service/UserService'
import { useNavigate } from 'react-router-dom'

function VetoDashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <h1> Veto Dashboard</h1>
      <Button variant='countined'  sx={{ mt: 3, mb: 2 }} title='logout'  onClick={()=>{
 UserService.logout()
 navigate('/signin')
  }
   
}
 >Logout</Button>
    </div>
  )
}

export default VetoDashboard