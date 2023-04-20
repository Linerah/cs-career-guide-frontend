import "./Auth.css"
import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
function Auth() {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/home" replace />;
    }
    
    return <>
        <div className="w-100 h-screen">
            <div className="flex space-x-56 justify-center items-center">
                <img className="h-40" src="logo_auth.png" alt="logo"></img>
            </div>
            <div className="flex h-1/2 space-x-56 justify-center items-center">
                <Register/>
                <Login/>
            </div>
        
        </div>
    </>
}
export default Auth;

function Login(){
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
      });
    const [err, setErr] = useState(null);
    let navigate = useNavigate();
    // this will be used when I have the end point for login

    // this method will be use to handle any changes to the input in the login form
    const handleChange = (e) => {
        console.log(inputs)
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const {login}  = useContext(AuthContext);

    // this method will be used when I have the form login set to call the endpoint
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            let path = "/home"; 
            navigate(path);
            console.log('IM HERE')
        }catch (err) {
        console.log(err.response.data)
        setErr("Wrong email or password");
        }
    };


    return <div className="Login_container w-50 rounded-lg p-6">
        <h1 className="Login_tittle">Login</h1>
        <div className="Divider_Auth"> </div>
        <form onSubmit={handleLogin} className="flex flex-col space-y-9 justify-center items-center p-6">
            <label className="Login_label">Email<br/><input className="Login_input p-1 rounded-sm" placeholder="email" type={Text} name="email" onChange={handleChange}></input></label>
            <label className="Login_label mt-0">Password<br/><input className="Login_input p-1 rounded-sm" placeholder="password" type={Text} name="password" onChange={handleChange}></input></label>
            <input className="Login_button rounded-lg font-bold cursor-pointer" type="submit" value="LOGIN" />
        </form>
    </div>
}

function Register(){
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    })
    let navigate = useNavigate(); 
    const [err, setErr] = useState(null);


    const handleChange = (e) => {
        console.log(inputs)
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // this method will handle the form submit button
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://cs-career-guide-auth-service.herokuapp.com/register", inputs);
            let path = "/auth";
            navigate(path);

        } catch (err) {
            setErr(err.response.data);
        }
    };
    console.log(err)


    return <div className="Register_container w-50 rounded-lg p-6">
        <h1 className="Register_tittle">Register</h1>
        <div className="Divider_Auth"> </div>
        <form onSubmit={handleRegister} className="flex flex-col space-y-9 justify-center items-center p-6">
            <label className="Register_label">Name<br/><input className="Register_input p-1 rounded-sm" placeholder="name" type={Text} name="name" onChange={handleChange}></input></label>
            <label className="Register_label">Email<br/><input className="Register_input p-1 rounded-sm" placeholder="email" type={Text} name="email" onChange={handleChange}></input></label>
            <label className="Register_label">Password<br/> <input className="Register_input p-1 rounded-sm" placeholder="password" type={Text} name="password" onChange={handleChange}></input></label>
            <input className="Register_button rounded-lg font-bold cursor-pointer" type="submit" value="REGISTER" />
        </form>
    </div>
}