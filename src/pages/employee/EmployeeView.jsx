import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "../../services/employeeService";

const EmployeeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const data = await getEmployeeById(id);

      // ✅ handle array response
      if (Array.isArray(data)) {
        setEmployee(data[0]);
      } else {
        setEmployee(data);
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!employee) return <div className="p-6">No employee found</div>;

  return (
    <div className="p-6 space-y-6">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/employees")}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        ← Back
      </button>

      {/* 🧑 BASIC INFO */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <p><b>Name:</b> {employee.first_name} {employee.last_name}</p>
          <p><b>Employee ID:</b> {employee.employee_id}</p>
          <p><b>Phone:</b> {employee.phone || "-"}</p>
          <p><b>Email:</b> {employee.email || "-"}</p>
          <p><b>Aadhar:</b> {employee.aadhar_number || "-"}</p>
          <p><b>Gender:</b> {employee.gender_id || "-"}</p>
        </div>
      </div>

      {/* 🏢 SERVICE INFO */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Service Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <p><b>Department ID:</b> {employee.department_id}</p>
          <p><b>Cadre:</b> {employee.cadre_service_name || "-"}</p>
          <p><b>Appointment Type:</b> {employee.first_appointment_type || "-"}</p>
          <p><b>Joining Date:</b> {employee.joining_date || "-"}</p>
          <p><b>Current Step:</b> {employee.current_step}</p>
          <p><b>Current Section:</b> {employee.current_section}</p>
        </div>
      </div>

      {/* 👨‍👩‍👧 PERSONAL INFO */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <p><b>Father Name:</b> {employee.father_full_name || "-"}</p>
          <p><b>Mother Name:</b> {employee.mother_full_name || "-"}</p>
          <p><b>Marital Status:</b> {employee.marital_status || "-"}</p>
          <p><b>Blood Group:</b> {employee.blood_group || "-"}</p>
          <p><b>Religion:</b> {employee.religion || "-"}</p>
          <p><b>Caste:</b> {employee.caste_id || "-"}</p>
        </div>
      </div>

    </div>
  );
};

export default EmployeeView;