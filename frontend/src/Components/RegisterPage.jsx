import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function RegisterPage() {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const [error, setError] = useState("")

    const registerUser = async () => {
        try {
            const res = await axios.post("http://localhost:3000/registerUser", credentials)
            if (res.status === 200) {
                alert(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            console.error(error)
            setError(error.response.data.message)
        }
    }

    return (
        <div>
            <h1>API Handling</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ color: "red" }}>{error}</p>
                <label >Name</label>
                <input
                    onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                    type="text" />
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
                    onClick={registerUser}
                >Register</button>
            </div>
        </div>
    )
}

export default RegisterPage