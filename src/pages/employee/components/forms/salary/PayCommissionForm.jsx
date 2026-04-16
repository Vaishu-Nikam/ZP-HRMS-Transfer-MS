import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const PayCommissionForm = (props) => {

  const [records, setRecords] = useState([
    {
      commission: "",
      band: "",
      gradePay: "",
      payInBand: "",
      commissionDate: "",
      applyDate: "",
      currentBasic: "",
    },
  ]);

  const commissionOptions = [
    { id: "1", name: "पहिला" },
    { id: "2", name: "दुसरा" },
    { id: "3", name: "तिसरा" },
    { id: "4", name: "चौथा" },
    { id: "5", name: "पाचवा" },
    { id: "6", name: "सहावा" },
    { id: "7", name: "सातवा" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  return (
    <EmployeeFormCard title="वेतन आयोग माहिती" {...props}>
      {records.map((r, i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mb-4">

          <DropdownSearch
            value={r.commission}
            onChange={(e) => handleChange(i, "commission", e.target.value)}
            options={commissionOptions}
            placeholder="वेतन आयोग निवडा"
          />

          <Input label="बँड वेतन" value={r.band}
            onChange={(e) => handleChange(i, "band", e.target.value)} />

          <Input label="ग्रेड पे" value={r.gradePay}
            onChange={(e) => handleChange(i, "gradePay", e.target.value)} />

          <Input label="पे इन बँड" value={r.payInBand}
            onChange={(e) => handleChange(i, "payInBand", e.target.value)} />

          <DatePicker label="वेतन आयोग दिनांक"
            value={r.commissionDate}
            onChange={(val) => handleChange(i, "commissionDate", val)} />

          <DatePicker label="लागू दिनांक"
            value={r.applyDate}
            onChange={(val) => handleChange(i, "applyDate", val)} />

          <Input label="सध्याचे मूळ वेतन" value={r.currentBasic}
            onChange={(e) => handleChange(i, "currentBasic", e.target.value)} />

        </div>
      ))}
    </EmployeeFormCard>
  );
};

export default PayCommissionForm;