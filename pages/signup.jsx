import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import AlreadyLoggedIn from "../components/AlreadyLoggedIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Signup = () => {

    const router = useRouter();

    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    })

    const [error, setError] = useState({
        passwordError: false,
        passwordErrorMessage: "required." 
    })

    const [disabled, setDisabled] = useState(false);

    const { currentUser, signup } = useAuth();

    const handleFormChange = (event) => {
        console.log(event.target.id);
        const field = event.target.id;
        const value = event.target.value;
        const modifiedForm = {...signupForm, [field]:value};
        setSignupForm(modifiedForm);
    }

    const handleSubmit = async (event) => {
        // console.log("handlesubmit fired")
        if (signupForm.password !== signupForm.passwordConfirm) {
            return setError({
                passwordError: true,
                passwordErrorMessage: "Entered passwords do not match."
            })
        }

        setDisabled(true);
        setError({
            passwordError: false,
            passwordErrorMessage: "required."
        })

        try {
            // await signup(signupForm.email, signupForm.password);
            // toast.success("Success! Logging you in...", {
            //     position: "top-center",
            //     autoClose: 1000,
            // })

            await toast.promise(signup(signupForm.email, signupForm.password), 
            {
                pending: "Signing you up...",
                success: "Success! logging you in...",
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
            <h1>signup.jsx</h1>
            <button onClick={()=>{console.log(currentUser)}}>User Context</button>
            <h1>{currentUser?.email}</h1>

            <Box component="form" sx={{m: 1, width: '25em', display:"flex", flexDirection:"column", alignItems:"center"}}>

                <TextField
                required
                id="email"
                label="email"
                variant="filled" 
                value={signupForm.email}
                helperText="required."
                onChange={handleFormChange}/>

                <TextField
                required
                id="password"
                label="password"
                type="password"
                variant="filled"
                value={signupForm.password}
                error={error.passwordError}
                helperText={error.passwordErrorMessage}
                onChange={handleFormChange}/>

                <TextField
                required
                id="passwordConfirm"
                label="confirm password"
                type="password"
                variant="filled" 
                value={signupForm.passwordConfirm}
                error={error.passwordError}
                helperText={error.passwordErrorMessage}
                onChange={handleFormChange}/>

                <Button disabled={disabled} onClick={handleSubmit} variant="contained">Sign Up!</Button>
                <Box>
                    <Typography variant="subtitle2" display="inline">Already have an account? </Typography>
                    <Typography variant="subtitle2" className="link" display="inline"><Link href="/login">Log in here!</Link></Typography>
                </Box>
            </Box>
            </>
        )
    }

    return (
        <>
        {currentUser ? <AlreadyLoggedIn/> : normalPage()}
        
        <ToastContainer />
        </>
    )
}

export default Signup;