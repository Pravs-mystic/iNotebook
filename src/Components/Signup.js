import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {


    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" ,confirmpassword:""});
    let navigate = useNavigate();


    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();

        if (json.success) {
            //Save the auth-token and redirect
            console.log(json);
            props.showAlert("Account created successfully", "success");
            navigate('/');
        }
        else
            props.showAlert("Invallid credentials!", "danger");
    };


    return (
        <div className="container my-2" style={{ width: '600px' }}>
            <h3 style={{ color: 'rgba(153, 14, 14, 0.801)' }}>Create an Account</h3>
            <form onSubmit={handleSubmit} style={{ width: '500px' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} minLength = {5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">confirmPassword</label>
                    <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" value={credentials.confirmpassword} onChange={handleChange} minLength={5} required />
                </div>


                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
