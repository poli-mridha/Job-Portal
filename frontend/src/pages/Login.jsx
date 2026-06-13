import API from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "userEmail",
                email
            );

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            alert("Login Failed");

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Sign in to continue your job search
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="auth-link">

                        <span
                            onClick={() => navigate("/forgot-password")}
                            style={{ cursor: "pointer" }}
                        >
                            Forgot Password?
                        </span>

                    </p>
                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Sign In
                    </button>

                </form>

                <p className="auth-link">

                    Don't have an account?

                    <span
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </span>

                </p>
            </div>

        </div>

    );

}

export default Login;