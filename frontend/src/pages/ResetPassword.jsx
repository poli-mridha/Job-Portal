import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        if (password !== confirmPassword) {

            setMessage("Passwords do not match");

            return;

        }

        try {

            const res = await API.post(
                "/auth/reset-password",
                {
                    email,
                    password
                }
            );

            setMessage(res.data.message);

            setTimeout(() => {

                navigate("/login");

            }, 2000);

        }

        catch (error) {

            console.log(error);

            setMessage("Failed to reset password");

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>Reset Password</h1>

                <p className="auth-subtitle">
                    Enter your new password
                </p>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Reset Password
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ResetPassword;