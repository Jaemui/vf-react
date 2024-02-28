import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Typography, Link, Container, CssBaseline, Grid } from '@mui/material';
import { registerUser } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const validationSchema = Yup.object({
    username: Yup
        .string()
        .max(255)
        .required('Required'),
    email: Yup
        .string()
        .email('Invalid email format')
        .max(255)
        .required('Required'),
    password: Yup
        .string()
        .matches(passwordRules, { message: "Please create a stronger password with at least 7 characters (1 upper case letter, 1 lower case letter, and 1 numeric digit." })
        .max(255)
        .required('Required'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required("Required"),
    policy: Yup
        .boolean()
        .oneOf([true], 'This field must be checked'),
})

const FirebaseSignUp = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async(values) => {
            try{
                await registerUser(values.email, values.password, values.username);
                console.log("Success: ", values.username, values.email, values. password, values.confirmPassword); 
                navigate('/profile');
            } catch (error){
                alert('Failed to Signup')
            }
        }, 
    }); 
    return (
        <Container component="main" maxWidth = "xs">
            <CssBaseline /> 
            <Box sx ={{marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',}}
            >
                <Typography component ="h1" variant = "h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="confirmPassword"
                            type="password"
                            id="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2" 
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                navigate('/'); // Use the navigate function here
                             }}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default FirebaseSignUp;
export{}; 