import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import loginImage from "../../img/irembo1.png";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link
                color="inherit"
                href="/"
                target="_blank"
            >
                Irembo
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${loginImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function Login() {
    const toastMessage = (message) =>
        toast(message, {
            transition: Bounce,
            closeButton: true,
            autoClose: 5000,
            position: "top-center",
            type: "error",
        });

    const [email, setEmail] = useState("default");
    const [password, setPassword] = useState("default");
    const history = useNavigate();


    const classes = useStyles();

    async function login(e) {
        e.preventDefault();
        const loginData = { userEmail: email, password: password };
        try {
            console.log(loginData)
            const loginFeedback = await axios.post('/user/login', loginData);
            const loginFeedbackData = loginFeedback.data;
            console.log(loginFeedbackData=="")

            const adminUsername = 'admin';
            const adminPassword = 'admin';
            if (loginFeedbackData =="") {
                history('../dashboard', { replace: true })
            } else {
                alert('Invalid Credentials, Try Again!')
            }

        } catch (err) {
            console.log(err)
            {
                alert('Error Occured');
            }
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    <form
                        className={classes.form}
                        onSubmit={login}
                        method="post"
                        encType="multipart/form-data"
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                        <Box mt={5}>
                            <div class="row">
                                <div class=" row col-md-12 boxlayout">
                                    <div class=" col-md-4"> <Link color="inherit" href="/forgotten-password"><u>Forgot Password</u></Link></div>
                                    <div class=" col-md-8">Don't have an account? <Link color="inherit" href="/signup"><u>Signup now!</u></Link></div>

                                </div>
                            </div>
                            <br />

                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}