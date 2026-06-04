import "./TransactionModal.css";

const TransactionModal = ({
  transaction,
  onClose
}) => {

  if (!transaction)
    return null;

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal-box"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="modal-header">

          <div>

            <p className="modal-tag">

              TRANSACTION ANALYSIS

            </p>

            <h2>

              Transaction Details

            </h2>

          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >

            ✕

          </button>

        </div>


        {/* BODY */}

        <div className="modal-content">

          <div className="detail-card">

            <span className="detail-label">

              Transaction ID

            </span>

            <p className="detail-value id-text">

              {transaction._id}

            </p>

          </div>


          <div className="detail-grid">

            <div className="detail-card">

              <span className="detail-label">

                Amount

              </span>

              <p className="detail-value">

                ₹{transaction.amount}

              </p>

            </div>


            <div className="detail-card">

              <span className="detail-label">

                Type

              </span>

              <p className="detail-value">

                {transaction.type}

              </p>

            </div>


            <div className="detail-card">

              <span className="detail-label">

                Location

              </span>

              <p className="detail-value">

                {transaction.location}

              </p>

            </div>


            <div className="detail-card">

              <span className="detail-label">

                Risk Score

              </span>

              <p className="detail-value">

                {transaction.riskScore}%

              </p>

            </div>

          </div>


          {/* STATUS SECTION */}

          <div className="status-section">

            <div className="status-box">

              <span className="detail-label">

                Severity

              </span>

              <span
                className={
                  transaction.severity ===
                  "HIGH"
                    ? "severity high"
                    : transaction.severity ===
                      "MEDIUM"
                    ? "severity medium"
                    : "severity low"
                }
              >

                {transaction.severity}

              </span>

            </div>


            <div className="status-box">

              <span className="detail-label">

                Status

              </span>

              <span
                className={
                  transaction.status ===
                  "fraud"
                    ? "severity high"
                    : "severity low"
                }
              >

                {transaction.status}

              </span>

            </div>

          </div>


          {/* FRAUD REASON */}

          <div className="reason-box">

            <span className="detail-label">

              Fraud Reason

            </span>

            <p className="reason-text">

              {transaction.fraudReason ||
                "No suspicious activity detected."}

            </p>

          </div>


          {/* CREATED */}

          <div className="created-box">

            <span className="detail-label">

              Created At

            </span>

            <p className="detail-value">

              {
                new Date(
                  transaction.createdAt
                ).toLocaleString()
              }

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default TransactionModal;