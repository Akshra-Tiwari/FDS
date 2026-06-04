import "./AlertsPanel.css";

const AlertsPanel = ({ frauds = [] }) => {

return(

<div className="alerts-panel">

{/* HEADER */}

<div className="alerts-header">

<div>

<p className="panel-tag">

SECURITY EVENTS

</p>

<h3>

Recent Fraud Alerts

</h3>

</div>

<span className="alert-count">

{frauds.length}

</span>

</div>



{/* EMPTY */}

{

frauds.length===0 ? (

<div className="no-alerts">

<h3>

No Active Fraud Alerts

</h3>

<p>

AI engine has not detected suspicious activity.

</p>

</div>

)

:

(

<div className="alerts-list">

{

frauds.map((fraud)=>(

<div

key={fraud._id}

className="alert-item"

>

{/* TOP */}

<div className="alert-top">

<div>

<h2 className="alert-amount">

₹{fraud.amount}

</h2>

<p className="alert-location">

📍 {fraud.location || "Unknown"}

</p>

</div>

<span

className={

fraud.severity==="HIGH"

?

"fraud-badge high"

:

fraud.severity==="MEDIUM"

?

"fraud-badge medium"

:

"fraud-badge low"

}

>

{fraud.severity || "LOW"}

</span>

</div>



{/* DETAILS */}

<div className="alert-details">

<span>

💳 {fraud.type || "Transaction"}

</span>

<span>

⚠ {fraud.riskScore || 0}% Risk

</span>

</div>



{/* REASON */}

<div className="alert-reason">

{

fraud.fraudReason ||

"Suspicious behavioral pattern detected"

}

</div>



{/* FOOTER */}

<div className="alert-footer">

<div className="live-indicator">

<div className="live-dot"></div>

LIVE

</div>

<span>

{

new Date(

fraud.createdAt

).toLocaleString()

}

</span>

</div>

</div>

))

}

</div>

)

}

</div>

)

}

export default AlertsPanel;