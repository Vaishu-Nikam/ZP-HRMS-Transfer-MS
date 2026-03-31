import React from "react";

const employees = [
  {
    name: "Rajesh Sharma",
    role: "Senior Clerk",
    id: "#ZP8821",
    tenure: "6.2 Years",
    office: "Block Office - Karjat",
    dept: "Rural Development Dept.",
    transfer: "Pending",
    initials: "RS",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Priya Deshmukh",
    role: "Health Inspector",
    id: "#ZP1204",
    tenure: "4.8 Years",
    office: "Taluka Hospital - Wai",
    dept: "Health Services Dept.",
    transfer: "Approved",
    img: "https://i.pravatar.cc/40?img=5",
  },
  {
    name: "Amit Mishra",
    role: "Assistant Engineer",
    id: "#ZP5541",
    tenure: "2.1 Years",
    office: "Zilla Head Office",
    dept: "Public Works (PWD)",
    transfer: "Rejected",
    initials: "AM",
    color: "bg-gray-100 text-gray-600",
  },
  {
    name: "Sunita Kulkarni",
    role: "Primary Teacher",
    id: "#ZP7702",
    tenure: "8.5 Years",
    office: "Z.P. School - Mulshi",
    dept: "Education Dept.",
    transfer: "Pending",
    initials: "SK",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Rohit Patil",
    role: "Junior Engineer",
    id: "#ZP8899",
    tenure: "5.1 Years",
    office: "Water Supply Office",
    dept: "Water Dept.",
    transfer: "Approved",
    img: "https://i.pravatar.cc/40?img=12",
  },
  {
    name: "Neha Joshi",
    role: "Clerk",
    id: "#ZP4455",
    tenure: "3.3 Years",
    office: "Block Office - Nashik",
    dept: "Revenue Dept.",
    transfer: "Pending",
    initials: "NJ",
    color: "bg-purple-100 text-purple-700",
  },
];

const Badge = ({ type }) => {
  if (type === "Approved")
    return (
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
        Approved
      </span>
    );

  if (type === "Rejected")
    return (
      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
        Rejected
      </span>
    );

  return (
    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
      Pending Review
    </span>
  );
};

export default function TransferPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400">
            Transfer Module &gt; Eligibility Overview
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Employee Transfer Eligibility
          </h1>
          <p className="text-gray-500 text-sm">
            Review and manage employee transfer requests
          </p>
        </div>

        <button className="bg-blue-700 hover:bg-blue-800 transition text-white px-5 py-2 rounded-xl mt-4 md:mt-0 shadow">
          + New Transfer Request
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select className="p-2 rounded border focus:ring-2 focus:ring-blue-200">
          <option>All Departments</option>
          <option>Education</option>
          <option>Health</option>
        </select>

        <select className="p-2 rounded border focus:ring-2 focus:ring-blue-200">
          <option>Any Duration</option>
          <option>3+ Years</option>
          <option>5+ Years</option>
        </select>

        <select className="p-2 rounded border focus:ring-2 focus:ring-blue-200">
          <option>All Locations</option>
          <option>Nashik</option>
          <option>Pune</option>
        </select>

        <div className="flex gap-2">
          <button className="flex-1 border rounded p-2 hover:bg-gray-50">
            Clear
          </button>
          <button className="flex-1 bg-blue-700 text-white rounded p-2 hover:bg-blue-800">
            Apply
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th>Tenure</th>
              <th>Office</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4 flex items-center gap-3">
                  {emp.img ? (
                    <img
                      src={emp.img}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${emp.color}`}
                    >
                      {emp.initials}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-800">
                      {emp.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {emp.role} • {emp.id}
                    </p>
                  </div>
                </td>

                <td className="font-medium">{emp.tenure}</td>

                <td>
                  <p>{emp.office}</p>
                  <p className="text-xs text-gray-400">{emp.dept}</p>
                </td>

                <td>
                  <Badge type={emp.transfer} />
                </td>

                <td className="text-right pr-4">
                  <button className="text-gray-400 hover:text-blue-600">
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-400">Queue Status</p>
          <h2 className="text-xl font-bold text-blue-900">
            42 Pending
          </h2>
          <p className="text-xs text-yellow-600">+8 new today</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-400">Approved Monthly</p>
          <h2 className="text-xl font-bold text-green-600">
            128 Total
          </h2>
          <p className="text-xs text-green-500">
            15.2% avg approval rate
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-400">Eligibility Pool</p>
          <h2 className="text-xl font-bold text-orange-600">
            2,410 Staff
          </h2>
          <p className="text-xs text-gray-400">Tenure &gt; 3 years</p>
        </div>
      </div>
    </div>
  );
}