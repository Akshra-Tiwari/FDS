import { io } from "socket.io-client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "./Dashboard.css";

import { useEffect,useState } from "react";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import NotificationCenter from "../components/NotificationCenter";
import AIAssistant from "../components/AIAssistant";
import FraudMap from "../components/FraudMap";
import ReceiptScanner from "../components/ReceiptScanner";
import TransactionModal from "../components/TransactionModal";
import API from "../services/api";
import FraudChart from "../components/FraudChart";
import RiskMeter from "../components/RiskMeter";
import ActivityFeed from "../components/ActivityFeed";
import AIInsightsCard from "../components/AIInsightsCard";
import AlertsPanel from "../components/AlertsPanel";
import SeverityPieChart from "../components/SeverityPieChart";
import RiskBarChart from "../components/RiskBarChart";


const socket = io(
"http://localhost:5000",
{
reconnection:true,
reconnectionAttempts:5,
transports:["websocket"]
}
);


const Dashboard = ()=>{


const [stats,setStats]=useState({});
const [frauds,setFrauds]=useState([]);
const [notifications,setNotifications]=useState([]);
const [aiInsight,setAiInsight]=useState({});
const [liveTransactions,setLiveTransactions]=useState([]);

const [loading,setLoading]=useState(true);
const [refreshing,setRefreshing]=useState(false);

const [error,setError]=useState("");

const [search,setSearch]=useState("");

const [filter,setFilter]=useState("all");

const [selectedTransaction,setSelectedTransaction]=
useState(null);

const [lastUpdated,setLastUpdated]=
useState("");

const [darkMode,setDarkMode]=
useState(
localStorage.getItem("darkMode")==="true"
);



useEffect(()=>{

document.body.classList.toggle(
"dark",
darkMode
);

localStorage.setItem(
"darkMode",
darkMode
);

},[darkMode]);



const toggleTheme=()=>{

setDarkMode(
prev=>!prev
);

};



const exportPDF=async()=>{

const element=
document.getElementById(
"dashboard-report"
);

const canvas=
await html2canvas(
element,
{
scale:2,
useCORS:true
}
);

const img=
canvas.toDataURL(
"image/png"
);

const pdf=
new jsPDF(
"p",
"mm",
"a4"
);

pdf.addImage(
img,
"PNG",
0,
0,
210,
(
canvas.height*210
)/canvas.width
);

pdf.save(
"fraud-dashboard.pdf"
);

};



const clearNotifications=()=>{

setNotifications([]);

};



const fetchDashboardData=
async(
showLoader=false
)=>{

try{

showLoader
? setLoading(true)
: setRefreshing(true);

const token=
localStorage.getItem(
"token"
);

const config={

headers:{

Authorization:
`Bearer ${token}`

}

};



try{

const res=
await API.get(
"/transactions/stats",
config
);

setStats(
res.data||{}
);

}catch(e){

console.log(e);

}



try{

const res=
await API.get(
"/transactions/recent-frauds",
config
);

setFrauds(
res.data?.frauds||[]
);

}catch(e){}



try{

const res=
await API.get(
"/ai/insights",
config
);

setAiInsight(
res.data||{}
);

}catch(e){

console.log(
"AI Failed"
);

}



try{

const res=
await API.get(
"/transactions?page=1&limit=20",
config
);

setLiveTransactions(
res.data?.transactions||[]
);

}catch(e){}



setLastUpdated(
new Date()
.toLocaleTimeString()
);

setError("");

}

catch(err){

console.log(err);

}

finally{

setLoading(false);

setRefreshing(false);

}

};



useEffect(()=>{

fetchDashboardData(
true
);

const interval=
setInterval(()=>{

fetchDashboardData(
false
);

},10000);



socket.on(
"connect_error",
()=>{

console.log(
"Socket disconnected"
);

}
);



socket.on(
"newTransaction",

(data)=>{

setNotifications(
prev=>[
{
type:data.status,

message:

data.status==="fraud"

?

`Fraud detected ₹${data.amount}`

:

`Safe ₹${data.amount}`,

time:

new Date()
.toLocaleTimeString()

},

...prev

]
);


setLiveTransactions(
prev=>[
data,
...prev
]
);


if(
data.status==="fraud"
){

toast.error(
`Fraud ₹${data.amount}`
);

}else{

toast.success(
`Safe ₹${data.amount}`
);

}

}

);

return()=>{

socket.off(
"newTransaction"
);

clearInterval(
interval
);

};

},[]);



const filteredTransactions=

liveTransactions.filter(
item=>{

const matchSearch=

item.location
?.toLowerCase()
.includes(
search.toLowerCase()
);

const matchFilter=

filter==="all"

||

item.status===filter;

return(

matchSearch &&
matchFilter

);

}
);

const sortedTransactions=
filteredTransactions;
if(loading){

return(

<>

<Navbar/>

<div className="loading-screen">

<div className="dashboard-skeleton">

Loading Dashboard...

</div>

</div>

</>

)

}



if(error){

return(

<>

<Navbar/>

<div className="error-page">

<h1>

Dashboard Error

</h1>

<p>

{error}

</p>

<button

className="primary-btn"

onClick={()=>fetchDashboardData(
true
)}

>

Retry

</button>

</div>

</>

)

}



return(

<>

<Navbar/>


<div

id="dashboard-report"

className={`dashboard ${
darkMode ? "dark" : ""
}`}

>


{/* HEADER */}


<div className="dashboard-header">

<div>

<p className="dashboard-tag">

FRAUD MONITORING SYSTEM

</p>


<h1 className="dashboard-title">

FraudSense AI Dashboard

</h1>


<p className="dashboard-subtitle">

Real-time fraud analytics & monitoring

</p>


<p className="updated-time">

Updated:

{lastUpdated}


{

refreshing && (

<span className="refresh-indicator">

Refreshing...

</span>

)

}

</p>

</div>



<div className="header-actions">


<button

className="theme-btn"

onClick={toggleTheme}

>

{

darkMode

?

"☀ Light"

:

"🌙 Dark"

}

</button>



<button

className="primary-btn"

onClick={()=>fetchDashboardData(
true
)}

>

Refresh Data

</button>



<button

className="export-btn"

onClick={exportPDF}

>

Export PDF

</button>


</div>

</div>



{/* STATS */}


<div className="stats-grid">


<div className="stat-card">

<h2>

{stats.totalTransactions || 0}

</h2>

<p>

Transactions

</p>

</div>



<div className="stat-card danger-card">

<h2>

{stats.fraudTransactions || 0}

</h2>

<p>

Fraud Alerts

</p>

</div>



<div className="stat-card success-card">

<h2>

{stats.normalTransactions || 0}

</h2>

<p>

Safe Transactions

</p>

</div>



<div className="stat-card">

<h2>

{stats.highSeverity || 0}

</h2>

<p>

High Severity

</p>

</div>

</div>



{/* ANALYTICS */}


<div className="analytics-grid">


<div className="analytics-card">

<div className="card-header">

<h3>

Fraud Trends

</h3>

<span className="live-badge">

LIVE

</span>

</div>

<FraudChart
stats={stats}
/>

</div>



<div className="analytics-card">

<h3>

Severity Distribution

</h3>

<SeverityPieChart

data={[

{

name:"High",

value:
stats.highSeverity||0

},

{

name:"Medium",

value:
stats.mediumSeverity||0

},

{

name:"Low",

value:
stats.lowSeverity||0

}

]}

/>

</div>



<div className="analytics-card">

<h3>

Risk Analytics

</h3>

<RiskBarChart

stats={stats}

/>

</div>



<div className="analytics-card">

<RiskMeter/>

</div>


</div>
{/* MAP */}

<div className="section-spacing">

<FraudMap

transactions={liveTransactions}

darkMode={darkMode}

/>

</div>



{/* MAIN GRID */}

<div className="dashboard-grid">


<div className="left-column">

<AIInsightsCard
aiInsight={aiInsight}
/>

<AIAssistant/>

<ReceiptScanner/>

</div>



<div className="right-column">

<AlertsPanel
frauds={frauds}
/>


<NotificationCenter

notifications={
notifications
}

clearNotifications={
clearNotifications
}

/>


<ActivityFeed

transactions={
liveTransactions
}

/>

</div>


</div>



{/* TRANSACTIONS */}


<div className="table-section">


<div className="table-header">


<h2>

Live Transactions

</h2>



<div className="table-controls">


<input

className="search-input"

placeholder="Search location"

value={search}

onChange={(e)=>{

setSearch(
e.target.value
)

}}

/>



<select

className="filter-select"

value={filter}

onChange={(e)=>{

setFilter(
e.target.value
)

}}

>

<option value="all">

All

</option>

<option value="fraud">

Fraud

</option>

<option value="normal">

Normal

</option>

</select>


</div>


</div>



{

sortedTransactions.length===0

?

<div className="empty-state">

No Transactions Found

</div>

:

<table className="transaction-table">


<thead>

<tr>

<th>

#

</th>

<th>

Amount

</th>

<th>

Status

</th>

<th>

Risk

</th>

<th>

Location

</th>

</tr>

</thead>



<tbody>


{

sortedTransactions.map(

(item,index)=>(

<tr

key={item._id}

className="clickable-row"

onClick={()=>{

setSelectedTransaction(
item
)

}}

>

<td>

{index+1}

</td>

<td>

₹{item.amount}

</td>

<td>

{item.status}

</td>

<td>

{item.riskScore}%

</td>

<td>

{item.location}

</td>

</tr>

)

)

}


</tbody>

</table>

}



</div>



{

selectedTransaction && (

<TransactionModal

transaction={
selectedTransaction
}

onClose={()=>{

setSelectedTransaction(
null
)

}}

/>

)

}



<div className="dashboard-footer">

FraudSense AI • Enterprise Security Dashboard

</div>


</div>

</>

)

}


export default Dashboard;