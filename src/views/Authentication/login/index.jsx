import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "@/assets/logos/theuniquesCommunity.png"; // Replace with your actual logo path
import loginImage from "@/assets/img/login/login.svg"; // Right side image
import { useNavigate } from "react-router-dom";
import bg from "@/assets/img/login/bg.png"; // Background image

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100vh",
        gap: 4,
        px: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Column: Logo, Heading, Form */}
      <Box
        sx={{
         
          maxWidth: 500,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 2 }}>
          <img src={logo} alt="Logo" style={{ width: 190, height: "auto" }} />
        </Box>

        <Typography variant="h5" sx={{ fontSize: 40 , mb:9 }} color={theme.palette.primary.dark} gutterBottom>
          Login
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
          })}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            try {
              const res = await fetch("http://localhost:5000/auth/emailLogin", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              const data = await res.json();
              if (res.ok) {
                toast.success("Logged in successfully");
                navigate("/dashboard");
              } else {
                setErrors({ submit: data.error || "Login failed" });
              }
            } catch (error) {
              toast.error("An error occurred during login");
              setErrors({ submit: "An error occurred" });
            }
            setSubmitting(false);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting }) => (
            <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email"
                  sx={{ height: "56px", fontSize: "1rem" }} // Increased size
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-login"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="on"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  sx={{ height: "56px", fontSize: "1rem" }} // Increased size
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              {errors.submit && (
                <FormHelperText error sx={{ mb: 2 }}>
                  {errors.submit}
                </FormHelperText>
              )}

              <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} sx={{ mt: 1 , height:"46px" }}>
                Sign In
              </Button>
            </form>
          )}
        </Formik>
      </Box>

      {/* Right Column: Image */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={loginImage} alt="Login Illustration" style={{ width: "100%", maxWidth: 500 }} />
      </Box>
    </Box>
  );
};

export default Login;
