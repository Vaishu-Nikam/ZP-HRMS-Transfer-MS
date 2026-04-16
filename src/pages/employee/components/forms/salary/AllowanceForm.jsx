import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const AllowanceForm = (props) => {

  const [records, setRecords] = useState([
    { type: "", startDate: "", endDate: "", amount: "" }
  ]);

  const allowanceOptions = [
    { id: "DA", name: "DA - महागाई भत्ता" },
    { id: "HRA", name: "HRA - घरभाडे भत्ता" },
    { id: "TA", name: "TA - वाहतूक भत्ता" },
    { id: "OTA", name: "OTA - ओव्हरटाईम भत्ता" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  return (
    <EmployeeFormCard title="वेतन भत्ता" {...props}>
      {records.map((r, i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mb-4">

          <DropdownSearch
            value={r.type}
            onChange={(e) => handleChange(i, "type", e.target.value)}
            options={allowanceOptions}
            placeholder="भत्ता प्रकार"
          />

          <DatePicker label="लागू दिनांक"
            value={r.startDate}
            onChange={(val) => handleChange(i, "startDate", val)} />

          <DatePicker label="रद्द दिनांक"
            value={r.endDate}
            onChange={(val) => handleChange(i, "endDate", val)} />

          <Input label="रक्कम" value={r.amount}
            onChange={(e) => handleChange(i, "amount", e.target.value)} />

        </div>
      ))}
    </EmployeeFormCard>
  );
};

export default AllowanceForm;