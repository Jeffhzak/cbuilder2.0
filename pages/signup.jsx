import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import AlreadyLoggedIn from "../components/AlreadyLoggedIn";

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
            await signup(signupForm.email, signupForm.password);
            router.push("/");
        } 
        catch (error) {
            alert(`${error.message}`)
        }
        setDisabled(false);

    }

    if (!currentUser) return (
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
    else return (
        <>
        <AlreadyLoggedIn/>
        </>
    )
}

export default Signup;