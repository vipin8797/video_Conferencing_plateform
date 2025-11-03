import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
} from "@mui/material";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", formData);
    } else {
      console.log("Signing up with:", formData);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card sx={{ width: 380, p: 3, boxShadow: 6, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            {isLogin
              ? "Please sign in to continue"
              : "Sign up to get started"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {!isLogin && (
                <TextField
                  label="Full Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              )}

              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 1, borderRadius: 2 }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>

              <Typography variant="body2" align="center">
                {isLogin ? (
                  <>
                    Don’t have an account?{" "}
                    <Link
                      component="button"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link
                      component="button"
                      onClick={() => setIsLogin(true)}
                    >
                      Log in
                    </Link>
                  </>
                )}
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
