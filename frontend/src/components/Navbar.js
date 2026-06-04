import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {

const navigate=useNavigate();

return(

<nav className="navbar">

<div className="navbar-left">

<div className="logo-box">🛡️</div>

<div>

<div className="logo-text">
FraudSense AI
</div>

<div className="logo-subtext">
Enterprise Security Monitoring
</div>

</div>

</div>

<div className="navbar-right">

<NavLink
to="/profile"
className={({isActive})=>
isActive ? "nav-button active-nav" : "nav-button"}
>
Profile
</NavLink>

<NavLink
to="/dashboard"
className={({isActive})=>
isActive ? "nav-button active-nav" : "nav-button"}
>
Dashboard
</NavLink>

<NavLink
to="/transactions"
className={({isActive})=>
isActive ? "nav-button active-nav" : "nav-button"}
>
Transactions
</NavLink>

<button
className="logout-nav-btn"
onClick={()=>{

localStorage.clear();

navigate("/");

}}
>

Logout

</button>

</div>

</nav>

)

}