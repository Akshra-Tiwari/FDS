import "./auth.css";

import { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

const Login = () => {

const navigate =
useNavigate();

const [email,setEmail] =
useState("");

const [password,setPassword] =
useState("");

const [loading,setLoading] =
useState(false);


useEffect(()=>{

const token =
localStorage.getItem(
"token"
);

if(token){

navigate(
"/dashboard"
);

}

},[navigate]);



const handleLogin =
async(e)=>{

e.preventDefault();

setLoading(true);

try{

const response =
await API.post(
"/auth/login",
{

email:
email
.trim()
.toLowerCase(),

password

}
);

localStorage.setItem(
"token",
response.data.token
);

localStorage.setItem(

"user",

JSON.stringify(
response.data.user
)

);

navigate(
"/dashboard"
);

}

catch(error){

alert(

error.response?.data
?.message ||

"Login Failed"

);

}

finally{

setLoading(false);

}

};



return(

<div className="auth-page">

<div className="auth-card">

<div className="auth-logo">

🛡️

</div>

<h1>

Welcome Back

</h1>

<p>

FraudSense Enterprise Security

</p>


<form
onSubmit={
handleLogin
}
>

<input

type="email"

placeholder="Enter Email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

required

/>


<input

type="password"

placeholder="Enter Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

required

/>


<button
type="submit"
disabled={loading}
>

{

loading

?

"Signing In..."

:

"Login"

}

</button>

</form>


<div className="auth-footer">

<p>

Don't have an account?

{" "}

<Link to="/register">

Register

</Link>

</p>

</div>

</div>

</div>

);

};

export default Login;