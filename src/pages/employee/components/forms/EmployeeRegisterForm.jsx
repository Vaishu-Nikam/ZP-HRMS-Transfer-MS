import { useState } from "react";
import { Input } from "../../../../components/common/Input";
import DropdownSearch from "../../../../components/common/DropdownSearch";

const EmployeeRegisterForm = ({ onClose, onSuccess }) => {

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    role_id: "",
    first_name: "",
    last_name: "",
    zp_id: "",
    aadhaar_number: "",
    department_id: "",
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const roleOptions = [
    { id: 1, name: "Employee" },
    { id: 2, name: "Admin" }
  ];

  const departmentOptions = [
    { id: 1, name: "IT Department" },
    { id: 2, name: "HR Department" }
  ];

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      alert("Required fields fill करा");
      return;
    }

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    employees.push({
      id: Date.now(),
      ...formData,
      formCompleted: false,
      formData: {}
    });

    localStorage.setItem("employees", JSON.stringify(employees));

    onSuccess();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl space-y-5 transform transition-all duration-300 scale-100 animate-fadeIn">

      {/* 🔥 Title */}
      <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
        Employee Registration
      </h2>

      {/* 🔥 FORM GRID */}
      <div className="grid grid-cols-2 gap-4">

        <div className="transition-all duration-200 hover:scale-[1.02]">
          <Input
            label="Email Address"
            placeholder="Enter email (e.g. abc@gmail.com)"
            value={formData.email}
            onChange={(e)=>handleChange("email", e.target.value)}
          />
        </div>

        <div className="transition-all duration-200 hover:scale-[1.02]">
          <Input
            label="Phone Number"
            placeholder="Enter mobile number"
            value={formData.phone}
            onChange={(e)=>handleChange("phone", e.target.value)}
          />
        </div>

        <div className="transition-all duration-200 hover:scale-[1.02]">
          <Input
            label="Password"
            type="password"
            placeholder="Enter strong password"
            value={formData.password}
            onChange={(e)=>handleChange("password", e.target.value)}
          />
        </div>

        <div className="transition-all duration-200 hover:scale-[1.02]">
          <label className="text-sm font-medium text-gray-600">Role</label>
          <DropdownSearch
            options={roleOptions}
            value={formData.role_id}
            onChange={(val)=>handleChange("role_id", val)}
            placeholder="Select role"
          />
        </div>

        <div className="transition-all duration-200 hover:scale-[1.02]">
          <Input
            label="First Name"
            placeholder="Enter first name"
            value={formData.first_name}
            onChange={(e)=>handleChange("first_name", e.target.value)}
          />
        </div>

        <div className="transition-all duration-200 hover:scale-[1.02]">
          <Input
            label="Last Name"
            placeholder="Enter last name"
            value={formData.last_name}
            onChange={(e)=>handleChange("last_name", e.target.value)}
          />
        </div>

        <div className="transition-all duration-200 hover:scale-[1.02]">
          <Input
            label="ZP ID"
            placeholder="Enter Zilla Parishad ID"
            value={formData.zp_id}
            onChange={(e)=>handleChange("zp_id", e.target.value)}
          />
        </div>

        <div className="transition-all duration-200 hover:scale-[1.02]">
          <Input
            label="Aadhaar Number"
            placeholder="Enter 12-digit Aadhaar"
            value={formData.aadhaar_number}
            onChange={(e)=>handleChange("aadhaar_number", e.target.value)}
          />
        </div>

        <div className="col-span-2 transition-all duration-200 hover:scale-[1.02]">
          <label className="text-sm font-medium text-gray-600">Department</label>
          <DropdownSearch
            options={departmentOptions}
            value={formData.department_id}
            onChange={(val)=>handleChange("department_id", val)}
            placeholder="Select department"
          />
        </div>

      </div>

      {/* 🔥 BUTTONS */}
      <div className="flex justify-end gap-3 pt-4">

        <button 
          onClick={onClose} 
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition duration-200"
        >
          Cancel
        </button>

        <button 
          onClick={handleSubmit} 
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:scale-105 transition duration-200"
        >
          Register Employee
        </button>

      </div>

    </div>
  );
};

export default EmployeeRegisterForm;