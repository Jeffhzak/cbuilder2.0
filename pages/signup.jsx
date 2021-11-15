import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const Signup = () => {

    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    })

    const handleFormChange = (event) => {
        console.log(event.target.id);
        const field = event.target.id;
        const value = event.target.value;
        const modifiedForm = {...signupForm, [field]:value};
        setSignupForm(modifiedForm);
    }

    return (
        <>
            <h1>login.jsx</h1>
            <Button onClick={()=>{setSignupForm({
                email: "test1",
                password: "test2",
                passwordConfirm: "test3",
            })}}>test</Button>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', display:"block" },
              }}>
                  <TextField
                  required
                  id="email"
                  label="email"
                  variant="filled" 
                  value={signupForm.email}
                  onChange={handleFormChange}/>
                  <TextField
                  required
                  id="password"
                  label="password"
                  type="password"
                  variant="filled"
                  value={signupForm.password} 
                  onChange={handleFormChange}/>
                  <TextField
                  required
                  id="passwordConfirm"
                  label="confirm password"
                  type="password"
                  variant="filled" 
                  value={signupForm.passwordConfirm}
                  onChange={handleFormChange}/>
                  
            </Box>
            
        </>
    )
}

export default Signup;