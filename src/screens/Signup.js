// import { useState } from 'react';
// import Header from '../components/Header';
// import React from 'react';
// import form from 'react-bootstrap/form';
// import { Footer } from '../components/Footer';

// export const Signup = () => {
//     const [credentials, setCredentials] = useState({name:"",email:"",password:""});

//     const handleSubmit = async(e)=> {
//         e.preventDefault();
//         const response = await  fetch("http://localhost:4000/signup",{
//             method : 'POST',
//             headers:{
//                 'Content-Type' : 'application/json'
//             },
//             body: JSON.stringify()
//         }
//         );
//         const json = await response.json();
//         console.log(json);

//     }
//     const onChange = (event)=>{
//         setCredentials({...credentials,[event.target.name] : event.target.value})
//     }

//     return (
//         <>  
//             <Header/>
//             <div className="container"x>
//                 <form onSubmit={
//                     handleSubmit
//                 }>
//                     <div className="mb-3">
//                         <label htmlFor="Name" className="form-label">Name</label>
//                         <input type="Text" className="form-control" name = 'name' value = {credentials.name} onChange = {onChange} />
                       
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input type="email" className="form-control" name = 'email' value = {credentials.email} onChange = {onChange}/>
                       
//                     </div>
                    
//                     <div className="mb-3">
//                         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//                         <input type="password" className="form-control" name = 'password' value = {credentials.password} onChange = {onChange}/>
//                     </div>
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </form>
//             </div>
//             <Footer/>
//         </>
//     )
// }

// export default Signup;




import axios from 'axios';
import React, { useState } from 'react';

const User = () => {
    const [credentials, setCredentials] = useState({
        name: "",
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

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/signup", {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            });
            console.log(response.data); // Assuming you want to log the response
        } catch (error) {
            console.error("Error:", error);
        }
    };
//   const handleSubmit = (e)=>{
//     e.preventDefault();
//     const response = axios("http://localhost:4000/user",{
//         method : 'POST',
//         header:{
//             'Content-Type' : 'application/json'
//         },
//         body:JSON.stringify()
//     });

// }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" name='name' value={credentials.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name='email' value={credentials.email} onChange={handleChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={credentials.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default User;