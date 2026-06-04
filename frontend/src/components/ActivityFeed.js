
const ActivityFeed = ({
  transactions
}) => {

  return (

    <div className="activity-card">

      <div className="activity-header">

        <h2>
          Recent Activity
        </h2>

      </div>

      {
        transactions.length === 0 && (

          <p className="empty-state">

            No recent activity

          </p>

        )
      }

      {
        transactions.slice(0, 5).map(
          (item, index) => (

            <div
              key={index}
              className="activity-item"
            >

              <div
                className={
                  item.status === "fraud"
                    ? "activity-dot fraud"
                    : "activity-dot normal"
                }
              ></div>

              <div>

                <p className="activity-title">

                  ₹{item.amount}
                  {" "}
                  transaction detected

                </p>

                <p className="activity-sub">

                  {item.location}

                </p>

              </div>

            </div>

          )
        )
      }

    </div>

  );

};

export default ActivityFeed;