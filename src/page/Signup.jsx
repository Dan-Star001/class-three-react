import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const navigate = useNavigate()
    const addUser = () => {
        let newUser = { firstName, lastName, email, password, profilePicture }

        // Save user to backend
        axios.post("https://node-class-lxo9.onrender.com/user/signup", newUser)
            .then((res) => {
                console.log("Response:", res.data);
                alert("Signup successful! Please login.");

                // Save to local state for preview (optional)
                setAllUsers([...allUsers, newUser]);
                navigate("/signin");
            })
        .catch((err) => {
                console.error("Error:", err.response ? err.response.data : err);
                alert("Signup failed, try again.");
            });
    }

    return (
        <>
            <h1>Signup</h1>
            <input type="text" name='firstName' placeholder='Enter your first name' onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" name='lastName' placeholder='Enter your last name' onChange={(e) => setLastName(e.target.value)} />
            <input type="email" name='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
            <input type="text" name='profilePicture' placeholder='Enter your profile picture URL' onChange={(e) => setProfilePicture(e.target.value)} />
            <button onClick={addUser}>Signup</button>

            <h1>All Users</h1>
            {allUsers.length === 0 ? <p>No users signed up yet.</p> : allUsers.map((user, index) => (
                <div key={index}>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>Email: {user.email}</p>
                    <img src={user.profilePicture} alt="" width="100" />
                </div>
            ))}
        </>
    )
}

export default Signup