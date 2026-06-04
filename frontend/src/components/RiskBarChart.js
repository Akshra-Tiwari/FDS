import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  CartesianGrid

} from "recharts";


const RiskBarChart = ({ stats }) => {

  const data = [

    {
      name: "Fraud",
      value:
        stats.fraudTransactions || 0
    },

    {
      name: "Safe",
      value:
        stats.normalTransactions || 0
    }

  ];


  return (

    <div className="modern-chart-card">

      <h3>

        Risk Comparison

      </h3>


      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={data}
        >

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


          <Bar
            dataKey="value"
            fill="#3b82f6"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default RiskBarChart;