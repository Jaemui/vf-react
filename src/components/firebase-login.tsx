import  React  from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Typography, Link, Container } from '@mui/material';
import { signInUser } from '../config/firebase-auth';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup
        .string()
        .email('Invalid email format')
        .required('Required'),
    password: Yup
        .string()
        .required('Required'),
});
  
const FirebaseLogin = () => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          await signInUser(values.email, values.password);
          console.log("successfully logged into fantasy valorant")
          navigate('/profile');
        } catch (error) {
          alert('Failed to login');
        }
      },
    });
    return (
    <Container sx = {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', width: '100vw'}} >
        <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column' , alightItems: 'center', gap: 2 }}>
            <img src = "/static/headers/app name (1).png" />
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username/email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
            </form>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            Don’t have an account? 
            <Link href="/register" 
                  onClick={(e) => {
                    e.preventDefault(); 
                    navigate('/signup'); 
              }}>Create one</Link>
            </Typography>
        </Box>
      </Container>
    );
  };

export default FirebaseLogin;
export{};