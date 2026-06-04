import "./RiskMeter.css";

const RiskMeter = ({ fraud, total }) => {

  const riskPercentage = total
    ? Math.round((fraud / total) * 100)
    : 0;

  return (

    <div className="risk-card">

      <div className="risk-header">

        <h3>
          System Risk Level
        </h3>

        <span
          className={
            riskPercentage > 50
              ? "risk-high"
              : riskPercentage > 20
              ? "risk-medium"
              : "risk-low"
          }
        >

          {
            riskPercentage > 50
              ? "HIGH"
              : riskPercentage > 20
              ? "MEDIUM"
              : "LOW"
          }

        </span>

      </div>

      <div className="risk-bar">

        <div
          className="risk-progress"
          style={{
            width: `${riskPercentage}%`
          }}
        ></div>

      </div>

      <h1 className="risk-number">

        {riskPercentage}%

      </h1>

      <p className="risk-text">

        Fraud risk detected based on
        recent transaction patterns.

      </p>

    </div>

  );

};

export default RiskMeter;