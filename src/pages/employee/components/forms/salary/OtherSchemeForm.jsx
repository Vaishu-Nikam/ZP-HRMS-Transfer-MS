import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const OtherSchemeForm = (props) => {

  const [records, setRecords] = useState([
    { applicable: "", type: "", approvalDate: "", salary: "", applyDate: "" }
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

  return (
    <EmployeeFormCard title="इतर वेतन योजना" {...props}>
      {records.map((r, i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mb-4">

          <DropdownSearch
            value={r.applicable}
            onChange={(e) => handleChange(i, "applicable", e.target.value)}
            options={yesNo}
            placeholder="लागू आहे का"
          />

          {r.applicable === "होय" && (
            <>
              <Input label="योजना प्रकार"
                value={r.type}
                onChange={(e) => handleChange(i, "type", e.target.value)} />

              <DatePicker label="मंजुरी दिनांक"
                value={r.approvalDate}
                onChange={(val) => handleChange(i, "approvalDate", val)} />

              <Input label="वेतन"
                value={r.salary}
                onChange={(e) => handleChange(i, "salary", e.target.value)} />

              <DatePicker label="लागू दिनांक"
                value={r.applyDate}
                onChange={(val) => handleChange(i, "applyDate", val)} />
            </>
          )}

        </div>
      ))}
    </EmployeeFormCard>
  );
};

export default OtherSchemeForm;