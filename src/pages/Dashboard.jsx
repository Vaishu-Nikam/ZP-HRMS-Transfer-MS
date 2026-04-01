import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  ArrowRightLeft,
  Building2,
  Clock,
  MoreHorizontal,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "TOTAL EMPLOYEES",
      value: "1,284",
      change: "+4.2%",
      icon: Users,
      color: "text-blue-600",
      data: [10, 20, 15, 25, 22, 30],
    },
    {
      title: "TRANSFERS DUE",
      value: "42",
      change: "-2.1%",
      icon: ArrowRightLeft,
      color: "text-red-500",
      data: [30, 20, 25, 18, 15, 10],
    },
    {
      title: "DEPARTMENTS",
      value: "18",
      change: "Active",
      icon: Building2,
      color: "text-green-600",
      data: [5, 10, 8, 15, 12, 18],
    },
    {
      title: "PENDING APPROVALS",
      value: "156",
      change: "High Priority",
      icon: Clock,
      color: "text-orange-500",
      data: [50, 40, 60, 55, 70, 65],
    },
  ];

  const pieData = [
    { name: "Male", value: 70 },
    { name: "Female", value: 30 },
  ];

  const COLORS = ["#1e3a8a", "#f59e0b"];

  return (
    <div className="
      min-h-screen
      px-[clamp(12px,2vw,40px)]
      py-[clamp(12px,2vw,28px)]
    ">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="
            font-semibold text-gray-800
            text-[clamp(18px,2.5vw,28px)]
          ">
            System Overview
          </h1>

          <p className="
            text-gray-500
            text-[clamp(12px,1.2vw,14px)]
          ">
            Real-time HR analytics and administrative control panel.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="
            px-[clamp(10px,1vw,16px)]
            py-[clamp(6px,1vw,10px)]
            text-[clamp(12px,1vw,14px)]
            rounded-lg bg-white shadow-sm
          ">
            Last 30 Days
          </button>

          <button className="
            px-[clamp(10px,1vw,16px)]
            py-[clamp(6px,1vw,10px)]
            text-[clamp(12px,1vw,14px)]
            rounded-lg bg-white shadow-sm
          ">
            Export
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-[clamp(12px,1.5vw,24px)]
        mb-8
      ">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="
                rounded-xl bg-white
                p-[clamp(12px,1.5vw,20px)]
                shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
              "
            >
              <div className="flex justify-between items-center mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon size={16} />
                </div>

                <span className={`
                  text-[clamp(10px,1vw,12px)]
                  ${item.color}
                `}>
                  {item.change}
                </span>
              </div>

              <p className="
                text-gray-400
                text-[clamp(10px,1vw,12px)]
              ">
                {item.title}
              </p>

              <h2 className="
                font-semibold text-gray-800
                text-[clamp(16px,2vw,22px)]
              ">
                {item.value}
              </h2>

              <div className="h-[clamp(30px,4vw,50px)] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.data.map(v => ({ value: v }))}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1e40af"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-[clamp(12px,1.5vw,24px)]
        mb-8
      ">
        {/* Workforce */}
        <div className="
          xl:col-span-2
          bg-white rounded-xl
          p-[clamp(12px,1.5vw,24px)]
          shadow-sm
        ">
          <div className="flex justify-between mb-3">
            <div>
              <h2 className="text-[clamp(14px,1.2vw,18px)] font-semibold">
                Workforce Distribution
              </h2>
              <p className="text-gray-400 text-xs">
                Department breakdown
              </p>
            </div>
            <MoreHorizontal size={18} />
          </div>

          <div className="h-[clamp(180px,30vw,280px)] flex items-center justify-center text-gray-300">
            Chart
          </div>
        </div>

        {/* Donut */}
        <div className="
          bg-white rounded-xl
          p-[clamp(12px,1.5vw,24px)]
          shadow-sm
        ">
          <h2 className="font-semibold mb-2">
            Gender Diversity
          </h2>

          <div className="flex flex-col items-center">
            <div className="
              relative
              w-[clamp(120px,20vw,200px)]
              h-[clamp(120px,20vw,200px)]
            ">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center font-semibold">
                70/30
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="
        bg-white rounded-xl
        p-[clamp(12px,1.5vw,24px)]
        shadow-sm
      ">
        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
          <h2 className="font-semibold">Recent Activity</h2>

          <input
            placeholder="Search..."
            className="
              px-3 py-1 rounded-lg
              text-sm bg-gray-50
            "
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="text-gray-400 text-xs">
                <th className="py-2 text-left">DATE</th>
                <th>EMPLOYEE</th>
                <th>ACTION</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              <Row name="Rahul Sharma" status="Pending" />
              <Row name="Anjali Deshmukh" status="Approved" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Row = ({ name, status }) => (
  <tr className="hover:bg-gray-50 transition">
    <td className="py-3">Oct 24</td>
    <td className="font-medium">{name}</td>
    <td>Transfer</td>
    <td>
      <span
        className={`px-2 py-1 rounded text-xs ${
          status === "Approved"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {status}
      </span>
    </td>
  </tr>
);

export default Dashboard;