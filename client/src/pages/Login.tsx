import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

export default function Login() {
   const [showPassword, setShowPassword] = useState(false)
   const [loginFormState, setLoginFormState] = useState({ username: '', password: '' })
   const navigate = useNavigate()
   
   const handleSubmitLogin = async () => {
      if (!loginFormState.username || !loginFormState.password) {
         toast.error('All fields are required')
         return
      }

      const response = await axios.post('http://localhost:8080/api/login', loginFormState, { withCredentials: true })
      
      if (response.status === 200 || response.status === 201) {
         toast.success('Login successful')
         navigate('/inventory')
      } else if (response.status === 401) {
         toast.error('Invalid username or password')
      } else if (response.status === 500) {
         toast.error('Internal server error. Please refresh the page and try again.')
      } else {
         toast.error('An error occurred. Please try again.')
      }
   
   }

   return (
      <div style={{ 
         display: 'flex', 
         justifyContent: 'center', 
         alignItems: 'center', 
         height: '100vh', 
         width: '100vw',
      }}>
         <Box sx={{ 
            border: '1px solid lightgrey', 
            padding: '20px', 
            borderRadius: '4px', 
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            rowGap: '15px',
            width: '300px',
         }}>
            <h2>Login</h2>
            <TextField 
               id="username" 
               label="Username" 
               variant="outlined" 
               value={loginFormState.username}
               onChange={(e) => setLoginFormState({ ...loginFormState, username: e.target.value })}
            />
            <FormControl sx={{ }} variant="outlined">
               <InputLabel htmlFor="password">Password</InputLabel>
               <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={loginFormState.password}
                  onChange={(e) => setLoginFormState({ ...loginFormState, password: e.target.value })}
                  endAdornment={
                  <InputAdornment position="end">
                     <IconButton
                        aria-label={ showPassword ? 'hide the password' : 'display the password' }
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                     >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                  </InputAdornment>
                  }
                  label="Password"
               />
            </FormControl>
            <Button 
               variant="contained" 
               sx={{ backgroundColor: "#692f6b" }}
               onClick={handleSubmitLogin}
            >Log In</Button>
            <Button 
               variant="outlined" 
               sx={{ color: "#692f6b", borderColor: "#692f6b" }}
               onClick={() => navigate('/signUp')}
            >Sign Up</Button>
         </Box>
      </div>
   )
}