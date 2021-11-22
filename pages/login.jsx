import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import AlreadyLoggedIn from "../components/AlreadyLoggedIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Login = () => {

    const router = useRouter();
    
    const { currentUser, login } = useAuth();

    // if (currentUser) router.push("/")

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
            await toast.promise(
                login(loginForm.email, loginForm.password),
                {
                    pending: "Logging you in...",
                    success: "Success!",
                }, {
                    position: "top-center",
                    autoClose: 500,
                });
            setTimeout (() => {
                router.push("/");
            }, 500);
        } 
        catch (error) {
            toast.dismiss();
            toast.error(`${error.message}`, {
                position: "top-center",
                autoClose: 4000,
            })
        }
        setDisabled(false);

    }

    const normalPage = () => {
        return (
            <>
            <h1>login.jsx</h1>
            <button onClick={()=>{console.log(currentUser)}}>User Context</button>
            <h1>{currentUser?.email}</h1>

            <Box component="form" sx={{m: 1, width: '25em', display:"flex", flexDirection:"column", alignItems:"center"}}>

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
                <Typography variant="subtitle2" className="link" display="inline"><Link href="/reset-password">Forgot Password?</Link></Typography>


                <Box>
                    <Typography variant="subtitle2" display="inline">New user? </Typography>
                    <Typography variant="subtitle2" className="link" display="inline"><Link href="/signup">Sign up here!</Link></Typography>
                </Box>
            </Box>
            </>
        )
    }
    return (
        <>
        {currentUser ? <><AlreadyLoggedIn/><button onClick={()=>{console.log(currentUser._delegate)}}>test</button></> : normalPage()}

        <ToastContainer theme="dark"/>
        </>
    )
}

export default Login;