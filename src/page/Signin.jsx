import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const loginUser = () => {
        const oldUser = { email, password }
        axios.post("https://node-class-lxo9.onrender.com/user/signin", oldUser)
            .then((res) => {
                console.log("Response:", res.data);

                if (res.data.message === "Login Successful") {
                    alert("Welcome back!");
                    localStorage.token = res.data.user.token
                    // Redirect only when confirmed
                    navigate("/Dashboard");
                } else {
                    alert(res.data.message || "Invalid credentials");
                }
            })
            .catch((err) => {
                console.error("Error:", err.response ? err.response.data : err);
                alert("Login failed. Please check your email or password.");
            });
    }

    return (
        <>
            <h1>Signin</h1>
            <input
                type="email"
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                name='email' />
            <input
                type="password"
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                name='password' />
            <button onClick={loginUser}>Signin</button>
        </>
    )
}

export default Signin