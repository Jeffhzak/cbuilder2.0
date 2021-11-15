import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";

const Login = () => {

    const router = useRouter();
    
    const { currentUser, login } = useAuth();

    // if (!currentUser) router.push("/")

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState({
        passwordError: false,
        passwordErrorMessage: "required." 
    })

    const [disabled, setDisabled] = useState(false);

    const handleFormChange = (event) => {
        console.log(event.target.id);
        const field = event.target.id;
        const value = event.target.value;
        const modifiedForm = {...loginForm, [field]:value};
        setLoginForm(modifiedForm);
    }

    const handleSubmit = async (event) => {
        // console.log("handlesubmit fired")

        setDisabled(true);
        setError({
            passwordError: false,
            passwordErrorMessage: "required."
        })

        try {
            await login(loginForm.email, loginForm.password);
            router.push("/");
        } 
        catch (error) {
            alert(`${error.message}`)
        }
        setDisabled(false);

    }

    return (
        <>
            <h1>login.jsx</h1>
            <button onClick={()=>{console.log(currentUser)}}>User Context</button>
            <h1>{currentUser?.email}</h1>

            <Box component="form" sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', display:"block" },
              }}>

                <TextField
                required
                id="email"
                label="email"
                variant="filled" 
                value={loginForm.email}
                helperText="required."
                onChange={handleFormChange}/>

                <TextField
                required
                id="password"
                label="password"
                type="password"
                variant="filled"
                value={loginForm.password}
                error={error.passwordError}
                helperText={error.passwordErrorMessage}
                onChange={handleFormChange}/>

                <Button disabled={disabled} onClick={handleSubmit} variant="contained">Log In</Button>

                <Box>
                    <Typography variant="subtitle2" display="inline">New user? </Typography>
                    <Typography variant="subtitle2" color="blue" display="inline"><Link href="/signup">Sign up here!</Link></Typography>
                </Box>
            </Box>
            
        </>
    )
}

export default Login;