import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const RecoveryForm = (props) => {

  const [records, setRecords] = useState([
    { isRecovery: "", fromDate: "", toDate: "", amount: "", reason: "", certNo: "", certDate: "" }
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
    <EmployeeFormCard title="वेतन वसुली" {...props}>
      {records.map((r, i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mb-4">

          <DropdownSearch
            value={r.isRecovery}
            onChange={(e) => handleChange(i, "isRecovery", e.target.value)}
            options={yesNo}
            placeholder="वसुली केली आहे का"
          />

          <DatePicker label="पासून"
            value={r.fromDate}
            onChange={(val) => handleChange(i, "fromDate", val)} />

          <DatePicker label="पर्यंत"
            value={r.toDate}
            onChange={(val) => handleChange(i, "toDate", val)} />

          <Input label="रक्कम"
            value={r.amount}
            onChange={(e) => handleChange(i, "amount", e.target.value)} />

          <Input label="कारण"
            value={r.reason}
            onChange={(e) => handleChange(i, "reason", e.target.value)} />

          <Input label="प्रमाणपत्र क्रमांक"
            value={r.certNo}
            onChange={(e) => handleChange(i, "certNo", e.target.value)} />

          <DatePicker label="प्रमाणपत्र दिनांक"
            value={r.certDate}
            onChange={(val) => handleChange(i, "certDate", val)} />

        </div>
      ))}
    </EmployeeFormCard>
  );
};

export default RecoveryForm;