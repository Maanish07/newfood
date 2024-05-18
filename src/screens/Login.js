import React, { useState } from 'react'

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
  return (
    <>
    <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name='email' value={credentials.email} onChange={handleChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={credentials.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
    </>
  )
}

export default Login