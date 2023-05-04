import "./Auth.css"
import React, {useContext, useState} from 'react';
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
    const [formError, setFormError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
        if (!inputs['email'] || !inputs['password']) {
            setFormError('Please fill in login');
            return;
          }
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

    function handleBlur() {
        const isValidEmail = validateEmail(inputs['email']);
    
        if (!isValidEmail & inputs['email'] !== "") {
          setErrorMessage(`this is not a valid email address.`);
        } else {
          setErrorMessage('');
        }
      }
      function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }


    return <div className="Login_container w-50 rounded-lg p-6">
        <h1 className="Login_tittle">Login</h1>
        <div className="Divider_Auth"> </div>
        <form onSubmit={handleLogin} className="flex flex-col justify-center items-center p-6">
        
        <div className="h-5">
              {err && (
          <p className="text-colegio-light-green text-sm font-bold">{err}</p>
        )}
            {formError && (
          <p className="text-colegio-light-green text-sm font-bold">{formError}</p>
        )}
        </div>
            <label className="Login_label mt-2">Email<br/>
            <input className={`Login_input p-1 rounded-sm peer focus:ring focus:ring-colegio-light-green
            ${
                errorMessage ? 'ring ring-red-500' : ''
              }`}
            placeholder="email" 
                type={Text} name="email" onChange={handleChange} onBlur={handleBlur}></input>
        
            </label>
            <div className="h-5">
                {errorMessage && (
                    <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
                )}
            </div>
            <label className="Login_label mt-6">Password<br/>
            <input className="Login_input p-1 rounded-sm peer invalid:ring focus:ring focus:ring-colegio-light-green" 
            placeholder="password" 
            type="password" name="password" onChange={handleChange}></input>
        
            </label>
            
            <input className="Login_button rounded-lg font-bold cursor-pointer mt-9" type="submit" value="LOGIN" />
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
    const [formError, setFormError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {login}  = useContext(AuthContext);

    const handleChange = (e) => {
        console.log(inputs)
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    function handleBlur() {
        const isValidEmail = validateEmail(inputs['email']);
    
        if (!isValidEmail & inputs['email'] !== "") {
          setErrorMessage(`this is not a valid email address.`);
        } else {
          setErrorMessage('');
        }
      }
      function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }


    // this method will handle the form submit button
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!inputs['email'] || !inputs['password'] || !inputs['name']) {
            setFormError('Please fill in login');
            return;
          }

        try {
            await axios.post("https://cs-career-guide-auth-service.herokuapp.com/register", inputs);
            await login(inputs)
            let path = "/home";
            navigate(path);

        } catch (err) {
            setErr("Email already exist");
        }
    };
    console.log(err)


    return <div className="Register_container w-50 rounded-lg p-6">
        <h1 className="Register_tittle">Register</h1>
        <div className="Divider_Auth"> </div>
        <form onSubmit={handleRegister} className="flex flex-col justify-center items-center p-6">
        <div className="h-5">
              {err && (
          <p className="text-colegio-light-green text-sm font-bold">{err}</p>
        )}
            {formError && (
          <p className="text-colegio-light-green text-sm font-bold">{formError}</p>
        )}
        </div>
            <label className="Register_label">Name<br/><input className="Register_input p-1 rounded-sm focus:ring focus:ring-colegio-light-green" placeholder="name" type={Text} name="name" onChange={handleChange}></input></label>
            <label className="Register_label mt-9">Email<br/>
            <input className={`Register_input p-1 rounded-sm p-1 rounded-sm peer focus:ring focus:ring-colegio-light-green
            ${
                errorMessage ? 'ring ring-red-500' : ''
              }`} 
            placeholder="email" 
            type={Text} name="email" onChange={handleChange} onBlur={handleBlur}></input>
            </label>
            <div className="h-5">
                {errorMessage && (
                    <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
                )}
            </div>
            <label className="Register_label  mt-6">Password<br/> <input className="Register_input p-1 rounded-sm focus:ring focus:ring-colegio-light-green" placeholder="password" type="password" name="password" onChange={handleChange}></input></label>
            <input className="Register_button rounded-lg font-bold cursor-pointer mt-9" type="submit" value="REGISTER" />
        </form>
    </div>
}