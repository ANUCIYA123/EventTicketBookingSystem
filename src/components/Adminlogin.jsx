import {
    Button,
    Container,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function AdminLoginPage() {
    const navigate = useNavigate();
    const [data, setData] = useState({ username: "", password: "" });
    const [users, setUsers] = useState([]);
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleClose = () => setSnack({ ...snack, open: false });

    useEffect(() => {
        fetch("http://localhost:8080/getAllAdmin")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err));
    }, []);

    const handleLogin = () => {
        const found = users.find(
            (user) =>
                user.username === data.username && user.password === data.password
        );

        if (found) {
            setSnack({
                open: true,
                message: "Successfully Logged In!",
                severity: "success",
            });
            setTimeout(() => navigate("/admin-dashboard"), 1500);
        } else {
            setSnack({
                open: true,
                message: "Invalid Credentials",
                severity: "error",
            });
        }
    };

    return (
        <Container maxWidth={false} className="login-bg">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="login-box"
            >
                <Typography variant="h4" className="login-title">
                    Admin Login
                </Typography>

                <TextField
                    InputLabelProps={{ style: { color: "red" } }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "red" },
                            "&:hover fieldset": { borderColor: "darkred" },
                            "&.Mui-focused fieldset": { borderColor: "red" },
                        },
                    }}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                />

                <TextField
                    InputLabelProps={{ style: { color: "red" } }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "red" },
                            "&:hover fieldset": { borderColor: "darkred" },
                            "&.Mui-focused fieldset": { borderColor: "red" },
                        },
                    }}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />

                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleLogin}
                    sx={{ mt: 2, fontWeight: "bold" }}
                >
                    Login
                </Button>
            </motion.div>


            <Snackbar
                open={snack.open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity={snack.severity}
                    onClose={handleClose}
                    variant="filled"
                    sx={{
                        width: "100%",
                        bgcolor: snack.severity === "error" ? "#f44336 !important" : "#4caf50 !important",
                        color: "#fff",
                    }}
                >
                    {snack.message}
                </Alert>

            </Snackbar>
        </Container>
    );
}
