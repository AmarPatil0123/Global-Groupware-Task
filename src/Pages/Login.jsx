import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../components/Loading";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;

            setShowLoading(true);
            const resp = await fetch(`${baseUrl}api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await resp.json();

            if (data.error) {
                toast.error(data.error, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setShowLoading(false);
                return;
            } else {
                setShowLoading(false);
                localStorage.setItem("user", JSON.stringify(data.token));
                navigate("/home");
            }
        } catch (error) {
            console.log(error.error);
            setShowLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={showLoading}>
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer />
            {showLoading && <SimpleBackdrop />}
        </div>
    );
};

export default Login;
