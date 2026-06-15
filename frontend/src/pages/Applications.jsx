import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Applications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        fetchApplications();

    }, []);

    async function fetchApplications() {

        try {

            const userEmail =
                localStorage.getItem("userEmail");

            const res = await API.get(

                `/applications?email=${userEmail}`

            );

            setApplications(
                res.data
            );

        }

        catch (error) {

            console.log(error);

        }

    }
    async function handleWithdraw(id) {

        try {

            const removedApp = applications.find(
                (app) => app._id === id
            );

            await API.delete(`/applications/${id}`);

            if (removedApp) {

                const userEmail =
                    localStorage.getItem("userEmail");

                const appliedJobs =
                    JSON.parse(
                        localStorage.getItem(
                            `appliedJobs_${userEmail}`
                        )
                    ) || [];

                const updatedJobs =
                    appliedJobs.filter(
                        (jobId) =>
                            jobId !== removedApp.jobId
                    );

                localStorage.setItem(
                    `appliedJobs_${userEmail}`,
                    JSON.stringify(updatedJobs)
                );

            }

            fetchApplications();

            alert(
                "Application withdrawn successfully"
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Failed to withdraw application"
            );

        }

    }
    return (

        <div className="dashboard">

            <div className="topbar">

                <h1>Application History</h1>

                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Back
                </button>

            </div>

            <h3>
                Total Applications: {applications.length}
            </h3>

            <div className="cards">

                {

                    applications.length === 0

                        ?

                        <p>
                            No applications found.
                        </p>

                        :

                        applications.map((app) => (

                            <div
                                className="card"
                                key={app._id}
                            >

                                <h2>
                                    {app.jobTitle}
                                </h2>

                                <p>
                                    🏢 {app.company}
                                </p>

                                <br />

                                <p>
                                    📧 {app.email}
                                </p>

                                <p>
                                    📱 +91 {app.phone}
                                </p>

                                <p>
                                    📄 Resume: {app.resume}
                                </p>

                                <p>
                                    📅 Applied:
                                    {" "}
                                    {new Date(
                                        app.appliedAt
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    ⏳ Status:
                                    {" "}
                                    {app.status}
                                </p>

                                <button
                                    onClick={() =>
                                        handleWithdraw(app._id)
                                    }
                                >
                                    Withdraw Application
                                </button>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default Applications;