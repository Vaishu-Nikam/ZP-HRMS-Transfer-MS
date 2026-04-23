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
    middle_name: "",
    employee_id: "",
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

    // 🔴 Check all required fields
    if (!formData.first_name.trim()) {
      alert("First Name is required");
      return;
    }

    if (!formData.last_name.trim()) {
      alert("Last Name is required");
      return;
    }

    if (!formData.employee_id.trim()) {
      alert("Employee ID is required");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Phone Number is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    if (!formData.aadhaar_number.trim()) {
      alert("Aadhaar Number is required");
      return;
    }
     if (!formData.email.trim()) {
      alert("Email ID is required");
      return;
    }

    if (!/^[0-9]{12}$/.test(formData.aadhaar_number)) {
      alert("Enter valid 12-digit Aadhaar number");
      return;
    }

    if (!formData.role_id) {
      alert("Please select Designation");
      return;
    }

    if (!formData.department_id) {
      alert("Please select Department");
      return;
    }

    // ✅ Save data
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    employees.push({
      id: Date.now(),
      ...formData,
      formCompleted: false,
      formData: {}
    });

    localStorage.setItem("employees", JSON.stringify(employees));

    alert("✅ Employee Registered Successfully");

    onSuccess();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl space-y-5">

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
        Employee Registration
      </h2>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4">

        <Input
          label="First Name *"
          placeholder="Enter first name"
          value={formData.first_name}
          onChange={(e)=>handleChange("first_name", e.target.value)}
        />

        <Input
          label="Middle Name"
          placeholder="Enter middle name"
          value={formData.middle_name}
          onChange={(e)=>handleChange("middle_name", e.target.value)}
        />

        <Input
          label="Last Name *"
          placeholder="Enter last name"
          value={formData.last_name}
          onChange={(e)=>handleChange("last_name", e.target.value)}
        />

        <Input
          label="Employee ID *"
          placeholder="Enter Employee ID (e.g. EMP123)"
          value={formData.employee_id}
          onChange={(e)=>handleChange("employee_id", e.target.value)}
        />

        <Input
          label="Email ID *"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e)=>handleChange("email", e.target.value)}
        />

        <Input
          label="Aadhaar Number *"
          placeholder="Enter 12-digit Aadhaar"
          value={formData.aadhaar_number}
          onChange={(e)=>handleChange("aadhaar_number", e.target.value)}
        />

        <Input
          label="Phone Number *"
          placeholder="Enter mobile number"
          value={formData.phone}
          onChange={(e)=>handleChange("phone", e.target.value)}
        />

        {/* Designation */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Select Designation *
          </label>
          <DropdownSearch
            options={roleOptions}
            value={formData.role_id}
            onChange={(e)=>handleChange("role_id", e.target.value)}
            placeholder="Select role"
          />
        </div>

        {/* Department */}
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-600">
            Select Department *
          </label>
          <DropdownSearch
            options={departmentOptions}
            value={formData.department_id}
            onChange={(e)=>handleChange("department_id", e.target.value)}
            placeholder="Select department"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">

        <button 
          onClick={onClose} 
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button 
          onClick={handleSubmit} 
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Register Employee
        </button>

      </div>

    </div>
  );
};

export default EmployeeRegisterForm;