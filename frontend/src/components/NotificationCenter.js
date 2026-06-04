import "./NotificationCenter.css";

const NotificationCenter = ({
  notifications,
  clearNotifications
}) => {

  return (

    <div className="notification-center">

      <div className="notification-header">

        <h3>

          Notifications

        </h3>

        <button
          onClick={clearNotifications}
        >

          Clear

        </button>

      </div>


      {
        notifications.length === 0 ? (

          <p className="empty-notification">

            No notifications

          </p>

        ) : (

          notifications.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className={
                  item.type === "fraud"
                    ? "notification fraud"
                    : "notification safe"
                }
              >

                <p>

                  {item.message}

                </p>

                <span>

                  {item.time}

                </span>

              </div>

            )
          )

        )
      }

    </div>

  );

};

export default NotificationCenter;