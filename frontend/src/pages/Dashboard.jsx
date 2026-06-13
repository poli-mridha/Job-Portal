import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");

    const userEmail =
        localStorage.getItem("userEmail");

    const [appliedJobs, setAppliedJobs] = useState(() => {

        return JSON.parse(
            localStorage.getItem(
                `appliedJobs_${userEmail}`
            )
        ) || [];

    });

    useEffect(() => {

        localStorage.setItem(
            `appliedJobs_${userEmail}`,
            JSON.stringify(appliedJobs)
        );

    }, [appliedJobs, userEmail]);

    useEffect(() => {

        fetchJobs();

    }, []);

    async function fetchJobs() {

        try {

            const res =
                await API.get("/jobs");

            setJobs(res.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    function handleApply(job) {

        localStorage.setItem(

            "currentJobId",

            job._id

        );

        localStorage.setItem(

            "selectedJob",

            JSON.stringify(job)

        );

        navigate("/apply");

    }

    function handleSignOut() {

        localStorage.removeItem("token");

        localStorage.removeItem(
            "userEmail"
        );

        localStorage.removeItem(
            "currentJobId"
        );

        localStorage.removeItem(
            "selectedJob"
        );

        navigate("/");

    }

    return (

        <div className="dashboard">

            <div className="topbar">

                <div>

                    <h1>
                        Find Your Next Opportunity
                    </h1>

                    <div className="dashboard-stats">

                        <p>
                            Open Positions:
                            {" "}
                            {jobs.length}
                        </p>

                        <p>
                            Applications Submitted:
                            {" "}
                            {appliedJobs.length}
                        </p>

                    </div>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >

                    <button
                        onClick={() =>
                            navigate(
                                "/applications"
                            )
                        }
                    >
                        My Applications
                    </button>

                    <button
                        onClick={
                            handleSignOut
                        }
                    >
                        Sign Out
                    </button>

                </div>

            </div>

            <div className="search-section">

                <input
                    type="text"
                    placeholder="Search jobs..."
                    className="search-box"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <h2 className="section-title">
                Available Opportunities
            </h2>

            <div className="cards">

                {
                    jobs
                        .filter((job) =>
                            job.title
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                        )
                        .map((job) => (

                            <div
                                className="card"
                                key={job._id}
                            >

                                <h2>
                                    {job.title}
                                </h2>

                                <p>
                                    🏢 {job.company}
                                </p>

                                <p>
                                    📍 {job.location}
                                </p>

                                <p>
                                    💼 {
                                        job.jobType ||
                                        "Full Time"
                                    }
                                </p>

                                <p>
                                    💰 {
                                        job.salary ||
                                        "₹6 - ₹12 LPA"
                                    }
                                </p>

                                <button
                                    onClick={() =>
                                        !appliedJobs.includes(job._id) &&
                                        handleApply(job)
                                    }
                                    disabled={
                                        appliedJobs.includes(job._id)
                                    }
                                >
                                    {
                                        appliedJobs.includes(job._id)
                                            ? "Applied ✓"
                                            : "Apply"
                                    }
                                </button>

                            </div>

                        ))
                }

            </div>

        </div>

    );

}

export default Dashboard;