import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (isLogin) {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('access', data.access)
                localStorage.setItem('refresh', data.refresh)
                navigate('/')
            } else {
                alert('Invalid username or password!')
            }

        } else {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Account created! Please login.')
                setIsLogin(true)
            } else {
                alert(data.error || 'Signup failed!')
            }
        }
    }

    return (
        <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
            <div className="card bg-secondary bg-opacity-10 border-secondary text-white p-4" style={{ width: '100%', maxWidth: '420px', borderRadius: '16px' }}>

                <div className="text-center mb-4">
                    <h2 className="fw-bold">🎬 Movie-Log</h2>
                    <p className="text-secondary">{isLogin ? 'Welcome back!' : 'Create your account'}</p>
                </div>

                <div className="d-flex mb-4 bg-dark rounded p-1">
                    <button
                        className={`btn w-50 ${isLogin ? 'btn-danger' : 'btn-dark'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`btn w-50 ${!isLogin ? 'btn-danger' : 'btn-dark'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Username — shown in both login and signup */}
                    <div className="mb-3">
                        <label className="form-label text-secondary">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="hasnain123"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email — only shown in signup */}
                    {!isLogin && (
                        <div className="mb-3">
                            <label className="form-label text-secondary">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {/* Password — shown in both */}
                    <div className="mb-4">
                        <label className="form-label text-secondary">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-danger w-100 fw-semibold py-2">
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>

                {isLogin && (
                    <p className="text-center text-secondary mt-3 mb-0" style={{ fontSize: '13px' }}>
                        Forgot your password? <a href="#" className="text-danger">Reset it</a>
                    </p>
                )}
            </div>
        </div>
    )
}

export default Login;