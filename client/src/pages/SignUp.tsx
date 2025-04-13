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
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
   const [showPassword, setShowPassword] = useState(false)
   const [signUpFormState, setSignUpFormState] = useState({ 
      name: '',
      company: '',
      username: '', 
      password: '', 
   })
   const navigate = useNavigate()
   
   const handleSubmitSignUp = async () => {      
      if (!signUpFormState.name || !signUpFormState.company || !signUpFormState.username || !signUpFormState.password) {
         toast.error('All fields are required')
         return
      }

      const response = await axios.post('http://localhost:8080/api/signup', signUpFormState, { withCredentials: true })

      console.log(response)
      
      if (response.status === 201) {
         toast.success('Sign up successful')
         navigate('/login')
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
            <h2>Sign Up</h2>
            <TextField
               id="name"
               label="Name"
               variant="outlined"
               value={signUpFormState.name}
               onChange={(e) => setSignUpFormState({ ...signUpFormState, name: e.target.value })}
            />
            <TextField
               id="company"
               label="Company"
               variant="outlined"
               value={signUpFormState.company}
               onChange={(e) => setSignUpFormState({ ...signUpFormState, company: e.target.value })}
            />
            <TextField 
               id="username" 
               label="Username" 
               variant="outlined" 
               value={signUpFormState.username}
               onChange={(e) => setSignUpFormState({ ...signUpFormState, username: e.target.value })}
            />
            <FormControl sx={{ }} variant="outlined">
               <InputLabel htmlFor="password">Password</InputLabel>
               <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={signUpFormState.password}
                  onChange={(e) => setSignUpFormState({ ...signUpFormState, password: e.target.value })}
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
               onClick={handleSubmitSignUp}
            >Sign Up</Button>
            <Button 
               variant="outlined" 
               sx={{ color: "#692f6b", borderColor: "#692f6b" }}
               onClick={() => navigate('/')}
            >Log In</Button>
         </Box>
      </div>
   )
}