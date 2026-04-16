const EmployeeMainTabs = ({ tabs, active, onChange }) => {
  return (
    <div className="flex gap-3 border-b mb-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-5 py-2 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
            active === tab.id
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default EmployeeMainTabs;