import { Button } from '@mui/material'
import UserService from '../../service/UserService'
import { useNavigate } from 'react-router-dom'
import { SIGN_IN_PATH } from '../../common/configuration/constants/Paths'

function VetoDashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <h1> Veto Dashboard</h1>
      <Button variant='countined'  sx={{ mt: 3, mb: 2 }} title='logout'  onClick={()=>{
 UserService.logout()
 navigate(SIGN_IN_PATH)
  }
   
}
 >Logout</Button>
    </div>
  )
}

export default VetoDashboard