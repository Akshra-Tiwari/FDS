import "./AIInsightsCard.css";

const AIInsightsCard = ({
  aiInsight
}) => {

  const riskLevel =
    aiInsight?.fraudCount > 10
      ? "HIGH"
      : aiInsight?.fraudCount > 5
      ? "MEDIUM"
      : "LOW";

  return (

    <div className="ai-card">

      {/* HEADER */}

      <div className="ai-card-header">

        <div>

          <p className="ai-tag">

            MACHINE LEARNING ENGINE

          </p>

          <h3>

            AI Insights

          </h3>

        </div>

        <span className="ai-badge">

          AI ACTIVE

        </span>

      </div>


      {/* MAIN INSIGHT */}

      <div className="ai-main-insight">

<p className="ai-insight">

🧠 {

aiInsight?.insight ||

"Analyzing transaction patterns and behavioural anomalies in real time."

}

</p>

</div>


      {/* STATS */}

      <div className="ai-stats">

        <div className="ai-stat">

          <p className="ai-stat-label">

            Fraud Count

          </p>

          <h2 className="ai-stat-value danger-text">

            {
              aiInsight?.fraudCount || 0
            }

          </h2>

        </div>


        <div className="ai-stat">

          <p className="ai-stat-label">

            Total Transactions

          </p>

          <h2 className="ai-stat-value">

            {
              aiInsight?.totalCount || 0
            }

          </h2>

        </div>

      </div>


      {/* EXTRA ANALYTICS */}

      <div className="ai-extra-grid">

        <div className="extra-box">

          <p className="extra-label">

            Risk Level

          </p>

          <span
            className={
              riskLevel === "HIGH"
                ? "risk-pill high-risk"
                : riskLevel === "MEDIUM"
                ? "risk-pill medium-risk"
                : "risk-pill low-risk"
            }
          >

            {riskLevel}

          </span>

        </div>


        <div className="extra-box">

          <p className="extra-label">

            Prediction Accuracy

          </p>

          <h4 className="accuracy-text">

            94%

          </h4>

        </div>

      </div>


      {/* FOOTER */}

      <div className="ai-footer">

        AI engine continuously monitors transaction anomalies and behavioral risk patterns.

      </div>

    </div>

  );

};

export default AIInsightsCard;