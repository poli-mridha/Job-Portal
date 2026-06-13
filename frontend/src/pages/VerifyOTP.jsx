import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        const email = localStorage.getItem("resetEmail");

        try {

            const res = await API.post(
                "/auth/verify-otp",
                {
                    email,
                    otp
                }
            );

            setMessage(res.data.message);

            setTimeout(() => {

                navigate("/reset-password");

            }, 1500);

        }

        catch (error) {

            console.log(error);

            setMessage("Invalid OTP");

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>Verify OTP</h1>

                <p className="auth-subtitle">
                    Enter the OTP sent to your email
                </p>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Verify OTP
                    </button>

                </form>

            </div>

        </div>

    );

}

export default VerifyOTP;