import "./StatsCards.css";

const StatsCards = ({ stats }) => {

  const cards = [

    {
      title: "Total Transactions",
      value: stats.totalTransactions || 0,
      icon: "📊",
      className: "blue-card"
    },

    {
      title: "Fraud Transactions",
      value: stats.fraudTransactions || 0,
      icon: "🚨",
      className: "red-card"
    },

    {
      title: "Safe Transactions",
      value: stats.normalTransactions || 0,
      icon: "✅",
      className: "green-card"
    }

  ];

  return (

    <div className="stats-grid">

      {
        cards.map((card, index) => (

          <div
            key={index}
            className={`stats-card ${card.className}`}
          >

            <div className="stats-top">

              <p className="stats-title">
                {card.title}
              </p>

              <span className="stats-icon">
                {card.icon}
              </span>

            </div>

            <h2 className="stats-value">
              {card.value}
            </h2>

          </div>

        ))
      }

    </div>

  );

};

export default StatsCards;