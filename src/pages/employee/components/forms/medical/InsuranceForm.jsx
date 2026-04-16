import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";

const InsuranceForm = (props) => {

  const [records, setRecords] = useState([
    {
      year: "",
      date: "",
      amount: "",
      document: null,
    },
  ]);

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const handleFile = (i, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }
    handleChange(i, "document", file);
  };

  const addRow = () => {
    setRecords([
      ...records,
      {
        year: "",
        date: "",
        amount: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="गटविमा माहिती" {...props}>
      <div className="space-y-6">

        {records.map((r, i) => (
          <div key={i} className="space-y-4">

            {records.length > 1 && (
              <div className="flex justify-between">
                <h3 className="text-sm font-semibold">
                  रेकॉर्ड {i + 1}
                </h3>
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">

              <Input
                label="गटविमा वर्ष"
                value={r.year}
                onChange={(e) => handleChange(i, "year", e.target.value)}
              />

              <DatePicker
                label="दिनांक"
                value={r.date}
                onChange={(val) => handleChange(i, "date", val)}
              />

              <Input
                label="रक्कम"
                value={r.amount}
                onChange={(e) => handleChange(i, "amount", e.target.value)}
              />

              <div className="col-span-2">
                <label className="text-sm font-medium">
                  गटविमा नोंदीची प्रत (2MB)
                </label>
                <input
                  type="file"
                  className="input mt-1"
                  onChange={(e) => handleFile(i, e.target.files[0])}
                />
              </div>

            </div>
          </div>
        ))}

        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default InsuranceForm;