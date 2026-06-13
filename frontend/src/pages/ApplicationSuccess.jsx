import { useNavigate } from "react-router-dom";

function ApplicationSuccess() {

    const navigate = useNavigate();

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>Application Submitted</h1>

                <p className="auth-subtitle">

                    Your application has been submitted successfully.

                </p>

                <button
                    className="auth-btn"
                    onClick={() =>
                        navigate("/applications")
                    }
                >
                    View My Applications
                </button>

            </div>

        </div>

    );

}

export default ApplicationSuccess;