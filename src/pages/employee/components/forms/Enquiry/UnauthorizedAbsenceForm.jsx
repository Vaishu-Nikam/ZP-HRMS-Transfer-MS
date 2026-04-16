import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";

const UnauthorizedAbsenceForm = (props) => {

  const [records, setRecords] = useState([
    { fromDate: "", toDate: "", action: "", file: null }
  ]);

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  return (
    <EmployeeFormCard title="अनधिकृत गैरहजर" {...props}>
      {records.map((r, i) => (
        <div key={i} className="grid grid-cols-2 gap-4">

          <DatePicker label="पासून"
            value={r.fromDate}
            onChange={(val) => handleChange(i, "fromDate", val)} />

          <DatePicker label="पर्यंत"
            value={r.toDate}
            onChange={(val) => handleChange(i, "toDate", val)} />

          <Input label="कार्यवाही"
            value={r.action}
            onChange={(e) => handleChange(i, "action", e.target.value)} />

          <input type="file" className="input" />

        </div>
      ))}
    </EmployeeFormCard>
  );
};

export default UnauthorizedAbsenceForm;