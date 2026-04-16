import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const SalaryIncrementForm = (props) => {

  const [records, setRecords] = useState([
    { year: "", amount: "", incrementDate: "", applyDate: "", isAdvance: "", file: null }
  ]);

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const handleFile = (i, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File < 2MB");
      return;
    }
    handleChange(i, "file", file);
  };

  return (
    <EmployeeFormCard title="वेतनवाढ तपशील" {...props}>
      {records.map((r, i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mb-4">

          <Input label="वर्ष" value={r.year}
            onChange={(e) => handleChange(i, "year", e.target.value)} />

          <Input label="रक्कम" value={r.amount}
            onChange={(e) => handleChange(i, "amount", e.target.value)} />

          <DatePicker label="वाढ दिनांक"
            value={r.incrementDate}
            onChange={(val) => handleChange(i, "incrementDate", val)} />

          <DatePicker label="लागू दिनांक"
            value={r.applyDate}
            onChange={(val) => handleChange(i, "applyDate", val)} />

          <DropdownSearch
            value={r.isAdvance}
            onChange={(e) => handleChange(i, "isAdvance", e.target.value)}
            options={yesNo}
            placeholder="आगाऊ आहे का"
          />

          <input type="file" className="input"
            onChange={(e) => handleFile(i, e.target.files[0])} />

        </div>
      ))}
    </EmployeeFormCard>
  );
};

export default SalaryIncrementForm;