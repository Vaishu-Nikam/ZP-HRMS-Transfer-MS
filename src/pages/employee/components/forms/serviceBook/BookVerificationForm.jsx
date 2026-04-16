import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";

const BookVerificationForm = (props) => {

  const [records, setRecords] = useState([
    {
      verificationType: "",
      verifyDate: "",
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
        verificationType: "",
        verifyDate: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="सेवापुस्तक पडताळणी माहिती" {...props}>
      <div className="space-y-6">

        {records.map((r, i) => (
          <div key={i} className="space-y-4">

            {/* Header */}
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

            {/* Form */}
            <div className="grid grid-cols-2 gap-4">

              {/* पडताळणी प्रकार */}
              <Input
                label="पडताळणी प्रकार"
                value={r.verificationType}
                onChange={(e) =>
                  handleChange(i, "verificationType", e.target.value)
                }
              />

              {/* दिनांक */}
              <DatePicker
                label="दिनांक"
                value={r.verifyDate}
                onChange={(val) =>
                  handleChange(i, "verifyDate", val)
                }
              />

              {/* File Upload */}
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  पडताळणी प्रत (2MB)
                </label>
                <input
                  type="file"
                  className="input mt-1"
                  onChange={(e) =>
                    handleFile(i, e.target.files[0])
                  }
                />
              </div>

            </div>
          </div>
        ))}

        {/* Add Button */}
        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default BookVerificationForm;