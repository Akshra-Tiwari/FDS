import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#ff4d4f",
  "#faad14",
  "#52c41a"
];

const SeverityPieChart = ({
  stats
}) => {

  const data = [

    {
      name: "HIGH",
      value:
        stats?.highSeverity || 5
    },

    {
      name: "MEDIUM",
      value:
        stats?.mediumSeverity || 25
    },

    {
      name: "LOW",
      value:
        stats?.lowSeverity || 70
    }

  ];

  return (

    <div
      style={{
        width: "100%",
        height: "320px"
      }}
    >

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >

            {
              data.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[index]
                    }
                  />

                )
              )
            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

};

export default SeverityPieChart;