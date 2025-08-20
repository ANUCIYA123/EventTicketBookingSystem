import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ import axios

const HeroSection = () => {
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    city: "",
    lastDonationDate: ""
  });
  const [error, setError] = useState("");
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const lastDate = new Date(formData.lastDonationDate);
    const diffMonths =
      (today.getFullYear() - lastDate.getFullYear()) * 12 +
      (today.getMonth() - lastDate.getMonth());

    if (diffMonths < 3) {
      setError("⚠️ You can donate only after 3 months from your last donation.");
      return;
    }

    try {
      // ✅ POST to backend
      const response = await axios.post("http://localhost:8080/doner/saveDonor", formData);

      console.log("✅ Donor Data Saved:", response.data);
      setSnack({
        open: true,
        severity: "success",
        message: "🎉 Donor registered successfully!",
      });


      setShowDonorForm(false);
      setFormData({
        id: 0,
        fullName: "",
        email: "",
        phone: "",
        bloodGroup: "",
        city: "",
        lastDonationDate: ""
      });
    } catch (err) {
      console.error("❌ Error saving donor:", err);
      setSnack({
        open: true,
        severity: "error",
        message: "Something went wrong! Please try again.",
      });
    }
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  return (
    <Box
      className="hero-section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: "url('bg1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: 8,
      }}
    >
      <Container>
        <Grid container spacing={6} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#b71c1c" }}
              >
                Donate Blood, Save Lives
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                sx={{ mb: 4,textShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)" }}
              >
                Your small act of kindness can give someone a second chance at
                life. Join our community of donors and make a difference today.
              </Typography>

              <Box className="button-group" sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => setShowDonorForm(!showDonorForm)}
                  className="pulse-button"
                  sx={{ px: 4, borderRadius: "10px" }}
                >
                  Become a Donor
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  onClick={() => navigate("/request-blood")}
                  className="pulse-button"
                  sx={{ px: 4, borderRadius: "10px" }}
                >
                  Request Blood
                </Button>
              </Box>

              {/* Donor Form */}
              {showDonorForm && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      mt: 4,
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Typography variant="h5" mb={2} color="error">
                      Donor Registration Form
                    </Typography>

                    {error && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Full Name"
                        name="fullName"
                        fullWidth
                        margin="normal"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        fullWidth
                        margin="normal"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        select
                        label="Blood Group"
                        name="bloodGroup"
                        fullWidth
                        margin="normal"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        required
                      >
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                          (group) => (
                            <MenuItem key={group} value={group}>
                              {group}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                      <TextField
                        label="City"
                        name="city"
                        fullWidth
                        margin="normal"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        label="Last Donation Date"
                        name="lastDonationDate"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={formData.lastDonationDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Submit
                      </Button>
                    </form>
                  </Paper>
                </motion.div>
              )}
            </motion.div>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(183, 28, 28, 0.3)",
                }}
              >
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* ✅ Snackbar for feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
          variant="filled"
          sx={{
            width: "100%",
            fontWeight: "bold",
            backgroundColor:
              snack.severity === "error"
                ? "#d32f2f !important"
                : "#2e7d32 !important",
            color: "#fff !important",
          }}
        >
          {snack.message}
        </Alert>

      </Snackbar>

    </Box>
  );
};

export default HeroSection;
