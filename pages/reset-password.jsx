import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Reset_password = () => {

    const router = useRouter();
    
    const { resetPassword } = useAuth();

    // if (currentUser) router.push("/")

    const [loginForm, setLoginForm] = useState({
        email: "",
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

        setDisabled(true);

        try {
            await toast.promise(resetPassword(loginForm.email),
            {
                pending: "Submitting request...",
                success: "Success! Check your email to reset password.",
            }, {
                position: "top-center",
                autoClose: 3000,
            })
        }
        catch (error) {
            toast.dismiss();
            toast.error(`${error.message}`, {
                position: "top-center",
                autoClose: 3000,
            })
        }

        setDisabled(false);
    }
    return (
        <>
            <h1>reset_password.jsx</h1>
            <Box component="form" sx={{m: 1, width: '25em', display:"flex", flexDirection:"column", alignItems:"center"}}>

                <TextField
                required
                id="email"
                label="email"
                variant="filled" 
                value={loginForm.email}
                helperText="required."
                onChange={handleFormChange}/>

                <Button disabled={disabled} onClick={handleSubmit} variant="contained">Reset Password</Button>

                <Box>
                    <Typography variant="subtitle2" display="inline">New user? </Typography>
                    <Typography variant="subtitle2" className="link" display="inline"><Link href="/signup">Sign up here!</Link></Typography>
                </Box>
            </Box>
        <ToastContainer theme="dark"/>
        </>
    )
}

export default Reset_password;