import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Login() {
   const [showPassword, setShowPassword] = useState(false)
   
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
         }}>
            <h2>Login</h2>
            <TextField 
               id="username" 
               label="Username" 
               variant="outlined" 
            />
            <FormControl sx={{ width: '25ch' }} variant="outlined">
               <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
               <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                  <InputAdornment position="end">
                     <IconButton
                        aria-label={
                           showPassword ? 'hide the password' : 'display the password'
                        }
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
            <Button variant="contained" sx={{ backgroundColor: "#692f6b" }}>Login</Button>
            <Button variant="outlined" sx={{ color: "#692f6b", borderColor: "#692f6b" }}>Sign Up</Button>
         </Box>
      </div>
   )
}