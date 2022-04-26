import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();


    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();

        if (json.success) {
            //Save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in successfully", "success");
            navigate('/');
        }
        else
            props.showAlert("Invallid credentials!", "danger");
    };

    return (
        <div className="container my-3" style={{ width: '600px' }}>
            <fieldset class="border p-2" >
                <h3 class="float-none w-auto mt-3 mx-3" style={{ color: 'rgba(6, 37, 66, 0.705)' }}>Login to your Account</h3>
                <form onSubmit={handleSubmit} style={{ width: '500px', padding: '3rem' }} className= "input-group-lg">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </fieldset>
        </div>
    )
}

export default Login
