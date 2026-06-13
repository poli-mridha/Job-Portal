import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

        <div>

            <Navbar />

            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Find Your Dream Job Today
                    </h1>

                    <p>
                        Discover thousands of opportunities from top companies
                        and build your future with confidence.
                    </p>

                    <div className="hero-buttons">

                        <button
                            onClick={() => navigate("/login")}
                        >
                            Explore Jobs
                        </button>

                    </div>

                </div>

            </section>

            <section className="stats">

                <div className="stat-box">

                    <h2>500+</h2>

                    <p>Active Jobs</p>

                </div>

                <div className="stat-box">

                    <h2>100+</h2>

                    <p>Companies</p>

                </div>

                <div className="stat-box">

                    <h2>2000+</h2>

                    <p>Candidates</p>

                </div>

            </section>

            <section className="features">

                <div className="feature-card">

                    <div className="feature-icon">🚀</div>

                    <h3>Quick Apply</h3>

                    <p>
                        Apply to thousands of jobs with a simple and fast process.
                    </p>

                </div>

                <div className="feature-card">

                    <div className="feature-icon">🏢</div>

                    <h3>Top Companies</h3>

                    <p>
                        Explore opportunities from leading global organizations.
                    </p>

                </div>

                <div className="feature-card">

                    <div className="feature-icon">📈</div>

                    <h3>Career Growth</h3>

                    <p>
                        Find positions that help you grow professionally.
                    </p>

                </div>

            </section>

            <section className="trusted">

                <h2>Trusted By Leading Companies</h2>

                <div className="trusted-logos">

                    <span>Google</span>

                    <span>Microsoft</span>

                    <span>Amazon</span>

                    <span>TCS</span>

                    <span>Infosys</span>

                </div>

            </section>

            <section className="categories">

                <h2>Popular Job Categories</h2>

                <div className="category-grid">

                    <div className="category-card">
                        💻 Software Development
                    </div>

                    <div className="category-card">
                        📊 Data Science
                    </div>

                    <div className="category-card">
                        🎨 UI / UX Design
                    </div>

                    <div className="category-card">
                        📈 Marketing
                    </div>

                    <div className="category-card">
                        ☁️ Cloud Computing
                    </div>

                    <div className="category-card">
                        🔒 Cyber Security
                    </div>

                </div>

            </section>

            <footer className="footer">

                <h2>JobPortal</h2>

                <p>
                    Connecting talented professionals with leading companies worldwide.
                </p>

                <div className="footer-links">

                    <a href="#">Home</a>

                    <a href="#">Jobs</a>

                    <a href="#">Contact</a>

                </div>

                <p className="copyright">
                    © 2026 JobPortal. All rights reserved.
                </p>

            </footer>

        </div>

    );

}

export default Home;