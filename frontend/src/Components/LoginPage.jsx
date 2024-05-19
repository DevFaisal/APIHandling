import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const loginUser = async () => {
        try {
            const res = await axios.post("http://localhost:3000/loginUser", credentials)
            if (res.status === 200) {
                navigate("/dashboard")
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div>
            <h1>API Handling</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ color: "red" }}>{error}</p>
                <label >Email</label>
                <input
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    type="email" />
                <label >Password</label>
                <input
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    type="password" />
                <br />
                <button
                    onClick={loginUser}
                >Login</button>
            </div>
        </div >
    )
}

export default LoginPage