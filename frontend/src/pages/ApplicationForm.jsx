import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ApplicationForm() {

    const navigate = useNavigate();

    const selectedJob = JSON.parse(
        localStorage.getItem("selectedJob")
    );

    const [formData, setFormData] = useState({

        name: "",
        email: localStorage.getItem("userEmail") || "",
        phone: "",
        resume: ""

    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(formData.phone)) {

            setLoading(false);

            alert(
                "Please enter a valid 10-digit mobile number"
            );

            return;

        }

        try {

            await API.post(

                "/applications",

                {

                    ...formData,

                    jobId: selectedJob?._id,

                    jobTitle: selectedJob?.title,

                    company: selectedJob?.company

                }

            );

            const jobId =
                localStorage.getItem(
                    "currentJobId"
                );

            if (jobId) {

                const appliedJobs =
                    JSON.parse(
                        localStorage.getItem(
                            `appliedJobs_${localStorage.getItem("userEmail")}`
                        )
                    ) || [];

                if (
                    !appliedJobs.includes(jobId)
                ) {

                    appliedJobs.push(jobId);

                    localStorage.setItem(

                        `appliedJobs_${localStorage.getItem("userEmail")}`,

                        JSON.stringify(
                            appliedJobs
                        )

                    );

                }

            }

            navigate(
                "/application-success"
            );

        }

        catch (error) {

            setLoading(false);

            console.log(error);

            alert(
                "Failed to submit application"
            );

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card application-card">

                <h1>Job Application</h1>

                <p className="auth-subtitle">

                    Fill in your details and upload your resume

                </p>

                {

                    selectedJob && (

                        <div
                            style={{
                                background: "#f8fafc",
                                padding: "15px",
                                borderRadius: "10px",
                                marginBottom: "20px"
                            }}
                        >

                            <h3>
                                {selectedJob.title}
                            </h3>

                            <p>
                                🏢 {selectedJob.company}
                            </p>

                            <p>
                                📍 {selectedJob.location}
                            </p>

                        </div>

                    )

                }

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                    />

                    <div className="phone-input-container">

                        <span className="country-code">
                            +91
                        </span>

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            maxLength="10"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={(e) =>
                            setFormData({

                                ...formData,

                                resume:
                                    e.target.files[0]?.name || ""

                            })
                        }
                    />

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Submitting..."
                                : "Submit Application"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ApplicationForm;