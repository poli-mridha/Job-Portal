import API from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setSuccess("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            setError("Please enter a valid email address");

            return;

        }

        try {

            const res = await API.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log(res.data);

            setSuccess(
                "Account created Successfully! Redirecting to Sign in..."
            );

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (error) {

            console.log(error);

            const errorMessage =
                error.response?.data?.message;

            setError(
                errorMessage || "Registration Failed"
            );

            if (
                errorMessage ===
                "Email already exists. Please Sign in."
            ) {

                setTimeout(() => {

                    navigate("/login");

                }, 2000);

            }

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Start your career journey today
                </p>

                {success && (

                    <p className="success-message">
                        {success}
                    </p>

                )}

                {error && (

                    <p className="error-message">
                        {error}
                    </p>

                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Create Account
                    </button>

                </form>

                <p className="auth-link">

                    Already have an account?

                    <span
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </span>

                </p>

            </div>

        </div>

    );

}

export default Register;