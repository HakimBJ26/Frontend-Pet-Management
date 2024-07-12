import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../service/UserService'


function Dashboard() {
  const navigate = useNavigate()
  return (
    <div>
  <h1> Admin Dashboard</h1>

  <Button variant='countined'  sx={{ mt: 3, mb: 2 }} title='logout'  onClick={()=>{

 navigate('/dashboard-admin/users-management')
  }
   
}
 >USer management</Button>

  <Button variant='countined'  sx={{ mt: 3, mb: 2 }} title='logout'  onClick={()=>{
 UserService.logout()
 navigate('/signin')
  }
   
}
 >Logout</Button>
    </div>
  )
}

export default Dashboard