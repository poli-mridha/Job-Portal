import { useState } from "react";
import API from "../services/api";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        try {

            await API.post(
                "/auth/forgot-password",
                { email }
            );

            localStorage.setItem(
                "resetEmail",
                email
            );

            window.location.href = "/verify-otp";

        } catch (error) {

            console.log(error);

            setLoading(false);

            setMessage(
                "Failed to send OTP"
            );

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>Forgot Password</h1>

                <p className="auth-subtitle">
                    Enter your email to receive an OTP
                </p>

                {message && (

                    <p className="success-message">
                        {message}
                    </p>

                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Sending OTP..."
                                : "Send OTP"
                        }
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ForgotPassword;