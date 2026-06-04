import {

  ResponsiveContainer,

  AreaChart,

  Area,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip

} from "recharts";


const FraudChart = ({ stats }) => {

  const data = [

    {
      name: "Safe",
      value:
        stats.normalTransactions || 0
    },

    {
      name: "Fraud",
      value:
        stats.fraudTransactions || 0
    },

    {
      name: "Total",
      value:
        stats.totalTransactions || 0
    }

  ];


  return (

    <div className="modern-chart-card">

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <AreaChart
          data={data}
        >

          <defs>

            <linearGradient
              id="fraudGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#ef4444"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#ef4444"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>


          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
          />

          <XAxis
            dataKey="name"
            stroke="#9ca3af"
          />

          <YAxis
            stroke="#9ca3af"
          />

          <Tooltip />


          <Area
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#fraudGradient)"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );

};

export default FraudChart;