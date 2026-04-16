import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const AssetLiabilityForm = (props) => {
  const [records, setRecords] = useState([
    {
      year: "",
      submitted: "",
      date: "",
      file: null,
    },
  ]);

  const yesNoOptions = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const addRow = () => {
    setRecords([
      ...records,
      { year: "", submitted: "", date: "", file: null },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, idx) => idx !== i));
  };

  const handleFile = (i, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File must be under 2MB");
      return;
    }
    handleChange(i, "file", file);
  };

  return (
    <EmployeeFormCard title="मत्ता व दायित्व माहिती" {...props}>
      <div className="space-y-4">

        {records.map((r, i) => (
          <div key={i} className="border rounded-xl p-4 bg-slate-50">

            {/* Header */}
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-semibold">
                रेकॉर्ड {i + 1}
              </h3>

              {records.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-4">

              {/* वर्ष */}
              <Input
                label="वर्ष"
                placeholder="Enter Year"
                value={r.year}
                onChange={(e) =>
                  handleChange(i, "year", e.target.value)
                }
              />

              {/* Submitted */}
              <div>
                <label className="text-sm font-medium">
                  पोच अपलोड केली आहे का?
                </label>
                <DropdownSearch
                  value={r.submitted}
                  onChange={(e) =>
                    handleChange(i, "submitted", e.target.value)
                  }
                  options={yesNoOptions}
                  placeholder="निवडा"
                />
              </div>

              {/* Date */}
              {r.submitted === "होय" && (
                <DatePicker
                  label="दिनांक"
                  value={r.date}
                  onChange={(val) =>
                    handleChange(i, "date", val)
                  }
                />
              )}

              {/* File */}
              {r.submitted === "होय" && (
                <div>
                  <label className="text-sm font-medium">
                    मत्ता व दायित्व पोच (2MB)
                  </label>
                  <input
                    type="file"
                    className="input mt-1"
                    onChange={(e) =>
                      handleFile(i, e.target.files[0])
                    }
                  />
                </div>
              )}

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

export default AssetLiabilityForm;