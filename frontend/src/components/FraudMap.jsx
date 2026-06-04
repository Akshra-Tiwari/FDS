import {

MapContainer,

TileLayer,

Marker,

Popup

} from "react-leaflet";

import "leaflet/dist/leaflet.css";


const FraudMap = ({
transactions,
darkMode
}) => {

return(

<div className="map-wrapper">

<div className="map-header">

<div>

<p className="map-tag">

LIVE GEO ANALYTICS

</p>

<h3>

Fraud Geo Tracking

</h3>

</div>

<div className="map-status">

LIVE

</div>

</div>


<MapContainer

center={[20.5937,78.9629]}

zoom={4}

className="fraud-map"

>

<TileLayer

url={

darkMode

?

"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"

:

"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

}

/>



{

transactions.map(
(transaction)=>{

if(
!transaction.lat ||
!transaction.lng
){

return null;

}

return(

<Marker

key={
transaction._id
}

position={[

transaction.lat,

transaction.lng

]}

>

<Popup>

<strong>

₹{transaction.amount}

</strong>

<br/>

{transaction.location}

<br/>

Status:

{" "}

{transaction.status}

</Popup>

</Marker>

)

})

}

</MapContainer>

</div>

)

};

export default FraudMap;